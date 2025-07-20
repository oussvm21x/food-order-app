import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService, isOnline } from '../../services/cartService';

// Initial state
const initialState = {
    cartItems: [], // Array to hold items and their quantities
    itemsCount: 0, // Total number of items in the cart (sum of all quantities)
    total: 0,
    delivery: 10,
    subtotal: 0,
    discount: 0,
    loading: false,
    error: null,
    isOnline: true, // Track online status
    syncInProgress: false // Track if backend sync is in progress
};

// ============= GUEST CART OPERATIONS (LOCAL ONLY) =============

// Local cart operations for guests
const guestCartOperations = {
    addToLocal: (state, action) => {
        const { foodId, quantity = 1, name, price, image, description, category } = action.payload;
        const existingItem = state.cartItems.find(item => item.foodId === foodId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            state.cartItems.push({
                foodId,
                quantity,
                name,
                price,
                image,
                description,
                category
            });
        }

        // Recalculate totals
        state.itemsCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        state.subtotal = state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
    },

    removeFromLocal: (state, action) => {
        const foodId = action.payload;
        const existingItem = state.cartItems.find(item => item.foodId === foodId);

        if (existingItem) {
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter(item => item.foodId !== foodId);
            }
        }

        // Recalculate totals
        state.itemsCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        state.subtotal = state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
    },

    clearLocal: (state) => {
        state.cartItems = [];
        state.itemsCount = 0;
        state.subtotal = 0;
        state.total = 0;
    }
};

// ============= AUTHENTICATED USER OPERATIONS (BACKEND SYNC) =============

// Fetch cart from backend (for authenticated users)
export const fetchCartFromBackend = createAsyncThunk(
    'cart/fetchCartFromBackend',
    async (_, { rejectWithValue }) => {
        try {
            const cart = await cartService.getCart();
            return cart || [];
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch cart');
        }
    }
);

// Add to cart with backend sync (for authenticated users)
export const addToCartWithSync = createAsyncThunk(
    'cart/addToCartWithSync',
    async ({ foodId, quantity = 1, foodData }, { getState, rejectWithValue }) => {
        const state = getState();

        try {
            // First update local state immediately (optimistic update)
            // This will be handled in the pending case

            // Then sync with backend
            const updatedCart = await cartService.addToCart(foodId, quantity);
            return { cart: updatedCart, foodData };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to add to cart');
        }
    }
);

// Remove from cart with backend sync (for authenticated users)
export const removeFromCartWithSync = createAsyncThunk(
    'cart/removeFromCartWithSync',
    async (foodId, { rejectWithValue }) => {
        try {
            const updatedCart = await cartService.removeFromCart(foodId);
            return { cart: updatedCart, foodId };
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to remove from cart');
        }
    }
);

// Clear cart with backend sync (for authenticated users)
export const clearCartWithSync = createAsyncThunk(
    'cart/clearCartWithSync',
    async (_, { rejectWithValue }) => {
        try {
            await cartService.clearCart();
            return [];
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to clear cart');
        }
    }
);

// ============= CART SLICE =============

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // ===== GUEST OPERATIONS =====
        addToCartLocal: guestCartOperations.addToLocal,
        removeFromCartLocal: guestCartOperations.removeFromLocal,
        clearCartLocal: guestCartOperations.clearLocal,

        // ===== UTILITY ACTIONS =====
        setOnlineStatus: (state, action) => {
            state.isOnline = action.payload;
        },

        applyPromoCode: (state, action) => {
            state.discount = action.payload;
            state.total = state.subtotal > 0
                ? state.subtotal * (1 - state.discount) + state.delivery
                : 0;
        },

        clearError: (state) => {
            state.error = null;
        },

        // Called when user logs out - reset to guest mode
        resetToGuestMode: (state) => {
            state.cartItems = [];
            state.itemsCount = 0;
            state.subtotal = 0;
            state.total = 0;
            state.loading = false;
            state.error = null;
            state.syncInProgress = false;
        },

        // Called when guest logs in - clear local cart before fetching backend cart
        clearOnLogin: (state) => {
            state.cartItems = [];
            state.itemsCount = 0;
            state.subtotal = 0;
            state.total = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            // ===== FETCH CART =====
            .addCase(fetchCartFromBackend.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartFromBackend.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cartItems = action.payload || [];

                // Recalculate totals
                state.itemsCount = state.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
                state.subtotal = state.cartItems.reduce((acc, item) => {
                    const foodData = item.foodId; // Populated food data
                    return acc + ((foodData?.price || 0) * item.quantity);
                }, 0);
                state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
            })
            .addCase(fetchCartFromBackend.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch cart';
            })

            // ===== ADD TO CART WITH SYNC =====
            .addCase(addToCartWithSync.pending, (state, action) => {
                state.syncInProgress = true;
                state.error = null;

                // Optimistic update - add locally first
                const { foodId, quantity = 1, foodData } = action.meta.arg;
                const existingItem = state.cartItems.find(item =>
                    (item.foodId?._id || item.foodId) === foodId
                );

                if (existingItem) {
                    existingItem.quantity += quantity;
                } else if (foodData) {
                    state.cartItems.push({
                        foodId: foodData,
                        quantity,
                        _id: Date.now() // Temporary ID
                    });
                }

                // Recalculate totals
                state.itemsCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
                state.subtotal = state.cartItems.reduce((acc, item) => {
                    const food = item.foodId;
                    return acc + ((food?.price || 0) * item.quantity);
                }, 0);
                state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
            })
            .addCase(addToCartWithSync.fulfilled, (state, action) => {
                state.syncInProgress = false;
                state.error = null;

                // Replace with backend response
                state.cartItems = action.payload.cart || [];

                // Recalculate totals
                state.itemsCount = state.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
                state.subtotal = state.cartItems.reduce((acc, item) => {
                    const foodData = item.foodId;
                    return acc + ((foodData?.price || 0) * item.quantity);
                }, 0);
                state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
            })
            .addCase(addToCartWithSync.rejected, (state, action) => {
                state.syncInProgress = false;
                state.error = action.payload || 'Failed to add to cart';

                // Rollback optimistic update
                // In a real app, you might want to keep the failed state and retry
                // For now, we'll just show the error
            })

            // ===== REMOVE FROM CART WITH SYNC =====
            .addCase(removeFromCartWithSync.pending, (state, action) => {
                state.syncInProgress = true;
                state.error = null;

                // Optimistic update - remove locally first
                const foodId = action.meta.arg;
                const existingItem = state.cartItems.find(item =>
                    (item.foodId?._id || item.foodId) === foodId
                );

                if (existingItem) {
                    if (existingItem.quantity > 1) {
                        existingItem.quantity -= 1;
                    } else {
                        state.cartItems = state.cartItems.filter(item =>
                            (item.foodId?._id || item.foodId) !== foodId
                        );
                    }
                }

                // Recalculate totals
                state.itemsCount = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
                state.subtotal = state.cartItems.reduce((acc, item) => {
                    const food = item.foodId;
                    return acc + ((food?.price || 0) * item.quantity);
                }, 0);
                state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
            })
            .addCase(removeFromCartWithSync.fulfilled, (state, action) => {
                state.syncInProgress = false;
                state.error = null;

                // Replace with backend response
                state.cartItems = action.payload.cart || [];

                // Recalculate totals
                state.itemsCount = state.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
                state.subtotal = state.cartItems.reduce((acc, item) => {
                    const foodData = item.foodId;
                    return acc + ((foodData?.price || 0) * item.quantity);
                }, 0);
                state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
            })
            .addCase(removeFromCartWithSync.rejected, (state, action) => {
                state.syncInProgress = false;
                state.error = action.payload || 'Failed to remove from cart';
            })

            // ===== CLEAR CART WITH SYNC =====
            .addCase(clearCartWithSync.pending, (state) => {
                state.syncInProgress = true;
                state.error = null;
            })
            .addCase(clearCartWithSync.fulfilled, (state) => {
                state.syncInProgress = false;
                state.error = null;
                state.cartItems = [];
                state.itemsCount = 0;
                state.subtotal = 0;
                state.total = 0;
            })
            .addCase(clearCartWithSync.rejected, (state, action) => {
                state.syncInProgress = false;
                state.error = action.payload || 'Failed to clear cart';
            });
    },
});

// Export actions
export const {
    addToCartLocal,
    removeFromCartLocal,
    clearCartLocal,
    setOnlineStatus,
    applyPromoCode,
    clearError,
    resetToGuestMode,
    clearOnLogin
} = cartSlice.actions;

// Export selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartItemsCount = (state) => state.cart.itemsCount;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export const selectIsOnline = (state) => state.cart.isOnline;
export const selectSyncInProgress = (state) => state.cart.syncInProgress;

export default cartSlice.reducer;

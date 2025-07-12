import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    cartItems: [], // Array to hold items and their quantities
    itemsCount: 0, // Total number of items in the cart (sum of all quantities)
    total: 0,
    delivery: 10,
    subtotal: 0,
    discount: 0,
    loading: false,
    error: null
};

// Async thunk to fetch cart from backend
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/cart/get', {
                credentials: 'include', // send cookies
            });
            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to fetch cart');
            }
            const data = await response.json();
            return data.cart; // assuming backend returns { cart: [...] }
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

export const addToCart = createAsyncThunk(
    '/cart/addToCart',
    async ({ foodId, quantity }, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/cart/add", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ foodId, quantity })
            });

            if (!response.ok) {
                const err = await response.json()
                return rejectWithValue(err.message || 'Failed to add to cart ')
            }

            const data = await response.json()
            return data.cart;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (foodId, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/cart/remove/${foodId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!response.ok) {
                const err = await response.json();
                return rejectWithValue(err.message || 'Failed to remove from cart');
            }
            const data = await response.json();
            return data.cart; // just return the message
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);
// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        applyPromoCode: (state, action) => {
            state.discount = action.payload;
            state.total = state.subtotal > 0
                ? state.subtotal * (1 - state.discount) + state.delivery
                : state.delivery;
        },
        resetState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Replace cartItems with backend data
                state.cartItems = action.payload || [];
                // Recalculate itemsCount
                state.itemsCount = state.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
                // Subtotal is now calculated in the UI, not here
                state.subtotal = 0;
                state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch cart';
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.cartItems = action.payload || [];
                state.itemsCount = state.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
                state.subtotal = 0;
                state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to add to cart';
            })

            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cartItems = action.payload || [];
                state.itemsCount = state.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
                state.subtotal = 0;
                state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to remove from cart';
            })
    },
});

// Export actions
export const { applyPromoCode, resetState } = cartSlice.actions;

// Export the reducer as the default export
export default cartSlice.reducer;

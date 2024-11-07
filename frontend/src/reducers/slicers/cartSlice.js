import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    cartItems: [], // Array to hold items and their quantities
    itemsCount: 0, // Total number of items in the cart (sum of all quantities)
    total: 0,
    delivery: 10,
    subtotal: 0,
    discount: 0

};

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add an item to the cart
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                // If the item exists in the cart, increase its quantity
                existingItem.quantity += 1;
            } else {
                // If it's a new item, add it to the cart with quantity 1
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            // Increase the total number of items in the cart
            state.itemsCount += 1;
            state.subtotal = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
        },

        // Remove an item or decrease its quantity
        removeFromCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    // If the quantity is more than 1, decrease it
                    existingItem.quantity -= 1;
                } else {
                    // If the quantity is 1, remove the item from the cart
                    state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
                }
                // Decrease the total number of items in the cart
                state.itemsCount -= 1;
                state.subtotal = state.cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                );
                state.total = state.subtotal > 0 ? state.subtotal + state.delivery : 0;
            }
        },

        // Clear the entire cart
        clearCart: (state) => {
            state.cartItems = []; // Reset cartItems array
            state.itemsCount = 0;  // Reset itemsCount to 0
            state.subtotal = 0;    // Reset subtotal to 0
            state.delivery = 10;
            state.total = state.delivery; // Set total to delivery fee only

        },

        // Apply promo code
        applyPromoCode: (state, action) => {
            state.discount = action.payload;
            state.total = state.subtotal > 0
                ? state.subtotal * (1 - state.discount) + state.delivery
                : state.delivery;
        },
        resetState: () => initialState
    },
});

// Export actions
export const { addToCart, removeFromCart, clearCart, applyPromoCode, resetState } = cartSlice.actions;

// Export the reducer as the default export
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    cartItems: [], // Array to hold the dishes and their quantities
};

// Cart slice with actions to add, remove, and clear dishes
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add a dish to the cart
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                // If the dish is already in the cart, increase the quantity
                existingItem.quantity += 1;
            } else {
                // If it's a new dish, add it to the cart with quantity 1
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },

        // Remove a dish or reduce its quantity
        removeFromCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    // If the quantity is more than 1, reduce it by 1
                    existingItem.quantity -= 1;
                } else {
                    // If the quantity is 1, remove the dish entirely
                    state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
                }
            }
        },

        // Clear the cart entirely
        clearCart: (state) => {
            state.cartItems = []; // Reset cartItems to an empty array
        },
    },
});

// Export actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Export the reducer as default
export default cartSlice.reducer;

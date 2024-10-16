import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    cartItems: [], // Array to hold items and their quantities
    itemsCount: 0, // Total number of items in the cart (sum of all quantities)
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
            }
        },

        // Clear the entire cart
        clearCart: (state) => {
            state.cartItems = []; // Reset cartItems array
            state.itemsCount = 0;  // Reset itemsCount to 0
        },
    },
});

// Export actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Export the reducer as the default export
export default cartSlice.reducer;

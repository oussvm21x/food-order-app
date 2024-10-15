import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: 0, // Start with 0 items in the basket, adjust to your app logic
};

const cartSlice = createSlice({
    name: 'cart', // Name of the slice
    initialState, // Initial state
    reducers: {
        addItem: (state) => {
            state.items += 1; // Increment the number of items in the cart
        },
        removeItem: (state) => {
            if (state.items > 0) {
                state.items -= 1; // Decrement the number of items if greater than 0
            }
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions; // Export the action creators
export default cartSlice.reducer; // Export the reducer

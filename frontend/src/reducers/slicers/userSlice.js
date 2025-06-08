import { createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    token: null
};

// User Slice
const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            setUser: (state, action) => {
                state.user = action.payload.user
                state.isAuthenticated = true
                state.isLoading = false
                state.error = null
                state.token = action.payload.token
            },
            logout: (state) => {
                state.user = null
                state.isAuthenticated = false
                state.isLoading = false
                state.error = null
                state.token = null
            },
            setLoading: (state, action) => {
                state.isLoading = action.payload
            },
            setError: (state, action) => {
                state.error = action.payload
                state.isLoading = false
            },
            clearError: (state) => {
                state.error = null
            },
        }
    }
)

export const { setUser, logout, setLoading, setError, clearError } = userSlice.actions;
export default userSlice.reducer;
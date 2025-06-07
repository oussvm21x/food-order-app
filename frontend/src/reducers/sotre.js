import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web
import cartReducer from './slicers/cartSlice'; // Your existing cart slice
import expirationMiddleware from './slicers/deletePresist';
// Import future reducers when you add them (e.g., userReducer from './slicers/userSlice')

const persistConfig = {
    key: 'root',
    storage, // Defaults to localStorage
    whitelist: ['cart'], // List reducers to persist, e.g., ['cart', 'user']
};

// Combine all your reducers
const rootReducer = combineReducers({
    cart: cartReducer,
    // Add other reducers here as you create them, e.g.:
    // user: userReducer,
});

// Apply persistReducer only to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'RESET_STATE'],
                ignoredPaths: ['cart.cartItems'],
            },
        }).concat(expirationMiddleware),
});

const persistor = persistStore(store);

export { store, persistor };

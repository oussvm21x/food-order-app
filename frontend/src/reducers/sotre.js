import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slicers/cartSlice'; // Import your cartSlice

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Persisted reducer for cart
const persistedReducer = persistReducer(persistConfig, cartReducer);

// Store configuration
const store = configureStore({
    reducer: {
        cart: persistedReducer, // If you have more slices, you can add them here
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignoring persist actions
        },
    }),
});
const persistor = persistStore(store);

export { store, persistor };
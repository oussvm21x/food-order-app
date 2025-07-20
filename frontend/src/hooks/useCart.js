import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addToCartLocal,
    removeFromCartLocal,
    clearCartLocal,
    addToCartWithSync,
    removeFromCartWithSync,
    clearCartWithSync,
    fetchCartFromBackend,
    setOnlineStatus,
    resetToGuestMode,
    clearOnLogin,
    selectCartItems,
    selectCartError,
    selectIsOnline,
    selectSyncInProgress
} from '../reducers/slicers/cartSlice';
import { isOnline } from '../services/cartService';

/**
 * Custom hook to handle cart operations
 * Automatically determines whether to use local or backend operations
 * based on authentication status and online status
 */
export const useCart = () => {
    const dispatch = useDispatch();

    // Selectors
    const cartItems = useSelector(selectCartItems);
    const cartError = useSelector(selectCartError);
    const isAppOnline = useSelector(selectIsOnline);
    const syncInProgress = useSelector(selectSyncInProgress);
    const { isAuthenticated, user } = useSelector(state => state.user);

    // Monitor online status
    useEffect(() => {
        const updateOnlineStatus = () => {
            dispatch(setOnlineStatus(isOnline()));
        };

        // Set initial status
        updateOnlineStatus();

        // Listen for online/offline events
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, [dispatch]);

    // Handle authentication state changes
    useEffect(() => {
        if (isAuthenticated && isAppOnline) {
            // User just logged in - clear local cart and fetch from backend
            dispatch(clearOnLogin());
            dispatch(fetchCartFromBackend());
        } else if (!isAuthenticated) {
            // User logged out - reset to guest mode
            dispatch(resetToGuestMode());
        }
    }, [isAuthenticated, isAppOnline, dispatch]);

    // Cart operations
    const addToCart = (foodId, foodData, quantity = 1) => {
        if (!isAppOnline && isAuthenticated) {
            // If authenticated but offline, disable cart functionality
            console.warn('Cannot add to cart while offline');
            return;
        }

        if (isAuthenticated && isAppOnline) {
            // Authenticated user - sync with backend
            dispatch(addToCartWithSync({
                foodId,
                quantity,
                foodData: {
                    _id: foodId,
                    name: foodData.name,
                    price: foodData.price,
                    imageUrl: foodData.image,
                    description: foodData.description,
                    category: foodData.category
                }
            }));
        } else {
            // Guest user - local operation only
            dispatch(addToCartLocal({
                foodId,
                quantity,
                name: foodData.name,
                price: foodData.price,
                image: foodData.image,
                description: foodData.description,
                category: foodData.category
            }));
        }
    };

    const removeFromCart = (foodId) => {
        if (!isAppOnline && isAuthenticated) {
            // If authenticated but offline, disable cart functionality
            console.warn('Cannot remove from cart while offline');
            return;
        }

        if (isAuthenticated && isAppOnline) {
            // Authenticated user - sync with backend
            dispatch(removeFromCartWithSync(foodId));
        } else {
            // Guest user - local operation only
            dispatch(removeFromCartLocal(foodId));
        }
    };

    const clearCart = () => {
        if (!isAppOnline && isAuthenticated) {
            // If authenticated but offline, disable cart functionality
            console.warn('Cannot clear cart while offline');
            return;
        }

        if (isAuthenticated && isAppOnline) {
            // Authenticated user - sync with backend
            dispatch(clearCartWithSync());
        } else {
            // Guest user - local operation only
            dispatch(clearCartLocal());
        }
    };

    // Helper functions
    const getItemQuantity = (foodId) => {
        const item = cartItems.find(item =>
            (item.foodId?._id || item.foodId) === foodId
        );
        return item ? item.quantity : 0;
    };

    const isItemInCart = (foodId) => {
        return cartItems.some(item =>
            (item.foodId?._id || item.foodId) === foodId
        );
    };

    const canUseCart = () => {
        // Guest can always use cart locally
        // Authenticated users need to be online
        return !isAuthenticated || (isAuthenticated && isAppOnline);
    };

    return {
        // Cart data
        cartItems,
        cartError,

        // Status
        isOnline: isAppOnline,
        isAuthenticated,
        syncInProgress,
        canUseCart: canUseCart(),

        // Operations
        addToCart,
        removeFromCart,
        clearCart,

        // Helpers
        getItemQuantity,
        isItemInCart,
    };
};

export default useCart;

const API_URL = 'http://localhost:5000/api';

// Check if user is online
export const isOnline = () => navigator.onLine;

// Cart service functions
export const cartService = {
    // Get cart items
    getCart: async () => {
        if (!isOnline()) {
            throw new Error('Cannot fetch cart while offline');
        }

        try {
            const response = await fetch(`${API_URL}/cart/get`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch cart');
            }

            const data = await response.json();
            return data.cart;
        } catch (error) {
            console.error('Get cart error:', error);
            throw error;
        }
    },

    // Add item to cart
    addToCart: async (foodId, quantity = 1) => {
        if (!isOnline()) {
            throw new Error('Cannot add to cart while offline');
        }

        try {
            const response = await fetch(`${API_URL}/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ foodId, quantity }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add item to cart');
            }

            const data = await response.json();
            return data.cart;
        } catch (error) {
            console.error('Add to cart error:', error);
            throw error;
        }
    },

    // Remove item from cart (decrease quantity or remove completely)
    removeFromCart: async (foodId) => {
        if (!isOnline()) {
            throw new Error('Cannot remove from cart while offline');
        }

        try {
            const response = await fetch(`${API_URL}/cart/remove/${foodId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to remove item from cart');
            }

            const data = await response.json();
            return data.cart;
        } catch (error) {
            console.error('Remove from cart error:', error);
            throw error;
        }
    },

    // Update cart item quantity
    updateCartItem: async (foodId, quantity) => {
        if (!isOnline()) {
            throw new Error('Cannot update cart while offline');
        }

        try {
            const response = await fetch(`${API_URL}/cart/update/${foodId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ quantity }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update cart item');
            }

            const data = await response.json();
            return data.cart;
        } catch (error) {
            console.error('Update cart item error:', error);
            throw error;
        }
    },

    // Clear entire cart
    clearCart: async () => {
        if (!isOnline()) {
            throw new Error('Cannot clear cart while offline');
        }

        try {
            const response = await fetch(`${API_URL}/cart/clear`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to clear cart');
            }

            const data = await response.json();
            return data.cart;
        } catch (error) {
            console.error('Clear cart error:', error);
            throw error;
        }
    },
};

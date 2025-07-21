const API_URL = 'http://localhost:5000/api';

// Order service functions
export const orderService = {
    // Place order with Stripe payment
    placeOrder: async (orderData) => {
        try {
            const response = await fetch(`${API_URL}/order/place`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to place order');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Place order error:', error);
            throw error;
        }
    },

    // Verify payment after Stripe checkout
    verifyPayment: async (sessionId, orderId) => {
        try {
            const response = await fetch(`${API_URL}/order/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ sessionId, orderId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to verify payment');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Verify payment error:', error);
            throw error;
        }
    },

    // Get user orders
    getUserOrders: async (userId) => {
        try {
            const response = await fetch(`${API_URL}/order/user/${userId}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch orders');
            }

            const data = await response.json();
            return data.orders;
        } catch (error) {
            console.error('Get user orders error:', error);
            throw error;
        }
    },

    // Get all orders (admin)
    getAllOrders: async () => {
        try {
            const response = await fetch(`${API_URL}/order/all`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch orders');
            }

            const data = await response.json();
            return data.orders;
        } catch (error) {
            console.error('Get all orders error:', error);
            throw error;
        }
    },

    // Update order status (admin)
    updateOrderStatus: async (orderId, status) => {
        try {
            const response = await fetch(`${API_URL}/order/update-status/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update order status');
            }

            const data = await response.json();
            return data.order;
        } catch (error) {
            console.error('Update order status error:', error);
            throw error;
        }
    }
};

import express from 'express';
import {
    placeOrder,
    verifyPayment,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
} from '../controllers/orderController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

// Place new order with Stripe payment
router.post('/place', protect, placeOrder);

// Verify payment after Stripe checkout
router.post('/verify-payment', protect, verifyPayment);

// Get orders for specific user
router.get('/user/:userId', protect, getUserOrders);

// Get all orders (admin only)
router.get('/all', protect, getAllOrders);

// Update order status (admin only)
router.put('/update-status/:orderId', protect, updateOrderStatus);

export default router;

import Stripe from 'stripe';
import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js';

// Lazy initialization of Stripe
let stripe = null;
let stripeInitialized = false;

const getStripe = () => {
    if (!stripeInitialized) {
        try {
            console.log('🔍 Initializing Stripe...');
            console.log('🔍 Debug: STRIPE_SECRET_KEY value:', process.env.STRIPE_SECRET_KEY ? 'EXISTS' : 'MISSING');
            console.log('🔍 Debug: STRIPE_SECRET_KEY length:', process.env.STRIPE_SECRET_KEY?.length);
            console.log('🔍 Debug: STRIPE_SECRET_KEY starts with sk_test:', process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_'));

            if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_your_stripe_secret_key_here') {
                console.warn('⚠️  Stripe secret key not configured. Please add your actual Stripe secret key to .env file');
                stripe = null;
            } else {
                stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
                console.log('✅ Stripe initialized successfully');
            }
        } catch (error) {
            console.error('❌ Failed to initialize Stripe:', error.message);
            stripe = null;
        }
        stripeInitialized = true;
    }
    return stripe;
};

// Place order with Stripe payment
const placeOrder = async (req, res) => {
    try {
        // Get Stripe instance (lazy initialization)
        const stripeInstance = getStripe();

        // Check if Stripe is properly configured
        if (!stripeInstance) {
            return res.status(500).json({
                success: false,
                message: "Payment system not configured. Please contact administrator."
            });
        }

        const { userId, items, amount, address } = req.body;

        // Validate required fields
        if (!userId || !items || !amount || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate items array
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart items are required"
            });
        }

        // Validate user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Validate and calculate total amount from items
        let calculatedAmount = 0;
        const validatedItems = [];

        for (const item of items) {
            const food = await foodModel.findById(item.foodId);
            if (!food) {
                return res.status(404).json({
                    success: false,
                    message: `Food item not found: ${item.name || item.foodId}`
                });
            }

            const itemTotal = food.price * item.quantity;
            calculatedAmount += itemTotal;

            validatedItems.push({
                foodId: food._id,
                name: food.name,
                price: food.price,
                quantity: item.quantity,
                subtotal: itemTotal
            });
        }

        // Add delivery fee
        const deliveryFee = 10;
        calculatedAmount += deliveryFee;

        // Verify amount matches frontend calculation
        if (Math.abs(calculatedAmount - amount) > 0.01) {
            return res.status(400).json({
                success: false,
                message: "Amount mismatch. Please refresh and try again."
            });
        }

        // Create order in database first
        const newOrder = new orderModel({
            userId,
            items: validatedItems,
            amount: calculatedAmount,
            address,
            status: "Food Processing",
            payment: false
        });

        const savedOrder = await newOrder.save();

        // Create Stripe checkout session
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                ...validatedItems.map(item => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: Math.round(item.price * 100), // Convert to cents
                    },
                    quantity: item.quantity,
                })),
                // Add delivery fee as separate line item
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Delivery Fee',
                        },
                        unit_amount: deliveryFee * 100, // Convert to cents
                    },
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/orders`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/order-cancel?orderId=${savedOrder._id}`,
            metadata: {
                orderId: savedOrder._id.toString()
            }
        });

        res.status(200).json({
            success: true,
            message: "Order created successfully",
            orderId: savedOrder._id,
            sessionUrl: session.url,
            sessionId: session.id
        });

    } catch (error) {
        console.error('Place order error:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Verify payment and update order status
const verifyPayment = async (req, res) => {
    console.log('🔍 Starting payment verification...');
    try {
        // Get Stripe instance (lazy initialization)
        const stripeInstance = getStripe();

        // Check if Stripe is properly configured
        if (!stripeInstance) {
            return res.status(500).json({
                success: false,
                message: "Payment system not configured. Please contact administrator."
            });
        }

        const { sessionId, orderId } = req.body;

        if (!sessionId || !orderId) {
            return res.status(400).json({
                success: false,
                message: "Session ID and Order ID are required"
            });
        }

        // Retrieve the checkout session from Stripe
        const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            console.log(`✅ Payment succeeded for order ${orderId}, session ${sessionId}`);
            // Update order payment status
            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId,
                { payment: true },
                { new: true }
            );

            if (!updatedOrder) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }

            // Clear user's cart after successful payment
            await userModel.findByIdAndUpdate(updatedOrder.userId, {
                $set: { cart: [] }
            });

            res.status(200).json({
                success: true,
                message: "Payment verified successfully",
                order: updatedOrder
            });
        } else {
            console.log(`❌ Payment not completed for order ${orderId}, session ${sessionId}`);
            res.status(400).json({
                success: false,
                message: "Payment not completed"
            });
        }

    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to verify payment",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get user orders
const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        const orders = await orderModel.find({ userId })
            .populate('items.foodId', 'name imageUrl')
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get all orders (admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
            .populate('userId', 'name email')
            .populate('items.foodId', 'name imageUrl')
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const validStatuses = ['Food Processing', 'Out for Delivery', 'Delivered', 'Cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order: updatedOrder
        });

    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to update order status",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export {
    placeOrder,
    verifyPayment,
    getUserOrders,
    getAllOrders,
    updateOrderStatus
};

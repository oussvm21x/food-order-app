import User from "../models/userModel.js";

// Add to cart
const addToCart = async (req, res) => {
    try {
        const { foodId, quantity } = req.body;
        const user = req.user;

        // Check if item already exists in the cart
        const existingItemIndex = user.cart.findIndex(item => item.foodId.toString() === foodId);

        if (existingItemIndex !== -1) {
            // If item exists, update its quantity
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            // If it doesn't exist, add it
            const cartItem = { foodId, quantity };
            user.cart.push(cartItem);
        }

        await user.save();

        // Populate the cart with food details before sending response
        await user.populate('cart.foodId');

        res.status(201).json({ message: 'Cart updated successfully', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart' });
        console.log(error);
    }
};

// Get cart 
const getCart = async (req, res) => {
    try {
        const user = req.user;

        // Populate the cart with food details
        await user.populate('cart.foodId');
        const cart = user.cart;

        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items' });
        console.log(error);
    }
};

// Remove from Cart 
const removeFromCart = async (req, res) => {
    try {
        const { foodId } = req.params;

        if (!foodId) {
            return res.status(400).json({ message: 'Food ID is required' });
        }

        const user = req.user;

        const itemIndex = user.cart.findIndex(item => item.foodId.toString() === foodId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Decrease quantity
        if (user.cart[itemIndex].quantity > 1) {
            user.cart[itemIndex].quantity -= 1;
        } else {
            // Remove the item if quantity is 1 or less
            user.cart.splice(itemIndex, 1);
        }

        await user.save();

        // Populate the cart with food details before sending response
        await user.populate('cart.foodId');

        res.status(200).json({ message: 'Item updated/removed from cart successfully', cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart' });
        console.log(error);
    }
};

// Clear entire cart
const clearCart = async (req, res) => {
    try {
        const user = req.user;

        // Clear the user's cart
        user.cart = [];
        await user.save();

        res.status(200).json({ message: 'Cart cleared successfully', cart: [] });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart' });
        console.log(error);
    }
};


export { addToCart, getCart, removeFromCart, clearCart }
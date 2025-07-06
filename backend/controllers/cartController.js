import User from "../models/userModel.js    ";

// Add to cart
const addToCart = async (req, res) => {
    try {
        const { foodId, quantity } = req.body
        const user = req.user
        const cartItem = { foodId, quantity }
        user.cart.push(cartItem)
        await user.save()
        res.status(201).json({ message: 'Item added to cart successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Error addig items' })
        console.log(error)
    }
}

// Get cart 
const getCart = async (req, res) => {
    try {
        const user = req.user
        const cart = user.cart
        res.status(200).json({ cart })

    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart items' })
        console.log(error)
    }

}

// Remove from Cart 
const removeFromCart = async (req, res) => {
    try {
        const { foodId } = req.params
        if (!foodId) {
            return res.status(400).json({ message: 'Food ID is required' })
        }
        const user = req.user
        const itemExists = user.cart.some(item => item.foodId.toString() === foodId);
        if (!itemExists) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
        user.cart = user.cart.filter(item => item.foodId.toString() !== foodId)
        await user.save()
        res.status(200).json({ message: 'Item removed from cart successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart' })
        console.log(error)
    }
}

export { addToCart, getCart, removeFromCart }
import express from "express";
import protect from "../middleware/protect.js";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cartController.js";


// Cart Routes
const cartRoute = express.Router();

cartRoute.post('/add', protect, addToCart);
cartRoute.get('/get', protect, getCart);
cartRoute.delete('/remove/:foodId', protect, removeFromCart);
cartRoute.delete('/clear', protect, clearCart);

export default cartRoute; 
import express from "express";
import protect from "../middleware/protect.js";
import { addToCart, getCart, removeFromCart } from "../controllers/cartController.js";


// Cart Routes
const cartRoute = express.Router();

cartRoute.post('/add', protect, addToCart);
cartRoute.get('/get', protect, getCart);
cartRoute.delete('/remove/:foodId', protect, removeFromCart);

export default cartRoute; 
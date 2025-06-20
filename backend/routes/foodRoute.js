import express from 'express';
import { getFood, createFoodItem, updateFoodItem, getFoodItem, deleteFoodItem } from '../controllers/foodController.js';
import { upload } from '../middleware/multer.js'


const router = express.Router();


// GET {READ}
router.get('/', getFood);// Get all food items -- Working 
router.get('/:id', getFoodItem);// Get a single food item by ID  -- Working 



// POST {ADD}
router.post('/', upload.single('image'), createFoodItem);// Add a new food item -- Working 

// PUT {UPDATE}
router.patch('/update/:id', updateFoodItem);// Update a food item by ID -- Working 

// DELETE 
router.delete('/:id', deleteFoodItem);// Delete a food item by ID

export default router; 
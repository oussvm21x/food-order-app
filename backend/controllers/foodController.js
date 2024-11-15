import Food from '../models/foodModel.js';
import path from 'path';
import fs from 'fs';


export const getFood = async (req, res) => {
    try {
        const foodItems = await Food.find();
        res.status(200).send(foodItems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getFoodItem = async (req, res) => {
    try {
        const foodItem = await Food.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food Item not found' });
        }
        res.status(200).send(foodItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export const createFoodItem = async (req, res) => {
    try {
        const { name, description, price, category, rating } = req.body;

        // The uploaded file path (Multer saves the file in 'uploads/' folder)
        const imageUrl = req.file ? req.file.path : '';

        // Create a new food item with the uploaded image URL
        const foodItem = await Food.create({
            name,
            description,
            price,
            category,
            imageUrl,
            rating
        });

        res.status(201).json(foodItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const updateFoodItem = async (req, res) => {
    try {
        const foodItem = await Food.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food Item not found' });
        }
        const UpdatedfoodItem = await Food.findByIdAndUpdate
            (req.params.id, req.body
                , { new: true, runValidators: true });
        res.status(200).send(UpdatedfoodItem);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

export const deleteFoodItem = async (req, res) => {
    try {
        const foodItem = await Food.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food Item not found' });
        }
        const imagePath = path.join('uploads', foodItem.imageUrl);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        await Food.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Food Item Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}
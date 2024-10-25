import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    rating: {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: 0,
        max: 5
    },
}, {
    timestamps: true
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cart: [{
        foodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food',
            required: true
        },
        quantity: {
            type: mongoose.Schema.Types.Number,
            required: true,
            default: 1
        }
    }],
    role: {
        type: mongoose.Schema.Types.String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const User = mongoose.model('User', userSchema);

export default User;
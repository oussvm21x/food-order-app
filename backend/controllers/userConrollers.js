import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //We must hash the password
        const exixstingUser = await User.findOne({ email });
        if (exixstingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            name: name,
            email: email,
            password: password
        })
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' })
        }
        const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'strict'
            })
            .json({
                message: 'User logged in successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                },
                token
            });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict'
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, email } = req.body;

        const updateUser = {}

        if (name) updateUser.name = name
        if (email) updateUser.email = email
        if (req.file) updateUser.profilePicture = req.file.path;

        if (Object.keys(updateUser).length > 0) {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                updateUser,
                { new: true }
            );

            // Generate new token with updated user data
            const token = jwt.sign(
                { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Set the new token in cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'strict'
            });

            return res.json({
                user: {
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    createdAt: updatedUser.createdAt,
                    profilePicture: updatedUser.profilePicture
                },
                token
            });
        }

        return res.json({ message: "No changes provided" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

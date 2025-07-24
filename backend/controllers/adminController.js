import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new User({
            name,
            email,
            password: hashedPassword,
            role: 'admin'
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await User.findOne({ email, role: 'admin' });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'strict'
            })
            .json({
                message: 'Admin logged in successfully',
                admin: {
                    id: admin._id,
                    name: admin.name,
                    email: admin.email
                },
                token
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

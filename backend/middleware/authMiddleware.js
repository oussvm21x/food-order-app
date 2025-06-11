import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
    try {
        // Add these console.logs for debugging
        console.log('--- PROTECT MIDDLEWARE DEBUG ---');
        console.log('Cookies received:', req.cookies);
        const token = req.cookies.token;
        console.log('Token extracted from cookie:', token);
        console.log('JWT_SECRET from env:', process.env.JWT_SECRET);

        if (!token) {
            console.log('Error: No token found in cookies.');
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);

        // Get user from token
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            console.log('Error: User not found for token ID.');
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        // Add user to request object
        req.user = user;
        console.log('User authenticated:', req.user.email);
        console.log('--- END PROTECT MIDDLEWARE DEBUG ---');
        next();
    } catch (error) {
        console.error('Protect middleware error:', error.message);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

export default protect; 
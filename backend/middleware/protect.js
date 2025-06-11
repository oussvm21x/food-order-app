import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const protect = async (req, res, next) => {
    try {

        // 1. Get the JWT token from cookies
        const token = req.cookies.token;

        // 2. Check if token exists
        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // 3. Verify the token using JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('run protect')
        // 4. Find the user in database using the decoded token
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }


        // 5. Attach the user to the request object
        req.user = user;

        // 6. Continue to the next middleware/route handler
        next();

    } catch (error) {
        console.error('Protect middleware error:', error.message);
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

export default protect;
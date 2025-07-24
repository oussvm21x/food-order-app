import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

// Admin registration route
router.post('/register', registerAdmin);

// Admin login route
router.post('/login', loginAdmin);

// Admin profile route - protected
router.get('/profile', protect, (req, res) => {
    // If protect middleware passes, we have the user in req.user
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized as admin' });
    }

    res.status(200).json({
        admin: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
});

// Admin logout route
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

export default router;

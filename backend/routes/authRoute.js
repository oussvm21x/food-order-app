import express from 'express';
import { registerUser, loginUser, logoutUser, updateUser } from '../controllers/userConrollers.js';
import hashPassword from '../middleware/hashPassword.js';
import protect from '../middleware/protect.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/register', hashPassword, registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.put('/update', protect, upload.single('profilePicture'), updateUser);

export default router;
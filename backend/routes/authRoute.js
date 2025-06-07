import express from 'express';
import { registerUser, loginUser } from '../controllers/userConrollers.js';
import hashPassword from '../middleware/hashPassword.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/register', hashPassword, registerUser);
router.post('/login', loginUser);

export default router;
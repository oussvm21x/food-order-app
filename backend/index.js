import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import foodRoutes from './routes/foodRoute.js';
import authRoutes from './routes/authRoute.js';

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/food', foodRoutes);
app.use('/api/auth', authRoutes);



const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
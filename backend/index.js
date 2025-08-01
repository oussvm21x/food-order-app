import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import foodRoutes from './routes/foodRoute.js';
import authRoutes from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cartRoutes from './routes/cartRoute.js';


dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();
// Add this before your routes

// CORS configuration
const corsOptions = {
    origin: true, // Allow all origins
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/uploads', express.static('uploads'));
// Routes
app.use('/api/food', foodRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
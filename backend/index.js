import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './controllers/db.js';

dotenv.config();

const app = express();
app.use(cors())

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
const PORT = process.env.PORT || 5000;
dotenv.config(); // Load environment variables
const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());

// auth routes
app.use('/api/auth', authRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

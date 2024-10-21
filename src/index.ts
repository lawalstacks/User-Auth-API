import express from 'express';
import dotenv from 'dotenv';
//import authRoutes from './routes/authRoutes';

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json()); // To parse JSON bodies

// auth routes
//app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

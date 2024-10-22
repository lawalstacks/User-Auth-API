import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';


const port = process.env.PORT;
const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(cookieParser());

// auth routes
app.use('/api/auth', authRoutes);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

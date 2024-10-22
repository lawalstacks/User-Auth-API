import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';



const port = process.env.PORT;
const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// auth routes
app.use('/api', userRoutes);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

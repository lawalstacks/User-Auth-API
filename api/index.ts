import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';
import { isUsingMongoDB } from './services/userServices';
import connectDb from './db/connectDb';     //for mongodb connection

isUsingMongoDB();//checks is mongodb_url is availabe

if(isUsingMongoDB()){ // if availabe executes connection
  connectDb();
}

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// auth routes
app.use('/api', userRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

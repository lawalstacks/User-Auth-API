import express from 'express';
import { signupUser, loginUser, getAllUsers } from '../controllers/authControllers';
import {protectedRoute} from '../middlewares/protectedRoute';


const router = express.Router();

// Register a new user
router.post('/signup', signupUser);

// Login a user
router.post('/login', loginUser);

//get all registered user details
router.post('/userprofiles',protectedRoute, getAllUsers);


export default router;

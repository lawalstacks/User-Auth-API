import express from 'express';
import { signupUser, loginUser,logoutUser, getAllUsers, editProfile } from '../controllers/userControllers';
import {protectedRoute} from '../middlewares/protectedRoute';


const router = express.Router();

// Register a new user
router.post('/auth/signup', signupUser);

// Login a user
router.post('/auth/login', loginUser);

//Logout a user
router.post('/auth/logout',logoutUser);

//see all registered users, only registered user can perform this action
router.get('/all-profiles',protectedRoute, getAllUsers);

//edit profile, only current user can edit profile
router.patch('/profile/edit/:id',protectedRoute,editProfile)


export default router;

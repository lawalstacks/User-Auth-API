import { Request, Response } from 'express';
import { saveUser, findAllUsers,findUserByEmail } from '../services/userServices';
import { IUser } from '../interfaces/userInterfaces';
import { genTokenandSetCookie } from '../utils/helpers/genTokenandSetCookie';
import bcrypt from 'bcryptjs';

// Signup user controller
export const signupUser = async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        //Generate token and set cookies
        genTokenandSetCookie(email,res)
        const newUser: IUser = {
            name,
            email,
            password: hashedPassword, // Store the hashed password
            createdAt: new Date()
        };

        // Save the user using the service
        const savedUser = await saveUser(newUser);
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all users controller (optional)
export const getAllUsers = async (req: Request, res: Response) : Promise<Response | any> => {
    try {
        const users = await findAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login user controller
export const loginUser = async (req: Request, res: Response) : Promise<Response | any> =>{
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

       //Generate token and set cookies
       genTokenandSetCookie(email,res)
        return res.status(200).json({ message: 'Login successful'});
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
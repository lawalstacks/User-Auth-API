import { Request, Response } from 'express';
import { saveUser, findAllUsers,isUsingMongoDB,findUserByUsername,findUserById, saveUserandUpdate } from '../services/userServices';
import { IUser } from '../interfaces/userInterfaces';
import { genTokenandSetCookie } from '../utils/helpers/genTokenandSetCookie';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';


let id;
// Signup user controller
export const signupUser = async (req: Request, res: Response): Promise<Response | any> => {
    
    try {
        const { username, email, password } = req.body;
        // Check if the user already exists
        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        //handle password
        if(password.length < 6){
            return res.status(400).json({ error: 'password should be up to 6 characters' })
        }
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        //Generate token and set cookies
        genTokenandSetCookie(username,res)
        if(isUsingMongoDB()){
            const newUser: IUser = {
            username,
            email,
            password: hashedPassword, // Store the hashed password
            createdAt: new Date()
        }
        // Save the user using the service
        const savedUser = await saveUser(newUser);
        return res.status(201).json({message:"Signup Successful",savedUser});
    }else{
        const newUser: IUser = {
            id:uuidv4(),
            username,
            email,
            password: hashedPassword, // Store the hashed password
            createdAt: new Date()
        }
        // Save the user using the service
        const savedUser = await saveUser(newUser);
        return res.status(201).json({message:"Signup Successful",savedUser});
    }
    

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login user controller
export const loginUser = async (req: Request, res: Response) : Promise<Response | any> =>{
    try {
        const { username, password } = req.body;

        // Check if the user exists
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(400).json({ error: 'No user found with the details' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

       //Generate token and set cookies
       genTokenandSetCookie(username,res)
        return res.status(200).json({ message: 'Login successful',user});
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to logout
// Login user controller
export const logoutUser = async (_req: Request, res: Response) : Promise<Response | any> =>{
    try {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0), // expiration date to delete the cookie
        sameSite: 'strict',
    });

    res.status(200).json({ message: 'Logout successful' });
        
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
   };
}

// Get all users controller (optional)
export const getAllUsers = async (_req: Request, res: Response) : Promise<Response | any> => {
    try {
        console.log("working")
        const users = await findAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const editProfile = async(req:Request,res: Response):
 Promise<Response | any> =>{
    let {username, email, password} = req.body;
    const userId = req.params.id;
    try{
        let userToUpdate = await findUserById(userId);
        console.log(userToUpdate);
        
        if(!userToUpdate){ return res.status(200).json({message: "you cannot edit other peoples profile"})}
        
        userToUpdate.username = username || username,
        userToUpdate.email=email || email
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            userToUpdate.password = hashedPassword;
        }
        userToUpdate = await saveUserandUpdate(userId,userToUpdate);
        res.status(201).json({userToUpdate,message:"profile updated!"})
    }catch{
        return res.status(500).json({ error: 'Internal Server Error' });
    }
 }
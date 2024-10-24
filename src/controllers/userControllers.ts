import { Request, Response } from 'express';
import { saveUser, findAllUsers,isUsingMongoDB,findUserByUsername,findUserById, saveUserandUpdate, findUserByEmail } from '../services/userServices';
import { IUser } from '../interfaces/userInterfaces';
import { genTokenandSetCookie } from '../utils/helpers/genTokenandSetCookie';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { CustomRequest } from '../interfaces/requestInterfaces';


// Signup user controller
export const signupUser = async (req: Request, res: Response): Promise<Response | any> => {
    
    try {
        const { username, email, password } = req.body;
        // Check if the user already exists
        if(!email || !username){
            return res.status(400).json({error:"username and email is required"})
        }
        const existingUser = await findUserByUsername(username);
        const existingEmail = await findUserByEmail(email);
        if (existingUser || existingEmail) {
            return res.status(400).json({ error: 'User already exists' });
        }
        //handle password
        if(!password || password.length < 6){
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
            _id:uuidv4(),
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
        console.log(user)
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
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Logout user controller
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



//Edit Profile
export const editProfile = async(req:CustomRequest,res: Response):
 Promise<Response | any> =>{
    let {username, email, password} = req.body;
    const id = req.params.id;
    console.log(id)
    try{
        let userToUpdate = await findUserById(id);
        const userEmailExist = await findUserByEmail(email);
        const userUsernameExist = await findUserByUsername(username);

         // Access the user ID set by the protectedRoute middleware and compare with the params.id of the editing user
        if( req.user?.id!== id){ return res.status(400).json({error: "you cannot edit other peoples profile"})}
        
        //if user id doest not exist
        if(!userToUpdate){ return res.status(400).json({error: "No user found"})}  
        if(userEmailExist || userUsernameExist){
            return res.status(400).json({error: "detail already exist, add a new detail or cancel"})
        }
        userToUpdate.username = username || userToUpdate.username,
        userToUpdate.email = email || userToUpdate.email
        if (password) {
            if(password.length < 6){return res.status(400).json({error:"password must be up to 6 characters"})}
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            userToUpdate.password = hashedPassword || userToUpdate.password;
        }
        userToUpdate = await saveUserandUpdate(id,userToUpdate);
        genTokenandSetCookie(username,res)
        res.status(201).json({message:"profile updated!",userToUpdate})
    }catch{
        return res.status(500).json({ error: 'Internal Server Error' });
    }
 }
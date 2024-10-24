import User from '../models/userModel';
import { IUser } from '../interfaces/userInterfaces'; // Import the IUser interface
import { readUsersFromJson, writeUsersToJson } from '../utils/helpers/fileHelpers';
import mongoose from 'mongoose';

//Database may fuck up thats why using user.json optionally
export const isUsingMongoDB = (): boolean => {
    const mongoUrl = process.env.MONGO_URL;
    
    // Check if mongoUrl is defined and is not an empty string
    if (mongoUrl && mongoUrl.trim() !== '') {
        return true;
    }
    return false;
};



// Function to save a user
export const saveUser = async (userData: IUser): Promise<IUser> => {
    if (isUsingMongoDB()) {
        // If using MongoDB, save using the User model
        const newUser = new User(userData);
        await newUser.save();
        console.log(newUser)
        return newUser; // Return the saved user
    } else {
        // If not using MongoDB, save to JSON file
        const users = readUsersFromJson();
        users.push(userData);
        writeUsersToJson(users);
        return userData; // Return the user data as is
    }
};

// Function to find all users
export const findAllUsers = async (): Promise<IUser[]> => {
    if (isUsingMongoDB()) {
        // If using MongoDB, retrieve users from the database
        return await User.find();
    } else {
        // If not using MongoDB, read from JSON file
        return readUsersFromJson();
    }
};

//Find user by email
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    if (isUsingMongoDB()) {
        // If using MongoDB, find the user in the database
        return await User.findOne({ email }).select('-password').exec();
    } else {
        // If using JSON, find the user in the JSON file
        const users = readUsersFromJson();
        return users.find(user => user.email === email) || null;
    }
};

//Find user by username
export const findUserByUsername = async (username: string): Promise<IUser | null> => {
    if (isUsingMongoDB()) {
        // If using MongoDB, find the user in the database
        return await User.findOne({ username });
    } else {
        // If using JSON, find the user in the JSON file
        const users = readUsersFromJson();
        return users.find(user => user.username === username) || null;
    }
};

//Find users by id
export const findUserById = async (id:any): Promise<IUser | null> => {
    if (isUsingMongoDB()) {
        // Handle MongoDB
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid user ID');
            }

            const user = await User.findById(id)
            return user;
        } catch (error) {
            console.error(`Error finding user by ID in MongoDB: ${error}`);
            return null;
        }
    } else {
        // Handle JSON file
        try {
            
            const users: IUser[] = readUsersFromJson();
            console.log(users)

            // Find user in the JSON file by _jid
            const user = users.find(u => u._jid === id);
            console.log(user)
            return user || null;
        } catch (error) {
            console.error(`Error finding user by ID in JSON file: ${error}`);
            return null;
        } 
    }
};

export const saveUserandUpdate = async (id: any, userData: any): Promise<IUser  | null> => {
    if (isUsingMongoDB()) {
    
        // If using MongoDB, save  and update using the User model
       const updatedUser = await User.findByIdAndUpdate(id,{$set:userData},{new: true, runValidators:true})
        return updatedUser;
    } else {
        // If not using MongoDB, save to JSON file

        const users:IUser[] = readUsersFromJson();
        const userIndex = users.findIndex((u: any) => u._jid === id);
        // If user exists, update their data
        if (userIndex !== -1) {
        // Merge the old data with the new data
        users[userIndex] = { ...users[userIndex], ...userData };

        // Write the updated array back to the JSON file
        writeUsersToJson(users);
        // Return the updated user
        return users[userIndex];
    }

    // If the user is not found, return null
    return null;
    }
};
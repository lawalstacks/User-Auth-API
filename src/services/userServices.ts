import User from '../models/userModel';
import { IUser } from '../interfaces/userInterfaces'; // Import the IUser interface
import mongoose from 'mongoose';
import { readUsersFromJson, writeUsersToJson } from '../utils/helpers/fileHelpers';

// Function to save a user
export const saveUser = async (userData: IUser): Promise<IUser> => {
    if (process.env.USE_MONGODB === 'true') {
    
        // If using MongoDB, save using the User model
        const newUser = new User(userData);
        await newUser.save();
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
    if (process.env.USE_MONGODB === 'true') {
        // If using MongoDB, retrieve users from the database
        return await User.find().select('-password').exec();
    } else {
        // If not using MongoDB, read from JSON file
        return readUsersFromJson();
    }
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    if (process.env.USE_MONGODB === 'true') {
        // If using MongoDB, find the user in the database
        return await User.findOne({ email }).exec();
    } else {

        // If using JSON, find the user in the JSON file
        const users = readUsersFromJson();
        return users.find(user => user.email === email) || null;
    }
};

//Find users by id

/*export const findUserById = async (id: string, useMongoDb: boolean = true): Promise<IUser | null> => {
    if (useMongoDb) {
        // Handle MongoDB
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid user ID');
            }

            const user = await User.findById(id).select('-password');
            return user;
        } catch (error) {
            console.error(`Error finding user by ID in MongoDB: ${error}`);
            return null;
        }
    } else {
        // Handle JSON file
        try {
            
            const users: IUser[] = readUsersFromJson();

            // Find user in the JSON file by ID
            const user = users.find(u => u.id === id);
            return user || null;
        } catch (error) {
            console.error(`Error finding user by ID in JSON file: ${error}`);
            return null;
        }
    }
};
*/
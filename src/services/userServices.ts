import User from '../models/userModel';
import { IUser } from '../interfaces/userInterfaces'; // Import the IUser interface

import { readUsersFromJson, writeUsersToJson } from '../utils/userJson';

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

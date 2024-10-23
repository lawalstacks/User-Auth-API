import fs from 'fs';
import path from 'path';
import { IUser } from '../../interfaces/userInterfaces'; // Import the IUser interface

const jsonFilePath = path.join(__dirname, '../../data/users.json');

// Function to read users from JSON file
export const readUsersFromJson = (): IUser[] => {
    if (!fs.existsSync(jsonFilePath)) {
        return []; // Return an empty array if the file doesn't exist
    }
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    return JSON.parse(jsonData) as IUser[];
};

// Function to write users to JSON file
export const writeUsersToJson = (users: IUser[]): void => {
    if (!fs.existsSync(jsonFilePath)) {
        fs.writeFileSync(jsonFilePath, JSON.stringify([]), 'utf-8');
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

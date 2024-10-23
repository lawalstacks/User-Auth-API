import {  Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel'; // MongoDB model
import { CustomRequest } from '../interfaces/requestInterfaces';
import { readUsersFromJson } from '../utils/helpers/fileHelpers';
import { IUser } from '../interfaces/userInterfaces';
import { isUsingMongoDB} from '../services/userServices';

// Path to the JSON file

export const protectedRoute = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        console.log(`jwt=> ${token}`)
        let decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;

     // Use MongoDB if the flag is true
         let user;
        if (isUsingMongoDB()) {
            // MongoDB case: Find user by any (payload)
        user = await User.findById(decoded.payload).select('-password');
        if(
            user?._id !== decoded.payload ||
            user?.username !== decoded.payload ||
            user?.email !== decoded.payload
        ){ return res.status(401).json({ error: "Unauthorized" });}
        } else {
            // JSON case: Find user by any payload
            const users:IUser[] = readUsersFromJson();
            console.log(users)
            console.log(decoded.payload)

            // Find user by any option(payload) in the JSON file
            user = users.find((u: any) => 
                u.email === decoded.payload || 
                u.id === decoded.payload ||
                u.username === decoded.payload
            );
            console.log(user)
        }
        
        // If user is not found in either MongoDB or JSON
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach user to the request object
        req.user = user;
        next();
    } catch (error: any) {
        if (error.code === 'ERR_HTTP_HEADERS_SENT') {
            return;
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
function isUsingMongoDb() {
    throw new Error('Function not implemented.');
}


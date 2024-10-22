import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel'; // MongoDB model
import fs from 'fs';
import path from 'path';
import { CustomRequest } from '../interfaces/requestInterfaces';

// Path to the JSON file
const userJsonPath = path.join(__dirname, '../data/users.json');

export const protectedRoute = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // Verify the JWT token and get userId or email
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;

        let user;

        const useMongoDb = process.env.MONGO_URL === 'true'; // Use MongoDB if the flag is true

        if (useMongoDb) {
            // MongoDB case: Find user by userId(payload)
            user = await User.findById(decoded.payload).select('-password');
        } else {
            // JSON case: Find user by email (since JSON doesn't hav e an id)
            const fileContent = fs.readFileSync(userJsonPath, 'utf-8');
            const users = JSON.parse(fileContent);
            console.log(users)
            console.log(decoded.payload)

            // Find user by any option(payload "optional") in the JSON file
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

import { Response } from 'express';
import jwt from 'jsonwebtoken';

// Define the payload interface to accept either userId or email
interface TokenPayload {
    id?: any;
    username?:string;
    email?: string;
}

//Function to generate token and set cookie
export const genTokenandSetCookie = (payload: TokenPayload, res: Response): string => {

    // Generate JWT token with the payload (either userId or email or both)
    const token = jwt.sign({payload}, process.env.JWT_SECRET || '', {
        expiresIn: "15d"
    });


    // Set the cookie in the response
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        sameSite: "strict"
    });

    return token;
};


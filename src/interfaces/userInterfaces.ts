import { Document } from 'mongoose';

// Interface for User
export interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: any;
}

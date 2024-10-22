import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/userInterfaces'; // Import the IUser interface

// Mongoose Schema
const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Export Mongoose Model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;

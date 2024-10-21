import { Request } from 'express';

// Extend the Express Request interface
export interface CustomRequest extends Request {
    user?: any,
}

import mongoose from 'mongoose';

const connectDb = async (): Promise<void | boolean> => {
    try {
        
        mongoose.set('strictQuery', false);

        // Connect to the MongoDB database using the URL from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URL || "");

        if(conn){console.log(`Database connected at ${conn.connection.host}`);
        return true;
        }
    } catch (e) {
        console.log('Unable to connect to the database');
        return false;
    }
};

export default connectDb;

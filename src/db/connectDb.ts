import mongoose from 'mongoose';

const connectDb = async (): Promise<void> => {
    try {
        
        mongoose.set('strictQuery', false);

        // Connect to the MongoDB database using the URL from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URL || '');

        console.log(`Database connected at ${conn.connection.host}`);
    } catch (e) {
        console.error('Unable to connect to the database:', e);
        process.exit(1); // Optionally exit the process with a failure code
    }
};

export default connectDb;

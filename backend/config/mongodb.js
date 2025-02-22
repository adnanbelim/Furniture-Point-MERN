import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Function to connect to the database
const connectDB = async () => {
    try {
        const dbURL = process.env.MONGO_URL;

        await mongoose.connect(dbURL);
        console.log('MongoDB Connected Successfully!');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit the application if connection fails
    }
};

// Export the function
export default connectDB;

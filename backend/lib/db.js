import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using the connection URI specified in the environment variables.
 * 
 * @async
 * @function connectDB
 * @throws Will throw an error if the MONGO_URI environment variable is not defined.
 * @throws Will throw an error if the connection to MongoDB fails.
 * 
 * @example
 * // Ensure that the MONGO_URI environment variable is set before calling this function.
 * connectDB();
 */
export const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        if (!conn.connection) {
            throw new Error("Failed to establish a connection");
        }

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

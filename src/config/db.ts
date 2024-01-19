import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Connect to MongoDB
const connectToMongoDB = async (): Promise<Connection> => {
  try {
    const mongoURI: string = (process.env.MONGO_URI as string);
    // Replace with your MongoDB URI
    const connection = await mongoose.connect(mongoURI);

    console.log('Connected to MongoDB');
    return connection.connection; // Return the Mongoose Connection object
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectToMongoDB;

//database samblakhole

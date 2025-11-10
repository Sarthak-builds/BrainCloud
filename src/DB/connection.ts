import mongoose from "mongoose";
import { config } from "dotenv";
config();

const MONGODB_URI = process.env.MONGODB_URI || '';
console.log('MONGODB_URI:', MONGODB_URI);

export const connectDB = async (): Promise<void> => {
if (MONGODB_URI==='') {
    throw new Error("MONGODB_URI is not defined");
}
try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`)
} catch (err) {
console.error('MongoDB connection error:', err);
process.exit(1); 
// exit krdega agr db fail hogya toh. dont start a server without it.
}
};
connectDB();
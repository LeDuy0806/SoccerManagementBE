import mongoose from 'mongoose';
import { exit } from 'process';

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI!);
    console.log('Database connected: ', connect.connection.host, connect.connection.name);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

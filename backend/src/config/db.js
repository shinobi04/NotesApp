import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DataBase connected");
  } catch (error) {
    console.log("Error Connecting to MongoDB", error);
    process.exit(1);
  }
};

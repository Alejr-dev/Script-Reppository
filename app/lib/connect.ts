import mongoose from "mongoose";

async function connect(): Promise<void> {
  try {
    const mongoUrl = process.env.MONGODB_URI as string;
    await mongoose.connect(mongoUrl);
    console.log("db connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connect;

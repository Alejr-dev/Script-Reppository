import mongoose from "mongoose";

async function connect(): Promise<void> {
  try {
    const mongoUrl = "mongodb+srv://alejandroprieto1914:q5QlcGmEK8P7udLC@dbmongo1.uvg0g.mongodb.net/?retryWrites=true&w=majority&appName=DBMongo1";
    await mongoose.connect(mongoUrl);
    console.log("db connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connect;

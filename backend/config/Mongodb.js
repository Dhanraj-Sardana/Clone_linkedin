import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(` MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` Error connecting DB: ${error.message}`);
    process.exit(1);
  }
};
export default connectDb;
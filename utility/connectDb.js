import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const options = {
 useUnifiedTopology: true,
 useNewUrlParser: true,
 dbName: "noHungerDatabase"
}
const mongoUrl = process.env.MONGODB_URL;

const connectDb = async() => {
 if (mongoose.connections[0].readyState) {
  console.log("mongoDb already connected");
  return
 }
 try {
  await mongoose.connect(mongoUrl, options)
  console.log("connected successfully to the DB!");
 }catch(error) {
  console.log("Error while connecting to the Database", error);
 }
}

export default connectDb;
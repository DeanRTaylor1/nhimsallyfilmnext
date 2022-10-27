import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;
const connectMongo = async () =>
  mongoose.connect(
    "mongodb+srv://deanrtaylor:lgJIqz8dc17gturm@cluster0.av3q3lc.mongodb.net/nhimsallyfilm?retryWrites=true&w=majority"
  );

export default connectMongo;

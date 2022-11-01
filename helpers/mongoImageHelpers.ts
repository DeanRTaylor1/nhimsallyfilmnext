import Image from "../models/Image";
import connectMongo from "../mongoose/connectMongo";
import mongoose from "mongoose";

export const getMongoGalleryImages = async () => {
  try {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");
    console.log(mongoose.models);
    const images = await Image.find();
    console.log(images);
    return images;
  } catch (err) {
    console.log(err);
  }
};

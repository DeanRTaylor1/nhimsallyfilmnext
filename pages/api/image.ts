// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//comment
import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";
import connectMongo from "../../mongoose/connectMongo";
import bcrypt from "bcryptjs";
import { Data, StatusError } from "../../types/interfaces";
import { hashPassword } from "../../helpers/auth";
import Image from "../../models/Image";

import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const session = await getSession({ req: req });
    if (!session) {
      res.status(401).json({ message: "Not Authenticated!" });
      return;
    }

    const imageName = req.body.imageName;
    const imageUri = req.body.imageUri;
    const albumName = req.body.albumName;
    const isAlbumCover = req.body.isAlbumCover;
    try {
      console.log("CONNECTING TO MONGO");
      await connectMongo();
      console.log("CONNECTED TO MONGO");
      // const existingImage = await Image.find({ imageName: imageName });
      // if (existingImage) {
      //   const error = new StatusError("Image Reference already exists.");
      //   error.statusCode = 409;
      //   throw error;
      // }

      const image = await new Image({
        imageName,
        imageUri,
        albumName,
        isAlbumCover,
      });
      const result = await image.save();
      console.log(image);
      res.status(201).json({ message: "Image Uploaded", imageId: image._id });
      return;
    } catch (err: any) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    }
  }
  if (req.method === "DELETE") {
    const session = await getSession({ req: req });
    if (!session) {
      res.status(401).json({ message: "Not Authenticated!" });
      return;
    }
  }
  if (req.method === "GET") {
    if (req.headers.isgallery) {
      try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");
        // const existingImage = await Image.find({ imageName: imageName });
        // if (existingImage) {
        //   const error = new StatusError("Image Reference already exists.");
        //   error.statusCode = 409;
        //   throw error;
        // }

        const images = await Image.find({ isAlbumCover: true });
        // console.log(images);

        res.status(200).json({ message: "Image Uploaded", images: images });
        return;
      } catch (err: any) {
        console.log(err);
        res.status(500).json({
          message: err.message,
        });
      }
    } else {
      try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");
        const albumName = req.headers.albumname;
        const images = await Image.find({ albumName: albumName });
        // console.log(images);

        res.status(200).json({ message: "Images retreived", images: images });
        return;
      } catch (err: any) {
        console.log(err);
        res.status(500).json({
          message: err.message,
        });
      }
    }
  }
}

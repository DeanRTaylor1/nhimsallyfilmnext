import { useState } from "react";
import Image from "next/image";
import { deleteImage, listAllFiles } from "../../../helpers/imageHelpers";
import axios from "axios";

export interface AdminGalleryCardProps {
  key: string;
  image: any;
  getImages: () => void;
}

const AdminGalleryCard: React.FC<AdminGalleryCardProps> = ({
  image,
  getImages,
}) => {
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);
  const { albumName, imageName } = image;
  const deleteHandler = async () => {
    // const images = await axios.get("http://localhost:3000/api/image", {
    //   headers: { albumname: albumName },
    // });
    // const imagesArr = images.data.images;
    // for (let image of imagesArr) {
    //   deleteImage(image.albumName, image.imageName);
    // }
    // try {
    //   const res = await axios.delete("http://localhost:3000/api/image", {
    //     headers: { albumname: albumName },
    //   });
    // } catch (err) {
    //   console.log(err);
    // }

    const imagesList = await listAllFiles(albumName);

    const imageNames = [];
    for (let image of imagesList) {
      imageNames.push(image.name);
    }
    console.log(imageNames);
    for (let image of imageNames) {
      deleteImage(albumName, image);
    }
    try {
      const res = await axios.delete("http://localhost:3000/api/image", {
        headers: { albumname: albumName },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    getImages();
  };
  return (
    <div key={image.id} className="dashboardImageContainer">
      <div>
        <Image
          className="hover:cursor-pointer"
          alt="galleryimage"
          src={image.imageUri}
          width={100}
          height={150}
        />
      </div>
      <div className="flex flex-col gap-4 ">
        <span className="text-2xl font-bold">
          Album Name: <p className="text-lg font-light">{image.albumName}</p>
        </span>
        <span>
          Link:{" "}
          <a
            className="underline underline-offset-4 hover:opacity-75"
            href={image.imageUri}
            target="_blank"
            rel="noreferrer"
          >
            Here
          </a>
          {}
        </span>
        {!deleteConfirm && (
          <div
            onClick={() => setDeleteConfirm(true)}
            className="font-bold text-red-600 hover:underline underline-offset-2"
          >
            Delete
          </div>
        )}
        {deleteConfirm && (
          <div className="font-bold flex gap-6">
            <span
              className="hover:underline underline-offset-2"
              onClick={deleteHandler}
            >
              Confirm
            </span>
            <span
              onClick={() => setDeleteConfirm(false)}
              className="hover:underline underline-offset-2"
            >
              Cancel
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGalleryCard;

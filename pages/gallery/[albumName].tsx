import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryProps } from "../../types/interfaces";
import { useRouter } from "next/router";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import axios from "axios";
import Spinner from "../../Components/spinner/spinner";

const IndividualGallery: React.FC<GalleryProps> = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);
  const router = useRouter();
  const { albumName } = router.query;

  useEffect(() => {
    axios
      .get("/api/image", { headers: { albumname: albumName } })
      .then((images) => {
        console.log(images);
        setImages(images.data.images!);
        setImageLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      {!imageLoaded && <Spinner />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4 justify-items-center items-center p-4 md:w-4/6 overflow-auto">
        {imageLoaded &&
          images.map((item) => {
            return (
              // add use dispatch on click for each image to update the galleryview

              <Image
                key={item._id}
                className="hover:cursor-pointer"
                data-imagename={item.imageName}
                alt="galleryimage"
                src={item.imageUri}
                width={800}
                height={350}
              />
            );
          })}
      </div>
    </Fragment>
  );
};

export default IndividualGallery;

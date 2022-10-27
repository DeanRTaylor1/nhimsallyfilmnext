import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryProps } from "../../types/interfaces";
import { useRouter } from "next/router";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import Spinner from "../../Components/spinner/spinner";

const IndividualGallery: React.FC<GalleryProps> = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [images, setImages] = useState<any[]>([]);
  const router = useRouter();
  const { albumName } = router.query;
  console.log(albumName);

  const getGalleryImages = async (albumName: string) => {
    try {
      const images = collection(db, albumName);
      const imageQuery = query(images, limit(9));
      const imagesSnap = await getDocs(imageQuery);

      let newArr: any[] = [];
      if (!imagesSnap.empty) {
        imagesSnap.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let obj = { id: doc.id, ...doc.data() };
          newArr.push(obj);
        });
        setImages(newArr);
        setImageLoaded(true);
        return;
      } else {
        setImageLoaded(false);
        console.log("no such doc");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (typeof albumName === "string") {
      getGalleryImages(albumName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [albumName]);

  return (
    <Fragment>
      {!imageLoaded && <Spinner />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4 justify-items-center items-center p-4 md:w-4/6 overflow-auto">
        {imageLoaded &&
          images.map((item) => {
            return (
              // add use dispatch on click for each image to update the galleryview
              <Link key={item.id} href={"/gallery/" + item.imagename}>
                <Image
                  className="hover:cursor-pointer"
                  data-imagename={item.imagename}
                  alt="galleryimage"
                  src={item.imageurl}
                  width={800}
                  height={350}
                />
              </Link>
            );
          })}
      </div>
    </Fragment>
  );
};

export default IndividualGallery;

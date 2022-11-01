import React from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { getGalleryImages } from "../../helpers/imageHelpers";
import { GalleryProps } from "../../types/interfaces";
import axios from "axios";

const Galleries: React.FC<GalleryProps> = ({ galleryImages }) => {
  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4 justify-items-center items-center p-4 md:w-4/6 overflow-auto">
        {galleryImages.map((item) => {
          return (
            // add use dispatch on click for each image to update the galleryview
            <Link key={item._id} href={"/gallery/" + item.albumName}>
              <Image
                className="hover:cursor-pointer"
                data-imagename={item.albumName}
                alt="galleryimage"
                src={item.imageUri!}
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

const getStaticProps = async () => {
  const data = await axios.get(process.env.BASE_URL + "/api/image", {
    headers: { isgallery: true },
  });

  const images = data.data.images!;
  console.log(images);
  const galleryImages = data.data.images!;
  return {
    props: {
      galleryImages,
    },
    revalidate: 432000,
  };
};

export default Galleries;

export { getStaticProps };
//comment

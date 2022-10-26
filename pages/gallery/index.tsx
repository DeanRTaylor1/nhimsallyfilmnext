import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { getGalleryImages } from "../../helpers/imageHelpers";
import { GalleryProps } from "../../types/interfaces";

const Galleries: React.FC<GalleryProps> = ({ galleryImages }) => {
  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4 justify-items-center items-center p-4 md:w-4/6 overflow-auto">
        {galleryImages.map((item) => {
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

const getStaticProps = async () => {
  const galleryImages = await getGalleryImages();
  return {
    props: {
      galleryImages,
    },
  };
};

export default Galleries;

export { getStaticProps };

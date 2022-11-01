import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

//import swiper modules
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "./packageSwiper.module.css";
import "swiper/css/navigation";

import { PackageSwiperProps } from "../../../types/interfaces";

const PackageSwiper: React.FC<PackageSwiperProps> = ({ images }) => {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination, Navigation]}
      breakpoints={{
        // when window width is >= 640px
        1400: {
          width: 768,
          slidesPerView: 1,
        },
      }}
      spaceBetween={5}
      navigation
      loop={true}
      centeredSlides={true}
      slidesPerView={1}

      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {images
        .sort((a: any, b: any) => {
          return a.order - b.order;
        })
        .map((item) => {
          return (
            // add use dispatch on click for each image to update the galleryview

            <SwiperSlide key={item.id} className="group h-96 ">
              <Image
                className="group-hover:opacity-70 hover:cursor-pointer "
                alt="galleryimage"
                src={item.imageurl!}
                width={800}
                height={1400}
              />
            </SwiperSlide>
          );
        })}
      ...
    </Swiper>
  );
};

export default PackageSwiper;

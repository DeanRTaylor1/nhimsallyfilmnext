import React, { useEffect, useState, Fragment } from "react";
import Spinner from "../../spinner/spinner";

import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { LandscapeImageSwiperProps } from "../../../types/interfaces";

const SwiperLarge: React.FC<LandscapeImageSwiperProps> = ({
  homeLandScapeImageArr,
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setImageLoaded(true);
  }, []);

  return (
    <>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        loop={true}
        modules={[Pagination, Navigation]}
        navigation
        className="mySwiper"
      >
        {!imageLoaded && (
          <Fragment>
            <SwiperSlide>
              <Spinner />
            </SwiperSlide>
            <SwiperSlide>
              <Spinner />
            </SwiperSlide>
            <SwiperSlide>
              <Spinner />
            </SwiperSlide>
          </Fragment>
        )}
        {imageLoaded &&
          homeLandScapeImageArr.map((item: any) => {
            return (
              <SwiperSlide key={item.id} className="group">
                <Image
                  className="swiperImage group-hover:opacity-70 hover:cursor-pointer"
                  alt="galleryimage"
                  src={item.imageurl}
                  width={800}
                  height={350}
                />
                <div className="text-zinc-900 text-2xl origin-center group-hover:scale-100 absolute scale-0 top-0 left-0 flex items-center justify-center w-full h-full cursor-pointer">
                  {item.imagename}
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default SwiperLarge;

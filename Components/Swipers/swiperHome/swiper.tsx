import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { image, MainImageSwiperProps } from "../../../types/interfaces";
import Image from "next/image";

//import swiper modules
import { Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import Spinner from "../../spinner/spinner";
import "swiper/css/navigation";

const MainSwiper: React.FC<MainImageSwiperProps> = ({ homeImageArr }) => {
  // const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination, Navigation]}
      breakpoints={{
        // when window width is >= 640px
        768: {
          width: 768,
          slidesPerView: 3,
        },
      }}
      spaceBetween={5}
      navigation
      loop={true}
      centeredSlides={true}
      slidesPerView={2}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      className="flex items-center justify-center w-full h-1/3 md:h-11/12"
    >
      {homeImageArr.map((item) => {
        return (
          <SwiperSlide key={item.id} className="group">
            <Image
              className="swiperImage group-hover:opacity-70 hover:cursor-pointer"
              alt="galleryimage"
              src={item.imageurl}
              width={350}
              height={800}
            />
            <div className="text-zinc-900 text-2xl origin-center md:group-hover:scale-100 absolute scale-0 top-0 left-0 flex items-center justify-center w-64 md:w-full h-full cursor-pointer">
              {item.imagename}
            </div>
          </SwiperSlide>
        );
      })}
      ...
    </Swiper>
  );
};

export default MainSwiper;

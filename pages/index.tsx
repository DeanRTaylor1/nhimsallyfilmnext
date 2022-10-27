import { Fragment, useState, useEffect } from "react";
import MainSwiper from "../Components/Swipers/swiperHome/swiper";
import SwiperLarge from "../Components/Swipers/SwiperLandscape/Swiper2";
import Link from "next/link";
import { IndexProps } from "../types/interfaces";
import { getHomeImages, getHomeLandScapeImages } from "../helpers/imageHelpers";

const Home: React.FC<IndexProps> = ({
  homeImageArr,
  homeLandScapeImageArr,
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  useEffect(() => {
    setImageLoaded(true);
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col gap-4 justify-center items-start p-4 md:items-center md:w-4/6 overflow-auto">
        {imageLoaded && <MainSwiper homeImageArr={homeImageArr} />}
        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center gap-8 p-4 w-11/12 rounded-sm border-zinc-900 border-opacity-60">
            <Link href="/gallery">
              <div className="text-xl h-fit p-2 rounded-sm text-zinc-900 font-extralight hover:cursor-pointer hover:bg-slate-50">
                View Galleries
              </div>
            </Link>
            <Link href="/booking">
              <div className="text-xl h-fit p-2 rounded-sm text-zinc-900 font-extralight hover:cursor-pointer hover:bg-slate-50">
                Make A Booking
              </div>
            </Link>
          </div>
        </div>
        {imageLoaded && (
          <SwiperLarge homeLandScapeImageArr={homeLandScapeImageArr} />
        )}
      </div>
    </Fragment>
  );
};

const getStaticProps = async () => {
  const homeImageArr = await getHomeImages();
  const homeLandScapeImageArr = await getHomeLandScapeImages();

  return {
    props: {
      homeImageArr: homeImageArr,
      homeLandScapeImageArr: homeLandScapeImageArr,
    },
  };
};

export { getStaticProps };

export default Home;

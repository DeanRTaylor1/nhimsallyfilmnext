import React, { Fragment } from "react";
import { getPackageImages } from "../../helpers/imageHelpers";
import PackageSwiper from "../../Components/Swipers/packageSwiper/PackageSwiper";
import { BookingPageProps } from "../../types/interfaces";

const BookingPage: React.FC<BookingPageProps> = ({
  individualSwiper,
  coupleSwiper,
  weddingSwiper,
}) => {
  return (
    <Fragment>
      <div className="w-full h-auto flex justify-center overflow-y-scroll ">
        <div className="h-fit w-96 md:h-max md:w-2/4 p-4 flex flex-col justify-center items-center gap-8">
          <div className="flex justify-center items-center text-2xl font-medium hover:cursor-pointer hover:bg-slate-50 w-24">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://ig.me/m/nhimsally.film"
            >
              Book Here
            </a>
          </div>
          <div>Personal:</div>
          <PackageSwiper images={JSON.parse(individualSwiper)} />
          <div>Couples:</div>
          <PackageSwiper images={JSON.parse(coupleSwiper)} />
          <div>Wedding:</div>
          <PackageSwiper images={JSON.parse(weddingSwiper)} />
        </div>
      </div>
    </Fragment>
  );
};

const getStaticProps = async () => {
  const individual = await getPackageImages("individual");
  const couple = await getPackageImages("couple");
  const wedding = await getPackageImages("wedding");
  const individualSwiper = JSON.stringify(individual);
  const coupleSwiper = JSON.stringify(couple);
  const weddingSwiper = JSON.stringify(wedding);
  //console.log(individualSwiper);

  return {
    props: {
      individualSwiper,
      coupleSwiper,
      weddingSwiper,
    },
  };
};

export default BookingPage;

export { getStaticProps };

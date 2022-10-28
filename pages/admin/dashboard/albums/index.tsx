import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import DashboardContainer from "../../../../Components/Layout/Admin/DashboardContainer";
import { getGalleryImages } from "../../../../helpers/imageHelpers";
import Spinner from "../../../../Components/spinner/spinner";
import { useEffect, useState } from "react";
import { image } from "../../../../types/interfaces";
import Image from "next/image";

const Albums: React.FC = () => {
  const [images, setImages] = useState<image[]>([]);

  useEffect(() => {
    getGalleryImages()
      .then((images) => {
        setImages(images!);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <DashboardContainer>
      <div className="h-5/6 w-5/6 flex flex-col gap-4 justify-start items-start">
        <div className="h-fit flex gap-4 items-end">
          <h1 className="text-3xl font-bold">Albums</h1>
          <h3>Number of Albums: {images.length}</h3>
        </div>
        {images.map((item) => {
          return (
            <div key={item.id} className="dashboardImageContainer">
              <div>
                <Image
                  className="hover:cursor-pointer"
                  alt="galleryimage"
                  src={item.imageurl}
                  width={100}
                  height={150}
                />
              </div>
              <div className="flex flex-col gap-4 ">
                <span className="text-2xl font-bold">
                  Album Name:{" "}
                  <p className="text-lg font-light">{item.imagename}</p>
                </span>
                <span>
                  Link:{" "}
                  <a
                    className="underline underline-offset-4 hover:opacity-75"
                    href={item.imageurl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Here
                  </a>
                  {}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardContainer>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Albums;

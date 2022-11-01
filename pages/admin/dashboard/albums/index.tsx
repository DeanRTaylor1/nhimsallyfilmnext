import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import DashboardContainer from "../../../../Components/Layout/Admin/DashboardContainer";
import { getGalleryImages } from "../../../../helpers/imageHelpers";
import Spinner from "../../../../Components/spinner/spinner";
import { useEffect, useState } from "react";
import { image } from "../../../../types/interfaces";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";

const Albums: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/image", { headers: { isgallery: true } })
      .then((images) => {
        setImages(images.data.images!);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <DashboardContainer>
      <div className="h-5/6 w-5/6 flex flex-col gap-4 justify-start items-start">
        <div className="h-fit w-full flex gap-4 justify-between items-end">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Albums</h1>
            <h3>Number of Albums: {images.length}</h3>
          </div>
          <div className="w-24">
            <Link href="/admin/dashboard/albums/createalbum">
              <button className="submitButton h-8">Add Album</button>
            </Link>
          </div>
        </div>
        {images.map((item) => {
          return (
            <div key={item.id} className="dashboardImageContainer">
              <div>
                <Image
                  className="hover:cursor-pointer"
                  alt="galleryimage"
                  src={item.imageUri}
                  width={100}
                  height={150}
                />
              </div>
              <div className="flex flex-col gap-4 ">
                <span className="text-2xl font-bold">
                  Album Name:{" "}
                  <p className="text-lg font-light">{item.albumName}</p>
                </span>
                <span>
                  Link:{" "}
                  <a
                    className="underline underline-offset-4 hover:opacity-75"
                    href={item.imageUri}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Here
                  </a>
                  {}
                </span>
                {!deleteConfirm && (
                  <IconContext.Provider
                    value={{
                      color: "rgb(24 24 27)",
                      size: "1.5rem",
                      className: "global-class-name 0",
                    }}
                  >
                    <MdDeleteForever onClick={() => setDeleteConfirm(true)} />
                  </IconContext.Provider>
                )}
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

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import DashboardContainer from "../../../../Components/Layout/Admin/DashboardContainer";
import { getGalleryImages } from "../../../../helpers/imageHelpers";
import Spinner from "../../../../Components/spinner/spinner";
import { Fragment, useEffect, useState } from "react";
import { image } from "../../../../types/interfaces";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";
import AdminGalleryCard from "../../../../Components/Layout/Admin/AdminGalleryCard";

const Albums: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getImages = () => {
    setLoading(true);
    axios
      .get("/api/image", { headers: { isgallery: true } })
      .then((images) => {
        setImages(images.data.images!);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  useEffect(() => {
    console.log(process.env.BASE_URL);
    axios
      .get("/api/image", { headers: { isgallery: true } })
      .then((images) => {
        setImages(images.data.images!);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);
  return (
    <DashboardContainer>
      <div className="h-5/6 w-5/6 flex flex-col gap-4 justify-start items-start">
        <div className="h-fit w-full flex gap-4 justify-between items-end">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Albums</h1>
            <h3>Number of Albums: {images.length}</h3>
          </div>
          {images.length < 9 && (
            <div className="w-24">
              <Link href="/admin/dashboard/albums/createalbum">
                <button className="submitButton h-8">Add Album</button>
              </Link>
            </div>
          )}
        </div>
        {loading && <Spinner />}
        {!loading &&
          images.length > 0 &&
          images.map((item) => {
            return (
              <Fragment key={item.id}>
                <AdminGalleryCard
                  key={item.id}
                  image={item}
                  getImages={getImages}
                />
              </Fragment>
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

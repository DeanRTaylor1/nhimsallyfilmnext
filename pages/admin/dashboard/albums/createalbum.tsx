import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import DashboardContainer from "../../../../Components/Layout/Admin/DashboardContainer";
import { ImageSchema } from "../../../../types/interfaces";
import Spinner from "../../../../Components/spinner/spinner";
import React, { useEffect, useState, useRef, Fragment } from "react";
import { image } from "../../../../types/interfaces";
import Image from "next/image";
import { BsFillImageFill } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import uniqid from "uniqid";
import {
  uploadImage,
  createImageURLMap,
} from "../../../../helpers/imageHelpers";
import axios from "axios";

const CreateAlbum: React.FC = () => {
  const router = useRouter();
  const [images, setImages] = useState<ImageSchema[]>([]);
  const [albumCover, setAlbumCover] = useState<ImageSchema[]>([]);
  const [albumName, setAlbumName] = useState<string>("");
  const inputFile = useRef<HTMLInputElement | null>(null);
  const albumNameInput = useRef<HTMLInputElement | null>(null);
  const [albumImageUploaded, setAlbumImageUploaded] = useState<
    Boolean | string
  >(false);
  const [fullAlbumUploaded, setFullAlbumUploaded] = useState<Boolean | string>(
    false
  );

  const fullAlbumInputFile = useRef<HTMLInputElement | null>(null);

  const albumNameHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (albumNameInput !== null) {
      setAlbumName(albumNameInput.current!.value);
    }
  };

  const albumImageUploadHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAlbumImageUploaded("pending");
    const file = e.currentTarget.files![0];
    console.log(file);
    const currentUrl = [await uploadImage(albumName, file)];
    const albumImageObject = createImageURLMap(albumName, currentUrl, true);
    //   tempArr.push(currentUrl);
    console.log(albumImageObject);
    setAlbumCover(albumImageObject);
    setAlbumImageUploaded(true);
    // e.target.value = "";
  };
  const fullAlbumUploadHandler = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFullAlbumUploaded("pending");
    const files = [];
    for (let i = 0; i < e.currentTarget.files!.length; i++) {
      files.push(e.currentTarget.files![i]);
    }

    console.log(files);
    let tempArr = [];
    for (let file of files) {
      console.log(typeof file);
      console.log(file);
      const currentUrl = await uploadImage(albumName, file);
      tempArr.push(currentUrl);
      console.log(tempArr);
    }
    const albumArray = createImageURLMap(albumName, tempArr, false);
    setImages([...albumCover, ...albumArray]);
    setFullAlbumUploaded(true);
    // e.target.value = "";
  };

  const submitAlbum = async () => {
    for (let image of images) {
      try {
        const res = await axios.post("http://localhost:3000/api/image", {
          imageName: image.imageName,
          imageUri: image.imageUri,
          albumName: image.albumName,
          isAlbumCover: image.isAlbumCover,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    router.push("/admin/dashboard/albums");
  };

  return (
    <DashboardContainer>
      <div className="h-5/6 w-5/6 flex flex-col gap-4 justify-start items-start">
        <div className="h-fit flex gap-4 items-end">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">Album Name: {albumName}</h1>
            <h3>Number of Images: {images.length}</h3>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          {albumName.length === 0 && (
            <div className="flex flex-col gap-2">
              <label>Album Name:</label>
              <input
                className="statusCreator"
                placeholder="Please enter your album name"
                ref={albumNameInput}
              ></input>
              <button onClick={albumNameHandler} className="submitButton">
                Next
              </button>
            </div>
          )}
          {albumName.length > 0 && albumCover.length === 0 && (
            <div className="flex flex-col justify-start items-center h-fit gap-10">
              <button
                onClick={() => inputFile.current!.click()}
                className="submitButton"
              >
                Upload Album Cover
              </button>
              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={albumImageUploadHandler}
                ref={inputFile}
                style={{ display: "none" }}
              />
            </div>
          )}

          {albumImageUploaded === "pending" && (
            <div className=" rounded-md gap-2 bg-zinc-800 pb-2 pt-2 w-full flex justify-start items-center h-fit">
              <Spinner />
            </div>
          )}
          {albumImageUploaded && (
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Album Cover:</h1>
              <div className="flex justify-center items-center gap-4">
                {albumCover.map((item) => {
                  return (
                    <div
                      key={uniqid()}
                      className=" rounded-md gap-2 bg-zinc-50 p-2 w-32 flex justify-start items-center h-auto"
                    >
                      <Image
                        alt="useruploadedcontent"
                        className="h-fit"
                        src={item.imageUri}
                        width="128"
                        height="300"
                      />
                    </div>
                  );
                })}
              </div>
              {!fullAlbumUploaded && (
                <Fragment>
                  <button
                    onClick={() => fullAlbumInputFile.current!.click()}
                    className="submitButton"
                  >
                    Upload Album
                  </button>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={fullAlbumUploadHandler}
                    ref={fullAlbumInputFile}
                    style={{ display: "none" }}
                    multiple
                  />
                </Fragment>
              )}
              {fullAlbumUploaded === "pending" && (
                <div className=" rounded-md gap-2 bg-zinc-800 pb-2 pt-2 w-full flex justify-start items-center h-fit">
                  <Spinner />
                </div>
              )}
              {fullAlbumUploaded && (
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">Album:</h1>

                  <div className="flex justify-center gap-2 flex-wrap">
                    {images.map((item) => {
                      return (
                        <div
                          key={uniqid()}
                          className=" rounded-md gap-2 bg-zinc-50 p-2 w-32 flex justify-start items-center h-auto"
                        >
                          <Image
                            alt="useruploadedcontent"
                            className="h-fit"
                            src={item.imageUri}
                            width="128"
                            height="300"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          {fullAlbumUploaded && (
            <button onClick={submitAlbum} className="submitButton">
              Submit
            </button>
          )}
        </div>
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

export default CreateAlbum;

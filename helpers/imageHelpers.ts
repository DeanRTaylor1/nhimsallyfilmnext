import { image } from "../types/interfaces";
import {
  collection,
  getDocs,
  DocumentData,
  query,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const getHomeImages = async () => {
  let newArr: image[] = [];
  try {
    const images = collection(db, "homepageimages");
    const imagesSnap = await getDocs(images);
    if (!imagesSnap.empty) {
      imagesSnap.forEach((doc: DocumentData) => {
        // doc.data() is never undefined for query doc snapshots
        let obj = { id: doc.id, ...doc.data() };
        newArr.push(obj);
        return newArr;
      });
    } else {
      console.log("no such doc");
    }
    return newArr;
  } catch (err) {
    console.log(err);
  }
};

const getHomeLandScapeImages = async () => {
  let newArr: image[] = [];
  try {
    const images = collection(db, "homelandscapeslider");
    const imagesSnap = await getDocs(images);
    if (!imagesSnap.empty) {
      imagesSnap.forEach((doc: DocumentData) => {
        // doc.data() is never undefined for query doc snapshots
        let obj = { id: doc.id, ...doc.data() };
        newArr.push(obj);
        return newArr;
      });
    } else {
      console.log("no such doc");
    }
    return newArr;
  } catch (err) {
    console.log(err);
  }
};

const getGalleryImages = async () => {
  let newArr: image[] = [];
  try {
    const images = collection(db, "galleriesPage");
    const imageQuery = query(images, limit(9));
    const imagesSnap = await getDocs(imageQuery);

    if (!imagesSnap.empty) {
      imagesSnap.forEach((doc: DocumentData) => {
        // doc.data() is never undefined for query doc snapshots
        let obj = { id: doc.id, ...doc.data() };
        newArr.push(obj);
        return newArr;
      });
    } else {
      console.log("no such doc");
    }
    return newArr;
  } catch (err) {
    console.log(err);
  }
};

const getPackageImages = async (packageName: string) => {
  let newArr: any[] = [];
  try {
    const images = collection(db, "packages");
    const imageQuery = query(
      images,
      where("group", "==", packageName.toString())
    );
    const imagesSnap = await getDocs(imageQuery);

    if (!imagesSnap.empty) {
      imagesSnap.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let obj = { id: doc.id, ...doc.data() };
        newArr.push(obj);
      });

      return newArr;
    } else {
      console.log("no such doc");
    }
    return newArr;
  } catch (err) {
    console.log(err);
  }
};

const uploadImage = async (albumname: string, file: File) => {
  const filePath = `images/${albumname}/${file.name}`;
  const newImageRef = ref(getStorage(), filePath);
  const fileSnapshot = await uploadBytesResumable(newImageRef, file);
  const publicImageUrl = await getDownloadURL(newImageRef);
  return publicImageUrl;
};

const createImageURLMap = (
  albumName: string,
  array: any[],
  isAlbumCover: Boolean
) => {
  const imageObjects = array.map((item, i) => {
    return {
      imageName: `${albumName}_${i}`,
      imageUri: item,
      albumName,
      isAlbumCover: isAlbumCover ? true : false,
    };
  });
  return imageObjects;
};

const deleteImage = async (albumName: string, imageName: string) => {
  const filePath = `images/${albumName}/${imageName}`;
  const delImageRef = ref(getStorage(), filePath);
  try {
    const result = await deleteObject(delImageRef);
    console.log(result);
    return;
  } catch (err) {
    return err;
  }
};

export {
  getPackageImages,
  getHomeImages,
  getHomeLandScapeImages,
  getGalleryImages,
  uploadImage,
  createImageURLMap,
};

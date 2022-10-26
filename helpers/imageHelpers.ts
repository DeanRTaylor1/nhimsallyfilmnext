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

export {
  getPackageImages,
  getHomeImages,
  getHomeLandScapeImages,
  getGalleryImages,
};

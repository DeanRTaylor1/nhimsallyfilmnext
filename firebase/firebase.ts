import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeJNzEv4eL8jxvgTvzO3pvSuk4PxRhL-I",
  authDomain: "nhimsallyfilm.firebaseapp.com",
  projectId: "nhimsallyfilm",
  storageBucket: "nhimsallyfilm.appspot.com",
  messagingSenderId: "613080625281",
  appId: "1:613080625281:web:b4c9553e9839224a1ddd80",
  measurementId: "G-D5H0HZC134",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, app };

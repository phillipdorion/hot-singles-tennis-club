import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAK9a2KgqftnF_7OUgs5PV1cxUJ9u8ux_Q",
  authDomain: "hot-singles-tennis-club.firebaseapp.com",
  projectId: "hot-singles-tennis-club",
  storageBucket: "hot-singles-tennis-club.appspot.com",
  messagingSenderId: "255416588680",
  appId: "1:255416588680:web:b8a0e61bca14cde5d3023d",
  measurementId: "G-M4NCSGVLS5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
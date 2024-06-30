// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK9a2KgqftnF_7OUgs5PV1cxUJ9u8ux_Q",
  authDomain: "hot-singles-tennis-club.firebaseapp.com",
  projectId: "hot-singles-tennis-club",
  storageBucket: "hot-singles-tennis-club.appspot.com",
  messagingSenderId: "255416588680",
  appId: "1:255416588680:web:b8a0e61bca14cde5d3023d",
  measurementId: "G-M4NCSGVLS5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
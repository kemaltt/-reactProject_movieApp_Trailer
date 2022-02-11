// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC65swrPMnCtohyI-uXj5xAycidwt-nHAs",
  authDomain: "movie-6cfa5.firebaseapp.com",
  projectId: "movie-6cfa5",
  storageBucket: "movie-6cfa5.appspot.com",
  messagingSenderId: "844943754612",
  appId: "1:844943754612:web:674d974d58ba8523561821",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

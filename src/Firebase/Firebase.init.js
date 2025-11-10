// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLWqCUaI13_LhsBSwyOSQ3Kn0a_7V2dMU",
  authDomain: "home-nest-ef9e8.firebaseapp.com",
  projectId: "home-nest-ef9e8",
  storageBucket: "home-nest-ef9e8.firebasestorage.app",
  messagingSenderId: "760916955081",
  appId: "1:760916955081:web:8a7ae5e46072965ce8e218"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
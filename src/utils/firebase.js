import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: "AIzaSyDFjSLYQOiSTJL69Tr3IsCMCaegowwT69U",
  authDomain: "eccomerce-web-2c9cb.firebaseapp.com",
  projectId: "eccomerce-web-2c9cb",
  storageBucket: "eccomerce-web-2c9cb.appspot.com",
  messagingSenderId: "962348893228",
  appId: "1:962348893228:web:a061fb7aca1104c7f2bd89",
  measurementId: "G-16LY7W534V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {
    auth
}
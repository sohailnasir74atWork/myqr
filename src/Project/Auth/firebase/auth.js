// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import getDatabase for Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkJAocD-Z9EpiQpenx2U_rzVa_-yGyajU",
  authDomain: "generateqrcode-f9040.firebaseapp.com",
  projectId: "generateqrcode-f9040",
  storageBucket: "generateqrcode-f9040.appspot.com",
  messagingSenderId: "766468408092",
  appId: "1:766468408092:web:eea3d328f4956e961030d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Initialize Realtime Database with the Firebase app

export { app, auth, database }; // Export database reference for use in other parts of your application

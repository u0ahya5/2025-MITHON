// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ2_HU16GD_BeAvCfd6Cujn9VBFvJHe5Y",
  authDomain: "miton2025-3ab29.firebaseapp.com",
  projectId: "miton2025-3ab29",
  storageBucket: "miton2025-3ab29.firebasestorage.app",
  messagingSenderId: "600100135913",
  appId: "1:600100135913:web:8ae12e9ee20e409771e178",
  measurementId: "G-845LT17PSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app); 

export { db, doc, getDoc, setDoc };
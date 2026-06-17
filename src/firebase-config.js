// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuUNHiReotqm1Zn-LKXQ_eY4bwC9Iz1DM",
  authDomain: "chatapp-96e3b.firebaseapp.com",
  projectId: "chatapp-96e3b",
  storageBucket: "chatapp-96e3b.firebasestorage.app",
  messagingSenderId: "978336931624",
  appId: "1:978336931624:web:befa4f32aee39d9711fa1d",
  measurementId: "G-90NM6Q4N4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth =  getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
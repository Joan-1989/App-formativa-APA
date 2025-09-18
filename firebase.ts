// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcGWP_CjMNHE7T3fDIdtByjx7HRObhDPY",
  authDomain: "app-formativa-apa.firebaseapp.com",
  projectId: "app-formativa-apa",
  storageBucket: "app-formativa-apa.firebasestorage.app",
  messagingSenderId: "765337791019",
  appId: "1:765337791019:web:2035652cfcdad827e7186e",
  measurementId: "G-T6SMKC08XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
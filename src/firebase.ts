// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const analytics = getAnalytics(app);
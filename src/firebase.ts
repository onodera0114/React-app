import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyCVN_mx9RNImUkZke8yidvgQ28AF4wXB0U",
  // authDomain: "react-app-54556.firebaseapp.com",
  // projectId: "react-app-54556",
  // storageBucket: "react-app-54556.appspot.com",
  // messagingSenderId: "588254355945",
  // appId: "1:588254355945:web:0b237c6cbc3edd44aceb78"
  apiKey: "AIzaSyBs56VFKz3FZRVGFDRQFGtR7CgHdZ1xKfc",
  authDomain: "react-app-cb220.firebaseapp.com",
  projectId: "react-app-cb220",
  storageBucket: "react-app-cb220.appspot.com",
  messagingSenderId: "710824245677",
  appId: "1:710824245677:web:2a5cc1440271e758f44924",
  measurementId: "G-67GE0M5ZYS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVN_mx9RNImUkZke8yidvgQ28AF4wXB0U",
  authDomain: "react-app-54556.firebaseapp.com",
  projectId: "react-app-54556",
  storageBucket: "react-app-54556.appspot.com",
  messagingSenderId: "588254355945",
  appId: "1:588254355945:web:0b237c6cbc3edd44aceb78"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaJTgppgheFspm91EI1lbtkY5jH617oGg",
  authDomain: "crowdflix.firebaseapp.com",
  projectId: "crowdflix",
  storageBucket: "crowdflix.appspot.com",
  messagingSenderId: "470017780656",
  appId: "1:470017780656:web:c0049ad827413bbcf1c475",
  measurementId: "G-0QTW1D316J",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

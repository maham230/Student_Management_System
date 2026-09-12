import { initializeApp } from "firebase/app";

import { 
  getFirestore 
} from "firebase/firestore";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";


const firebaseConfig = {

  apiKey: "AIzaSyAZEHV27wYTImuA3OLGhJDwPZDsdpa2nzk",

  authDomain: "studentmanagement-53fb5.firebaseapp.com",

  projectId: "studentmanagement-53fb5",

  storageBucket: "studentmanagement-53fb5.firebasestorage.app",

  messagingSenderId: "618185529153",

  appId: "1:618185529153:web:67a9746b9226037bd8b3c0"

};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);


export const auth = getAuth(app);


export const googleProvider = new GoogleAuthProvider();
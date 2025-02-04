// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk8nCHajn1WMTHiOqZ0egnyhYJYIDRyS4",
  authDomain: "assignment-11-3ff15.firebaseapp.com",
  projectId: "assignment-11-3ff15",
  storageBucket: "assignment-11-3ff15.firebasestorage.app",
  messagingSenderId: "302391516250",
  appId: "1:302391516250:web:5d6a514c271710bf13cc63",
  measurementId: "G-2RYNBQ3CKP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
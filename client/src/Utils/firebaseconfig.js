// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCBMM2Rc2rcPQWnWtvYgc7ey9ZJTiXq2Ss",
  authDomain: "new-project-codenicely.firebaseapp.com",
  projectId: "new-project-codenicely",
  storageBucket: "new-project-codenicely.firebasestorage.app",
  messagingSenderId: "535968116765",
  appId: "1:535968116765:web:73a117b52ca6237a4e16f4",
  measurementId: "G-JBRJZQ61DE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
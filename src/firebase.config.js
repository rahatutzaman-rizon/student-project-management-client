// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTjMDa4wV6-YAqTq_HFQNiCy360eJENA0",
  authDomain: "student-project-manageme-51269.firebaseapp.com",
  projectId: "student-project-manageme-51269",
  storageBucket: "student-project-manageme-51269.appspot.com",
  messagingSenderId: "804916433560",
  appId: "1:804916433560:web:ecd9dbb2b3b1f46a5c76ed"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
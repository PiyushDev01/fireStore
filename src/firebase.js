// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLYAKSmfkHL-dzj6-Hrp8sStDw4rFOmr0",
  authDomain: "my-first-firebase-projec-d3053.firebaseapp.com",
  projectId: "my-first-firebase-projec-d3053",
  storageBucket: "my-first-firebase-projec-d3053.appspot.com",
  messagingSenderId: "26477065762",
  appId: "1:26477065762:web:3ac0908a6c422626a27c7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db }
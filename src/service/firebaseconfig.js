// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3wro2-XQFrW554lUh4hm6J1CJqTa8BLs",
  authDomain: "ai-trip-debec.firebaseapp.com",
  projectId: "ai-trip-debec",
  storageBucket: "ai-trip-debec.firebasestorage.app",
  messagingSenderId: "32347547052",
  appId: "1:32347547052:web:1cdd8ca47f8b6724814609",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

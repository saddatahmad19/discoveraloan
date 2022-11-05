// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCycPa7z02TzYXq3uLgktbSzHlcBycsBy8",
  authDomain: "demonhacks-c5b4c.firebaseapp.com",
  projectId: "demonhacks-c5b4c",
  storageBucket: "demonhacks-c5b4c.appspot.com",
  messagingSenderId: "319775844862",
  appId: "1:319775844862:web:42440ad1cb0d42d5b478af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

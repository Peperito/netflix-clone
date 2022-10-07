// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_FIREBASE_KEY,
  authDomain: "netflix-clone-vincep.firebaseapp.com",
  projectId: "netflix-clone-vincep",
  storageBucket: "netflix-clone-vincep.appspot.com",
  messagingSenderId: "697758410357",
  appId: process.env.NEXT_PUBLIC_API_FIREBASE_APP_ID,
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
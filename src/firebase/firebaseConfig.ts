import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPOs-xa_IbuFaZpmoiGKYddjgBxFo2oUs",
  authDomain: "promptopia-c2eec.firebaseapp.com",
  projectId: "promptopia-c2eec",
  storageBucket: "promptopia-c2eec.appspot.com",
  messagingSenderId: "107330345531",
  appId: "1:107330345531:web:6208553519844ed9679a1e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const storage = getStorage(app);
export const db = getFirestore(app);

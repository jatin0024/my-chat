// source/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAk2XPCh6oDccWRk3vzvlUQAFqYvPOMDtA",
  authDomain: "chat-ac2f8.firebaseapp.com",
  projectId: "chat-ac2f8",
  storageBucket: "chat-ac2f8.firebasestorage.app",
  messagingSenderId: "596293060705",
  appId: "1:596293060705:web:88cae0eb2dd28268098220"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { serverTimestamp };

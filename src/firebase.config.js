import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhKrJtVqJOGWbNV4qV8AYN6fO68n8qakI",
  authDomain: "byte-bazaar-da07e.firebaseapp.com",
  projectId: "byte-bazaar-da07e",
  storageBucket: "byte-bazaar-da07e.appspot.com",
  messagingSenderId: "676345995455",
  appId: "1:676345995455:web:4218b49ec5f4ec43afa60a",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

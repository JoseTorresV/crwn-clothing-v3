import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChiWGe-Umc3oqB23E699nyq8EvYfGdstM",
  authDomain: "crwn-clothing-db-c037e.firebaseapp.com",
  projectId: "crwn-clothing-db-c037e",
  storageBucket: "crwn-clothing-db-c037e.appspot.com",
  messagingSenderId: "618014711879",
  appId: "1:618014711879:web:f6e1eb80f1ebd8947d1162",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

// auth comunicate with google
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// creazione del DB
export const db = getFirestore();

// we need to see if there is a document
// 1: db, 2 is collection name and 3 is going to be the IDENTIFIER
// const userDocRef = doc(db, 'users', 'NikeAirMax')
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  // here there are differents ways to check data but remains a ref
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);

  // if user data doest not exists
  // create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  // if user data exists
  // return userSnapshot
  return userDocRef;
};

// console.log(userSnapshot);

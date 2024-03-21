
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDFk88m77qwuwlaORrmBgOMKrP-RIbXk18",
    authDomain: "mynetflixclone-e170b.firebaseapp.com",
    projectId: "mynetflixclone-e170b",
    storageBucket: "mynetflixclone-e170b.appspot.com",
    messagingSenderId: "1077861574290",
    appId: "1:1077861574290:web:cd8f58ba1782ee3c89684b",
    measurementId: "G-1DYKRN4QX7"
  };

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const auth=getAuth(firebaseapp)
const firestore = getFirestore(firebaseapp);

const storage=getStorage(firebaseapp)

export {firebaseapp,auth,firestore,storage};

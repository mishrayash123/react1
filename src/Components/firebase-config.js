import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA4p5RaLFFAQRiXpcLnw3qwmJRR6fugQHk",
    authDomain: "react1-87c60.firebaseapp.com",
    projectId: "react1-87c60",
    storageBucket: "react1-87c60.appspot.com",
    messagingSenderId: "706767032177",
    appId: "1:706767032177:web:ce187c22a7ce9d34f6b0d0",
    measurementId: "G-YS67KTRRCL"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth(app);

export {auth,db};
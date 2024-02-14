import { initializeApp } from "firebase/app";
import firebase from "firebase/app"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyD_NK-tPRcFOFZyRPtdUmCMaf11ekRvvG0",
  authDomain: "dinamico-tech-store.firebaseapp.com",
  projectId: "dinamico-tech-store",
  storageBucket: "dinamico-tech-store.appspot.com",
  messagingSenderId: "577959119146",
  appId: "1:577959119146:web:5efe86576109b33ac17653",
  measurementId: "G-WJCC2BXS43"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
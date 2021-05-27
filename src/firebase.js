import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyADEeJQXrOYxNz9EaCKQoUHQu3YaFECATI",
    authDomain: "instagram-clone-fb2e5.firebaseapp.com",
    databaseURL: "https://instagram-clone-fb2e5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "instagram-clone-fb2e5",
    storageBucket: "instagram-clone-fb2e5.appspot.com",
    messagingSenderId: "820715069641",
    appId: "1:820715069641:web:b05808c2197dfaa2dfed18",
    measurementId: "G-2D0D1MBBR9"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

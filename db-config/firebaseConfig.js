import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCGCGupsImaS602ggfP27hVwy9MVSEiBo4",
    projectId: "nexdor-9188f",
    appId:"1:27579841865:web:d4355e6e8f5c68158aae98"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZ25B8OCVEVAT1hBNFRL0yROQEZ_5EmlM",
  authDomain: "graduation-ceremony-90084.firebaseapp.com",
  projectId: "graduation-ceremony-90084",
  storageBucket: "graduation-ceremony-90084.firebasestorage.app",
  messagingSenderId: "228383863571",
  appId: "1:228383863571:web:a7232dd11e7f2d6d3d20e6",
  measurementId: "G-NJ50NLPS38"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const form = document.getElementById("wishForm");

const wishList = document.getElementById("wishList");

async function loadWishes() {
    wishList.innerHTML = "";

    const q = query(
        collection(db, "wishes"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((doc) => {
        const data = doc.data();

        wishList.innerHTML += `
            <div class="wish-item">
                <strong>${data.name}</strong>
                <p>${data.message}</p>
            </div>
        `;
    });
}

loadWishes();

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    const message = document.getElementById("message").value.trim();

    if (!name || !message) return;

    await addDoc(collection(db, "wishes"), {
        name,
        message,
        createdAt: Date.now()
    });

    form.reset();

    loadWishes();
});
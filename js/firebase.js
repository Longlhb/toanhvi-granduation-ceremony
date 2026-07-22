import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDZ25B8OCVEVAT1hBNFRL0yROQEZ_5EmlM",
    authDomain: "graduation-ceremony-90084.firebaseapp.com",
    projectId: "graduation-ceremony-90084",
    storageBucket: "graduation-ceremony-90084.firebasestorage.app",
    messagingSenderId: "228383863571",
    appId: "1:228383863571:web:a7232dd11e7f2d6d3d20e6",
    measurementId: "G-NJ50NLPS38",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const submitBtn = document.getElementById("submitBtn");
const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const wishesContainer = document.getElementById("wishesContainer");

/* ======================
   GỬI LỜI CHÚC
====================== */

submitBtn.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    try {
        await addDoc(collection(db, "wishes"), {
            name,
            message,
            createdAt: serverTimestamp(),
        });

        nameInput.value = "";
        messageInput.value = "";
    } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra!");
    }
});

/* ======================
   HIỂN THỊ LỜI CHÚC
====================== */

const q = query(collection(db, "wishes"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
    wishesContainer.innerHTML = "";

    snapshot.forEach((doc) => {
        const data = doc.data();

        let timeText = "Vừa xong";

        if (data.createdAt?.toDate) {
            timeText = data.createdAt.toDate().toLocaleString("vi-VN");
        }

        const wish = document.createElement("div");

        wish.className = "wish-card";

        wish.innerHTML = `
            <div class="firework"></div>

            <div class="wish-header">

                <div class="wish-avatar">
                    👩‍🎓
                </div>

                <div class="wish-content">

                <div class="wish-name">
                    ${data.name}
                </div>

                <div class="wish-time">
                    ${timeText}
                </div>

                <div class="wish-message">
                ${data.message}
                </div>

            </div>

        </div>
        `;

        wishesContainer.appendChild(wish);
    });
});

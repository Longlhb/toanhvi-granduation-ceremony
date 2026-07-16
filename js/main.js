// ===============================
// FIX BACK BUTTON + PAGE TRANSITION
// ===============================

window.addEventListener("pageshow", function (event) {
    document.body.classList.remove("page-exit");

    document.body.style.opacity = "1";

    // Fix khi back browser
    if (event.persisted) {
        window.scrollTo(0, window.scrollY);
    }
});

// ===============================
// SCROLL TO LETTER
// ===============================

const openLetterBtn = document.querySelector("#openLetterBtn");
const letter = document.querySelector("#letter");

if (openLetterBtn && letter) {
    openLetterBtn.addEventListener("click", () => {
        letter.scrollIntoView({
            behavior: "smooth",
        });
    });
}

// ===============================
// COUNTDOWN
// ===============================

const days = document.querySelector("#days");
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

if (days && hours && minutes && seconds) {
    const targetDate = new Date("July 23, 2026 15:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();

        const distance = targetDate - now;

        days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));

        hours.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        minutes.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        seconds.textContent = Math.floor((distance % (1000 * 60)) / 1000);
    }

    updateCountdown();

    setInterval(updateCountdown, 1000);
}

// ===============================
// MUSIC
// GIỮ NHẠC KHI CHUYỂN TRANG
// ===============================

const musicBtn = document.querySelector("#musicBtn");

const bgMusic = document.querySelector("#bgMusic");

if (musicBtn && bgMusic) {
    let isPlaying = sessionStorage.getItem("musicState") !== "pause";

    const savedTime = sessionStorage.getItem("musicTime");

    bgMusic.volume = 0.65;

    if (savedTime) {
        bgMusic.currentTime = Number(savedTime);
    }

    function playMusic() {
        if (!isPlaying) return;

        bgMusic
            .play()

            .then(() => {
                musicBtn.textContent = "🔊";
            })

            .catch(() => {
                musicBtn.textContent = "🎵";
            });
    }

    window.addEventListener("load", playMusic);

    window.addEventListener("pageshow", () => {
        const time = sessionStorage.getItem("musicTime");

        if (time) {
            bgMusic.currentTime = Number(time);
        }

        playMusic();
    });

    setInterval(() => {
        if (!bgMusic.paused) {
            sessionStorage.setItem("musicTime", bgMusic.currentTime);
        }
    }, 500);

    musicBtn.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play();

            isPlaying = true;

            sessionStorage.setItem("musicState", "play");

            musicBtn.textContent = "🔊";
        } else {
            bgMusic.pause();

            isPlaying = false;

            sessionStorage.setItem("musicState", "pause");

            musicBtn.textContent = "🎵";
        }
    });
}

// ===============================
// FIREWORKS
// ===============================

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function launchFireworks() {
    if (typeof confetti === "undefined") return;

    const duration = 4000;

    const end = Date.now() + duration;

    const defaults = {
        startVelocity: 25,

        spread: 360,

        ticks: 80,

        zIndex: 9999,
    };

    const timer = setInterval(() => {
        const time = end - Date.now();

        if (time <= 0) {
            clearInterval(timer);

            return;
        }

        const count = 50 * (time / duration);

        confetti({
            ...defaults,

            particleCount: count,

            origin: {
                x: randomInRange(0.1, 0.3),
                y: Math.random() - 0.2,
            },
        });

        confetti({
            ...defaults,

            particleCount: count,

            origin: {
                x: randomInRange(0.7, 0.9),
                y: Math.random() - 0.2,
            },
        });
    }, 250);
}

window.addEventListener("load", () => {
    if (typeof confetti !== "undefined") {
        launchFireworks();

        setInterval(launchFireworks, 5000);
    }
});

// ====================== LIGHTBOX FIXED ======================
// ======================
// LIGHTBOX FIXED
// ======================

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightboxImg");

const closeBtn = document.querySelector(".lightbox-close");

if (galleryImages.length > 0 && lightbox && lightboxImg && closeBtn) {
    galleryImages.forEach((img) => {
        img.addEventListener("click", () => {
            const imageSrc = img.getAttribute("src");

            // Load ảnh trước tránh màn hình đen

            const preload = new Image();

            preload.src = imageSrc;

            preload.onload = () => {
                lightboxImg.setAttribute("src", imageSrc);

                lightboxImg.setAttribute("alt", img.alt);

                lightbox.classList.add("show");

                document.body.style.overflow = "hidden";
            };
        });
    });

    function closeLightbox() {
        lightbox.classList.remove("show");

        lightboxImg.setAttribute("src", "");

        document.body.style.overflow = "";
    }

    // Nút X

    closeBtn.addEventListener("click", closeLightbox);

    // Click nền đen

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // ESC

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });
}

// ===============================
// PAGE TRANSITION
// ===============================

document.querySelectorAll(".menu-section a").forEach((link) => {
    const url = link.getAttribute("href");

    if (url && url.endsWith(".html")) {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            document.body.classList.add("page-exit");

            setTimeout(() => {
                window.location.assign(url);
            }, 300);
        });
    }
});

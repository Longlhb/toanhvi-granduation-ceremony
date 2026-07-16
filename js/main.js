// SCROLL TO LETTER
const openLetterBtn = document.querySelector("#openLetterBtn");
const letter = document.querySelector("#letter");

openLetterBtn.addEventListener("click", () => {
    letter.scrollIntoView({ behavior: "smooth" });
});

// COUNTDOWN
const targetDate = new Date("July 23, 2026 15:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = hours;
    document.querySelector("#minutes").textContent = minutes;
    document.querySelector("#seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ====================================
// MUSIC - TỰ ĐỘNG BẬT + BẬT/TẮT BẰNG ICON
// ====================================
const musicBtn = document.querySelector("#musicBtn");
const bgMusic = document.querySelector("#bgMusic");

let isPlaying = true; // Mặc định là đang bật

// Tự động phát nhạc khi vào trang
window.addEventListener("load", () => {
    bgMusic.volume = 0.65;
    bgMusic.play().catch(() => {
        isPlaying = false;
        musicBtn.textContent = "🎵"; // Nếu bị chặn thì hiện icon bật
    });

    musicBtn.textContent = "🔊"; // Icon đang bật
});

// Xử lý click vào icon
musicBtn.addEventListener("click", () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = "🎵"; // Icon tắt
        isPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.textContent = "🔊"; // Icon bật
        isPlaying = true;
    }
});

// ====================================
// FIREWORKS - TỰ ĐỘNG + LẶP LẠI MỖI 5 GIÂY
// ====================================
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function launchFireworks() {
    const duration = 4000;
    const animationEnd = Date.now() + duration;

    const defaults = {
        startVelocity: 25,
        spread: 360,
        ticks: 80,
        zIndex: 9999,
    };

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            clearInterval(interval);
            return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });

        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
    }, 250);
}

window.addEventListener("load", () => {
    launchFireworks();
    setInterval(launchFireworks, 5000);
});

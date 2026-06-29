// --- 1. DYNAMIC TYPING ANIMATION ---
const words = ["Front-End Development.", "Creative Multimedia Design.", "Professional Photography."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTextSpan = document.getElementById("typing-text");

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, isDeleting ? 40 : 80);
}

document.addEventListener("DOMContentLoaded", () => {
    if(typingTextSpan) setTimeout(type, 1000);
});

// --- 2. DARK / LIGHT THEME TOGGLE ---
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");

themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme !== "light") {
        document.documentElement.setAttribute("data-theme", "light");
        themeIcon.className = "fas fa-sun";
    } else {
        document.documentElement.removeAttribute("data-theme");
        themeIcon.className = "fas fa-moon";
    }
});

// --- 3. MOBILE BURGER MENU ---
const mobileMenuBtn = document.getElementById("mobile-menu");
const navLinksContainer = document.getElementById("nav-links");

mobileMenuBtn.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
    mobileMenuBtn.querySelector("i").classList.toggle("fa-bars");
    mobileMenuBtn.querySelector("i").classList.toggle("fa-times");
});

// --- 4. SCROLL ACTIVE LINK HIGHLIGHT ---
window.addEventListener("scroll", () => {
    let currentSection = "";
    document.querySelectorAll("section").forEach(section => {
        if (window.scrollY >= (section.offsetTop - 200)) {
            currentSection = section.getAttribute("id");
        }
    });
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSection)) link.classList.add("active");
    });
});

// --- 5. CONTACT FORM ---
const contactForm = document.getElementById('premiumContactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('user-name').value;
        const interest = document.getElementById('user-interest').value;
        const message = document.getElementById('user-message').value;
        window.location.href = `mailto:ompatel28107@gmail.com?subject=Inquiry from ${name}&body=Interest: ${interest}%0D%0AMessage: ${message}`;
        contactForm.reset();
        const successMsg = document.getElementById('formSuccessMessage');
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 5000);
    });
}

// --- 6. CUSTOM CURSOR (Final Fix) ---
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    if(cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

document.querySelectorAll('a, button, .project-card, .btn').forEach(item => {
    item.addEventListener('mouseover', () => cursor?.classList.add('cursor-hover'));
    item.addEventListener('mouseleave', () => cursor?.classList.remove('cursor-hover'));
}
// --- 1. DYNAMIC TYPING ANIMATION ---
const words = ["Front-End Development.", "Creative Multimedia Design.", "Professional Photography."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingTextSpan = document.getElementById("typing-text");

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, isDeleting ? 40 : 80);
}

document.addEventListener("DOMContentLoaded", () => {
    if(typingTextSpan) setTimeout(type, 1000);
});

// --- 2. DARK / LIGHT THEME TOGGLE ---
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = themeToggleBtn.querySelector("i");

themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme !== "light") {
        document.documentElement.setAttribute("data-theme", "light");
        themeIcon.className = "fas fa-sun";
    } else {
        document.documentElement.removeAttribute("data-theme");
        themeIcon.className = "fas fa-moon";
    }
});

// --- 3. MOBILE BURGER MENU ---
const mobileMenuBtn = document.getElementById("mobile-menu");
const navLinksContainer = document.getElementById("nav-links");

mobileMenuBtn.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
    mobileMenuBtn.querySelector("i").classList.toggle("fa-bars");
    mobileMenuBtn.querySelector("i").classList.toggle("fa-times");
});

// --- 4. SCROLL ACTIVE LINK HIGHLIGHT ---
window.addEventListener("scroll", () => {
    let currentSection = "";
    document.querySelectorAll("section").forEach(section => {
        if (window.scrollY >= (section.offsetTop - 200)) {
            currentSection = section.getAttribute("id");
        }
    });
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(currentSection)) link.classList.add("active");
    });
});

// --- 5. CONTACT FORM ---
const contactForm = document.getElementById('premiumContactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('user-name').value;
        const interest = document.getElementById('user-interest').value;
        const message = document.getElementById('user-message').value;
        window.location.href = `mailto:ompatel28107@gmail.com?subject=Inquiry from ${name}&body=Interest: ${interest}%0D%0AMessage: ${message}`;
        contactForm.reset();
        const successMsg = document.getElementById('formSuccessMessage');
        successMsg.style.display = 'block';
        setTimeout(() => successMsg.style.display = 'none', 5000);
    });
}

// --- 6. CUSTOM CURSOR (Final Fix) ---
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    if(cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

document.querySelectorAll('a, button, .project-card, .btn').forEach(item => {
    item.addEventListener('mouseover', () => cursor?.classList.add('cursor-hover'));
    item.addEventListener('mouseleave', () => cursor?.classList.remove('cursor-hover'));
>>>>>>> e368d41cc7c53a12151146185f5af81f349c7be3
});
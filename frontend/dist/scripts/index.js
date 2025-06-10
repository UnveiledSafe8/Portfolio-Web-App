import { theme } from "./theme.js";
const videoBg = document.querySelector(".video-bg");
fetch('/videos')
    .then(res => res.json())
    .then((videoSources) => {
    let currVideoIndex = 0;
    function playVideo(index) {
        if (!videoBg)
            return;
        videoBg.src = `/frontend/dist/assets/videos/${videoSources[index]}`;
        videoBg.load();
        videoBg.play();
    }
    playVideo(currVideoIndex);
    videoBg?.addEventListener("ended", () => {
        currVideoIndex = (currVideoIndex + 1) % videoSources.length;
        playVideo(currVideoIndex);
    });
});
const title = document.querySelector("#landing-content h1");
const subTitle = document.querySelector("#landing-content p");
const titleText = title?.textContent || "";
const subTitleText = subTitle?.textContent || "";
let index = 0;
function typeLandingContent() {
    if (index < titleText.length) {
        title.textContent += titleText[index];
        setTimeout(typeLandingContent, 120);
    }
    else if (index - titleText.length < subTitleText.length) {
        subTitle.textContent += subTitleText[index - titleText.length];
        setTimeout(typeLandingContent, 75);
    }
    else {
        return;
    }
    index++;
}
title.textContent = "";
subTitle.textContent = "";
setTimeout(typeLandingContent, 300);
function addHoverReveal(sectionId, link) {
    const heading = document.querySelector(`#${sectionId} .section-heading`);
    const content = document.querySelector(`#${sectionId} .section-content`);
    const section = document.getElementById(sectionId);
    content.style.opacity = "0";
    section.addEventListener("mouseenter", () => {
        section.style.background = theme.secondary;
        heading.style.opacity = "0";
        content.style.opacity = "1";
    });
    section.addEventListener("mouseleave", () => {
        section.style.background = theme.secondaryDark;
        heading.style.opacity = "1";
        content.style.opacity = "0";
    });
    section.addEventListener("click", () => {
        if (sectionId === "resume") {
            window.location.href = "/resume";
        }
        else {
            window.location.href = link;
        }
    });
}
addHoverReveal("resume", "");
addHoverReveal("more-projects", "https://github.com/UnveiledSafe8");
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    header.style.opacity = window.scrollY > window.innerHeight * 0.6 ? "1" : "0";
});
const sectionRatios = new Map();
const navLinks = document.querySelectorAll("nav ul li a");
const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        sectionRatios.set(entry.target.id, entry.intersectionRatio);
    });
    let maxRatio = 0;
    let activeSection = null;
    for (const [id, ratio] of sectionRatios) {
        if (ratio > maxRatio) {
            maxRatio = ratio;
            activeSection = id;
        }
    }
    navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href")?.slice(1);
        const highlight = link.children[link.children.length - 1];
        if (linkHref === activeSection && activeSection !== "resume" && activeSection !== "more-projects") {
            highlight.style.background = theme.secondary;
        }
        else if (activeSection !== "resume" && activeSection !== "more-projects") {
            highlight.style.background = theme.neutral;
        }
    });
}, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) });
document.querySelectorAll("section").forEach(section => {
    navObserver.observe(section);
});
navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        link.children[0].style.opacity = "1";
        link.children[1].style.transform = "scale(1.25)";
    });
    link.addEventListener("mouseleave", () => {
        link.children[0].style.opacity = "0";
        link.children[1].style.transform = "scale(1)";
    });
});
const formSubmitButton = document.querySelector("button[type='submit']");
formSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const formName = document.getElementById("name").value;
    const formEmail = document.getElementById("email").value;
    const formSubject = document.getElementById("subject").value;
    const formMessage = document.getElementById("message").value;
    if (!formName) {
        alert("Name Required");
        return;
    }
    else if (!formEmail.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)) {
        alert("Invalid Email");
        return;
    }
    else if (!formSubject) {
        alert("Subject Required");
        return;
    }
    else if (!formMessage) {
        alert("Message Required");
        return;
    }
    fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: formName,
            email: formEmail,
            subject: formSubject,
            content: formMessage
        })
    })
        .then(res => res.json());
});

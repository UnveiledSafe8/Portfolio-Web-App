"use strict";
const primaryColor = "#7F00FF";
const primaryDark = "#5900B3";
const primaryLight = "#B266FF";
const secondaryColor = "#D4AF37";
const secondaryDark = "#A17F27";
const textPrimary = "#F0F0F5";
const textSecondary = "#9696A0";
const bg1Color = "#121219";
const bg2Color = "#1F1F29";
const successColor = "#4CAF50";
const errorColor = "#E53935";
const videoBg = document.querySelector(".video-bg");
let projectVideoURL;
videoBg.src = "/frontend/dist/assets/videos/test-video-1080p.mp4";
videoBg.play();
const title = document.querySelector("#landing-content h1");
const subTitle = document.querySelector("#landing-content p");
let index = 0;
function typeLandingContent() {
    if (index < titleText.length) {
        title.textContent += titleText[index];
        setTimeout(typeLandingContent, 100);
    }
    else if (index - titleText.length < subTitleText.length) {
        subTitle.textContent += subTitleText[index - titleText.length];
        setTimeout(typeLandingContent, 100);
    }
    index++;
}
const titleText = title.textContent;
const subTitleText = subTitle.textContent;
title.textContent = "";
subTitle.textContent = "";
setTimeout(typeLandingContent, 200);
const resumeHeading = document.querySelector("#resume .section-heading");
const resumeDownload = document.querySelector("#resume .section-content");
const resumeSection = document.getElementById("resume");
resumeDownload.style.opacity = 0;
resumeSection.addEventListener("mouseenter", () => {
    resumeSection.style.background = secondaryColor;
    resumeHeading.style.opacity = 0;
    resumeDownload.style.opacity = 1;
});
resumeSection.addEventListener("mouseleave", () => {
    resumeSection.style.background = secondaryDark;
    resumeHeading.style.opacity = 1;
    resumeDownload.style.opacity = 0;
});
resumeSection.addEventListener("click", () => {
    fetch("/resume", {
        method: "GET"
    });
});
const moreProjectsHeading = document.querySelector("#more-projects .section-heading");
const moreProjectsDownload = document.querySelector("#more-projects .section-content");
const moreProjectsSection = document.getElementById("more-projects");
moreProjectsDownload.style.opacity = 0;
moreProjectsSection.addEventListener("mouseenter", () => {
    moreProjectsSection.style.background = secondaryColor;
    moreProjectsHeading.style.opacity = 0;
    moreProjectsDownload.style.opacity = 1;
});
moreProjectsSection.addEventListener("mouseleave", () => {
    moreProjectsSection.style.background = secondaryDark;
    moreProjectsHeading.style.opacity = 1;
    moreProjectsDownload.style.opacity = 0;
});
moreProjectsSection.addEventListener("click", () => {
    window.location.href = "https://github.com/UnveiledSafe8";
});
const contactButton = document.querySelector("#contact button");
contactButton.addEventListener("click", (e) => {
    e.preventDefault();
});

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

fetch('/videos')
  .then(res => res.json())
  .then(videoSources => {
    let currVideoIndex = 0;
    function playVideo(index) {
      videoBg.src = `/frontend/dist/assets/videos/${videoSources[index]}`;
      videoBg.load();
      videoBg.play();
    }

    playVideo(currVideoIndex);
    videoBg.addEventListener("ended", () => {
      currVideoIndex = (currVideoIndex + 1) % videoSources.length;
      playVideo(currVideoIndex);
    });
  });

const title = document.querySelector("#landing-content h1");
const subTitle = document.querySelector("#landing-content p");

let index = 0;
function typeLandingContent() {
    if (index < titleText.length) {
        title.textContent += titleText[index];
        setTimeout(typeLandingContent, 100);
    } else if (index - titleText.length < subTitleText.length) {
        subTitle.textContent += subTitleText[index-titleText.length];
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
    })
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

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    if (scrollPos > window.innerHeight * 0.6) {
        header.style.opacity = 1;
    } else {
        header.style.opacity = 0;
    }
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
        const linkHref = link.getAttribute("href").slice(1,);

        if (linkHref === activeSection && activeSection !== "resume" && activeSection !== "more-projects") {
            link.children[link.children.length - 1].style.background = secondaryColor;
        } else if (activeSection !== "resume" && activeSection !== "more-projects") {
            link.children[link.children.length - 1].style.background = "#77777777";
        }
    })
}, {threshold: Array.from({length: 101}, (_, i) => i / 100)});

document.querySelectorAll("section").forEach(section => {
    navObserver.observe(section);
});

navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        link.children[0].style.opacity = 1;
        link.children[1].style.transform = "scale(1.25)";
    });

    link.addEventListener("mouseleave", () => {
        link.children[0].style.opacity = 0;
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

    if (formName === "") {
        alert("Name Required");
    } else if (!formEmail.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)) {
        alert("Invalid Email");
    } else if (formSubject === "") {
        alert("Subject Required");
    } else if (formMessage === "") {
        alert("Message Required");
    }
});
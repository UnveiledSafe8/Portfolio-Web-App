import { theme } from "./theme.js";

const videoBg = document.querySelector<HTMLVideoElement>(".video-bg");

fetch('/videos')
  .then(res => res.json())
  .then((videoSources: string[]) => {
    let currVideoIndex = 0;
    function playVideo(index: number) {
        if(!videoBg) return;
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

const title = document.querySelector<HTMLHeadingElement>("#landing-content h1")!;
const subTitle = document.querySelector<HTMLParagraphElement>("#landing-content p")!;
const titleText = title?.textContent || "";
const subTitleText = subTitle?.textContent || "";

let index: number = 0;

function typeLandingContent(): void {
    if (index < titleText.length) {
        title.textContent += titleText[index];
        setTimeout(typeLandingContent, 120);
    } else if (index - titleText.length < subTitleText.length) {
        subTitle.textContent += subTitleText[index-titleText.length];
        setTimeout(typeLandingContent, 75);
    } else {return;}

    index++;
}

title.textContent = "";
subTitle.textContent = "";
setTimeout(typeLandingContent, 300);



function addHoverReveal(sectionId: string, link: string) {
  const heading = document.querySelector<HTMLElement>(`#${sectionId} .section-heading`)!;
  const content = document.querySelector<HTMLElement>(`#${sectionId} .section-content`)!;
  const section = document.getElementById(sectionId)!;
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
    } else {
      window.location.href = link;
    }
  });

}

addHoverReveal("resume", "");
addHoverReveal("more-projects", "https://github.com/UnveiledSafe8");

const header = document.querySelector<HTMLElement>("header")!;

window.addEventListener("scroll", () => {
    header.style.opacity = window.scrollY > window.innerHeight * 0.6 ? "1": "0";
});

const sectionRatios = new Map<string, number>();
const navLinks = document.querySelectorAll<HTMLAnchorElement>("nav ul li a");

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        sectionRatios.set(entry.target.id, entry.intersectionRatio);
    });

    let maxRatio = 0;
    let activeSection: string | null = null;

    for (const [id, ratio] of sectionRatios) {
        if (ratio > maxRatio) {
            maxRatio = ratio;
            activeSection = id;
        }
    }

    navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href")?.slice(1,);
        const highlight = link.children[link.children.length - 1] as HTMLElement;

        if (linkHref === activeSection && activeSection !== "resume" && activeSection !== "more-projects") {
            highlight.style.background = theme.secondary;
        } else if (activeSection !== "resume" && activeSection !== "more-projects") {
            highlight.style.background = theme.neutral;
        }
    })
}, {threshold: Array.from({length: 101}, (_, i) => i / 100)});

document.querySelectorAll("section").forEach(section => {
    navObserver.observe(section);
});

navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        (link.children[0] as HTMLElement).style.opacity = "1";
        (link.children[1] as HTMLElement).style.transform = "scale(1.25)";
    });

    link.addEventListener("mouseleave", () => {
        (link.children[0] as HTMLElement).style.opacity = "0";
        (link.children[1] as HTMLElement).style.transform = "scale(1)";
    });
});

const formSubmitButton = document.querySelector<HTMLButtonElement>("button[type='submit']")!;

formSubmitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const formName = (document.getElementById("name") as HTMLInputElement).value;
    const formEmail = (document.getElementById("email") as HTMLInputElement).value;
    const formSubject = (document.getElementById("subject") as HTMLInputElement).value;
    const formMessage = (document.getElementById("message") as HTMLTextAreaElement).value;

    if (!formName) {
        alert("Name Required");
    } else if (!formEmail.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/)) {
        alert("Invalid Email");
    } else if (!formSubject) {
        alert("Subject Required");
    } else if (!formMessage) {
        alert("Message Required");
    }
});
import { filterContent, videosCounter } from "./contentpage.js";
import { colorActivityBadge, colorVideoBadge } from "./signinpage.js";

const barsBtn = document.getElementById("barsBtn");
const xBtn = document.getElementById("xBtn");

const homePage = document.getElementById("homePage");
const contentPage = document.getElementById("contentPage");
const signInPage = document.getElementById("signInPage");
const discussionPage = document.getElementById("discussionPage");
const profilePage = document.getElementById("profilePage");
const contactPage = document.getElementById("contactPage");

const signInBtn = document.getElementById("signInBtn");
const signInBtnSB = document.getElementById("signInBtnSB");

const profile = document.querySelector("#profile");
const profileSB = document.querySelector("#profileSB");
const signOutBtn = document.querySelector("#signOutBtn");
const signOutBtnSB = document.querySelector("#signOutBtnSB");
const profileNavbar = document.querySelector("#profileNavbar");
const profileNavbarSB = document.querySelector("#profileNavbarSB");

const discussionBoxImg = document.querySelector("#discussionBoxImg");
const discussionBoxSpan = document.querySelector("#discussionBoxSpan");
function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.visibility = "visible";
  sidebar.style.opacity = "1";
}

function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.visibility = "hidden";
  sidebar.style.opacity = "0";
}

function scrollToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function handleRoute() {
  let route = location.hash.slice(1);
  scrollToTop();

  switch (route) {
    case "":
      // homepage
      homePage.style.display = "block";
      contentPage.style.display = "none";
      signInPage.style.display = "none";
      discussionPage.style.display = "none";
      profilePage.style.display = "none";
      contactPage.style.display = "none";
      break;
    case "content":
      //content page
      filterContent();
      homePage.style.display = "none";
      contentPage.style.display = "block";
      signInPage.style.display = "none";
      discussionPage.style.display = "none";
      profilePage.style.display = "none";
      contactPage.style.display = "none";
      break;
    case "signin":
      //signin page
      homePage.style.display = "none";
      contentPage.style.display = "none";
      signInPage.style.display = "block";
      discussionPage.style.display = "none";
      profilePage.style.display = "none";
      contactPage.style.display = "none";
      break;
    case "discussion":
      //discussion page
      let userArr = JSON.parse(localStorage.getItem("user")) || [];
      if (Object.keys(userArr).length > 0) {
        discussionBoxImg.src = userArr.imgSmall;
        discussionBoxSpan.textContent = userArr.username;
      }
      homePage.style.display = "none";
      contentPage.style.display = "none";
      signInPage.style.display = "none";
      discussionPage.style.display = "block";
      profilePage.style.display = "none";
      contactPage.style.display = "none";
      break;
    case "profile":
      checkVideoBadge();
      //profile page
      homePage.style.display = "none";
      contentPage.style.display = "none";
      signInPage.style.display = "none";
      discussionPage.style.display = "none";
      profilePage.style.display = "block";
      contactPage.style.display = "none";
      break;
    case "contact":
      //contact page
      homePage.style.display = "none";
      contentPage.style.display = "none";
      signInPage.style.display = "none";
      discussionPage.style.display = "none";
      profilePage.style.display = "none";
      contactPage.style.display = "block";
      break;
    default:
      location.hash = "";
  }
}

barsBtn.addEventListener("click", showSidebar);

xBtn.addEventListener("click", hideSidebar);

window.addEventListener("load", () => {
  colorActivityBadge();
  handleRoute();
  videosCounter();
});

window.addEventListener("hashchange", () => {
  colorActivityBadge();
  handleRoute();
  videosCounter();
});

profileNavbar.addEventListener("click", () => {
  location.hash = "profile";
});
profileNavbarSB.addEventListener("click", () => {
  location.hash = "profile";
});

signOutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  profile.style.display = "none";
  profileSB.style.display = "none";
  signOutBtn.style.display = "none";
  signOutBtnSB.style.display = "none";
  profileNavbar.style.display = "none";
  profileNavbarSB.style.display = "none";
  signInBtn.style.display = "block";
  signInBtnSB.style.display = "block";
  location.hash = "signin";
});
signOutBtnSB.addEventListener("click", () => {
  localStorage.removeItem("user");
  profile.style.display = "none";
  profileSB.style.display = "none";
  signOutBtn.style.display = "none";
  signOutBtnSB.style.display = "none";
  profileNavbar.style.display = "none";
  profileNavbarSB.style.display = "none";
  signInBtn.style.display = "block";
  signInBtnSB.style.display = "block";
  location.hash = "signin";
});

export function checkVideoBadge() {
  let isLoggedIn = JSON.parse(localStorage.getItem("user")) || {};
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (isLoggedIn.videoCounter >= 5) {
    isLoggedIn.videoBadge = true;

    const userIndex = users.findIndex(
      (user) => user.username === isLoggedIn.username
    );
    if (userIndex !== -1) {
      users[userIndex].videoBadge = true;
    }

    colorVideoBadge();
    localStorage.setItem("user", JSON.stringify(isLoggedIn));
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    localStorage.setItem("user", JSON.stringify(isLoggedIn));
    localStorage.setItem("users", JSON.stringify(users));
  }
}

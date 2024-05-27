import { fillProfile } from "./profilepage.js";

const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");
const squareBtn = document.getElementById("squareBox");
const logInForm = document.getElementById("logInForm");
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modalBtn");
const videoBadge = document.querySelector("#videoBadge");
const activityBadge = document.querySelector("#activityBadge");
togglePasswordButton.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.innerHTML =
    type === "password"
      ? `<i class="fa-solid fa-eye"></i>`
      : `<i class="fa-solid fa-eye-slash"></i>`;
});

squareBtn.addEventListener("click", function () {
  if (squareBtn.classList.contains("fa-square")) {
    squareBtn.classList.remove("fa-square");
    squareBtn.classList.add("fa-check-square");
  } else {
    squareBtn.classList.remove("fa-check-square");
    squareBtn.classList.add("fa-square");
  }
});

logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const requestedUserData = { username, password };

  try {
    const response = await fetch("http://localhost:5000/api/authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestedUserData),
    });
    if (response.ok) {
      const storedUsers = JSON.parse(localStorage.getItem("users"));

      function getUserByUsername(username) {
        for (let i = 0; i < storedUsers.length; i++) {
          if (
            storedUsers[i].username.toLowerCase() === username.toLowerCase()
          ) {
            return storedUsers[i];
          }
        }
        return null;
      }

      const foundUser = getUserByUsername(username);
      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
      } else {
        console.log("User not found.");
      }
      colorVideoBadge();
      colorActivityBadge();
      profileFunctions();
    } else {
      alert("Wrong username or password");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

function profileFunctions() {
  modal.style.display = "block";
  loggedIn();
}
function loggedIn() {
  fillProfile();
  profile.style.display = "block";
  profileSB.style.display = "block";
  signOutBtn.style.display = "block";
  signOutBtnSB.style.display = "block";
  profileNavbar.style.display = "block";
  profileNavbarSB.style.display = "block";
  signInBtn.style.display = "none";
  signInBtnSB.style.display = "none";
  newDiscussion.disabled = false;
}

modalBtn.addEventListener("click", () => {
  location.hash = "profile";
  modal.style.display = "none";
});

let isLoggedIn = JSON.parse(localStorage.getItem("user")) || [];
let data = Object.keys(isLoggedIn).length;
if (data > 0) {
  loggedIn();
}

export function colorVideoBadge() {
  let isLoggedIn = JSON.parse(localStorage.getItem("user")) || {};
  if (isLoggedIn.videoBadge) {
    videoBadge.classList.add("badge-item-active");
  } else {
    videoBadge.classList.remove("badge-item-active");
  }
}

export function colorActivityBadge() {
  let isLoggedIn = JSON.parse(localStorage.getItem("user")) || {};
  if (isLoggedIn.activityBadge) {
    activityBadge.classList.add("badge-item-active");
  } else {
    activityBadge.classList.remove("badge-item-active");
  }
}

const usernameProfile = document.querySelector("#usernameProfile");
const passwordProfile = document.querySelector("#passwordProfile");
const emailProfile = document.querySelector("#emailProfile");
const yearOfBirth = document.querySelector("#yearOfBirth");
const gender = document.querySelector("#gender");

export function fillProfile() {
  let userLS = JSON.parse(localStorage.getItem("user")) || [];
  let usersLS = JSON.parse(localStorage.getItem("users")) || [];
  usernameProfile.value = userLS.username;
  passwordProfile.value = userLS.password;
  emailProfile.value = userLS.email;
  yearOfBirth.value = userLS.yearOfBirth;
  gender.value = userLS.gender;
  profileImgBig.src = userLS.imgBig;
  profileImgSmall.src = userLS.imgSmall;
  profileImgSmallSB.src = userLS.imgSmall;
  if (!userLS.joinInBadges) {
    userLS.joinInBadge = true;
    for (let i = 0; i < usersLS.length; i++) {
      if (usersLS[i].username.toLowerCase() === userLS.username.toLowerCase()) {
        usersLS[i].joinInBadge = true;
        break;
      }
    }

    localStorage.setItem("user", JSON.stringify(userLS));
    localStorage.setItem("users", JSON.stringify(usersLS));
    joinInBadge.classList.add("badge-item-active");
  }
}

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const emailEditBtn = document.getElementById("emailEditBtn");
const checkIcon = document.getElementById("checkIcon");
const cancelIcon = document.getElementById("cancelIcon");
const inputField = emailEditBtn.previousElementSibling;

emailEditBtn.addEventListener("click", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (emailProfile.disabled) {
    emailProfile.disabled = false;
    emailProfile.value = loggedInUser.email;
    emailProfile.focus();
    emailEditBtn.parentElement.classList.add("editing");
    inputField.style.backgroundColor = "rgba(255, 255, 255)";
    inputField.style.color = "rgba(0, 0, 0)";
  }
});

checkIcon.addEventListener("click", () => {
  const newEmail = emailProfile.value.trim();

  if (!validateEmail(newEmail)) {
    alert("Please enter a valid email address.");
    emailProfile.focus();
    return;
  }
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  loggedInUser.email = newEmail;
  const allUsers = JSON.parse(localStorage.getItem("users"));
  const updatedUsers = allUsers.map((user) => {
    if (user.username === loggedInUser.username) {
      return loggedInUser;
    }
    return user;
  });
  localStorage.setItem("user", JSON.stringify(loggedInUser));
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  emailProfile.disabled = true;
  emailEditBtn.parentElement.classList.remove("editing");
  inputField.style.backgroundColor = "transparent";
  inputField.style.color = "rgba(255, 255, 255)";
});

cancelIcon.addEventListener("click", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  emailProfile.value = loggedInUser.email;
  emailProfile.disabled = true;
  emailEditBtn.parentElement.classList.remove("editing");
  inputField.style.backgroundColor = "transparent";
  inputField.style.color = "rgba(255, 255, 255)";
});

const birthYearEditBtn = document.getElementById("birthYearEditBtn");
const checkYearIcon = document.getElementById("checkYearIcon");
const cancelYearIcon = document.getElementById("cancelYearIcon");
const inputYearField = birthYearEditBtn.previousElementSibling;

const validateBirthYear = (year) => {
  const currentYear = new Date().getFullYear();
  return year >= 1900 && year <= currentYear;
};

birthYearEditBtn.addEventListener("click", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (yearOfBirth.disabled) {
    yearOfBirth.disabled = false;
    yearOfBirth.value = loggedInUser.yearOfBirth;
    yearOfBirth.focus();
    birthYearEditBtn.parentElement.classList.add("editing");
    inputYearField.style.backgroundColor = "rgba(255, 255, 255)";
    inputYearField.style.color = "rgba(0, 0, 0)";
  }
});

checkYearIcon.addEventListener("click", () => {
  const newBirthYear = parseInt(yearOfBirth.value.trim(), 10);

  if (!validateBirthYear(newBirthYear)) {
    alert("Please enter a valid year between 1900 and the current year.");
    yearOfBirth.focus();
    return;
  }

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  loggedInUser.yearOfBirth = newBirthYear;
  const allUsers = JSON.parse(localStorage.getItem("users"));
  const updatedUsers = allUsers.map((user) => {
    if (user.username === loggedInUser.username) {
      return loggedInUser;
    }
    return user;
  });
  localStorage.setItem("user", JSON.stringify(loggedInUser));
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  yearOfBirth.disabled = true;
  birthYearEditBtn.parentElement.classList.remove("editing");
  inputYearField.style.backgroundColor = "transparent";
  inputYearField.style.color = "rgba(255, 255, 255)";
});

cancelYearIcon.addEventListener("click", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  yearOfBirth.value = loggedInUser.yearOfBirth;
  yearOfBirth.disabled = true;
  birthYearEditBtn.parentElement.classList.remove("editing");
  inputYearField.style.backgroundColor = "transparent";
  inputYearField.style.color = "rgba(255, 255, 255)";
});

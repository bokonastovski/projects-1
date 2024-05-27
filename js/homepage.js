const signInBtn = document.getElementById("signInBtn");
const signInBtnSB = document.getElementById("signInBtnSB");
const purpleBtn = document.getElementById("purpleBtn");
const blueBtn = document.getElementById("blueBtn");
const greenBtn = document.getElementById("greenBtn");

signInBtn.addEventListener("click", function () {
  location.hash = "signin";
});
signInBtnSB.addEventListener("click", function () {
  location.hash = "signin";
});

purpleBtn.addEventListener("click", function () {
  location.hash = "content";
});
blueBtn.addEventListener("click", function () {
  location.hash = "discussion";
});
greenBtn.addEventListener("click", function () {
  location.hash = "profile";
});

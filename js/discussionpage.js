import { colorActivityBadge } from "./signinpage.js";
import { discussions } from "./objects.js";

const newDiscussion = document.getElementById("newDiscussion");
const discussionDiv = document.getElementById("discussionContainer");
function discussionCard() {
  discussionDiv.innerHTML = "";
  let discussionsArr = JSON.parse(localStorage.getItem("discussions")) || [];
  let colors = ["#4B7CF366", "#8F39EC66", "#83EAB166"];
  discussionsArr.forEach((discussion, index) => {
    const { comment, img, name, date } = discussion;
    let randomColor = colors[index % colors.length];
    discussionDiv.innerHTML += `<div class="container-box old-discussion" style="background-color: ${randomColor};">
                <p>
                  ${comment}
                </p>
                <div class="information flex ai-center">
                  <img
                    src="${img}"
                    alt=""
                  />
                  <div class="span-div flex js-spacebetween">
                    <span>${name}</span>
    
                    <span class="date">${date}</span>
                  </div>
                </div>
                <input type="text" placeholder="Пиши коментар..." />
                <div class="comments">
                  <span><i class="fa-solid fa-plus"></i></span>
                  <span>5 коментари</span>
                  <span>84 реакции</span>
                </div>
              </div>`;
  });
}
newDiscussion.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let userArr = JSON.parse(localStorage.getItem("user"));
    let usersArr = JSON.parse(localStorage.getItem("users"));
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleString();
    e.preventDefault();
    let discussionText = newDiscussion.value;

    let newDiscussionObj = {
      comment: discussionText,
      img: userArr.imgSmall,
      name: userArr.username,
      date: formattedDate,
    };

    userArr.activityBadge = true;
    const userIndex = usersArr.findIndex(
      (user) => user.username === userArr.username
    );
    if (userIndex !== -1) {
      usersArr[userIndex].activityBadge = true;
    }
    colorActivityBadge();
    discussions.unshift(newDiscussionObj);
    let discussionsLS = JSON.parse(localStorage.getItem("discussions")) || [];
    discussionsLS.unshift(newDiscussionObj);
    localStorage.setItem("discussions", JSON.stringify(discussionsLS));
    localStorage.setItem("user", JSON.stringify(userArr));
    localStorage.setItem("users", JSON.stringify(usersArr));

    discussionCard();
    newDiscussion.value = "";
  }
});
discussionCard();

import { checkVideoBadge } from "./main.js";

const cardContentContainer = document.getElementById("cardContentContainer");
const filtersBtns = document.querySelectorAll("#filters button");
const contentData = JSON.parse(localStorage.getItem("content"));
const headingWeb = document.querySelectorAll(".names h2");
const headingsMobile = document.querySelectorAll(".names-mobile h2");
const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");

let currentIndex = 0;
let selectedButtons = [];

function contentCards(contentArr) {
  cardContentContainer.innerHTML = "";
  contentArr.forEach((item, index) => {
    let cardItemDiv = document.createElement("div");
    cardItemDiv.classList.add("card-item", "fb-25");

    let contentCard = document.createElement("div");
    contentCard.classList.add("card-inner", "cursor-pointer");
    contentCard.innerHTML = `
        <img src="${item.image}" alt="" />
        <div class="card-content ">
          <h3>${item.heading}</h3>
          <p>${item.descriptionShort}</p>
          <span>Објавено на ${item.date}</span>
        </div>
        <i class="fa-solid fa-circle-play"></i>`;

    let contentModal = document.createElement("div");
    let modalId = `contentModal${index}`;
    contentModal.id = modalId;
    contentModal.classList.add("content-modal", "flex");
    contentModal.innerHTML = `
        <i class="fa-solid fa-xmark"></i>
        <div class="left-content-modal fb-60">
          <div class="heading-content-modal">
            <h3>${item.heading}</h3>
            <p>${item.descriptionLong}</p>
            <span>Објавено на ${item.date}</span>
          </div>
          <div class="comments-content-modal">
            <div class="new-comment">
              <input id="newCommentInput${index}"
              disabled 
                type="text"
                placeholder="Остави коментар..."
              />
              <div class="content-box flex ai-center comment-box">
                <img
                id="newCommentImage${index}"
                  src="./images/anonymous.jpg"
                  alt=""
                />
                <span id="newCommentSpan${index}">Име Презиме</span>
              </div>
            </div>
            <div class="all-comments">
              ${item.comments
                .map(
                  (comment) => `
                    <div class="comments-container">
                      <div class="comment-item">
                        <p>${comment.comment}</p>
                        <div class="information flex ai-center comment-box">
                          <img src="${comment.imageAuthor}" alt="Author Image"/>
                          <div class="span-div flex js-spacebetween">
                            <span>${comment.author}</span>
                            <span class="date">${comment.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  `
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="right-content-modal fb-40">
          <video controls src="${item.video}"></video>
        </div>
      `;

    let newCommentInput = contentModal.querySelector(
      `#newCommentInput${index}`
    );
    let newCommentSpan = contentModal.querySelector(`#newCommentSpan${index}`);
    let newCommentImage = contentModal.querySelector(
      `#newCommentImage${index}`
    );
    let allCommentsContainer = contentModal.querySelector(".all-comments");
    let userLS = JSON.parse(localStorage.getItem("user")) || [];

    if (Object.keys(userLS).length > 0) {
      newCommentInput.disabled = false;
      newCommentImage.src = userLS.imgSmall;
      newCommentSpan.textContent = userLS.username;
    }

    newCommentInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        let commentContent = newCommentInput.value;
        let currentDate = new Date();
        let formattedDate = currentDate.toLocaleString();

        let commentObj = {
          author: userLS.username,
          comment: commentContent,
          date: formattedDate,
          imageAuthor: userLS.imgSmall,
        };

        let index = Array.from(cardContentContainer.children).indexOf(
          cardItemDiv
        );

        contentData[index].comments.unshift(commentObj);
        localStorage.setItem("content", JSON.stringify(contentData));

        let newCommentHTML = `
          <div class="comments-container">
            <div class="comment-item">
              <p>${commentObj.comment}</p>
              <div class="information flex ai-center comment-box">
                <img src="${commentObj.imageAuthor}" alt="Author Image"/>
                <div class="span-div flex js-spacebetween">
                  <span>${commentObj.author}</span>
                  <span class="date">${commentObj.date}</span>
                </div>
              </div>
            </div>
          </div>`;
        allCommentsContainer.insertAdjacentHTML("afterbegin", newCommentHTML);

        newCommentInput.value = "";
      }
    });

    contentCard.addEventListener("click", () => {
      contentModal.style.display = "flex";
    });

    let contentModalExit = contentModal.querySelector(".fa-xmark");
    contentModalExit.addEventListener("click", () => {
      contentModal.style.display = "none";
    });

    cardItemDiv.append(contentCard, contentModal);
    cardContentContainer.appendChild(cardItemDiv);
  });
}

function saveFiltersToLocalStorage() {
  const storedUsers = JSON.parse(localStorage.getItem("users"));
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (storedUsers && loggedInUser) {
    loggedInUser.savedFilters = selectedButtons;
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    const updatedUsers = storedUsers.map((user) => {
      if (user.username === loggedInUser.username) {
        return loggedInUser;
      }
      return user;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }
}

export function filterContent() {
  let filteredItems;
  let contentItemsLS = JSON.parse(localStorage.getItem("content"));

  if (selectedButtons.length === 0) {
    filteredItems = contentItemsLS;
  } else {
    filteredItems = contentItemsLS.filter((item) => {
      return selectedButtons.includes(item.filter);
    });
  }

  const activeHeading = document.querySelector(".active-filter-content");
  if (activeHeading) {
    const targetType = activeHeading.id;
    filteredItems = filteredItems.filter((item) => item.type === targetType);
  }

  cardContentContainer.innerHTML = "";
  contentCards(filteredItems);
}

function updateActiveHeading() {
  headingsMobile.forEach((heading, index) => {
    if (index === currentIndex) {
      heading.classList.remove("hidden");
      heading.classList.add("active-filter-content");
    } else {
      heading.classList.add("hidden");
      heading.classList.remove("active-filter-content");
    }
  });
  const targetType = headingsMobile[currentIndex].id;
  filterContentHeading(targetType);

  headingWeb.forEach((h) => {
    if (h.id === targetType) {
      h.classList.add("active-filter-content");
    } else {
      h.classList.remove("active-filter-content");
    }
  });
}

function filterContentHeading(targetType) {
  const contentData = JSON.parse(localStorage.getItem("content"));
  const filteredItems = contentData.filter((item) => item.type === targetType);
  contentCards(filteredItems);
}

export function videosCounter() {
  let isLoggedIn = JSON.parse(localStorage.getItem("user")) || [];
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const videos = document.querySelectorAll(".right-content-modal video");
  videos.forEach((video) => {
    video.addEventListener("play", () => {
      isLoggedIn.videoCounter++;
      const userIndex = users.findIndex(
        (user) => user.username === isLoggedIn.username
      );
      if (userIndex !== -1) {
        users[userIndex].videoCounter = isLoggedIn.videoCounter;
      }
      localStorage.setItem("user", JSON.stringify(isLoggedIn));
      localStorage.setItem("users", JSON.stringify(users));
      checkVideoBadge();
    });
  });
}

leftArrow.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex =
      (currentIndex - 1 + headingsMobile.length) % headingsMobile.length;
    updateActiveHeading();
  }
});

rightArrow.addEventListener("click", function () {
  if (currentIndex < headingsMobile.length - 1) {
    currentIndex = (currentIndex + 1) % headingsMobile.length;
    updateActiveHeading();
  }
});

filtersBtns.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active-filters-buttons");

    const index = selectedButtons.indexOf(button.id);

    if (index === -1) {
      selectedButtons.push(button.id);
    } else {
      selectedButtons.splice(index, 1);
    }

    saveFiltersToLocalStorage();
    filterContent();
  });
});

headingWeb.forEach((heading) => {
  heading.addEventListener("click", function () {
    headingWeb.forEach((h) => {
      h.classList.remove("active-filter-content");
    });
    heading.classList.add("active-filter-content");

    filterContent();
  });
});
headingsMobile.forEach((heading, index) => {
  heading.addEventListener("click", function () {
    currentIndex = index;
    updateActiveHeading();

    const targetType = this.id;
    const webHeading = document.getElementById(targetType);
    headingWeb.forEach((h) => {
      h.classList.remove("active-filter-content");
    });
    webHeading.classList.add("active-filter-content");
  });
});

if (localStorage.getItem("user")) {
  let userArrFilters = JSON.parse(localStorage.getItem("user"));
  selectedButtons = userArrFilters.savedFilters;
  filtersBtns.forEach((button) => {
    if (selectedButtons.includes(button.id)) {
      button.classList.add("active-filters-buttons");
    }
  });

  filterContent();
}

console.log(contentData);
contentCards(contentData);

updateActiveHeading();


  //   Filters for the cards
document.querySelector("#filter-coding").addEventListener("change", filterCoding);
document.querySelector("#filter-design").addEventListener("change", filterDesign);
document.querySelector("#filter-marketing").addEventListener("change", filterMarketing);
var loadMoreButton = document.getElementById('load-more');

function filterCoding() {
    hideAllCards();
    if (document.querySelector("#filter-coding").checked) {
        var codingCards = document.querySelectorAll(".coding");
        codingCards.forEach((codingCard) => {
            codingCard.style.display = "inline-block";
        });
        document.querySelector("#filter-design").checked = false;
        document.querySelector("#filter-marketing").checked = false;
        loadMoreButton.style.display = 'none';
    } else {
        showAllCards();
    }
}

function filterDesign() {
    hideAllCards();
    if (document.querySelector("#filter-design").checked) {
        var designCards = document.querySelectorAll(".design");
        designCards.forEach((designCard) => {
        designCard.style.display = "inline-block";
        });
        document.querySelector("#filter-coding").checked = false;
        document.querySelector("#filter-marketing").checked = false;
        loadMoreButton.style.display = 'none';
    } else {
        showAllCards();
    }
}

function filterMarketing() {
    hideAllCards();
    if (document.querySelector("#filter-marketing").checked) {
        var marketingCards = document.querySelectorAll(".marketing");
        marketingCards.forEach((marketingCard) => {
            marketingCard.style.display = "inline-block";
        });
        document.querySelector("#filter-coding").checked = false;
        document.querySelector("#filter-design").checked = false;
        loadMoreButton.style.display = 'none';

    } else {
        showAllCards();
    }
}

function hideAllCards() {
    var allCards = document.querySelectorAll(".card-js");
    allCards.forEach((card) => {
        card.style.display = "none";
    });
}

function showAllCards() {
    var allCards = document.querySelectorAll(".card-js");
    allCards.forEach((card) => {
        card.style.display = "inline-block";
    });
}
// Load More

let loadMoreBtn = document.querySelector("#load-more");
let currentItem = 6;

loadMoreBtn.onclick = () => {
    let cardJs = [...document.querySelectorAll(".gallery-cards .card-js")];
    for (var i = currentItem; i < currentItem + 6 && i < cardJs.length; i++) {
        cardJs[i].style.display = "block";
    }
    currentItem += 6;

    if (currentItem >= cardJs.length) {
        loadMoreBtn.style.display = "none";
    }
};
const cards = document.querySelectorAll(".card");
const header = document.querySelector(".header");
const body = document.querySelector("body");
const container = document.querySelector(".container");
const showMoney = document.querySelector(".showMoney");
const money1 = document.querySelector(".money1");
const money2 = document.querySelector(".money2");
const money3 = document.querySelector(".money3");
const moneyImage = {
  1: "img/1.jpeg",
  2: "img/2.jpeg",
  5: "img/5.jpeg",
  10: "img/10.jpg",
  20: "img/20.jpg",
  50: "img/50.jpg",
};
const cardHeads = document.querySelectorAll(".card-head");
let sendMoney = 0;
let isChoose = false;
let theFirst = true;
let cardChose;
let cashMoney = [];
// function
function getMoney(a, b) {
  return Math.ceil(Math.random() * (a - b - 1)) + b;
}

function chosenImageMoney(price) {
  let tempMoney = [];
  let priceMoney = [50, 20, 10, 5, 2, 1];
  let i = 0;
  while (price > 0) {
    if (price - priceMoney[i] >= 0) {
      tempMoney.push(priceMoney[i]);
      price -= priceMoney[i];
    } else {
      i += 1;
    }
  }
  return tempMoney;
}

// event click card
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function (e) {
    e.stopPropagation();
    if (theFirst) {
      if (!isChoose) {
        for (let j = 0; j < cards.length; j++) {
          if (cards[j] != cards[i]) {
            cards[j].classList.toggle("card-not-selected");
          }
        }

        cards[i].classList.toggle("card-selected");
        cardChose = cards[i];
        container.classList.toggle("container-selected");
        if (Math.random() < 0.5) {
          sendMoney = getMoney(1, 5);
        } else {
          sendMoney = getMoney(1, 5) * 10;
        }
        isChoose = true;
        container.style.margin = "0";
      } else {
        cashMoney = chosenImageMoney(sendMoney);
        console.log(cashMoney);
        showMoney.classList.toggle("showMoney-open");
        for (let i = 0; i < cardHeads.length; i++) {
          cardHeads[i].classList.toggle("card-head-open");
        }

        setTimeout(function () {
          if (cashMoney.length == 1) {
            money3.style.backgroundImage =
              "url(" + moneyImage[cashMoney[0]] + ")";
            money3.style.backgroundSize = "100% 100%";
            money3.classList.toggle("open-money-3");
          } else {
            money1.style.backgroundImage =
              "url(" + moneyImage[cashMoney[0]] + ")";
            money1.style.backgroundSize = "100% 100%";
            money1.classList.toggle("open-money-1");
            money2.style.backgroundImage =
              "url(" + moneyImage[cashMoney[1]] + ")";
            money2.style.backgroundSize = "100% 100%";
            money2.classList.toggle("open-money-2");
          }
        }, 500);
        cards[i].style.transform = "translate(0%, 55%)";
        setTimeout(function () {
          cards[i].style.transform = "translate(0%, 0%)";
          showMoney.style.zIndex = "2";
          if (cashMoney.length == 1) {
            money3.classList.toggle("open-money-3");
          } else {
            money1.style.transform = "rotate(8deg) translate(-50%, -50%)";
            money2.style.transform = "rotate(-8deg) translate(-50%, -50%)";
          }
        }, 900);
        theFirst = false;
      }
    } else {
      if (cards[i] == cardChose) {
        for (let j = 0; j < cards.length; j++) {
          if (cards[j] != cards[i]) {
            cards[j].classList.toggle("card-not-selected");
          }
        }
        cards[i].classList.toggle("card-selected");
        container.classList.toggle("container-selected");
        showMoney.classList.toggle("showMoney-open");
      }
    }
  });
}
// click container
container.addEventListener("click", function () {
  container.classList.remove("container-selected");
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove("card-selected");
    cards[i].classList.remove("card-not-selected");
    cardHeads[i].classList.remove("card-head-open");
  }
  isChoose = false;
  showMoney.classList.remove("showMoney-open");
});

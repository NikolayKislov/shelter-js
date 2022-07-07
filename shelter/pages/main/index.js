console.log(
  "Привет! Если у вас возникли вопросы по поводу оценки моей работы, пожалуйста, свяжитесь со мной и позвольте исправить недочеты с целью дальнейшей переоценки TG: @Fat_Unicorno, Discord: FatUnicorno (NikolayKislov)#9564"
);
new Swiper(".swiper-container", {
  navigation: {
    nextEl: ".right",
    prevEl: ".left",
  },
  loop: true,
  loopedSlides: 1,
  spaceBetween: 90,
  speed: 500,
  simulateTouch: false,
  allowTouchMove: false,
});
const burgerButton = document.querySelector(".burger");
const navMenu = document.querySelector(".nav");
const navLink = document.querySelectorAll(".nav a");
const opacityWrapper = document.querySelector(".opacity-wrapper");
let petsItems = document.querySelectorAll(".pets-item");
const popupBtns = document.querySelectorAll(".regular-button");
const popupWindow = document.querySelector(".pets-popup");
const popupCloseBtn = document.querySelector(".close-popup");
const closeBtn = document.querySelector(".close-btn");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const body = document.querySelector(".body");
let previousList = [];

// mobile menu function

burgerButton.addEventListener("click", () => {
  body.style.overflow = "hidden";
  burgerButton.classList.toggle("active");
  navMenu.classList.toggle("active");
  opacityWrapper.classList.toggle("active");
  if(burgerButton.classList.contains('active') === false){
    body.style.overflow = "visible";
  }
});
opacityWrapper.addEventListener("mouseup", function (e) {
  body.style.overflow = "visible";
  burgerButton.classList.remove("active");
  navMenu.classList.remove("active");
  opacityWrapper.classList.remove("active");
  popupWindow.classList.remove("active");
  popupCloseBtn.classList.remove("active");
});
navMenu.addEventListener("click", () => {
  body.style.overflow = "visible";
  burgerButton.classList.remove("active");
  navMenu.classList.remove("active");
  opacityWrapper.classList.remove("active");
});

// popup function
petsItems.forEach((el) => {
  el.addEventListener("click", () => {
    body.style.overflow = "hidden";
    popupWindow.classList.add("active");
    popupCloseBtn.classList.add("active");
    opacityWrapper.classList.add("active");
  });
});
popupCloseBtn.addEventListener("click", () => {
  body.style.overflow = "visible";
  popupWindow.classList.remove("active");
  popupCloseBtn.classList.remove("active");
  opacityWrapper.classList.remove("active");
});
opacityWrapper.addEventListener("mouseenter", () => {
  popupCloseBtn.style.backgroundColor = "#f1cdb3";
  popupCloseBtn.style.borderRadius = "50%";
});
opacityWrapper.addEventListener("mouseleave", () => {
  popupCloseBtn.style.backgroundColor = "transparent";
});
//auto-filling pets-items

async function getItemsPets(e) {
  let arr = [];
  const res = await fetch("../../assets/pets-items.json");
  const data = await res.json();
  let list = createItemsArr(arr);
  list = checkUniq(list, previousList);
  previousList = list;
  if (e.target.id === "left") {
    petsItems[0].id = data[list[0]].name;
    petsItems[1].id = data[list[1]].name;
    petsItems[2].id = data[list[2]].name;
  }
  if (e.target.id === "right") {
    petsItems[6].id = data[list[0]].name;
    petsItems[7].id = data[list[1]].name;
    petsItems[8].id = data[list[2]].name;
  }
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < petsItems.length; j++) {
      if (petsItems[j].id === data[i].name) {
        document.querySelectorAll(".pet-name")[j].innerHTML = data[i].name;
        document.querySelectorAll(".pet-img")[j].src = data[i].img;
      }
    }
  }
}
getItemsPets();
function createItemsArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 8);
  }
  let uniq = [...new Set(arr)];
  while (uniq.length < 3) {
    uniq.push(Math.floor(Math.random() * 8));
    if (uniq.length === 3) {
      return createItemsArr(uniq);
    }
  }
  return uniq;
}
function checkUniq(arr, pastArr) {
  for (let i = 0; i < arr.length; i++) {
    if (pastArr.includes(arr[i])) {
      arr = createItemsArr(arr);
      return checkUniq(arr, pastArr);
    }
  }
  return arr;
}

leftArrow.addEventListener("click", getItemsPets);
rightArrow.addEventListener("click", getItemsPets);
// auto-filling popup
petsItems.forEach((el) => el.addEventListener("click", autoFilling));
async function autoFilling(e) {
  const res = await fetch("../../assets/pets.json");
  const data = await res.json();
  let cardName = e.target.closest(".pets-item").id;
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === cardName) {
      document.querySelector(".popup-title").innerHTML = data[i].name;
      document.querySelector(
        ".popup-img"
      ).style.backgroundImage = `url(${data[i].img})`;
      document.querySelector(".type").innerHTML = data[i].type;
      document.querySelector(".breed").innerHTML = data[i].breed;
      document.querySelector(".popup-description").innerHTML =
        data[i].description;
      document.querySelector(".age-p").innerHTML = data[i].age;
      document.querySelector(".inoculations-p").innerHTML =
        data[i].inoculations;
      document.querySelector(".diseases-p").innerHTML = data[i].diseases;
      document.querySelector(".parasites-p").innerHTML = data[i].parasites;
    }
  }
}

async function previousListFilling() {
  let arr = [];
  const res = await fetch("../../assets/pets-items.json");
  const data = await res.json();
  let list = createItemsArr(arr);
  list = checkUniq(list, previousList);
  previousList = list;
  petsItems[3].id = data[list[0]].name;
  petsItems[4].id = data[list[1]].name;
  petsItems[5].id = data[list[2]].name;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < petsItems.length; j++) {
      if (petsItems[j].id === data[i].name) {
        document.querySelectorAll(".pet-name")[j].innerHTML = data[i].name;
        document.querySelectorAll(".pet-img")[j].src = data[i].img;
      }
    }
  }
}
document.addEventListener("DOMContentLoaded", previousListFilling());

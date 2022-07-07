const burgerButton = document.querySelector(".burger");
const navMenu = document.querySelector(".nav");
const navLink = document.querySelectorAll(".nav a");
const opacityWrapper = document.querySelector(".opacity-wrapper");
const header = document.querySelector(".header");
const body = document.querySelector(".body");
const controls = document.querySelectorAll(".round-button");
const petsList = document.getElementsByClassName("pets-item");
let petsItems = document.querySelectorAll('.pets-item')
const popupWindow = document.querySelector(".pets-popup");
const popupBtns = document.querySelectorAll('.regular-button')
const popupCloseBtn = document.querySelector('.close-popup')
const closeBtn = document.querySelector('.close-btn')
let arr = [];
let pagesCount = 6;
let currentPage = 1;
let mainArr = [];
let chunkLength = 8;
let mediaDesktop = window.matchMedia("(min-width:1280px)");
let mediaTable = window.matchMedia("(max-width:1279px)");
let mediaMobile = window.matchMedia("(max-width:767px)");

//@media


if (mediaTable.matches) {
  mainArr = [];
  pagesCount = 8;
  chunkLength = 6;
  petsList[7].remove();
  petsList[6].remove();
  mainArr = createArr(mainArr);
}
if (mediaMobile.matches) {
  mainArr = [];
  pagesCount = 16;
  chunkLength = 3;
  petsList[5].remove();
  petsList[4].remove();
  petsList[3].remove();
  mainArr = createArr(mainArr);
}
mainArr = createArr(mainArr);


// mobile menu function

burgerButton.addEventListener("click", () => {
  body.style.overflow = "hidden";
  burgerButton.classList.toggle("active");
  navMenu.classList.toggle("active");
  opacityWrapper.classList.toggle("active");
  header.classList.toggle("active");
  if(burgerButton.classList.contains('active') === false){
    body.style.overflow = "visible";
  }
});
opacityWrapper.addEventListener("mouseup", function (e) {
  body.style.overflow = "visible";
  burgerButton.classList.remove("active");
  navMenu.classList.remove("active");
  opacityWrapper.classList.remove("active");
  header.classList.remove("active");
  popupWindow.classList.remove("active");
  popupCloseBtn.classList.remove("active");
});
navMenu.addEventListener("click", () => {
  body.style.overflow = "visible";
  burgerButton.classList.remove("active");
  navMenu.classList.remove("active");
  opacityWrapper.classList.remove("active");
  header.classList.remove("active");
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
opacityWrapper.addEventListener('mouseenter', () => {
  popupCloseBtn.style.backgroundColor = '#f1cdb3';
  popupCloseBtn.style.borderRadius = '50%'
})
opacityWrapper.addEventListener('mouseleave', () => {
  popupCloseBtn.style.backgroundColor = 'transparent';
})

// popup filling function

petsItems.forEach(el => el.addEventListener('click', autoFilling))
async function autoFilling(e) {
  const res = await fetch('../../assets/pets.json');
  const data = await res.json();
  let cardName = e.target.closest(".pets-item").id;
  for (let i = 0; i < data.length; i++) {
      if (data[i].name === cardName) {
        document.querySelector(".popup-title").innerHTML = data[i].name
        document.querySelector(".popup-img").style.backgroundImage = `url(${data[i].img})`
        document.querySelector(".type").innerHTML = data[i].type
        document.querySelector(".breed").innerHTML = data[i].breed
        document.querySelector(".popup-description").innerHTML = data[i].description
        document.querySelector(".age-p").innerHTML = data[i].age
        document.querySelector(".inoculations-p").innerHTML = data[i].inoculations
        document.querySelector(".diseases-p").innerHTML = data[i].diseases
        document.querySelector(".parasites-p").innerHTML = data[i].parasites
      }
  }
}


// randomize function

function createArr(mainArr) {
  let arr = mainArr;
  arr = [];
  let start = [];
  for (let i = 0; i < 6; i++) {
    arr.push(createUniqChunk(start));
  }
  arr = arr.flat();
  for (let i = 0; i < pagesCount; i++) {
    start.push(arr.splice(0, chunkLength));
  }
  for (let i = 0; i < start.length; i++) {
    for (let j = 0; j < start[i].length; j++) {
      const unique = Array.from(new Set(start[i]));
      if (start[i].length !== unique.length) {
        return createArr(start);
      }
    }
  }
  return start;
}
function createUniqChunk(arr) {
  let chunk = [...new Set(arr)];
  while (chunk.length < 8) {
    chunk.push(Math.floor(Math.random() * 8));
    if (chunk.length === 8) {
      return createUniqChunk(chunk);
    }
  }
  return chunk;
}


// page-controls function


controls.forEach((el) => {
  el.addEventListener("click", checkCurrentPage);
});

// page filling function

async function checkCurrentPage(e) {
  let currentButton = e.target.id;
  const res = await fetch("../../assets/pets-items.json");
  const data = await res.json();
  if (currentButton === "straight-to-start") {
    currentPage = pagesCount / pagesCount;
  }
  if (currentButton === "previous") {
    currentPage -= 1;
  }
  if (currentButton === "next") {
    currentPage += 1;
  }
  if (currentButton === "straight-to-end") {
    currentPage = pagesCount;
  }
  if (currentPage < 1) {
    currentPage = 1;
  }
  if (currentPage > pagesCount) {
    currentPage = pagesCount;
  }
  controls[2].innerHTML = currentPage;
  if (currentPage === pagesCount / pagesCount) {
    controls[0].classList.add("inactive");
    controls[1].classList.add("inactive");
    controls[3].classList.remove("inactive");
    controls[4].classList.remove("inactive");
  }
  if (currentPage > pagesCount / pagesCount) {
    controls[0].classList.remove("inactive");
    controls[1].classList.remove("inactive");
    controls[3].classList.remove("inactive");
    controls[4].classList.remove("inactive");
  }
  if (currentPage === pagesCount) {
    controls[3].classList.add("inactive");
    controls[4].classList.add("inactive");
  }
  for (let i = 0; i < mainArr.length; i++) {
    for (let j = 0; j < mainArr[i].length; j++) {
      if (i === currentPage - 1) {
        petsList[j].id = data[mainArr[i][j]].name;
        document.querySelectorAll(".pet-name")[j].innerHTML =
          data[mainArr[i][j]].name;
        document.querySelectorAll(".pet-img")[j].src = data[mainArr[i][j]].img;
      }
    }
  }
}
async function firstPageStart() {
  const res = await fetch("../../assets/pets-items.json");
  const data = await res.json();
  for (let i = 0; i < mainArr.length; i++) {
    for (let j = 0; j < mainArr[i].length; j++) {
      if (i === currentPage - 1) {
        petsList[j].id = data[mainArr[i][j]].name;
        document.querySelectorAll(".pet-name")[j].innerHTML =
          data[mainArr[i][j]].name;
        document.querySelectorAll(".pet-img")[j].src = data[mainArr[i][j]].img;
      }
    }
  }
}
firstPageStart()

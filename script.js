const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");

navToggle.addEventListener("click", function () {
  linksContainer.classList.toggle("show-links");
});

// ********* auto date *********
const date = document.querySelector(".date");
date.innerHTML = new Date().getFullYear();

// ********* fixed navbar *********
const navbar = document.getElementById("nav");

window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
}); 

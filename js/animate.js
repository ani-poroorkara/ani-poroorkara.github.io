// AOS initialization [DO NOT REMOVE]
AOS.init();

// Detect mobile interface
var menu_btn = document.querySelector("#menu-btn");
var sidebar = document.querySelector("#sidebar");
var container = document.querySelector(".my-container");

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
}
menu_btn.addEventListener("click", () => {
  sidebar.classList.toggle("active-nav");
  container.classList.toggle("active-cont");
});

// Theme selection
var webpage = document.querySelector("body");
function changeTheme(theme_selector, theme){
  webpage.className = theme_selector;
  webpage.style.backgroundImage = "url('img/theme/"+theme+"/main-bg.svg')";
  sidebar.style.backgroundImage = "url('img/theme/"+theme+"/nb-bg.svg')";;
} 
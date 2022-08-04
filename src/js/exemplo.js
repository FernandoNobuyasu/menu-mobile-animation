const btnOpen = document.getElementById('open-menu');
const btnClose = document.getElementById('close-menu');
const content = document.querySelector('.content');
const mainBtn = document.querySelector('.main-content__btn');
const body = document.body;

content.addEventListener('click', function onClick(event) {
  if(event.target.classList.contains("hamburger__box")){
    return
  }
  if(body.classList.contains("menu-open")){
      
    body.classList.remove("menu-open");
  }
});
btnOpen.addEventListener('click', function onClick(event) {
  body.classList.add("menu-open");
});
btnClose.addEventListener('click', function onClick(event) {
  body.classList.remove("menu-open");
});
'use strict';

const navButtons = document.querySelectorAll('.dti-service-nav-btn');
const screenImage = document.querySelector('[data-dti-screen]');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const screen = button.dataset.screen;
    screenImage.src = `./assets/images/${screen}.png`;

    navButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

import { initMobileMenu } from './modules/menuMobile.js';
import { initScrollManager } from './modules/scrollManager.js';
import { initTypewriter, initParticles, initScrollAnimations } from './modules/animations.js';
import { initThemeManager } from './modules/themeManager.js';
import { initFormHandler } from './modules/formHandler.js';

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollManager();
  initTypewriter();
  initParticles();
  initScrollAnimations();
  initThemeManager();
  initFormHandler();
});

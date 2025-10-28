function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

export function initScrollManager() {
  // 5. Destaque do link de navegação ativo no scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Offset para o header
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          }
        });
      }
    });
  }

  // 6. Header Inteligente (esconde ao rolar para baixo, mostra ao rolar para cima)
  let lastScrollTop = 0;
  const header = document.querySelector('.header');

  function handleSmartHeader() {
    if (!header) return;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // Scroll para baixo
      header.style.top = '-100px';
    } else {
      // Scroll para cima
      header.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para lidar com o topo da página
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - (header ? header.offsetHeight : 0),
          behavior: 'smooth'
        });
      }
    });
  });

  window.addEventListener('scroll', debounce(onScroll, 50));
  window.addEventListener('scroll', debounce(handleSmartHeader, 50));

  // Initial call to set active link and header state on page load
  onScroll();
  handleSmartHeader();
}

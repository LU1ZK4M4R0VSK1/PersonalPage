document.addEventListener('DOMContentLoaded', () => {

  // 1. Lógica do Menu Hamburger para mobile
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // 2. Efeito Typewriter
  const typewriterElement = document.querySelector('.typewriter');
  const roles = ["Desenvolvedor de Software", "Engenheiro de Software", "Entusiasta de Tecnologia"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    let displayText = '';

    if (isDeleting) {
      displayText = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      displayText = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    typewriterElement.textContent = displayText;

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pausa no final da palavra
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500; // Pausa antes de começar a nova palavra
    }

    setTimeout(type, typeSpeed);
  }

  if (typewriterElement) {
    type();
  }

  // 3. Inicialização da biblioteca de animação (AOS)
  AOS.init({
    duration: 800, // Duração da animação
    once: true, // Animar apenas uma vez
    offset: 50, // Começar a animação 50px antes do elemento aparecer
  });

  // 4. Inicialização do Particles.js
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#00bfff"
        },
        "shape": {
          "type": "circle",
        },
        "opacity": {
          "value": 0.5,
          "random": true,
        },
        "size": {
          "value": 3,
          "random": true,
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#00bfff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 2,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });
  }

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
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll);

  // 6. Header Inteligente (esconde ao rolar para baixo, mostra ao rolar para cima)
  let lastScrollTop = 0;
  const header = document.querySelector('.header');

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // Scroll para baixo
      header.style.top = '-100px';
    } else {
      // Scroll para cima
      header.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para lidar com o topo da página
  }, false);

  // 7. Syntax Highlighting para o bloco de código
  function highlightSyntax() {
    const codeBlock = document.getElementById('code-block');
    if (codeBlock) {
      let code = codeBlock.innerHTML.trim();

      // Expressões regulares para os tokens
      const patterns = {
        comment: /(#.*)/g,
        string: /(&quot;.*&quot;)/g,
        variable: /($[a-zA-Z_][a-zA-Z0-9_]*)/g,
        keyword: /\b(if|else|switch|for|while|do|return|function|Get-ChildItem|Remove-Item|Test-Path|Write-Host)\b/g,
        function: /([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/g
      };

      // Aplicar as classes de token
      code = code.replace(patterns.comment, '<span class="token comment">$1</span>');
      code = code.replace(patterns.string, '<span class="token string">$1</span>');
      code = code.replace(patterns.variable, '<span class="token variable">$1</span>');
      code = code.replace(patterns.keyword, '<span class="token keyword">$1</span>');
      // code = code.replace(patterns.function, '<span class="token function">$1</span>');

      codeBlock.innerHTML = code;
    }
  }

  highlightSyntax();

});
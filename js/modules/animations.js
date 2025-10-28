export function initTypewriter() {
  const typewriterElement = document.querySelector('.typewriter');
  // The roles array was updated in the HTML refactoring, so I'll use the original one from script.js
  const roles = ["Desenvolvedor de Software", "Soluções em Tecnologia"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    if (!typewriterElement) return; // Ensure element exists

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
}

export function initParticles() {
  if (document.getElementById('particles-js')) {
    // particlesJS is a global function provided by the particles.js library
    // We need to ensure the library is loaded before calling this.
    // The script tag for particles.js will be added back to index.html.
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
}

export function initScrollAnimations() {
  const animateElements = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate'); // Re-use the AOS class for visual consistency
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the item is visible
  });

  animateElements.forEach(element => {
    observer.observe(element);
  });
}

/* ============================================================
   ASIF NAWAZ K. — PORTFOLIO JAVASCRIPT
   Features: Navbar scroll, Dark mode, Scroll reveal,
             Counter animation, Hamburger menu, Form submit
   ============================================================ */

/* ---- NAVBAR SCROLL ---- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---- HAMBURGER MENU ---- */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

/* ---- DARK / LIGHT MODE TOGGLE ---- */
(function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Load saved preference
  const saved = localStorage.getItem('asif-theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('asif-theme', next);
  });
})();

/* ---- SCROLL REVEAL ---- */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const delay = entry.target.style.getPropertyValue('--card-delay')
          || entry.target.style.getPropertyValue('--t-delay')
          || '0s';

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseFloat(delay) * 1000 || 0);

        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.08
  });

  elements.forEach(el => observer.observe(el));
})();

/* ---- COUNTER ANIMATION ---- */
(function initCounters() {
  const counters = document.querySelectorAll('.tm-num[data-count]');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = easeOut(progress);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ---- SMOOTH SCROLL (for older browsers) ---- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ---- CONTACT FORM ---- */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      // Simple shake animation on empty required fields
      [form.querySelector('#name'), form.querySelector('#email'), form.querySelector('#message')].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#ef4444';
          field.style.animation = 'shake 0.4s ease';
          setTimeout(() => {
            field.style.animation = '';
            field.style.borderColor = '';
          }, 500);
        }
      });
      return;
    }

    // Simulate form submission (replace with actual endpoint)
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message →';
      btn.disabled = false;
      success.style.display = 'block';
      setTimeout(() => { success.style.display = 'none'; }, 5000);
    }, 1000);
  });
})();

/* ---- ACTIVE NAV LINK on SCROLL ---- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navH = 80;

  const onScroll = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < navH + 60) current = section.getAttribute('id');
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---- SHAKE KEYFRAME INJECTION ---- */
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-5px); }
    40%, 80% { transform: translateX(5px); }
  }
  .nav-link.active { color: var(--text) !important; }
  .nav-link.active::after { transform: scaleX(1) !important; }

  @keyframes page-enter {
    from { opacity: 0; filter: blur(10px); transform: scale(0.98); }
    to { opacity: 1; filter: blur(0); transform: scale(1); }
  }

  body {
    animation: page-enter 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards;
  }
`;
document.head.appendChild(style);


/* ---- TESTIMONIAL CAROUSEL ---- */
(function initTestiCarousel() {
  const carousel = document.querySelector('.testi-carousel');
  const prevBtn = document.querySelector('.testi-nav-btn.prev');
  const nextBtn = document.querySelector('.testi-nav-btn.next');
  const dotsContainer = document.querySelector('.testi-dots');

  if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;

  const cards = carousel.querySelectorAll('.testi-card');
  if (!cards.length) return;

  // Generate dots based on number of cards
  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth + 24; 
      carousel.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.dot');
  const updateActiveDot = () => {
    const scrollPos = carousel.scrollLeft;
    const cardWidth = cards[0].offsetWidth + 24;
    const activeIndex = Math.round(scrollPos / cardWidth);
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  };

  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveDot, 50);
  }, { passive: true });

  prevBtn.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 24;
    carousel.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    const cardWidth = cards[0].offsetWidth + 24;
    carousel.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });
})();

// Final Lucide Initialization
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}



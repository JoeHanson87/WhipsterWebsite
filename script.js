// Whipster Website – script.js

// Intersection Observer for scroll-reveal animations
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Stagger children inside grids – only when motion is not reduced
  if (!prefersReducedMotion) {
    const staggerParents = document.querySelectorAll(
      '.features-grid, .trucks-grid, .steps, .hero-badges, .download-badges'
    );

    staggerParents.forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 80}ms`;
      });
    });
  }
})();

// Hamburger menu toggle
(function () {
  'use strict';

  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  function closeMenu() {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when any nav link is tapped
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  // Close when tapping outside the nav
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) closeMenu();
  });
})();

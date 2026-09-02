const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  const handleScroll = () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const storageKey = 'hawa-portfolio-theme';

const setTheme = (theme) => {
  body.setAttribute('data-theme', theme);
  localStorage.setItem(storageKey, theme);

  if (themeToggle) {
    const icon = themeToggle.querySelector('.theme-toggle__icon');
    const label = themeToggle.querySelector('.theme-toggle__text');

    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    if (label) {
      label.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
    }

    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }
};

const savedTheme = localStorage.getItem(storageKey);
const initialTheme = savedTheme || 'dark';
setTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(currentTheme);
  });
}

const revealItems = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

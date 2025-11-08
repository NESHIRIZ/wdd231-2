// Navigation: accessible mobile toggle, outside-click close, ESC to close, active-link highlight, smooth scroll for anchors

(function () {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;

  const hamburger = nav.querySelector('.hamburger');
  const navList = nav.querySelector('ul');
  const links = navList ? Array.from(navList.querySelectorAll('a')) : [];

  function setExpanded(value) {
    if (hamburger) hamburger.setAttribute('aria-expanded', value);
    if (navList) navList.dataset.open = value ? 'true' : 'false';
    document.body.classList.toggle('nav-open', value);
  }

  // Toggle handler
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.getAttribute('aria-expanded') === 'true';
      setExpanded(!open);
      if (!open) navList.querySelector('a')?.focus();
    });
  }

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navList && navList.dataset.open === 'true') {
      setExpanded(false);
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList && navList.dataset.open === 'true') {
      setExpanded(false);
      hamburger?.focus();
    }
  });

  // Smooth scroll for same-page anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      window.setTimeout(() => target.removeAttribute('tabindex'), 1000);
    }
  });

  // Mark active nav link based on path
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach((link) => {
    const href = link.getAttribute('href')?.split('/').pop();
    if (href === current || (href === '' && current === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
})();
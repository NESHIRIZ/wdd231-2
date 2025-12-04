/**
 * discover.js - Discover page interactivity with enhanced animations
 */

class DiscoverManager {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.setupIntersectionObserver();
    this.addHoverEffects();
  }

  attachEventListeners() {
    // Add smooth scroll behavior for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  setupIntersectionObserver() {
    const sections = document.querySelectorAll(
      '.heritage-section, .attractions-section, .economy-section, .climate-section, .why-section'
    );

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  addHoverEffects() {
    const cards = document.querySelectorAll('.attraction-card, .heritage-card, .economy-item, .why-card');

    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.3s ease';
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new DiscoverManager();
});
// Main app module - entry point for the application
import { loadProducts } from './data.mjs';
import { renderProductsGrid, displayProductCount, createModal, openModal, closeModal } from './dom.mjs';
import { loadCart, loadFavorites, addToCart, toggleFavorite, saveCart, saveFavorites } from './storage.mjs';
import { initializeYear, initializeGreeting, filterProducts, sortProducts, scrollToSection } from './utils.mjs';
import { initializeNavigation, setActiveNavLink } from './navigation.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize basic utilities
  initializeYear();
  initializeGreeting();
  initializeNavigation();
  setActiveNavLink();

  // Expose scrollToSection globally for onclick handlers
  window.scrollToSection = scrollToSection;

  // Load data and render products on product page
  const productsGallery = document.querySelector('.products-gallery');
  if (productsGallery) {
    try {
      const products = await loadProducts();

      if (products.length === 0) {
        productsGallery.innerHTML = '<p>No products available at the moment.</p>';
      } else {
        renderProductsGrid(productsGallery, products);
        displayProductCount(productsGallery, products.length);

        // Load cart and favorites from storage
        let cart = loadCart();
        let favorites = loadFavorites();

        // Add event listeners for product cards
        document.querySelectorAll('.add-to-cart').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
              cart = addToCart(cart, product);
              showNotification(`${product.name} added to cart!`);
            }
          });
        });

        document.querySelectorAll('.view-details').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
              const modal = createModal(product);
              document.body.appendChild(modal);
              openModal(modal);

              // Close modal handlers
              modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
              modal.querySelector('.modal-close-btn').addEventListener('click', () => closeModal(modal));

              // Close on outside click
              modal.addEventListener('click', (event) => {
                if (event.target === modal) closeModal(modal);
              });

              // Add to cart from modal
              modal.querySelector('.add-to-cart').addEventListener('click', (e) => {
                cart = addToCart(cart, product);
                showNotification(`${product.name} added to cart!`);
              });

              // Cleanup on close
              const observer = new MutationObserver(() => {
                if (getComputedStyle(modal).display === 'none') {
                  modal.remove();
                }
              });
              observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
            }
          });
        });
      }
    } catch (error) {
      console.error('Failed to load products:', error);
      productsGallery.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
  }

  // Load featured flowers on home page
  const flowerContainer = document.getElementById('flower-container');
  if (flowerContainer) {
    try {
      const products = await loadProducts();
      const featured = products.slice(0, 5);
      const html = featured.map(product => `
        <div class="flower-card">
          <div class="product-media">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="product-body">
            <span class="category">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-info">
              <span class="rating">${product.rating}</span>
              <span class="price">$${product.price}</span>
            </div>
          </div>
        </div>
      `).join('');
      flowerContainer.innerHTML = html;
    } catch (error) {
      console.error('Failed to load featured flowers:', error);
    }
  }

  // Load portfolio items
  const portfolioGallery = document.querySelector('.portfolio-gallery');
  if (portfolioGallery) {
    try {
      const products = await loadProducts();
      const portfolio = products.filter(p => p.category === 'Arrangements' || p.category === 'Premium').slice(0, 6);
      const html = portfolio.map(product => `
        <div class="portfolio-card">
          <div class="product-media">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="product-body">
            <span class="category">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-info">
              <span class="rating">${product.rating}</span>
              <span class="price">$${product.price}</span>
            </div>
          </div>
        </div>
      `).join('');
      portfolioGallery.innerHTML = html;
    } catch (error) {
      console.error('Failed to load portfolio:', error);
    }
  }
});

// Utility function to show notifications
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

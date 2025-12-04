// Module for DOM manipulation and rendering

export function renderProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-body">
        <h3>${product.name}</h3>
        <p class="category">${product.category}</p>
        <p class="description">${product.description}</p>
        <div class="product-info">
          <span class="rating">★ ${product.rating}</span>
          <span class="price">$${product.price}</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
          <button class="btn btn-secondary view-details" data-id="${product.id}">Details</button>
        </div>
      </div>
    </div>
  `;
}

export function renderProductsGrid(container, products) {
  const html = products.map(product => renderProductCard(product)).join('');
  container.innerHTML = html;
}

export function displayProductCount(container, count) {
  const countElement = document.createElement('p');
  countElement.className = 'product-count';
  countElement.textContent = `Showing ${count} beautiful products`;
  container.parentElement.insertBefore(countElement, container);
}

export function createModal(product) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.id = `modal-${product.id}`;
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', `modal-title-${product.id}`);
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="modal-header">
        <h2 id="modal-title-${product.id}">${product.name}</h2>
      </div>
      <div class="modal-body">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Occasion:</strong> ${product.occasion}</p>
        <p><strong>Rating:</strong> ★${product.rating}</p>
        <p class="modal-price"><strong>Price:</strong> $${product.price}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
        <button class="btn btn-secondary modal-close-btn">Close</button>
      </div>
    </div>
  `;
  return modal;
}

export function openModal(modal) {
  modal.style.display = 'flex';
  modal.classList.add('active');
}

export function closeModal(modal) {
  modal.style.display = 'none';
  modal.classList.remove('active');
}

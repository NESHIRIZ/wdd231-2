/**
 * Directory.js - Business Directory Management
 * Handles search, filtering, sorting, and view switching
 */

// Sample business data
const businessesData = [
  {
    id: 1,
    name: 'TechHub Namibia',
    category: 'technology',
    phone: '+264 61 234 5678',
    email: 'info@techhub.na',
    website: 'www.techhub.na',
    logo: '💻',
    featured: true,
    description: 'IT solutions and digital transformation'
  },
  {
    id: 2,
    name: 'Tsumeb Hospitality Group',
    category: 'hospitality',
    phone: '+264 61 298 7654',
    email: 'reservations@tsumebhospitality.com',
    website: 'www.tsumebhospitality.com',
    logo: '🏨',
    featured: true,
    description: 'Premium accommodation and tourism'
  },
  {
    id: 3,
    name: 'Tsumeb Medical Centre',
    category: 'healthcare',
    phone: '+264 61 255 5000',
    email: 'info@tsumebmedical.com',
    website: 'www.tsumebmedical.com',
    logo: '🏥',
    featured: true,
    description: 'State-of-the-art healthcare services'
  },
  {
    id: 4,
    name: 'Mining Solutions Ltd',
    category: 'agriculture',
    phone: '+264 61 234 0000',
    email: 'info@miningsolutions.na',
    website: 'www.miningsolutions.na',
    logo: '⛏️',
    featured: false,
    description: 'Mining and extraction services'
  },
  {
    id: 5,
    name: 'RetailPro Store',
    category: 'retail',
    phone: '+264 61 111 2222',
    email: 'contact@retailpro.com',
    website: 'www.retailpro.com',
    logo: '🛍️',
    featured: false,
    description: 'General retail and merchandise'
  },
  {
    id: 6,
    name: 'Finance Plus Investment',
    category: 'finance',
    phone: '+264 61 333 4444',
    email: 'info@financeplus.na',
    website: 'www.financeplus.na',
    logo: '💰',
    featured: false,
    description: 'Financial services and investment'
  },
  {
    id: 7,
    name: 'BuildRight Construction',
    category: 'construction',
    phone: '+264 61 555 6666',
    email: 'projects@buildright.na',
    website: 'www.buildright.na',
    logo: '🏗️',
    featured: false,
    description: 'Construction and real estate'
  },
  {
    id: 8,
    name: 'Skills Academy Training',
    category: 'education',
    phone: '+264 61 777 8888',
    email: 'admin@skillsacademy.na',
    website: 'www.skillsacademy.na',
    logo: '📚',
    featured: false,
    description: 'Education and training services'
  }
];

class DirectoryManager {
  constructor() {
    this.allBusinesses = businessesData;
    this.filteredBusinesses = [...this.allBusinesses];
    this.currentView = 'grid';
    this.searchTerm = '';
    this.selectedCategory = '';
    this.sortBy = 'name-asc';
    this.init();
  }

  init() {
    this.cacheElements();
    this.attachEventListeners();
    this.renderBusinesses();
  }

  cacheElements() {
    this.searchInput = document.getElementById('search-input');
    this.categoryFilter = document.getElementById('category-filter');
    this.sortFilter = document.getElementById('sort-filter');
    this.gridViewBtn = document.getElementById('grid-view');
    this.listViewBtn = document.getElementById('list-view');
    this.membersContainer = document.getElementById('members-container');
    this.emptyState = document.getElementById('empty-state');
    this.countNumber = document.getElementById('count-number');
    this.resetBtn = document.getElementById('reset-filters');
  }

  attachEventListeners() {
    this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
    this.categoryFilter.addEventListener('change', (e) => this.handleCategoryFilter(e));
    this.sortFilter.addEventListener('change', (e) => this.handleSort(e));
    this.gridViewBtn.addEventListener('click', () => this.switchView('grid'));
    this.listViewBtn.addEventListener('click', () => this.switchView('list'));
    this.resetBtn.addEventListener('click', () => this.resetFilters());
  }

  handleSearch(e) {
    this.searchTerm = e.target.value.toLowerCase();
    this.applyFilters();
  }

  handleCategoryFilter(e) {
    this.selectedCategory = e.target.value;
    this.applyFilters();
  }

  handleSort(e) {
    this.sortBy = e.target.value;
    this.applyFilters();
  }

  applyFilters() {
    // Filter businesses
    this.filteredBusinesses = this.allBusinesses.filter(business => {
      const matchesSearch = business.name.toLowerCase().includes(this.searchTerm) ||
                           business.description.toLowerCase().includes(this.searchTerm);
      const matchesCategory = !this.selectedCategory || business.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort businesses
    this.sortBusinesses();

    // Update UI
    this.updateResultsCount();
    this.updateResetButton();
    this.renderBusinesses();
  }

  sortBusinesses() {
    switch (this.sortBy) {
      case 'name-asc':
        this.filteredBusinesses.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        this.filteredBusinesses.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
        this.filteredBusinesses.sort((a, b) => b.featured - a.featured);
        break;
      case 'newest':
        this.filteredBusinesses.reverse();
        break;
    }
  }

  updateResultsCount() {
    this.countNumber.textContent = this.filteredBusinesses.length;
  }

  updateResetButton() {
    const hasFilters = this.searchTerm || this.selectedCategory;
    this.resetBtn.style.display = hasFilters ? 'block' : 'none';
  }

  resetFilters() {
    this.searchInput.value = '';
    this.categoryFilter.value = '';
    this.sortFilter.value = 'name-asc';
    this.searchTerm = '';
    this.selectedCategory = '';
    this.sortBy = 'name-asc';
    this.applyFilters();
  }

  switchView(view) {
    this.currentView = view;
    this.gridViewBtn.classList.toggle('active', view === 'grid');
    this.listViewBtn.classList.toggle('active', view === 'list');
    this.renderBusinesses();
  }

  renderBusinesses() {
    if (this.filteredBusinesses.length === 0) {
      this.membersContainer.style.display = 'none';
      this.emptyState.style.display = 'block';
      return;
    }

    this.membersContainer.style.display = this.currentView === 'grid' ? 'grid' : 'flex';
    this.emptyState.style.display = 'none';

    if (this.currentView === 'grid') {
      this.membersContainer.className = 'member-grid';
      this.membersContainer.innerHTML = this.filteredBusinesses
        .map(business => this.createCardHTML(business))
        .join('');
    } else {
      this.membersContainer.className = 'member-list';
      this.membersContainer.innerHTML = this.filteredBusinesses
        .map(business => this.createListItemHTML(business))
        .join('');
    }
  }

  createCardHTML(business) {
    const categoryLabel = this.getCategoryLabel(business.category);
    return `
      <div class="member-card ${business.featured ? 'featured' : ''}">
        <div class="member-logo">
          ${business.logo}
          ${business.featured ? '<div class="logo-badge">Featured</div>' : ''}
        </div>
        <div class="member-info">
          <h3 class="member-name">${business.name}</h3>
          <div class="member-category">${categoryLabel}</div>
          <p style="color: var(--text-muted); margin: 0.5rem 0 1rem; font-size: 0.9rem;">${business.description}</p>
          <div class="member-contact">
            <div class="contact-item">
              📱 <a href="tel:${business.phone.replace(/\s/g, '')}">${business.phone}</a>
            </div>
            <div class="contact-item">
              📧 <a href="mailto:${business.email}">${business.email}</a>
            </div>
          </div>
          <div class="member-website">
            <a href="https://${business.website}" target="_blank" rel="noopener noreferrer">
              Visit Website →
            </a>
          </div>
        </div>
      </div>
    `;
  }

  createListItemHTML(business) {
    const categoryLabel = this.getCategoryLabel(business.category);
    return `
      <div class="member-list-item">
        <div class="member-list-logo">${business.logo}</div>
        <div class="member-list-content">
          <h3 class="list-name">${business.name}</h3>
          <span class="list-category">${categoryLabel}</span>
          <div class="list-contact">
            <span class="list-contact-item">📱 <a href="tel:${business.phone.replace(/\s/g, '')}">${business.phone}</a></span>
            <span class="list-contact-item">📧 <a href="mailto:${business.email}">${business.email}</a></span>
            <span class="list-contact-item">🌐 <a href="https://${business.website}" target="_blank" rel="noopener noreferrer">${business.website}</a></span>
          </div>
        </div>
        <div class="list-action">
          <button class="action-btn action-btn-primary" onclick="window.open('https://${business.website}')">Visit</button>
          <button class="action-btn action-btn-secondary" onclick="window.location.href='mailto:${business.email}'">Contact</button>
        </div>
      </div>
    `;
  }

  getCategoryLabel(category) {
    const labels = {
      retail: 'Retail & Commerce',
      technology: 'Technology & IT',
      hospitality: 'Hospitality & Tourism',
      agriculture: 'Agriculture & Mining',
      healthcare: 'Healthcare & Services',
      finance: 'Finance & Insurance',
      education: 'Education & Training',
      construction: 'Construction & Real Estate'
    };
    return labels[category] || category;
  }
}

// Initialize Directory on page load
document.addEventListener('DOMContentLoaded', () => {
  new DirectoryManager();
});

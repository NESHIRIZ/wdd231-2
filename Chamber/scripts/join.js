/**
 * join.js - Membership form and FAQ interactivity
 */

class MembershipManager {
  constructor() {
    this.billingToggle = document.getElementById('billing-toggle');
    this.membershipForm = document.getElementById('membership-form');
    this.faqItems = document.querySelectorAll('.faq-item');
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Billing toggle
    this.billingToggle?.addEventListener('change', (e) => this.handleBillingToggle(e));

    // FAQ accordion
    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question?.addEventListener('click', () => this.toggleFAQ(item));
    });

    // Form submission
    this.membershipForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));
  }

  handleBillingToggle(e) {
    const isAnnual = e.target.checked;
    const amounts = document.querySelectorAll('.amount');

    amounts.forEach(amount => {
      if (isAnnual) {
        const monthly = parseFloat(amount.dataset.monthly);
        const annual = monthly * 12 * 0.8; // 20% discount
        amount.textContent = annual.toLocaleString('en-NA', { minimumFractionDigits: 0 });
      } else {
        const monthly = parseFloat(amount.dataset.monthly);
        amount.textContent = monthly.toLocaleString('en-NA', { minimumFractionDigits: 0 });
      }
    });

    // Update period text
    const periodTexts = document.querySelectorAll('.period');
    periodTexts.forEach(period => {
      period.textContent = isAnnual ? '/year' : '/month';
    });
  }

  toggleFAQ(item) {
    // Close other items
    this.faqItems.forEach(faq => {
      if (faq !== item) {
        faq.classList.remove('active');
      }
    });

    // Toggle current item
    item.classList.toggle('active');
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this.membershipForm);
    const data = Object.fromEntries(formData);

    // Validate
    if (!this.validateForm(data)) {
      alert('Please fill in all required fields');
      return;
    }

    // Show success message
    alert(`Thank you for your application, ${data.contactPerson}! We'll contact you soon.`);

    // Here you would typically send the data to a server
    console.log('Form data:', data);

    // Reset form
    this.membershipForm.reset();
  }

  validateForm(data) {
    return data.businessName && 
           data.businessType && 
           data.contactPerson && 
           data.email && 
           data.phone && 
           data.businessDescription && 
           data.membershipTier &&
           data.terms;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new MembershipManager();
});
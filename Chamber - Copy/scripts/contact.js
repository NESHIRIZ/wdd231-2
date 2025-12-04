/**
 * contact.js - Contact form and FAQ interactivity
 */

class ContactManager {
  constructor() {
    this.contactForm = document.getElementById('contact-form');
    this.formMessage = document.getElementById('form-message');
    this.faqItems = document.querySelectorAll('.faq-item');
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Form submission
    this.contactForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));

    // FAQ accordion
    this.faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question?.addEventListener('click', () => this.toggleFAQ(item));
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this.contactForm);
    const data = Object.fromEntries(formData);

    // Validate required fields
    if (!this.validateForm(data)) {
      this.showMessage('Please fill in all required fields', 'error');
      return;
    }

    // Validate email
    if (!this.isValidEmail(data.email)) {
      this.showMessage('Please enter a valid email address', 'error');
      return;
    }

    // Show success message
    this.showMessage(
      `Thank you for your message, ${data.fullName}! We'll get back to you as soon as possible.`,
      'success'
    );

    // Log the data (in production, you'd send this to a server)
    console.log('Form data:', data);

    // Reset form
    this.contactForm.reset();

    // Scroll to message
    setTimeout(() => {
      this.formMessage.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  validateForm(data) {
    return data.fullName && 
           data.email && 
           data.subject && 
           data.message;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showMessage(text, type) {
    this.formMessage.textContent = text;
    this.formMessage.className = `form-message ${type}`;
    this.formMessage.style.display = 'block';

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        this.formMessage.style.display = 'none';
      }, 5000);
    }
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ContactManager();
});
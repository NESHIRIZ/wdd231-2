// Professional script for Seko's Flowers

document.addEventListener('DOMContentLoaded', () => {
  // Dynamic greeting for hero section (if present)
  const greeting = document.getElementById('greeting');
  if (greeting) {
    const hour = new Date().getHours();
    let greetText = "Welcome!";
    if (hour < 12) greetText = "Good morning!";
    else if (hour < 18) greetText = "Good afternoon!";
    else greetText = "Good evening!";
    greeting.textContent = greetText;
  }

  // Dynamic copyright year for footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Featured flowers gallery (for index.html)
  const flowerContainer = document.getElementById('flower-container');
  if (flowerContainer) {
    const flowers = [
      {
        name: "Rose Elegance",
        desc: "Classic red roses for every occasion.",
        img: "images/p16.jpg"
      },
      {
        name: "Tulip Harmony",
        desc: "Bright tulips for spring celebrations.",
        img: "images/p1.jpg"
      },
      {
        name: "Orchid Grace",
        desc: "Exotic orchids for a touch of luxury.",
        img: "images/p2.jpg"
      },
      {
        name: "Sunflower Joy",
        desc: "Sunny sunflowers to brighten your day.",
        img: "images/p3.jpg"
      },
      {
        name: "Lily Purity",
        desc: "Elegant lilies for pure moments.",
        img: "images/p20.jpg"
      }
    ];
    flowers.forEach(flower => {
      const card = document.createElement('div');
      card.className = 'flower-card';
      card.innerHTML = `
        <img src="${flower.img}" alt="${flower.name}">
        <h3>${flower.name}</h3>
        <p>${flower.desc}</p>
      `;
      flowerContainer.appendChild(card);
    });
  }

  // Portfolio gallery (for portfolio.html)
  const portfolioGallery = document.querySelector('.portfolio-gallery');
  if (portfolioGallery) {
    const portfolioItems = [
      {
        name: "Wedding Floral Arrangement",
        desc: "Elegant bouquets and centerpieces for a beautiful wedding day.",
        img: "images/p5.jpg"
      },
      {
        name: "Corporate Event Decor",
        desc: "Professional floral designs for conferences and business events.",
        img: "images/p6.jpg"
      },
      {
        name: "Garden Landscaping",
        desc: "Transforming outdoor spaces with creative plant arrangements.",
        img: "images/p6.jpg"
      },
      {
        name: "Birthday Party Flowers",
        desc: "Colorful and fun floral decorations for memorable celebrations.",
        img: "images/p7.jpg"
      },
      {
        name: "Office Plant Decor",
        desc: "Bringing life to workspaces with stylish plant displays.",
        img: "images/p8.jpg"
      }
    ];
    portfolioItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'portfolio-card';
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
      `;
      portfolioGallery.appendChild(card);
    });
  }

  // Products gallery (for product.html)
  const productsGallery = document.querySelector('.products-gallery');
  if (productsGallery) {
    const products = [
      {
        name: "Rose Bouquet",
        desc: "Classic red roses arranged with greenery.",
        img: "images/p9.jpg",
        price: "$25"
      },
      {
        name: "Tulip Mix",
        desc: "Bright tulips in assorted colors.",
        img: "images/p10.jpg",
        price: "$18"
      },
      {
        name: "Orchid Pot",
        desc: "Elegant orchids in a decorative pot.",
        img: "images/p11.jpg",
        price: "$30"
      },
      {
        name: "Sunflower Bunch",
        desc: "Cheerful sunflowers for a sunny day.",
        img: "images/p12.jpg",
        price: "$15"
      },
      {
        name: "Lily Arrangement",
        desc: "White lilies with seasonal accents.",
        img: "images/p13.jpg",
        price: "$22"
      }
    ];
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <span class="price">${product.price}</span>
      `;
      productsGallery.appendChild(card);
    });
  }
});

// Smooth scroll to section (for index.html hero button)
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
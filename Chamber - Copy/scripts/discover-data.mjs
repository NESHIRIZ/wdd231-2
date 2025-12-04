export const pointsOfInterest = [
  {
    id: 1,
    title: "Tsumeb Museum",
    img: "images/tsumeb-museum.webp",
    address: "123 Main Street, Tsumeb",
    description: "Explore Tsumeb's rich history through exhibits showcasing local mining heritage, cultural artifacts, and historical photographs spanning over a century."
  },
  {
    id: 2,
    title: "Hoba Meteorite",
    img: "images/hoba-meteorite.webp",
    address: "Hoba Road, 25km from Tsumeb",
    description: "The world's largest meteorite still in its original location. This 60-ton natural wonder is a must-see geological marvel that attracts scientists and tourists worldwide."
  },
  {
    id: 3,
    title: "Lake Otjikoto",
    img: "images/lake-otjikoto.webp",
    address: "Tsumeb District, 20km west",
    description: "A stunning natural sinkhole lake surrounded by scenic landscapes. Perfect for sightseeing, photography, and learning about geological formations."
  },
  {
    id: 4,
    title: "Tsumeb Market",
    img: "images/tsumeb-market.webp",
    address: "Market Street, Central Tsumeb",
    description: "Experience authentic local culture at this vibrant marketplace featuring traditional crafts, fresh produce, and local delicacies year-round."
  },
  {
    id: 5,
    title: "Otjikoto Mine",
    img: "images/otjikoto-mine.webp",
    address: "Industrial Area, Tsumeb",
    description: "Historical mining site that defined the region's economic development. Learn about copper mining operations and industrial heritage through guided tours."
  },
  {
    id: 6,
    title: "Tsumeb Golf Club",
    img: "images/tsumeb-golf.webp",
    address: "Golf Road, Tsumeb",
    description: "An 18-hole championship course set against scenic Namibian landscapes. Welcoming to members and visitors seeking recreational leisure."
  },
  {
    id: 7,
    title: "Botanical Garden",
    img: "images/botanical-garden.webp",
    address: "Garden Avenue, Tsumeb",
    description: "Tranquil gardens showcasing native Namibian flora. An ideal destination for nature enthusiasts, photographers, and peaceful outdoor experiences."
  },
  {
    id: 8,
    title: "Ngwedi Cultural Village",
    img: "images/ngwedi-village.webp",
    address: "Village Road, Tsumeb",
    description: "Immerse yourself in local culture through traditional arts, crafts, and guided community tours that showcase authentic Namibian heritage and hospitality."
  }
];

// Handle localStorage for visit tracking
function handleVisitMessage() {
  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();
  const messageEl = document.getElementById('visit-message');
 

  if (!lastVisit) {
    messageEl.innerHTML = `
      <div class="message welcome" role="alert">
        <p>Welcome! Let us know if you have any questions about Tsumeb's attractions.</p>
        <button aria-label="Close welcome message" onclick="this.parentElement.style.display='none'">✕</button>
      </div>
    `;
  } else {
    const lastVisitDate = parseInt(lastVisit);
    const daysDiff = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

    if (daysDiff < 1) {
      messageEl.innerHTML = `
        <div class="message return" role="alert">
          <p>Back so soon! We're thrilled to see you exploring more attractions!</p>
          <button aria-label="Close return message" onclick="this.parentElement.style.display='none'">✕</button>
        </div>
      `;
    } else {
      const dayText = daysDiff === 1 ? 'day' : 'days';
      messageEl.innerHTML = `
        <div class="message info"> 
          <p>Welcome back! You last visited ${daysDiff} ${dayText} ago. Check out what's new in Tsumeb!</p>
          <button aria-label="Close info message" onclick="this.closest('.message').style.display='none'">✕</button>
        </div>
      `;
    }
  }

  localStorage.setItem('lastVisit', now);
}

// Render discover cards with named grid areas
function renderCards() {
  const grid = document.getElementById('discover-grid');
  if (!grid) return;

  grid.innerHTML = '';

  pointsOfInterest.forEach((poi, index) => {
    const card = document.createElement('div');
    card.classList.add('discover-card');
    card.setAttribute('role', 'article');
    card.setAttribute('style', `--grid-pos: ${index + 1}`);

    card.innerHTML = `
      <figure>
        <img 
          src="${poi.img}" 
          alt="${poi.title}" 
          width="300" 
          height="200"
          loading="lazy"
        />
      </figure>
      <div class="discover-card-content">
        <h3>${poi.title}</h3>
        <address>${poi.address}</address>
        <p>${poi.description}</p>
        <button class="learn-more-btn" aria-label="Learn more about ${poi.title}">Learn More</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  handleVisitMessage();
});

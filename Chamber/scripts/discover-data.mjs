export const pointsOfInterest = [
  {
    title: "Tsumeb Museum",
    img: "images/tsumeb-museum.webp",
    address: "123 Main Street, Tsumeb",
    description: "Explore local history, mining heritage, and cultural artifacts."
  },
  {
    title: "Hoba Meteorite",
    img: "images/hoba-meteorite.webp",
    address: "Hoba Road, Tsumeb",
    description: "The largest known meteorite in the world, a must-see natural wonder."
  },
  {
    title: "Lake Otjikoto",
    img: "images/lake-otjikoto.webp",
    address: "Tsumeb District",
    description: "A hidden lake formed by collapse, popular for sightseeing and nature walks."
  },
  {
    title: "Tsumeb Market",
    img: "images/tsumeb-market.webp",
    address: "Market Street, Tsumeb",
    description: "Local crafts, food, and a taste of authentic Tsumeb life."
  },
  {
    title: "Otjikoto Mine",
    img: "images/otjikoto-mine.webp",
    address: "Industrial Area, Tsumeb",
    description: "Historic mining site showcasing the region's mineral heritage."
  },
  {
    title: "Tsumeb Golf Club",
    img: "images/tsumeb-golf.webp",
    address: "Golf Road, Tsumeb",
    description: "Relaxing leisure activity in scenic surroundings."
  },
  {
    title: "Tsumeb Botanical Garden",
    img: "images/botanical-garden.webp",
    address: "Garden Avenue, Tsumeb",
    description: "Native flora and tranquil spaces perfect for nature lovers."
  },
  {
    title: "Ngwedi Cultural Village",
    img: "images/ngwedi-village.webp",
    address: "Village Road, Tsumeb",
    description: "Experience local culture, traditions, and community tours."
  }
];

// Script to inject cards
const grid = document.querySelector(".discover-grid");

pointsOfInterest.forEach((poi) => {
  const card = document.createElement("div");
  card.classList.add("discover-card");
  card.innerHTML = `
    <figure>
      <img src="${poi.img}" alt="${poi.title}" />
    </figure>
    <h3>${poi.title}</h3>
    <address>${poi.address}</address>
    <p>${poi.description}</p>
    <button>Learn More</button>
  `;
  grid.appendChild(card);
});

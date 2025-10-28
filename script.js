// Menu Data
const menuItems = [
  { name: "Wild Mushroom Tagliatelle", price: "$16.99", desc: "Handmade pasta, foraged mushrooms, thyme, parmesan", img: "pasta.jpg", category: "main" },
  { name: "Grass-Fed Beef Burger", price: "$14.99", desc: "Local beef, aged cheddar, brioche, house pickles", img: "burger.jpg", category: "main" },
  { name: "Heritage Tomato Salad", price: "$12.99", desc: "Heirloom tomatoes, burrata, basil oil", img: "salad.jpg", category: "appetizer" },
  { name: "Dark Chocolate Terrine", price: "$8.99", desc: "70% cacao, sea salt, seasonal berries", img: "dessert.jpg", category: "dessert" },
  { name: "Truffle Fries", price: "$7.99", desc: "Crispy fries, truffle oil, parmesan", img: "fries.jpg", category: "appetizer" },
  { name: "Seared Scallops", price: "$18.99", desc: "Pan-seared scallops, cauliflower puree", img: "scallops.jpg", category: "main" }
];

// Gallery Images
const galleryImages = Array.from({length: 12}, (_, i) => `gallery-${i+1}.jpg`);

document.addEventListener("DOMContentLoaded", () => {
  // Render Menu
  const menuGrid = document.getElementById('menu-grid');
  menuItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.dataset.category = item.category;
    card.innerHTML = `
      <div class="menu-card">
        <div class="menu-front">
          <img src="images/${item.img}" alt="${item.name}">
          <h3>${item.name}</h3>
          <span class="price">${item.price}</span>
        </div>
        <div class="menu-back">
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
          <span class="price">${item.price}</span>
        </div>
      </div>
    `;
    menuGrid.appendChild(card);
  });

  // Render Gallery
  const masonry = document.getElementById('masonry-grid');
  galleryImages.forEach(src => {
    const div = document.createElement('div');
    div.className = 'masonry-item';
    div.innerHTML = `<img src="images/${src}" alt="Gallery">`;
    masonry.appendChild(div);
  });

  // Live Search
  document.getElementById('menu-search').addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.menu-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(term) ? 'block' : 'none';
    });
  });

  // Filter
  document.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.menu-item').forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
      });
    });
  });

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  gsap.from('.gsap-title', { opacity: 0, y: 50, duration: 1, stagger: 0.3, scrollTrigger: { trigger: '.gsap-title', start: 'top 80%' } });
  gsap.from('.gsap-text', { opacity: 0, y: 30, duration: 1, scrollTrigger: { trigger: '.gsap-text', start: 'top 85%' } });
  gsap.from('.gsap-img', { opacity: 0, scale: 0.9, duration: 1.2, scrollTrigger: { trigger: '.gsap-img', start: 'top 85%' } });
  gsap.from('.gsap-btn', { opacity: 0, y: 20, duration: 1, delay: 0.5 });

  // Parallax
  gsap.to('.hero-layer', {
    yPercent: -50,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', scrub: true }
  });

  // Progress Bar
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
  });

  // Dark Mode
  const toggle = document.getElementById('theme-toggle');
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggle.textContent = document.body.classList.contains('dark') ? 'Light Mode' : 'Dark Mode';
  });

  // Mobile Menu, Smooth Scroll, Lightbox (same as before)
  // ... (include from previous script)
});
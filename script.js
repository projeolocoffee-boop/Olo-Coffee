// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobileBtn');
const navLinks = document.getElementById('navLinks');

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Navbar Scroll Effect (Home page)
const navbar = document.getElementById('navbar');
// On products page it might already have 'scrolled' class, we only toggle if not explicitly set to always scrolled.
const isAlwaysScrolled = navbar && navbar.classList.contains('scrolled');

if (navbar && !isAlwaysScrolled) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Scroll Animations (Reveal)
const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale');
if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -100px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));
}

// Active Nav Link (Scrollspy)
const spySections = document.querySelectorAll('header, section[id], footer[id]');
const navLinksArr = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  spySections.forEach(section => {
    const sectionTop = section.offsetTop;
    // 200px offset for earlier trigger
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id') || '';
    }
  });

  navLinksArr.forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || !window.location.pathname.includes('.html');
    
    if (isIndex) {
      // Home Page
      if (current === '' && (href === 'index.html' || href === '' || href === '/')) {
        a.classList.add('active');
      } else if (current && href.includes('#' + current)) {
        a.classList.add('active');
      }
    } else {
      // Products Page or others
      if (current === 'contact' && href.includes('#contact')) {
        a.classList.add('active');
      } else if (current !== 'contact' && href.includes('products.html')) {
        a.classList.add('active');
      }
    }
  });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Product Data
const products = [
  {
    id: 1,
    category: 'espresso',
    categoryName: 'Espresso',
    title: 'Signature Blend',
    desc: 'Karamel ve çikolata notaları ile yoğun ve gövdeli bir espresso deneyimi.',
    price: 240,
    image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=800',
    calories: '5 kcal',
    allergens: 'Yok'
  },
  {
    id: 2,
    category: 'filter',
    categoryName: 'Filtre Kahve',
    title: 'Colombia Supremo',
    desc: 'Hafif asidite, narenciye ve fındık notaları. Dengeli bir içim sunar.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    calories: '5 kcal',
    allergens: 'Yok'
  },
  {
    id: 3,
    category: 'cold',
    categoryName: 'Soğuk İçecek',
    title: 'Iced Matcha Latte',
    desc: 'Orijinal Japon matcha tozu ve taze süt ile hazırlanan ferahlatıcı lezzet.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    calories: '180 kcal',
    allergens: 'Laktoz'
  },
  {
    id: 4,
    category: 'filter',
    categoryName: 'Filtre Kahve',
    title: 'Ethiopia Yirgacheffe',
    desc: 'Yasemin çiçeği ve bergamot notalarıyla ön plana çıkan, hafif gövdeli.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800',
    calories: '5 kcal',
    allergens: 'Yok'
  },
  {
    id: 5,
    category: 'espresso',
    categoryName: 'Espresso',
    title: 'Cortado',
    desc: 'Eşit oranda espresso ve sıcak sütün mükemmel dengesi.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=800',
    calories: '75 kcal',
    allergens: 'Laktoz'
  },
  {
    id: 6,
    category: 'cold',
    categoryName: 'Soğuk İçecek',
    title: 'Cold Brew',
    desc: '16 saat soğuk suda demlenmiş, yumuşak içimli buzlu kahve.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800',
    calories: '10 kcal',
    allergens: 'Yok'
  },
  {
    id: 7,
    category: 'dessert',
    categoryName: 'Tatlı',
    title: 'San Sebastian',
    desc: 'İçi akışkan, üzeri karamelize edilmiş nefis peynir tatlısı.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
    calories: '420 kcal',
    allergens: 'Laktoz, Yumurta, Glüten'
  },
  {
    id: 8,
    category: 'dessert',
    categoryName: 'Tatlı',
    title: 'Limonlu Cheesecake',
    desc: 'Ferahlatıcı limon kremasıyla hazırlanan taze cheesecake.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&q=80&w=800',
    calories: '380 kcal',
    allergens: 'Laktoz, Yumurta, Glüten'
  }
];

// Modal Logic
const modal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');

function openModal(productId) {
  if (!modal) return;
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalCat').textContent = product.categoryName;
  document.getElementById('modalTitle').textContent = product.title;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalCalories').textContent = product.calories;
  document.getElementById('modalAllergens').textContent = product.allergens;
  document.getElementById('modalPrice').textContent = product.price + '₺';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Close on outside click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Product Rendering
function createProductCard(product) {
  return `
    <div class="product-card" data-category="${product.category}" onclick="openModal(${product.id})">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-category">${product.categoryName}</div>
      <h3 class="product-title">${product.title}</h3>
      <p class="product-desc">${product.desc}</p>
      <div class="product-footer">
        <span class="product-price">${product.price}₺</span>
        <i class="fa fa-arrow-right" style="color: var(--primary); opacity: 0.5;"></i>
      </div>
    </div>
  `;
}

// Render on Products Page
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

if (productsGrid) {
  productsGrid.innerHTML = products.map(p => createProductCard(p)).join('');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const filteredProducts = filterValue === 'all' 
        ? products 
        : products.filter(p => p.category === filterValue);
        
      productsGrid.innerHTML = filteredProducts.map(p => createProductCard(p)).join('');
    });
  });
}

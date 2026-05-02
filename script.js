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
// Product Data
let products = [];
let categories = [];

// Fetch Data from Firestore
async function fetchMenuData() {
  try {
    const db = firebase.firestore();
    const doc = await db.collection('menu').doc('live').get();
    
    if (doc.exists) {
      const data = doc.data();
      categories = data.categories || [];
      
      // Map Firestore products to UI format
      products = (data.products || [])
        .filter(p => p.active !== false)
        .map(p => {
          const cat = categories.find(c => c.id === p.categoryId);
          return {
            id: p.id,
            category: cat ? cat.nameEn.toLowerCase().replace(/\s+/g, '-') : 'other',
            categoryName: cat ? cat.name : 'Diğer',
            title: p.name,
            desc: p.description,
            price: p.price,
            image: p.image,
            calories: p.calories ? p.calories + ' kcal' : '—',
            allergens: p.allergens || 'Yok'
          };
        });
    } else {
      console.log("No live menu found in database. Using local defaults.");
      useLocalDefaults();
    }
  } catch (error) {
    console.error("Error fetching menu data. Using local defaults:", error);
    useLocalDefaults();
  } finally {
    renderProductsGrid();
  }
}

function useLocalDefaults() {
  if (window.MUZOM_MENU_DATA) {
    categories = window.MUZOM_MENU_DATA.categories || [];
    products = (window.MUZOM_MENU_DATA.products || [])
      .filter(p => p.active !== false)
      .map(p => {
        const cat = categories.find(c => c.id === p.categoryId);
        return {
          id: p.id,
          category: cat ? cat.nameEn.toLowerCase().replace(/\s+/g, '-') : 'other',
          categoryName: cat ? cat.name : 'Diğer',
          title: p.name,
          desc: p.description,
          price: p.price,
          image: p.image,
          calories: p.calories ? p.calories + ' kcal' : '—',
          allergens: p.allergens || 'Yok'
        };
      });
  }
}

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
    <div class="product-card" data-category="${product.category}" onclick="openModal('${product.id}')">
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

// Render Grid
const productsGrid = document.getElementById('products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderProductsGrid(filterValue = 'all') {
  if (!productsGrid) return;
  
  const filteredProducts = filterValue === 'all' 
    ? products 
    : products.filter(p => p.category === filterValue || p.category.includes(filterValue));
    
  productsGrid.innerHTML = filteredProducts.map(p => createProductCard(p)).join('');
}

if (productsGrid) {
  // Initialize Filter Listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderProductsGrid(filterValue);
    });
  });

  // Fetch initial data
  if (typeof firebase !== 'undefined') {
    fetchMenuData();
  }
}

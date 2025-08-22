const DEFAULT_PRODUCTS = [
  {id:1,name:'Smartphone X12',price:899.00,category:'Phone',img:'images/product1.jpg',desc:'Sleek 6.7" display, 128GB storage, 48MP camera.'},
  {id:2,name:'UltraBook Pro 14',price:1499.00,category:'Laptop',img:'images/product2.jpg',desc:'Lightweight laptop with 16GB RAM and 512GB SSD.'},
  {id:3,name:'NoiseBuds Wireless',price:129.00,category:'Headphones',img:'images/product3.jpg',desc:'Active noise cancellation and 40hr battery.'},
  {id:4,name:'Aero Smartwatch',price:249.00,category:'Wearable',img:'images/product4.jpg',desc:'Fitness tracking, heart rate, 7-day battery.'},
  {id:5,name:'Pulse Bluetooth Speaker',price:89.00,category:'Audio',img:'images/product5.jpg',desc:'Waterproof portable speaker with rich bass.'},
  {id:6,name:'Alpha DSLR Camera',price:1199.00,category:'Camera',img:'images/product6.jpg',desc:'24MP sensor, 4K video, interchangeable lenses.'}
];

function loadProducts() {
  const stored = localStorage.getItem('products');
  if (!stored) {
    localStorage.setItem('products', JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  localStorage.setItem('products', JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

function currency(value) {
  return '$' + value.toFixed(2);
}

function renderProducts(containerId, products = null) {
  const list = products || loadProducts();
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'card product-card';
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p class="muted">${product.desc || ''}</p>
      <div class="product-meta">
        <div class="badge">${currency(product.price)}</div>
        <div style="display:flex;gap:8px">
          <button class="btn small" onclick="addToCart(${product.id})">Add</button>
          <a class="btn outline small" href="product.html">View</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Simple add to cart stub function
function addToCart(pid) {
  alert('Add to cart clicked for product id ' + pid);
}

// Make PRODUCTS available globally
const PRODUCTS = loadProducts();

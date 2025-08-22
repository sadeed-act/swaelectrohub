// Update cart count badge
function updateCartCount() {
  const el = document.getElementById('cartCount');
  if (!el) return;

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    cart = [];
  }

  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  el.textContent = totalQty;
}

// Render cart items on cart page
function renderCart() {
  const el = document.getElementById('cartList');
  if (!el) return;

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    cart = [];
  }

  if (cart.length === 0) {
    el.innerHTML = '<p>Your cart is empty.</p>';
    const subtotalEl = document.getElementById('subtotal');
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    return;
  }

  el.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * (item.qty || 1);

    const row = document.createElement('div');
    row.className = 'card';
    row.style.display = 'flex';
    row.style.justifyContent = 'space-between';
    row.style.alignItems = 'center';
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <div style="color:var(--muted)">
          Qty: <input type="number" min="1" value="${item.qty || 1}" style="width:60px" onchange="changeQty(${item.id}, this.value)">
        </div>
      </div>
      <div>
        <div>$${(item.price * (item.qty || 1)).toFixed(2)}</div>
        <button class="btn outline small" onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;

    el.appendChild(row);
  });

  const subtotalEl = document.getElementById('subtotal');
  if (subtotalEl) subtotalEl.textContent = '$' + total.toFixed(2);

  updateCartCount();
}

// Change quantity of a cart item
function changeQty(id, qty) {
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    cart = [];
  }

  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = Math.max(1, parseInt(qty) || 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  }
}

// Remove item from cart
function removeItem(id) {
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    cart = [];
  }

  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Add product to cart
function addToCart(pid) {
  // Load products from localStorage (or fallback to PRODUCTS if you have it globally)
  let products = [];
  try {
    products = JSON.parse(localStorage.getItem('products')) || [];
  } catch {
    products = [];
  }

  const product = products.find(p => p.id === pid);
  if (!product) {
    alert('Product not found!');
    return;
  }

  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    cart = [];
  }

  const existing = cart.find(i => i.id === pid);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Initialize cart count and cart rendering on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});

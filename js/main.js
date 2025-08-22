function currency(v){ return '$' + v.toFixed(2); }

function renderProducts(containerId, products){
  const container = document.getElementById(containerId);
  if(!container) return;

  container.innerHTML = '';
  if(products.length === 0){
    container.innerHTML = '<p>No products found.</p>';
    return;
  }

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p class="muted">${p.desc || ''}</p>
      <div class="product-meta">
        <div class="badge">${currency(p.price)}</div>
        <div style="display:flex;gap:8px">
          <button class="btn small" onclick="addToCart(${p.id})">Add</button>
          <a class="btn outline small" href="product.html">View</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let products = [];
  try {
    products = JSON.parse(localStorage.getItem('products')) || [];
  } catch {
    products = [];
  }

  // Initial render
  renderProducts('productGrid', products);

  // Filter input
  const filterInput = document.getElementById('filterInput');
  if(filterInput){
    filterInput.addEventListener('input', () => {
      const query = filterInput.value.toLowerCase().trim();
      const filtered = products.filter(p => 
        p.category.toLowerCase().includes(query) || p.name.toLowerCase().includes(query)
      );
      renderProducts('productGrid', filtered);
    });
  }

  // Sort select
  const sortSelect = document.getElementById('sortSelect');
  if(sortSelect){
    sortSelect.addEventListener('change', () => {
      let sortedProducts = [...products];
      const val = sortSelect.value;

      if(val === 'price-asc') sortedProducts.sort((a,b) => a.price - b.price);
      else if(val === 'price-desc') sortedProducts.sort((a,b) => b.price - a.price);
      else if(val === 'name-asc') sortedProducts.sort((a,b) => a.name.localeCompare(b.name));
      // Default or others keep original order

      renderProducts('productGrid', sortedProducts);
    });
  }

  // Clear filters button
  const clearBtn = document.getElementById('clearFilters');
  if(clearBtn){
    clearBtn.addEventListener('click', () => {
      filterInput.value = '';
      sortSelect.value = 'default';
      renderProducts('productGrid', products);
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('themeToggle');

  // Initialize theme based on previous selection or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Update button text to match current theme (optional)
  themeToggleBtn.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';

  themeToggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggleBtn.textContent = 'Light Mode';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggleBtn.textContent = 'Dark Mode';
    }
  });
});

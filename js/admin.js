// js/admin.js

document.addEventListener('DOMContentLoaded', () => {
  let products = loadProducts();

  const form = document.getElementById('adminForm');
  const productList = document.getElementById('adminProductList');

  function renderAdminList() {
    productList.innerHTML = '';
    products.forEach(product => {
      const div = document.createElement('div');
      div.className = 'card product-card';
      div.innerHTML = `
        <img src="${product.img}" alt="${product.name}" />
        <h4>${product.name}</h4>
        <p class="muted">${product.desc || ''}</p>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price.toFixed(2)}</p>
        <button class="btn small edit-btn" data-id="${product.id}">Edit</button>
        <button class="btn outline small delete-btn" data-id="${product.id}">Delete</button>
      `;
      productList.appendChild(div);
    });

    productList.querySelectorAll('.edit-btn').forEach(button => {
      button.onclick = () => {
        const id = parseInt(button.dataset.id);
        const product = products.find(p => p.id === id);
        if (!product) return;

        form.pid.value = product.id;
        form.pname.value = product.name;
        form.pcat.value = product.category;
        form.pprice.value = product.price;
        form.pimg.value = product.img;
      };
    });

    productList.querySelectorAll('.delete-btn').forEach(button => {
      button.onclick = () => {
        const id = parseInt(button.dataset.id);
        products = products.filter(p => p.id !== id);
        saveProducts(products);
        renderAdminList();
      };
    });
  }

  form.onsubmit = (e) => {
    e.preventDefault();

    const id = form.pid.value ? parseInt(form.pid.value) : null;
    const newProduct = {
      id: id || (products.length ? Math.max(...products.map(p => p.id)) + 1 : 1),
      name: form.pname.value.trim(),
      category: form.pcat.value.trim(),
      price: parseFloat(form.pprice.value),
      img: form.pimg.value.trim() || 'images/default.jpg',
      desc: '' // optionally add description input later
    };

    if (id) {
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index] = newProduct;
      }
    } else {
      products.push(newProduct);
    }

    saveProducts(products);
    renderAdminList();
    form.reset();
  };

  renderAdminList();
});

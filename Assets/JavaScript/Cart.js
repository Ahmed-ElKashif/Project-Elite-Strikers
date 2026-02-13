document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.querySelector(".cart-list");
  const totalBadge = document.querySelector(".item-badge");
  const subtotalEl = document.querySelector(".summary-row .summary-val");
  const totalPriceEl = document.querySelector(".total-price");
  const checkoutBtn = document.querySelector(".btn-checkout");
  const backBtn = document.querySelector(".back-btn");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "Login.html";
  }
  const cartKey = "cart_" + currentUser.email;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  function getGroupedCart() {
    const groups = {};

    cart.forEach((item) => {
      if (!groups[item.id]) {
        groups[item.id] = { ...item, qty: 0 };
      }
      groups[item.id].qty += 1;
    });

    return Object.values(groups);
  }

  function renderCart() {
    const groupedItems = getGroupedCart();

    cartList.innerHTML = "";

    let subtotal = 0;
    let totalItems = 0;

    if (groupedItems.length === 0) {
      cartList.innerHTML = `
        <div style="text-align: center; padding: 50px; color: #666;">
          <span class="material-symbols-outlined" style="font-size: 48px; margin-bottom: 10px;">shopping_bag</span>
          <p>Your locker is empty.</p>
        </div>
      `;
      updateSummary(0, 0);
      return;
    }

    groupedItems.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;

      const html = `
        <div class="cart-item">
          <div class="item-img-wrapper">
            <img class="item-img" src="${item.image}" alt="${item.name}" />
          </div>
          <div class="item-details">
            <div class="item-top">
              <h3 class="item-name">${item.name}</h3>
              <button class="delete-btn" onclick="removeItem(${item.id})">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
            <p class="item-variant">${item.brand} | ${item.category}</p>
            <div class="item-controls">
              <div class="item-size">Size: <span>US 9 (Std)</span></div>
              <div class="qty-selector">
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)">
                  <span class="material-symbols-outlined" style="font-size: 16px">remove</span>
                </button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)">
                  <span class="material-symbols-outlined" style="font-size: 16px">add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      cartList.insertAdjacentHTML("beforeend", html);
    });

    updateSummary(subtotal, totalItems);
  }

  function updateSummary(subtotal, count) {
    totalBadge.innerText = `${count} ITEMS`;

    const formattedPrice = "$" + subtotal.toFixed(2);

    if (subtotalEl) subtotalEl.innerText = formattedPrice;
    if (totalPriceEl) totalPriceEl.innerText = formattedPrice;
  }

  window.changeQuantity = function (id, change) {
    if (change === 1) {
      const itemToAdd = cart.find((i) => i.id === id);
      if (itemToAdd) cart.push(itemToAdd);
    } else {
      //find
      const index = cart.findIndex((i) => i.id === id);
      if (index > -1) cart.splice(index, 1);
    }
    saveAndRender();
  };

  window.removeItem = function (id) {
    cart = cart.filter((i) => i.id !== id);

    saveAndRender();
  };

  // save

  function saveAndRender() {
    localStorage.setItem(cartKey, JSON.stringify(cart)); // Use cartKey, not "cart"
    renderCart();
    if (window.updateCartCount) window.updateCartCount();
  }

  // back
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "Products.html";
    });
  }

  // checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) return alert("Your cart is empty!");

      const confirmCheckout = confirm(
        `Checkout now for $${cart.reduce((a, b) => a + b.price, 0).toFixed(2)}?`,
      );
      if (confirmCheckout) {
        cart = [];
        saveAndRender();
        alert("Order placed successfully! Welcome to the Elite.");
        window.location.href = "HomePage.html";
      }
    });
  }

  renderCart();
});

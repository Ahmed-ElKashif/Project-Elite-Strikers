// --- Product Data (With Dark/Red Placeholders) ---
const products = [
  {
    id: 1,
    brand: "Nike",
    name: "Phantom GX Elite",
    price: 249.99,
    oldPrice: null,
    category: "Artificial Grass",
    image: "./Assets/ItemsImages/Item1.webp",
    rating: 4,
    reviews: 95,
    isNew: false,
    isSale: false,
  },
  {
    id: 2,
    brand: "Adidas",
    name: "Predator Accuracy+",
    price: 279.99,
    oldPrice: null,
    category: "Soft Ground",
    image: "./Assets/ItemsImages/Item2.webp",
    rating: 4,
    reviews: 85,
    isNew: false,
    isSale: false,
  },
  {
    id: 3,
    brand: "Puma",
    name: "Future Ultimate",
    price: 199.99,
    oldPrice: 220.0,
    category: "Multi Ground",
    image: "./Assets/ItemsImages/Item3.webp",
    rating: 5,
    reviews: 42,
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    brand: "Mizuno",
    name: "Morelia Neo IV Beta",
    price: 319.99,
    oldPrice: null,
    category: "Firm Ground",
    image: "./Assets/ItemsImages/Item4.webp",
    rating: 5,
    reviews: 310,
    isNew: true,
    isSale: false,
  },
  {
    id: 5,
    brand: "New Balance",
    name: "Tekela V4 Pro",
    price: 214.99,
    oldPrice: null,
    category: "Multi Ground",
    image: "./Assets/ItemsImages/Item5.webp",
    rating: 4,
    reviews: 34,
    isNew: false,
    isSale: false,
  },
  {
    id: 6,
    brand: "Under Armour",
    name: "Clone Magnetico 3",
    price: 169.99,
    oldPrice: 200.0,
    category: "Firm Ground",
    image: "./Assets/ItemsImages/Item6.webp",
    rating: 4,
    reviews: 18,
    isNew: false,
    isSale: true,
  },
  {
    id: 7,
    brand: "Skechers",
    name: "SKX_01 High",
    price: 224.99,
    oldPrice: null,
    category: "Firm Ground",
    image: "./Assets/ItemsImages/Item7.webp",
    rating: 4,
    reviews: 9,
    isNew: true,
    isSale: false,
  },
  {
    id: 8,
    brand: "Lotto",
    name: "Solista 100",
    price: 129.99,
    oldPrice: 180.0,
    category: "Firm Ground",
    image: "./Assets/ItemsImages/Item8.webp",
    rating: 3,
    reviews: 15,
    isNew: false,
    isSale: true,
  },
  {
    id: 9,
    brand: "Umbro",
    name: "Tocco 3 Pro",
    price: 149.99,
    oldPrice: null,
    category: "Soft Ground",
    image: "./Assets/ItemsImages/Item9.webp",
    rating: 4,
    reviews: 22,
    isNew: false,
    isSale: false,
  },
];

// --- Selectors ---
const container = document.getElementById("products-container");
const itemCount = document.getElementById("itemCount");
const searchInput = document.getElementById("searchInput");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const brandCheckboxes = document.querySelectorAll("#brandFilters input");
const categoryButtons = document.querySelectorAll("#categoryFilters .tag");
const sortSelect = document.getElementById("sortSelect");
const clearBtn = document.getElementById("clearFilters");

// --- State ---
let activeCategory = null;

// --- Init ---
function init() {
  render(products);
  setupListeners();
}

// --- Render Function ---
function render(list) {
  container.innerHTML = "";
  itemCount.innerText = `${list.length} items`;

  if (list.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666;">No products found.</p>`;
    return;
  }

  list.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Badges
    let badge = "";
    if (product.isNew) badge = `<span class="badge">New</span>`;
    else if (product.isSale)
      badge = `<span class="badge" style="background: #ffcc00; color: #000;">Sale</span>`;

    // Price
    const priceDisplay = product.oldPrice
      ? `<span class="price">$${product.price}</span> <span class="old-price">$${product.oldPrice}</span>`
      : `<span class="price">$${product.price}</span>`;

    card.innerHTML = `
      <div class="image-container">
        ${badge}
        <img src="${product.image}" alt="${product.name}" class="product-img">
      </div>
      <div class="card-details">
        <div class="card-meta">${product.brand} | ${product.category}</div>
        <h4 class="product-name">${product.name}</h4>
        <div class="price-box">${priceDisplay}</div>
        <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// --- Filtering Logic ---
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const maxPrice = parseInt(priceRange.value);

  // Get checked brands
  const checkedBrands = Array.from(brandCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value);

  const filtered = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm);
    const matchesPrice = product.price <= maxPrice;
    const matchesBrand =
      checkedBrands.length === 0 || checkedBrands.includes(product.brand);
    const matchesCategory = activeCategory
      ? product.category === activeCategory
      : true;

    return matchesSearch && matchesPrice && matchesBrand && matchesCategory;
  });

  // Sorting
  const sortMode = sortSelect.value;
  if (sortMode === "low") filtered.sort((a, b) => a.price - b.price);
  if (sortMode === "high") filtered.sort((a, b) => b.price - a.price);

  render(filtered);
}

function setupListeners() {
  searchInput.addEventListener("input", filterProducts);

  priceRange.addEventListener("input", (e) => {
    priceValue.innerText = e.target.value;
    filterProducts();
  });

  brandCheckboxes.forEach((cb) =>
    cb.addEventListener("change", filterProducts),
  );
  sortSelect.addEventListener("change", filterProducts);

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Toggle logic
      if (activeCategory === btn.dataset.val) {
        activeCategory = null;
        btn.classList.remove("active");
      } else {
        activeCategory = btn.dataset.val;
        // Reset others
        categoryButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      }
      filterProducts();
    });
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    priceRange.value = 400;
    priceValue.innerText = "400";
    brandCheckboxes.forEach((cb) => (cb.checked = false));
    activeCategory = null;
    categoryButtons.forEach((b) => b.classList.remove("active"));
    sortSelect.value = "default";
    filterProducts();
  });
}

// --- add to cart ---
function addToCart(id) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Please log in to add items to your locker.");
    window.location.href = "Login.html";
    return;
  }

  const product = products.find((p) => p.id === id);
  if (!product) return;

  const cartKey = "cart_" + currentUser.email;

  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({
      ...product,
      qty: 1,
    });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }

  alert(`${product.name} added to your locker!`);
}

// Start
init();

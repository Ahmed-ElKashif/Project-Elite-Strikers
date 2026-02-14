window.updateCartCount = function () {
  const cartCountElement = document.getElementById("cartCount");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    if (cartCountElement) cartCountElement.style.display = "none";
    return;
  }

  const cartKey = "cart_" + currentUser.email;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  if (cartCountElement) {
    cartCountElement.innerText = totalItems;
    cartCountElement.style.display = totalItems === 0 ? "none" : "inline-flex";
  }
};
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const usernameDisplay = document.getElementById("usernameDisplay");

  const currentUser = localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;

  const path = window.location.pathname;
  const isAuthPage =
    path.includes("index.html") || path.includes("SignUp.html");

  if (!currentUser && !isAuthPage) {
    window.location.href = "index.html";
  } else if (currentUser) {
    if (usernameDisplay) {
      usernameDisplay.innerText = "Hi, " + currentUser.username;
    }
  }

  window.updateCartCount();

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("currentUser");

      window.location.href = "index.html";
    });
  }
});

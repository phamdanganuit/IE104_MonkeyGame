document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo giỏ hàng từ localStorage hoặc mảng rỗng
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  function updateCartCount() {
    const cartCountElements = document.querySelectorAll(".cart-count");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach((element) => {
      element.textContent = totalItems;
    });
  }

  // Cập nhật tổng tiền
  function updateCartTotal() {
    const totalAmountElements = document.querySelectorAll(".total-amount");
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    totalAmountElements.forEach((element) => {
      element.textContent = `${total.toLocaleString()}đ`;
    });
  }

  // Hiển thị sản phẩm trong giỏ hàng
  function updateCartItems() {
    const cartItemsContainers = document.querySelectorAll(".cart-items");

    cartItemsContainers.forEach((container) => {
      if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Giỏ hàng trống</p>';
        return;
      }

      container.innerHTML = cart
        .map(
          (item) => `
          <div class="cart-item">
          
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <p>${(item.price * item.quantity).toLocaleString()}đ</p>
              <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-id="${
                  item.id
                }">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${
                  item.id
                }">+</button>
                <button class="remove-btn" data-id="${item.id}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        `
        )
        .join("");

      // Thêm event listeners cho các nút
      container.querySelectorAll(".quantity-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.dataset.id;
          const isPlus = this.classList.contains("plus");
          updateQuantity(id, isPlus);
        });
      });

      container.querySelectorAll(".remove-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.dataset.id;
          removeFromCart(id);
        });
      });
    });
  }

  // Cập nhật số lượng sản phẩm
  function updateQuantity(id, isIncrease) {
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      if (isIncrease) {
        cart[itemIndex].quantity++;
      } else if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity--;
      }
      saveCart();
      updateCartUI();
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);
    saveCart();
    updateCartUI();
  }

  // Lưu giỏ hàng vào localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Cập nhật toàn bộ UI giỏ hàng
  function updateCartUI() {
    updateCartCount();
    updateCartTotal();
    updateCartItems();
  }

  // Thêm sản phẩm vào giỏ hàng
  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    saveCart();
    updateCartUI();
    showNotification("Đã thêm sản phẩm vào giỏ hàng!", "success");
  }

  // Hiển thị thông báo
  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Khởi tạo giỏ hàng khi tải trang
  updateCartUI();

  // Thêm event listener cho nút "Thêm vào giỏ hàng" trong trang chi tiết
  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function () {
      const product = {
        id: "cyberpunk2077", // Có thể lấy từ data attribute
        name: "Cyberpunk 2077",
        price: 811300, // Giá sau khi giảm
      };
      addToCart(product);
    });
  }
});

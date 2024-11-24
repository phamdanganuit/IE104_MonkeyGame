document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const cartItemsContainer = document.querySelector(".cart-items");
  const subtotalElement = document.querySelector(".subtotal .amount");
  const taxElement = document.querySelector(".tax .amount");
  const totalElement = document.querySelector(".total .amount");

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.innerHTML = `
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">${item.price}đ</span>
          <span class="cart-item-quantity">Số lượng: ${item.quantity}</span>
        `;
      cartItemsContainer.appendChild(itemElement);

      subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.1; // Thuế 10%
    const total = subtotal + tax;

    subtotalElement.textContent = `${subtotal}đ`;
    taxElement.textContent = `${tax}đ`;
    totalElement.textContent = `${total}đ`;
  }

  updateCart();

  const paymentForm = document.getElementById("payment-form");
  if (paymentForm) {
    paymentForm.addEventListener("submit", handlePayment);
  }

  function handlePayment(event) {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked'
    ).value;

    if (!fullname || !email || !phone) {
      showNotification("Vui lòng điền đầy đủ thông tin!", "error");
      return;
    }

    console.log("Thanh toán thành công!");
    console.log("Họ và tên:", fullname);
    console.log("Email:", email);
    console.log("Số điện thoại:", phone);
    console.log("Phương thức thanh toán:", paymentMethod);

    showNotification(
      "Thanh toán thành công! Cảm ơn bạn đã mua hàng.",
      "success"
    );

    localStorage.removeItem("cart");

    setTimeout(() => {
      window.location.href = "../pages/home.html";
    }, 2000);
  }

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
});

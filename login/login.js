document.addEventListener("DOMContentLoaded", function () {
  // Khởi tạo animation
  const animation = lottie.loadAnimation({
    container: document.getElementById("lottie-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "animation.json", // Đảm bảo tệp animation.json có sẵn
  });

  // Xử lý đăng nhập
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  // Xử lý hiển thị/ẩn mật khẩu
  const toggleButtons = document.querySelectorAll(".toggle-password");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.previousElementSibling;
      const icon = this.querySelector("i");

      if (input.type === "password") {
        input.type = "text";
        icon.className = "fa-regular fa-eye";
      } else {
        input.type = "password";
        icon.className = "fa-regular fa-eye-slash";
      }
    });
  });
});

// Xử lý đăng nhập
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  // Debug: Kiểm tra giá trị nhập vào
  console.log("Email:", email);
  console.log("Password:", password);

  // Lấy thông tin user từ localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Debug: Kiểm tra danh sách users
  console.log("Users:", users);

  // Tìm user trong danh sách
  const user = users.find((u) => u.email === email && u.password === password);

  // Debug: Kiểm tra user tìm được
  console.log("Found user:", user);

  if (user) {
    // Lưu trạng thái đăng nhập
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Hiển thị thông báo thành công
    showNotification("Đăng nhập thành công!", "success");

    // Chuyển hướng về trang home
    setTimeout(() => {
      window.location.href = "../pages/home.html";
    }, 2000); // Đợi 2 giây để người dùng xem thông báo
  } else {
    showNotification("Email hoặc mật khẩu không chính xác!", "error");
  }
}

// Hàm hiển thị thông báo
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

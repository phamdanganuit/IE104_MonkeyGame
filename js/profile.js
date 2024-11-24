document.addEventListener("DOMContentLoaded", function () {
  // Lấy thông tin user từ localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Nếu không có user, chuyển về trang login
  if (!currentUser) {
    window.location.href = "/login/login.html";
    return;
  }

  // Cập nhật thông tin profile
  document.getElementById("fullname").value = currentUser.username || "";
  document.getElementById("email").value = currentUser.email || "";
  document.getElementById("phone").value = currentUser.phone || "";
  document.getElementById("profile-email").querySelector("span").textContent =
    currentUser.email || "";

  // Xử lý nút chỉnh sửa
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.previousElementSibling;
      input.readOnly = !input.readOnly;
      input.focus();

      if (!input.readOnly) {
        this.innerHTML = '<i class="fas fa-check"></i>';
        this.style.color = "#4CAF50";
      } else {
        this.innerHTML = '<i class="fas fa-pen"></i>';
        this.style.color = "#999";

        // Lưu thay đổi
        saveChanges();
      }
    });
  });

  // Xử lý nút copy link giới thiệu
  const copyBtn = document.querySelector(".copy-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      const referralLink = document.querySelector(".referral-link input");
      referralLink.select();
      document.execCommand("copy");

      // Thông báo đã copy
      this.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-copy"></i>';
      }, 2000);
    });
  }

  // Hàm lưu thay đổi
  function saveChanges() {
    const updatedUser = {
      ...currentUser,
      username: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
    };

    // Cập nhật trong localStorage
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Cập nhật danh sách users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Hiển thị thông báo
    showNotification("Cập nhật thông tin thành công!", "success");
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

  // Thêm xử lý đổi mật khẩu
  const passwordForm = document.getElementById("password-form");
  if (passwordForm) {
    passwordForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const currentPassword = document.getElementById("current-password").value;
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      // Kiểm tra mật khẩu hiện tại
      if (currentPassword !== currentUser.password) {
        showNotification("Mật khẩu hiện tại không đúng", "error");
        return;
      }

      // Kiểm tra mật khẩu mới
      if (newPassword.length < 6) {
        showNotification("Mật khẩu mới phải có ít nhất 6 ký tự", "error");
        return;
      }

      // Kiểm tra xác nhận mật khẩu
      if (newPassword !== confirmPassword) {
        showNotification("Xác nhận mật khẩu không khớp", "error");
        return;
      }

      // Cập nhật mật khẩu
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userIndex = users.findIndex((u) => u.email === currentUser.email);

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(users));

        // Cập nhật currentUser
        currentUser.password = newPassword;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        showNotification("Đổi mật khẩu thành công", "success");

        // Reset form
        passwordForm.reset();
      }
    });

    // Xử lý hiển thị/ẩn mật khẩu
    const toggleButtons = document.querySelectorAll(".toggle-password");
    toggleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const input = this.previousElementSibling;
        const icon = this.querySelector("i");

        if (input.type === "password") {
          input.type = "text";
          icon.className = "fas fa-eye";
        } else {
          input.type = "password";
          icon.className = "fas fa-eye-slash";
        }
      });
    });
  }

  // Xử lý nút đăng xuất
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.href = "/pages/home.html";
    });
  }
});

// Hàm "../ toàn cục
window.handleLogout = function (event) {
  if (event) {
    event.preventDefault();
  }
  localStorage.removeItem("currentUser");
  window.location.href = "home.html";
};

// Thêm event listener cho nút đăng xuất khi trang load
document.addEventListener("DOMContentLoaded", function () {
  const logoutLinks = document.querySelectorAll(
    '.logout-btn, [onclick="handleLogout(event)"]'
  );
  logoutLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.href = "home.html";
    });
  });
});

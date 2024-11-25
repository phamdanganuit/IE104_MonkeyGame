document.addEventListener("DOMContentLoaded", function () {
  // Kiểm tra đăng nhập ngay khi trang load
  checkLoginStatus();

  // Banner Slider
  const slides = document.querySelectorAll(".banner-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".banner-nav.prev");
  const nextBtn = document.querySelector(".banner-nav.next");
  let currentSlide = 0;
  let slideInterval;

  // Hàm bắt đầu slideshow
  function startSlideShow() {
    slideInterval = setInterval(nextSlide, 4000); // Chuyển slide sau mỗi 4 giây
  }

  // Hàm dừng slideshow
  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  // Hàm cập nhật trạng thái slides
  function updateSlides() {
    // Ẩn tất cả slides
    slides.forEach((slide) => {
      slide.style.opacity = "0";
      slide.classList.remove("active");
    });
    dots.forEach((dot) => dot.classList.remove("active"));

    // Hiện slide hiện tại
    slides[currentSlide].style.opacity = "1";
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  // Hàm chuyển đến slide tiếp theo
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }

  // Hàm chuyển đến slide trước
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }

  // Xử lý sự kiện click nút prev
  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopSlideShow();
    startSlideShow(); // Khởi động lại slideshow
  });

  // Xử lý sự kiện click nút next
  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopSlideShow();
    startSlideShow(); // Khởi động lại slideshow
  });

  // Xử lý sự kiện click dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlides();
      stopSlideShow();
      startSlideShow(); // Khởi động lại slideshow
    });
  });

  // Dừng slideshow khi hover vào banner
  const banner = document.querySelector(".store-banner");
  banner.addEventListener("mouseenter", stopSlideShow);
  banner.addEventListener("mouseleave", startSlideShow);

  // Bắt đầu slideshow khi trang được tải
  startSlideShow();

  // Game Sections Scroll
  const gameSections = document.querySelectorAll(".game-section");

  gameSections.forEach((section) => {
    const gameGrid = section.querySelector(".game-grid");
    const prevBtn = section.querySelector(".section-nav.prev");
    const nextBtn = section.querySelector(".section-nav.next");

    // Tính toán khoảng cách scroll
    const scrollAmount = gameGrid.offsetWidth;

    // Ẩn nút prev ban đầu
    prevBtn.style.opacity = "0";
    prevBtn.style.cursor = "default";

    // Xử lý click nút next
    nextBtn.addEventListener("click", () => {
      gameGrid.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    });

    // Xử lý click nút prev
    prevBtn.addEventListener("click", () => {
      gameGrid.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    });

    // Kiểm tra scroll position để hiện/ẩn nút
    gameGrid.addEventListener("scroll", () => {
      // Hiện/ẩn nút prev
      if (gameGrid.scrollLeft > 0) {
        prevBtn.style.opacity = "1";
        prevBtn.style.cursor = "pointer";
      } else {
        prevBtn.style.opacity = "0";
        prevBtn.style.cursor = "default";
      }

      // Hiện/ẩn nút next
      if (
        gameGrid.scrollLeft >=
        gameGrid.scrollWidth - gameGrid.offsetWidth - 10
      ) {
        nextBtn.style.opacity = "0";
        nextBtn.style.cursor = "default";
      } else {
        nextBtn.style.opacity = "1";
        nextBtn.style.cursor = "pointer";
      }
    });
  });

  // Thêm các hàm xử lý đăng nhập/đăng ký
  function saveUserData(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  function getUserData() {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  }

  function isLoggedIn() {
    return !!getUserData();
  }

  function logout() {
    localStorage.removeItem("userData");
    window.location.href = "login.html";
  }

  // Hàm kiểm tra trạng thái đăng nhập và cập nhật UI
  function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const loginBtn = document.querySelector(".nav__login-btn");

    console.log("Current user:", currentUser); // Debug
    console.log("Login button:", loginBtn); // Debug

    if (currentUser && loginBtn) {
      // Tạo container cho cart và user menu
      const userContainer = document.createElement("div");
      userContainer.className = "nav__user-container";

      // Tạo cart icon
      const cartMenu = document.createElement("div");
      cartMenu.className = "nav__cart-menu";
      cartMenu.innerHTML = `
                <div class="nav__cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="cart-count">0</span>
                </div>
                <div class="nav__cart-dropdown">
                    <div class="cart-header">
                        <h3>Giỏ hàng</h3>
                    </div>
                    <div class="cart-items">
                        <p class="empty-cart">Giỏ hàng trống</p>
                    </div>
                    <div class="cart-footer">
                        <div class="cart-total">
                            <span>Tổng cộng:</span>
                            <span class="total-amount">0đ</span>
                        </div>
                        <a href="checkout.html" class="checkout-btn">Thanh toán</a>
                    </div>
                </div>
            `;

      const userMenu = document.createElement("div");
      userMenu.className = "nav__user-menu";
      userMenu.innerHTML = `
                <div class="nav__user-info">
                    <i class="fas fa-user-circle"></i>
                    <span>${currentUser.username}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="nav__user-dropdown">
                    <a href="profile.html" class="dropdown-item">
                        <i class="fas fa-user"></i>
                        <span>Hồ sơ</span>
                    </a>
                    <a href="balance.html" class="dropdown-item">
                        <i class="fas fa-wallet"></i>
                        <span>Số dư tài khoản</span>
                    </a>
                    <a href="history.html" class="dropdown-item">
                        <i class="fas fa-gamepad"></i>
                        <span>Lịch sử mua</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    
                </div>
            `;

      // Thêm cả cart và user menu vào container
      userContainer.appendChild(cartMenu);
      userContainer.appendChild(userMenu);

      // Thay thế nút đăng nhập bằng container
      loginBtn.parentNode.replaceChild(userContainer, loginBtn);
    }
  }

  // Xử lý đăng ký
  function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Lưu thông tin đăng ký
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Chuyển đến trang đăng nhập
    window.location.href = "login.html";
  }

  // Xử lý đăng nhập
  function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    // Lấy thông tin user từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm user trong danh sách
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Lưu trạng thái đăng nhập
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Thông báo thành công
      alert("Đăng nhập thành công!");

      // Chuyển hướng về trang chủ
      window.location.href = "home.html";
    } else {
      alert("Email hoặc mật khẩu không chính xác!");
    }
  }

  // Xử lý cập nhật profile
  function handleProfileUpdate(event) {
    event.preventDefault();
    const userData = getUserData();
    if (!userData) return;

    const newUsername = document.getElementById("username").value;
    const newEmail = document.getElementById("email").value;
    const newPassword = document.getElementById("newPassword").value;

    // Cập nhật thông tin người dùng
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u) => u.email === userData.email);

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        username: newUsername || users[userIndex].username,
        email: newEmail || users[userIndex].email,
        password: newPassword || users[userIndex].password,
      };

      localStorage.setItem("users", JSON.stringify(users));
      saveUserData(users[userIndex]);

      alert("Cập nhật thông tin thành công!");
      window.location.reload();
    }
  }

  // Thêm event listeners cho các form
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    // Load user data vào form
    const userData = getUserData();
    if (userData) {
      document.getElementById("username").value = userData.username;
      document.getElementById("email").value = userData.email;
      document.getElementById("profileUsername").textContent =
        userData.username;
      document.getElementById("profileEmail").textContent = userData.email;
    }

    profileForm.addEventListener("submit", handleProfileUpdate);
  }

  // Hàm xử lý đăng xuất
  window.handleLogout = function (event) {
    event.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.href = "login/login.html";
  };

  // Thêm event listener cho nút thanh toán
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("checkout-btn")) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      if (cartItems.length === 0) {
        e.preventDefault();
        alert("Giỏ hàng của bạn đang trống!");
      }
    }
  });

  // Xử lý click vào game card
  const gameCards = document.querySelectorAll(".game-card");
  gameCards.forEach((card) => {
    card.style.cursor = "default";
  });

  // Thêm event listener cho game title
  const gameTitles = document.querySelectorAll(".game-title");
  gameTitles.forEach((title) => {
    title.style.cursor = "pointer";
  });
});

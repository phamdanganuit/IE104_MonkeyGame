document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo animation
    const animation = lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animation.json'
    });

    // Xử lý đăng ký
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Xử lý hiển thị/ẩn mật khẩu
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fa-regular fa-eye';
            } else {
                input.type = 'password';
                icon.className = 'fa-regular fa-eye-slash';
            }
        });
    });
});

// Hàm xử lý đăng ký
function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Kiểm tra form
    if (!validateForm(username, email, password, confirmPassword)) {
        return;
    }

    // Lấy danh sách users từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra email đã tồn tại
    if (users.some(user => user.email === email)) {
        showNotification('Email này đã được đăng ký!', 'error');
        return;
    }

    // Tạo user mới
    const newUser = {
        username,
        email,
        password,
        createdAt: new Date().toISOString()
    };

    // Thêm user mới vào mảng
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Hiển thị thông báo thành công
    showNotification('Đăng ký thành công!', 'success');

    // Chuyển hướng sau 1.5 giây
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Hàm kiểm tra form
function validateForm(username, email, password, confirmPassword) {
    if (!username || username.length < 3) {
        showNotification('Tên tài khoản phải có ít nhất 3 ký tự', 'error');
        return false;
    }

    if (!isValidEmail(email)) {
        showNotification('Email không hợp lệ', 'error');
        return false;
    }

    if (!password || password.length < 6) {
        showNotification('Mật khẩu phải có ít nhất 6 ký tự', 'error');
        return false;
    }

    if (password !== confirmPassword) {
        showNotification('Mật khẩu xác nhận không khớp', 'error');
        return false;
    }

    return true;
}

// Hàm kiểm tra email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Hàm hiển thị thông báo
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 
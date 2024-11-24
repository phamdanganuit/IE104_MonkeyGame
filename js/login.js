document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo animation
    const animation = lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'animation.json'
    });

    // Xử lý đăng nhập
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
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

// Xử lý đăng nhập
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Lấy thông tin user từ localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Tìm user trong danh sách
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Lưu trạng thái đăng nhập
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Hiển thị thông báo thành công
        showNotification('Đăng nhập thành công!', 'success');
        
        // Chuyển hướng về trang home sau 1.5 giây
        setTimeout(() => {
            window.location.href = '../home.html';
        }, 1500);
    } else {
        showNotification('Email hoặc mật khẩu không chính xác!', 'error');
    }
}

// Hàm hiển thị thông báo
function showNotification(message, type) {
    // Xóa thông báo cũ nếu có
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Thêm class show sau một khoảng thời gian ngắn để có animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Tự động ẩn thông báo sau 3 giây
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Hàm kiểm tra email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
} 
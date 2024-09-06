document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    const errorMessage = document.querySelector('#errorMessage');
 
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
 
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
 
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
 
        if (username === storedUsername && password === storedPassword) {
            errorMessage.textContent = 'התחברת בהצלחה';
            errorMessage.style.color = '#28a745';
 
            // Redirect to the main page after a short delay
            setTimeout(() => {
                window.location.href = '/html/main.html'; // Change to your main page URL
            }, 2000); // 2000 milliseconds = 2 seconds
        } else {
            errorMessage.textContent = 'שם המשתמש או הסיסמה אינם נכונים';
            errorMessage.style.color = '#dc3545';
        }
    });
 });
 
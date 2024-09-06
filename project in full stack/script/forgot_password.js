document.addEventListener('DOMContentLoaded', function() {
    const forgotPasswordForm = document.querySelector('#forgotPasswordForm');
    const resetMessage = document.querySelector('#resetMessage');
 
    forgotPasswordForm.addEventListener('submit', function(event) {
        event.preventDefault();
 
        const resetUsername = document.querySelector('#resetUsername').value;
        const storedUsername = localStorage.getItem('username');
 
        if (resetUsername === storedUsername) {
            // Ideally, a password reset link or process would be handled here.
            resetMessage.textContent = 'קישור לשחזור הסיסמה נשלח למייל שלך (לדוגמה)';
            resetMessage.style.color = '#28a745';
        } else {
            resetMessage.textContent = 'שם המשתמש אינו קיים';
            resetMessage.style.color = '#dc3545';
        }
    });
 });
 
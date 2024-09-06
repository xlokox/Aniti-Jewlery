document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');
 
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // מניעת שליחת הטופס בצורה רגילה
 
        const username = document.getElementById('newUsername').value;
        const password = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
 
        if (password !== confirmPassword) {
            registerMessage.textContent = 'הסיסמאות אינן תואמות';
            registerMessage.style.color = '#dc3545'; // צבע אדום לשגיאה
            return;
        }
 
        if (password.length < 6) { // דוגמה לבדיקה נוספת
            registerMessage.textContent = 'הסיסמה חייבת להיות באורך של לפחות 6 תווים';
            registerMessage.style.color = '#dc3545'; // צבע אדום לשגיאה
            return;
        }
 
        // אפשרות לצפנת סיסמאות
        // const encryptedPassword = btoa(password); // דוגמה פשוטה לצפנה בסיסית
 
        try {
            // Save user data in localStorage
            localStorage.setItem('username', username);
            localStorage.setItem('password', password); // לשים לב לצפנת הסיסמאות
 
            registerMessage.textContent = 'ההרשמה בוצעה בהצלחה';
            registerMessage.style.color = '#28a745'; // צבע ירוק להצלחה
            registerForm.reset();
 
            // Redirect to the main page after a short delay
            setTimeout(() => {
                window.location.href = 'index.html'; // שים כאן את ה-URL של הדף הראשי שלך
            }, 2000); // 2000 milliseconds = 2 seconds
        } catch (error) {
            console.error('שגיאה בשמירה ל-localStorage:', error);
            registerMessage.textContent = 'שגיאה בשמירה של פרטי ההרשמה';
            registerMessage.style.color = '#dc3545'; // צבע אדום לשגיאה
        }
    });
 });
 
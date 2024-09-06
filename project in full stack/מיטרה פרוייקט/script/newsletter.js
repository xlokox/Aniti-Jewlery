document.addEventListener('DOMContentLoaded', () => {
    const subscribeButton = document.querySelector('#subscribe-btn');
    
    subscribeButton.addEventListener('click', () => {
        const email = document.querySelector('#email').value;
        const optIn = document.querySelector('#newsletter-opt-in').checked;

        if (email && optIn) {
            alert('תודה על ההרשמה לניוזלטר!');
            // פה נבצע הפניה לעמוד הרהיטים לאחר ההרשמה
            window.location.href = 'index.html'; // שנה לכתובת של עמוד הרהיטים שלך
        } else {
            alert('אנא מלא את כל השדות וודא שאתה מסכים לקבל הודעות דוא"ל.');
        }
    });
});

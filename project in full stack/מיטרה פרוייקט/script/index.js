document.addEventListener('DOMContentLoaded', () => {
    // משתנה לשמירת מספר הפריטים בעגלה
    let cartCount = 0;

    // פונקציה שמתחילה טיימר שמראה זמן שנשאר להצגת באנר
    function startBannerTimer(durationInSeconds) {
        let secondsLeft = durationInSeconds;
        const timerElement = document.querySelector('#banner-timer');

        if (!timerElement) {
            console.error('Element with ID "banner-timer" not found');
            return;
        }

        const interval = setInterval(() => {
            secondsLeft--;
            timerElement.textContent = `זמן נותר: ${secondsLeft} שניות`;
            if (secondsLeft <= 0) {
                clearInterval(interval);
                timerElement.textContent = 'הזמן פג';
            }
        }, 1000);
    }

    // התחלת הטיימר ל-10 שניות
    startBannerTimer(10);

    // הוספת מאזיני אירועים לכל הכפתורים בבאנרים
    const bannerButtons = document.querySelectorAll('.banner-button');
    bannerButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const url = event.target.getAttribute('data-url');
            if (url) {
                try {
                    const formattedUrl = new URL(url, window.location.origin);
                    window.open(formattedUrl, '_blank');
                } catch (e) {
                    console.error('URL is not valid:', url);
                }
            } else {
                console.error('No URL specified for button');
            }
        });
    });

    // פונקציה לטיפול בלחיצה על כפתור "קנה עכשיו"
    function handlePurchaseButtonClick() {
        alert('תתחדש! המוצר יגיע לכתובתך בעוד כשבוע');
    }

    // פונקציה לטיפול בלחיצה על כפתור "הוסף לסל"
    function handleAddToCartClick() {
        alert('המוצר התווסף לעגלה בהצלחה!');
        cartCount++; // הגדלת מספר הפריטים בעגלה
        updateCartCount(); // עדכון התצוגה של העגלה
    }

    // פונקציה לעדכון התצוגה של מספר הפריטים בעגלה
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        cartCountElement.textContent = cartCount; // עדכון מספר הפריטים
    }

    // חיבור הפונקציה לכל כפתורי "קנה עכשיו" ו"הוסף לסל"
    const purchaseButtons = document.querySelectorAll('button');
    purchaseButtons.forEach(button => {
        if (button.textContent.includes('קנה עכשיו')) {
            button.addEventListener('click', handlePurchaseButtonClick);
        } else if (button.textContent.includes('הוסף לסל')) {
            button.addEventListener('click', handleAddToCartClick);
        }
    });
});

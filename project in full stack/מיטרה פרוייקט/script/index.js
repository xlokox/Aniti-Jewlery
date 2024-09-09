// מאזין לאירוע 'DOMContentLoaded' שמוודא שהקוד יופעל רק לאחר שהעמוד נטען במלואו
document.addEventListener('DOMContentLoaded', () => {
    // פונקציה שמתחילה טיימר שמראה זמן שנשאר להצגת באנר
    function startBannerTimer(durationInSeconds) {
        let secondsLeft = durationInSeconds; // משתנה שמחזיק את כמות השניות שנותרו
        const timerElement = document.querySelector('#banner-timer'); // בחירת אלמנט ה-timer מה-HTML לפי ה-ID שלו

        // בדיקה אם האלמנט של ה-timer קיים בעמוד, אם לא קיים, הצגת שגיאה בקונסול
        if (!timerElement) {
            console.error('Element with ID "banner-timer" not found');
            return;
        }

        // יצירת טיימר שמפחית שנייה אחת בכל שנייה
        const interval = setInterval(() => {
            secondsLeft--; // הפחתת שנייה אחת מהזמן שנותר
            timerElement.textContent = `זמן נותר: ${secondsLeft} שניות`; // עדכון טקסט התצוגה של ה-timer

            // אם הזמן נגמר, עצירת הטיימר והצגת הודעה מתאימה
            if (secondsLeft <= 0) {
                clearInterval(interval); // עצירת הטיימר
                timerElement.textContent = 'הזמן פג'; // עדכון הטקסט שהזמן נגמר
            }
        }, 1000); // קביעת זמן הפחתה בכל שנייה אחת (1000 מילישניות)
    }

    // התחלת הטיימר ל-10 שניות
    startBannerTimer(10);

    // הוספת מאזיני אירועים לכל הכפתורים בבאנרים
    const bannerButtons = document.querySelectorAll('.banner-button'); // בחירת כל הכפתורים שמפעילים באנרים לפי מחלקה מסוימת
    bannerButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const url = event.target.getAttribute('data-url'); // קבלת ה-URL מהמאפיין 'data-url' של הכפתור
            if (url) { // בדיקה אם יש URL תקין
                try {
                    const formattedUrl = new URL(url, window.location.origin); // יצירת URL מוחלט יחסית לדומיין הנוכחי
                    window.open(formattedUrl, '_blank'); // פתיחת ה-URL בחלון חדש
                } catch (e) {
                    console.error('URL is not valid:', url); // טיפול בשגיאה אם ה-URL אינו תקין
                }
            } else {
                console.error('No URL specified for button'); // אם לא הוגדר URL לכפתור
            }
        });
    });

    // פונקציה לטיפול בלחיצה על כפתור "קנה עכשיו"
    function handlePurchaseButtonClick() {
        console.log('Button clicked'); // בדיקה אם הפונקציה עובדת
        alert('תתחדש! המוצר יגיע לכתובתך בעוד כשבוע'); // הצגת הודעה למשתמש
    }

    // חיבור הפונקציה לכל כפתורי "קנה עכשיו"
    const purchaseButtons = document.querySelectorAll('button'); // בחירת כל הכפתורים בעמוד
    purchaseButtons.forEach(button => {
        // בדיקה אם הטקסט של הכפתור הוא "קנה עכשיו", לאחר ניקוי רווחים מיותרים כדי למנוע טעויות בזיהוי
        if (button.textContent.trim().includes('קנה עכשיו')) {
            button.addEventListener('click', handlePurchaseButtonClick); // חיבור אירוע לחיצה
        }
    });
});

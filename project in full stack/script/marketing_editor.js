// הודעה לקונסול לוודא שהקובץ נטען בהצלחה
console.log('JavaScript file loaded');

// מאזין לאירוע 'submit' של הטופס ומונע את השליחה הרגילה של הטופס
document.getElementById('marketingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // מונע את פעולת השליחה הרגילה של הטופס

    // איסוף הנתונים מהשדות של הטופס
    const title = document.getElementById('marketingTitle').value; // כותרת הדף
    const content = document.getElementById('marketingContent').value; // תוכן הדף
    const image = document.getElementById('marketingImage').files[0]; // קובץ התמונה שנבחר
    const color = document.getElementById('marketingColor').value; // צבע הרקע שנבחר

    // בדיקה אם כל השדות מולאו
    if (title && content && image && color) {
        // בדיקה אם הקובץ שנבחר הוא קובץ תמונה
        if (!image.type.startsWith('image/')) {
            alert('נא לבחור קובץ תמונה בלבד.'); // הצגת הודעה אם הקובץ אינו תמונה
            return; // יציאה מהפונקציה
        }

        // יצירת אובייקט FileReader לקריאת התמונה
        const reader = new FileReader();
        reader.onload = function(e) {
            // יצירת אובייקט דף השיווק עם הנתונים שנאספו
            const marketingPage = {
                type: 'marketingPage', // סוג הדף (דף שיווק)
                title: title, // הכותרת שנבחרה
                content: content, // התוכן שנבחר
                image: e.target.result, // התמונה בקידוד Base64
                color: color // צבע הרקע
            };

            try {
                // טעינת פריטים קיימים מ-localStorage או יצירת מערך חדש אם אין פריטים קיימים
                let items = JSON.parse(localStorage.getItem('items')) || [];
                console.log('Current items:', items); // הצגת הפריטים הנוכחיים בקונסול
                items.push(marketingPage); // הוספת הדף החדש למערך הפריטים
                localStorage.setItem('items', JSON.stringify(items)); // שמירת המערך המעודכן ב-localStorage
                console.log('Items saved:', JSON.parse(localStorage.getItem('items'))); // הצגת הפריטים השמורים בקונסול

                alert('דף השיווק נשמר בהצלחה!'); // הודעה למשתמש שהדף נשמר בהצלחה
                window.location.href = '../html/main.html'; // העברת המשתמש לדף הראשי
            } catch (error) {
                // טיפול בשגיאה אם מתרחשת בעיה בשמירה ב-localStorage
                console.error('שגיאה בשמירה ל-localStorage:', error);
                alert('שגיאה בשמירה של דף השיווק.');
            }
        };
        // קריאת קובץ התמונה בקידוד Base64
        reader.readAsDataURL(image);
    } else {
        // הודעה למשתמש למלא את כל השדות אם לא מולאו כולם
        alert('אנא מלא את כל השדות.');
    }
});

// מאזין לאירועי 'input' לכל השדות בטופס לעדכון התצוגה המקדימה בזמן אמת
document.querySelectorAll('#marketingForm input, #marketingForm textarea').forEach(input => {
    input.addEventListener('input', updatePreview); // חיבור אירוע 'input' לכל שדה בטופס
});

// פונקציה לעדכון התצוגה המקדימה של דף השיווק
function updatePreview() {
    const title = document.getElementById('marketingTitle').value || ''; // קבלת כותרת מהטופס
    const content = document.getElementById('marketingContent').value || ''; // קבלת תוכן מהטופס
    const image = document.getElementById('marketingImage').files[0]; // קבלת קובץ התמונה מהטופס
    const color = document.getElementById('marketingColor').value || '#ffffff'; // קבלת צבע הרקע או צבע ברירת מחדל

    // בחירת האלמנטים של התצוגה המקדימה
    const previewTitle = document.getElementById('previewTitle'); // הכותרת בתצוגה המקדימה
    const previewContent = document.getElementById('previewContent'); // התוכן בתצוגה המקדימה
    const previewImage = document.getElementById('previewImage'); // התמונה בתצוגה המקדימה

    // עדכון תוכן התצוגה המקדימה לפי הנתונים שהוזנו בטופס
    previewTitle.textContent = title; // עדכון הכותרת בתצוגה המקדימה
    previewContent.textContent = content; // עדכון התוכן בתצוגה המקדימה

    // עדכון התמונה בתצוגה המקדימה אם נבחרה תמונה
    if (image) {
        const objectURL = URL.createObjectURL(image); // יצירת URL זמני לתמונה שנבחרה
        previewImage.src = objectURL; // הגדרת התמונה בתצוגה המקדימה
        previewImage.style.backgroundColor = color; // הגדרת צבע הרקע של התמונה

        // שחרור ה-URL הזמני לאחר 10 שניות כדי למנוע זליגה של משאבים
        setTimeout(() => URL.revokeObjectURL(objectURL), 10000); 
    } else {
        // אם לא נבחרה תמונה, הגדרת רקע ותמונה ריקה בתצוגה המקדימה
        previewImage.src = '';
        previewImage.style.backgroundColor = color; 
    }
}
// פונקציה לתפעול המבורגר
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn'); // בחירת כפתור ההמבורגר
    const menu = document.querySelector('.menu'); // בחירת התפריט

    // בדיקה אם כפתור ההמבורגר והתפריט קיימים בעמוד
    if (menuBtn && menu) {
        // הוספת מאזין לאירוע לחיצה על כפתור ההמבורגר
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('open'); // פתיחת וסגירת התפריט
        });
    }
});

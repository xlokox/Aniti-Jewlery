document.addEventListener('DOMContentLoaded', function() {
    // קריאה לפונקציה שמטענת את כל הפריטים מה-localStorage כשכל הדף נטען
    loadItems();

    // פונקציה לטעינת הפריטים מה-localStorage והצגתם בטבלה
    function loadItems() {
        const tableBody = document.querySelector('#itemsTableBody'); // בחירת גוף הטבלה שבה יוצגו הפריטים
        tableBody.innerHTML = ''; // ניקוי תוכן קיים בטבלה לפני הצגת פריטים חדשים

        // קריאה לפריטים מה-localStorage, אם אין פריטים, מאתחל למערך ריק
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach((item, index) => { // עובר על כל פריט במערך ומוסיף אותו לטבלה
            const row = document.createElement('tr'); // יצירת שורה חדשה בטבלה

            // יצירת תא לטור "סוג" והוספתו לשורה
            const typeCell = document.createElement('td');
            typeCell.textContent = item.type; // הכנסת הטקסט של סוג הפריט
            row.appendChild(typeCell);

            // יצירת תא לטור "כותרת" והוספתו לשורה
            const titleCell = document.createElement('td');
            titleCell.textContent = item.title; // הכנסת הטקסט של כותרת הפריט
            row.appendChild(titleCell);

            // יצירת תא לטור "תוכן/תמונה" והוספתו לשורה
            const contentCell = document.createElement('td');
            if (item.type === 'banner' || item.type === 'marketing') { // בדיקה אם הפריט הוא באנר או דף שיווקי
                if (item.image) { // אם יש תמונה לפריט
                    const img = document.createElement('img');
                    img.src = item.image; // הכנסת נתיב התמונה (בדרך כלל Base64)
                    img.alt = 'Image';
                    img.className = 'table-image'; // הוספת מחלקה לעיצוב התמונה
                    contentCell.appendChild(img); // הוספת התמונה לתא
                } else {
                    contentCell.textContent = 'No image available'; // הודעה אם אין תמונה
                }
            } else if (item.type === 'landingPage') { // אם הפריט הוא דף נחיתה
                const contentDiv = document.createElement('div');
                contentDiv.className = 'table-content';
                const contentText = document.createElement('p');
                contentText.textContent = item.content || 'No content available'; // הצגת התוכן או הודעה שאין תוכן
                contentDiv.appendChild(contentText);
                contentCell.appendChild(contentDiv);
            }
            row.appendChild(contentCell);

            // יצירת תא לטור "פעולות" והוספת כפתורי פעולה (הצג, ערוך, מחק)
            const actionsCell = document.createElement('td');
            actionsCell.className = 'actions';

            // כפתור "הצג" להצגת הפריט
            const viewButton = document.createElement('button');
            viewButton.textContent = 'הצג';
            viewButton.className = 'view';
            viewButton.addEventListener('click', () => viewItem(item)); // קריאה לפונקציה שמציגה את הפריט
            actionsCell.appendChild(viewButton);

            // כפתור "ערוך" לעריכת הפריט
            const editButton = document.createElement('button');
            editButton.textContent = 'ערוך';
            editButton.className = 'edit';
            editButton.addEventListener('click', () => editItem(index)); // קריאה לפונקציה שמעריכה את הפריט
            actionsCell.appendChild(editButton);

            // כפתור "מחק" למחיקת הפריט
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'מחק';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () => deleteItem(index)); // קריאה לפונקציה שמוחקת את הפריט
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell); // הוספת תא הפעולות לשורה

            tableBody.appendChild(row); // הוספת השורה לטבלה
        });
    }

    // פונקציה להצגת פריט בתצוגה מקדימה
    function viewItem(item) {
        const previewSection = document.querySelector('#preview'); // בחירת אזור התצוגה המקדימה
        previewSection.innerHTML = ''; // ניקוי התוכן הקיים בתצוגה המקדימה

        const previewContent = document.createElement('div');
        previewContent.className = 'preview-content';
        
        if (item.type === 'banner' || item.type === 'marketing') { // הצגת פריטי באנר ושיווק
            if (item.image) {
                const img = document.createElement('img');
                img.src = item.image;
                img.alt = 'Image';
                img.className = 'preview-image'; // הוספת מחלקה לעיצוב התמונה
                previewContent.appendChild(img);
            }
            const title = document.createElement('h1');
            title.textContent = item.title; // הוספת הכותרת לתצוגה המקדימה
            previewContent.appendChild(title);
        } else if (item.type === 'landingPage') { // הצגת פריטי דף נחיתה
            const title = document.createElement('h1');
            title.textContent = item.title;
            const subtitle = document.createElement('h2');
            subtitle.textContent = item.subtitle || 'No subtitle available'; // הצגת כותרת משנה אם קיימת
            const content = document.createElement('p');
            content.textContent = item.content || 'No content available'; // הצגת התוכן אם קיים
            const cta = document.createElement('a');
            cta.href = item.ctaLink || '#'; // קישור לקריאה לפעולה
            cta.textContent = item.ctaText || 'No CTA text';
            cta.className = 'cta-link';

            previewContent.appendChild(title);
            previewContent.appendChild(subtitle);
            previewContent.appendChild(content);
            previewContent.appendChild(cta);
        }
        
        previewSection.appendChild(previewContent); // הוספת התוכן לתצוגה המקדימה
    }

    // פונקציה לעריכת פריט
    function editItem(index) {
        alert(`Editing item at index ${index}`); // הודעה על עריכה, ניתן להרחיב כאן את הפונקציונליות לפי הצורך
    }

    // פונקציה למחיקת פריט
    function deleteItem(index) {
        if (confirm('האם אתה בטוח שברצונך למחוק את הפריט הזה?')) { // הודעה לווידוא מחיקה
            let items = JSON.parse(localStorage.getItem('items')) || [];
            items.splice(index, 1); // מחיקת הפריט מהמיקום המתאים במערך
            localStorage.setItem('items', JSON.stringify(items)); // שמירת המערך המעודכן ב-localStorage
            loadItems(); // רענון הטבלה לאחר מחיקת הפריט
        }
    }

    // הדגשת הקישור הנוכחי בתפריט הניווט
    const currentPage = window.location.pathname.split('/').pop(); // השגת שם העמוד הנוכחי מהכתובת
    const links = document.querySelectorAll('.menu a'); // בחירת כל הקישורים בתפריט
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) { // בדיקה אם הקישור מתאים לעמוד הנוכחי
            link.classList.add('active'); // הוספת מחלקה 'active' לקישור המתאים
        }
    });

    // פונקציונליות של תפריט המבורגר
    const menuBtn = document.querySelector('.menu-btn'); // בחירת כפתור ההמבורגר
    const menu = document.querySelector('.menu'); // בחירת התפריט

    // בדיקה אם הכפתור והתפריט קיימים בדף
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('open'); // פתיחת וסגירת התפריט בעת לחיצה על כפתור ההמבורגר
        });
    }
});

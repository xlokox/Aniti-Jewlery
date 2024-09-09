document.addEventListener('DOMContentLoaded', function () {
    // טוען את כל הפריטים מה-localStorage ומציג אותם בטבלה
    loadItems();

    function loadItems() {
        const tableBody = document.querySelector('#itemsTableBody'); // מוצא את גוף הטבלה בו יוצגו הפריטים
        tableBody.innerHTML = ''; // מנקה את התוכן הקיים בטבלה

        const items = JSON.parse(localStorage.getItem('items')) || []; // טוען את הפריטים מ-localStorage או יוצר מערך ריק אם אין פריטים
        items.forEach((item, index) => {
            const row = document.createElement('tr'); // יוצר שורה חדשה עבור כל פריט

            // סוג
            const typeCell = document.createElement('td'); // יוצר תא חדש עבור סוג הפריט
            typeCell.textContent = item.type; // מוסיף את סוג הפריט לטקסט התא
            row.appendChild(typeCell); // מוסיף את התא לשורה

            // כותרת
            const titleCell = document.createElement('td'); // יוצר תא חדש עבור כותרת הפריט
            titleCell.textContent = item.title; // מוסיף את הכותרת לטקסט התא
            row.appendChild(titleCell); // מוסיף את התא לשורה

            // תוכן/תמונה
            const contentCell = document.createElement('td'); // יוצר תא חדש עבור התוכן או התמונה
            if (item.type === 'banner' || item.type === 'marketing' || item.type === 'marketingPage') {
                // בדיקה אם הפריט הוא באנר, דף שיווקי או MarketingPage
                if (item.image) {
                    const img = document.createElement('img'); // יוצר תגית img עבור התמונה
                    img.src = item.image; // קובע את המקור לתמונה
                    img.alt = 'Image'; // מוסיף טקסט חלופי לתמונה
                    img.className = 'table-image'; // מוסיף מחלקת עיצוב לתמונה
                    contentCell.appendChild(img); // מוסיף את התמונה לתא
                } else {
                    contentCell.textContent = 'No image available'; // מציג הודעה אם אין תמונה
                }
            } else if (item.type === 'landingPage') {
                // אם זהו דף נחיתה, מציג את התוכן
                const contentDiv = document.createElement('div'); // יוצר div עבור התוכן
                contentDiv.className = 'table-content'; // מוסיף מחלקת עיצוב לתוכן
                const contentText = document.createElement('p'); // יוצר תגית p עבור הטקסט
                contentText.textContent = item.content || 'No content available'; // מוסיף את התוכן או הודעה אם אין תוכן
                contentDiv.appendChild(contentText); // מוסיף את הטקסט ל-div
                contentCell.appendChild(contentDiv); // מוסיף את ה-div לתא
            }
            row.appendChild(contentCell); // מוסיף את תא התוכן לשורה

            // פעולות
            const actionsCell = document.createElement('td'); // יוצר תא חדש עבור הפעולות
            actionsCell.className = 'actions'; // מוסיף מחלקת עיצוב לפעולות

            // כפתור "הצג"
            const viewButton = document.createElement('button'); // יוצר כפתור חדש עבור הצגה
            viewButton.textContent = 'הצג'; // כותב את טקסט הכפתור
            viewButton.className = 'view'; // מוסיף מחלקת עיצוב לכפתור
            viewButton.addEventListener('click', () => viewItem(item)); // מוסיף מאזין לאירוע לחיצה להצגת הפריט
            actionsCell.appendChild(viewButton); // מוסיף את כפתור ההצגה לתא הפעולות

            // כפתור "ערוך"
            const editButton = document.createElement('button'); // יוצר כפתור חדש עבור עריכה
            editButton.textContent = 'ערוך'; // כותב את טקסט הכפתור
            editButton.className = 'edit'; // מוסיף מחלקת עיצוב לכפתור
            editButton.addEventListener('click', () => editItem(index, item)); // מוסיף מאזין לאירוע לחיצה לעריכת הפריט
            actionsCell.appendChild(editButton); // מוסיף את כפתור העריכה לתא הפעולות

            // כפתור "מחק"
            const deleteButton = document.createElement('button'); // יוצר כפתור חדש עבור מחיקה
            deleteButton.textContent = 'מחק'; // כותב את טקסט הכפתור
            deleteButton.className = 'delete'; // מוסיף מחלקת עיצוב לכפתור
            deleteButton.addEventListener('click', () => deleteItem(index)); // מוסיף מאזין לאירוע לחיצה למחיקת הפריט
            actionsCell.appendChild(deleteButton); // מוסיף את כפתור המחיקה לתא הפעולות

            row.appendChild(actionsCell); // מוסיף את תא הפעולות לשורה
            tableBody.appendChild(row); // מוסיף את השורה לטבלה
        });
    }

    function viewItem(item) {
        const previewSection = document.querySelector('#preview'); // מוצא את אזור התצוגה המקדימה
        previewSection.innerHTML = ''; // מנקה את התוכן הקיים

        const previewContent = document.createElement('div'); // יוצר div עבור התוכן המקדימה
        previewContent.className = 'preview-content'; // מוסיף מחלקת עיצוב לתצוגה המקדימה

        if (item.type === 'banner' || item.type === 'marketing' || item.type === 'marketingPage') {
            // בדיקה אם הפריט הוא באנר, דף שיווקי או MarketingPage
            if (item.image) {
                const img = document.createElement('img'); // יוצר תגית img עבור התמונה
                img.src = item.image; // קובע את המקור לתמונה
                img.alt = 'Image'; // מוסיף טקסט חלופי לתמונה
                img.className = 'preview-image'; // מוסיף מחלקת עיצוב לתמונה
                previewContent.appendChild(img); // מוסיף את התמונה לתצוגה המקדימה
            }
            const title = document.createElement('h1'); // יוצר תגית h1 עבור הכותרת
            title.textContent = item.title; // מוסיף את הכותרת לתצוגה המקדימה
            previewContent.appendChild(title); // מוסיף את הכותרת לתצוגה המקדימה
        } else if (item.type === 'landingPage') {
            // אם זהו דף נחיתה, מציג את התוכן
            const title = document.createElement('h1'); // יוצר תגית h1 עבור הכותרת
            title.textContent = item.title; // מוסיף את הכותרת לתצוגה המקדימה
            const subtitle = document.createElement('h2'); // יוצר תגית h2 עבור כותרת המשנה
            subtitle.textContent = item.subtitle || 'No subtitle available'; // מוסיף את כותרת המשנה לתצוגה המקדימה
            const content = document.createElement('p'); // יוצר תגית p עבור התוכן
            content.textContent = item.content || 'No content available'; // מוסיף את התוכן לתצוגה המקדימה
            const cta = document.createElement('a'); // יוצר תגית a עבור הקריאה לפעולה (CTA)
            cta.href = item.ctaLink || '#'; // קובע את הקישור לקריאה לפעולה
            cta.textContent = item.ctaText || 'No CTA text'; // מוסיף את טקסט הקריאה לפעולה
            cta.className = 'cta-link'; // מוסיף מחלקת עיצוב ל-CTA

            previewContent.appendChild(title); // מוסיף את הכותרת לתצוגה המקדימה
            previewContent.appendChild(subtitle); // מוסיף את כותרת המשנה לתצוגה המקדימה
            previewContent.appendChild(content); // מוסיף את התוכן לתצוגה המקדימה
            previewContent.appendChild(cta); // מוסיף את ה-CTA לתצוגה המקדימה
        }

        previewSection.appendChild(previewContent); // מוסיף את התוכן לתצוגה המקדימה
    }

    // פונקציה לעריכת פריט
    function editItem(index, item) {
        // הצגת טופס עריכה עם ערכים קיימים
        const editSection = document.createElement('div'); // יוצר div עבור אזור העריכה
        editSection.className = 'edit-section'; // מוסיף מחלקת עיצוב לאזור העריכה

        editSection.innerHTML = `
            <h2>ערוך פריט</h2>
            <form id="editForm">
                <label for="editTitle">כותרת:</label>
                <input type="text" id="editTitle" value="${item.title}" required>

                <label for="editContent">תוכן:</label>
                <textarea id="editContent">${item.content || ''}</textarea>

                <label for="editImage">תמונה:</label>
                <input type="file" id="editImage" accept="image/*">

                <button type="submit">שמור</button>
                <button type="button" id="cancelEdit">ביטול</button>
            </form>
        `;

        document.body.appendChild(editSection); // מוסיף את אזור העריכה לדף

        // שמירת שינויים
        document.querySelector('#editForm').addEventListener('submit', function (event) {
            event.preventDefault(); // מבטל את פעולת ברירת המחדל של הטופס

            item.title = document.querySelector('#editTitle').value; // מעדכן את כותרת הפריט מהקלט
            item.content = document.querySelector('#editContent').value; // מעדכן את תוכן הפריט מהקלט

            const imageInput = document.querySelector('#editImage'); // בודק אם יש קלט לתמונה חדשה
            if (imageInput.files.length > 0) {
                const reader = new FileReader(); // יוצר קובץ קורא (FileReader) לקריאת התמונה החדשה
                reader.onload = function (e) {
                    item.image = e.target.result; // שומר את התמונה החדשה בקידוד Base64
                    saveChanges(index, item, editSection); // שמירת השינויים בפריט
                };
                reader.readAsDataURL(imageInput.files[0]); // קורא את התמונה החדשה
            } else {
                saveChanges(index, item, editSection); // שמירת השינויים בפריט אם לא התבצעה העלאה חדשה של תמונה
            }
        });

        // ביטול עריכה
        document.querySelector('#cancelEdit').addEventListener('click', function () {
            document.body.removeChild(editSection); // מסיר את אזור העריכה אם מבוטל
        });
    }

    // פונקציה לשמירת השינויים בפריט
    function saveChanges(index, item, editSection) {
        let items = JSON.parse(localStorage.getItem('items')) || []; // טוען את כל הפריטים מ-localStorage
        items[index] = item; // מעדכן את הפריט במיקום המתאים
        localStorage.setItem('items', JSON.stringify(items)); // שומר את הפריטים המעודכנים ב-localStorage

        alert('השינויים נשמרו בהצלחה!'); // מציג הודעה שהשינויים נשמרו
        document.body.removeChild(editSection); // מסיר את אזור העריכה
        loadItems(); // רענון הטבלה להצגת השינויים
    }

    function deleteItem(index) {
        if (confirm('האם אתה בטוח שברצונך למחוק את הפריט הזה?')) { // מבקש אישור למחיקה
            let items = JSON.parse(localStorage.getItem('items')) || []; // טוען את כל הפריטים מ-localStorage
            items.splice(index, 1); // מוחק את הפריט מהרשימה
            localStorage.setItem('items', JSON.stringify(items)); // שומר את הרשימה המעודכנת ב-localStorage
            clearPreviewIfNoItems(); // פונקציה לניקוי התצוגה אם אין פריטים
            loadItems(); // רענון הטבלה להצגת השינויים
        }
    }

    // ניקוי התצוגה המקדימה אם אין פריטים להצגה
    function clearPreviewIfNoItems() {
        const items = JSON.parse(localStorage.getItem('items')) || []; // טוען את כל הפריטים מ-localStorage
        if (items.length === 0) {
            const previewSection = document.querySelector('#preview'); // מוצא את אזור התצוגה המקדימה
            previewSection.innerHTML = ''; // מנקה את התצוגה המקדימה אם אין פריטים
        }
    }

    // הדגשת הקישור הנוכחי בתפריט הניווט
    const currentPage = window.location.pathname.split('/').pop(); // מוצא את שם העמוד הנוכחי
    const links = document.querySelectorAll('.menu a'); // מוצא את כל הקישורים בתפריט
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) { // בודק אם הקישור מתאים לעמוד הנוכחי
            link.classList.add('active'); // מוסיף מחלקת 'active' לקישור הנוכחי
        }
    });

    // תפריט המבורגר
    document.addEventListener('DOMContentLoaded', function () {
        const menuBtn = document.querySelector('.menu-btn'); // מוצא את כפתור ההמבורגר
        const menu = document.querySelector('.menu'); // מוצא את התפריט
    
        // פתיחת וסגירת התפריט בלחיצה על כפתור ההמבורגר
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('open');
        });
    });
    
});

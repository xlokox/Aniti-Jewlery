document.addEventListener('DOMContentLoaded', function() {
    loadItems(); // טוען את כל הפריטים מה-localStorage

    function loadItems() {
        const tableBody = document.querySelector('#itemsTableBody');
        tableBody.innerHTML = ''; // ניקוי התוכן הקיים

        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach((item, index) => {
            const row = document.createElement('tr');

            // סוג
            const typeCell = document.createElement('td');
            typeCell.textContent = item.type;
            row.appendChild(typeCell);

            // כותרת
            const titleCell = document.createElement('td');
            titleCell.textContent = item.title;
            row.appendChild(titleCell);

            // תוכן/תמונה
            const contentCell = document.createElement('td');
            if (item.type === 'banner' || item.type === 'marketing') {
                if (item.image) {
                    const img = document.createElement('img');
                    img.src = item.image; // נתיב לתמונה בקידוד Base64
                    img.alt = 'Image';
                    img.className = 'table-image';
                    contentCell.appendChild(img);
                } else {
                    contentCell.textContent = 'No image available';
                }
            } else if (item.type === 'landingPage') {
                const contentDiv = document.createElement('div');
                contentDiv.className = 'table-content';
                const contentText = document.createElement('p');
                contentText.textContent = item.content || 'No content available';
                contentDiv.appendChild(contentText);
                contentCell.appendChild(contentDiv);
            }
            row.appendChild(contentCell);

            // פעולות
            const actionsCell = document.createElement('td');
            actionsCell.className = 'actions';

            const viewButton = document.createElement('button');
            viewButton.textContent = 'הצג';
            viewButton.className = 'view';
            viewButton.addEventListener('click', () => viewItem(item));
            actionsCell.appendChild(viewButton);

            const editButton = document.createElement('button');
            editButton.textContent = 'ערוך';
            editButton.className = 'edit';
            editButton.addEventListener('click', () => editItem(index));
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'מחק';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () => deleteItem(index));
            actionsCell.appendChild(deleteButton);

            row.appendChild(actionsCell);

            tableBody.appendChild(row);
        });
    }

    function viewItem(item) {
        const previewSection = document.querySelector('#preview');
        previewSection.innerHTML = ''; // ניקוי התוכן הקיים

        const previewContent = document.createElement('div');
        previewContent.className = 'preview-content';
        
        if (item.type === 'banner' || item.type === 'marketing') {
            if (item.image) {
                const img = document.createElement('img');
                img.src = item.image; // נתיב לתמונה בקידוד Base64
                img.alt = 'Image';
                img.className = 'preview-image';
                previewContent.appendChild(img);
            }
            const title = document.createElement('h1');
            title.textContent = item.title;
            previewContent.appendChild(title);
        } else if (item.type === 'landingPage') {
            const title = document.createElement('h1');
            title.textContent = item.title;
            const subtitle = document.createElement('h2');
            subtitle.textContent = item.subtitle || 'No subtitle available';
            const content = document.createElement('p');
            content.textContent = item.content || 'No content available';
            const cta = document.createElement('a');
            cta.href = item.ctaLink || '#';
            cta.textContent = item.ctaText || 'No CTA text';
            cta.className = 'cta-link';

            previewContent.appendChild(title);
            previewContent.appendChild(subtitle);
            previewContent.appendChild(content);
            previewContent.appendChild(cta);
        }
        
        previewSection.appendChild(previewContent);
    }

    function editItem(index) {
        alert(`Editing item at index ${index}`);
    }

    function deleteItem(index) {
        if (confirm('האם אתה בטוח שברצונך למחוק את הפריט הזה?')) {
            let items = JSON.parse(localStorage.getItem('items')) || [];
            items.splice(index, 1);
            localStorage.setItem('items', JSON.stringify(items));
            loadItems(); // רענון הטבלה
        }
    }

    // הדגשת הקישור הנוכחי בתפריט הניווט
    const currentPage = window.location.pathname.split('/').pop();
    const links = document.querySelectorAll('.menu a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // תפריט המבורגר
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('open');
    });
});

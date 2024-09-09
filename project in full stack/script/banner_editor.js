document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn'); // מוצא את כפתור ההמבורגר
    const menu = document.querySelector('.hamburger-menu'); // מוצא את התפריט

    // פתיחת וסגירת התפריט בלחיצה על כפתור ההמבורגר
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('open'); // משנה את מצב התפריט כדי לפתוח ולסגור אותו
    });

    // טיפול בשליחת הטופס
    document.querySelector('#bannerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // קבלת ערכים מהטופס
        const title = document.querySelector('#bannerTitle').value;
        const image = document.querySelector('#bannerImage').files[0];
        const width = document.querySelector('#bannerWidth').value;
        const height = document.querySelector('#bannerHeight').value;
        const color = document.querySelector('#bannerColor').value;
        const textColor = document.querySelector('#bannerTextColor').value;
        const fontSize = document.querySelector('#bannerFontSize').value;
        const borderRadius = document.querySelector('#bannerBorderRadius').value;
        const borderColor = document.querySelector('#bannerBorderColor').value;
        const borderWidth = document.querySelector('#bannerBorderWidth').value;
        const text = document.querySelector('#bannerText').value;

        if (title && image && width && height) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const banner = {
                    type: 'banner',
                    title: title,
                    image: e.target.result,
                    width: width,
                    height: height,
                    color: color,
                    textColor: textColor,
                    fontSize: fontSize,
                    borderRadius: borderRadius,
                    borderColor: borderColor,
                    borderWidth: borderWidth,
                    text: text
                };

                let items = JSON.parse(localStorage.getItem('items')) || [];
                items.push(banner);
                localStorage.setItem('items', JSON.stringify(items));

                alert('באנר נשמר בהצלחה!');
                window.location.href = '../html/main.html'; // מעבר אוטומטי לדף הראשי
            };

            reader.readAsDataURL(image);
        } else {
            alert('אנא מלא את כל השדות.');
        }
    });

    // עדכון תצוגה חיה של הבאנר
    document.querySelectorAll('#bannerForm input, #bannerForm textarea').forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    function updatePreview() {
        const title = document.querySelector('#bannerTitle').value;
        const image = document.querySelector('#bannerImage').files[0];
        const width = document.querySelector('#bannerWidth').value || '300';
        const height = document.querySelector('#bannerHeight').value || '250';
        const color = document.querySelector('#bannerColor').value || '#ffffff';
        const textColor = document.querySelector('#bannerTextColor').value || '#000000';
        const fontSize = document.querySelector('#bannerFontSize').value || '16px';
        const borderRadius = document.querySelector('#bannerBorderRadius').value || '8px';
        const borderColor = document.querySelector('#bannerBorderColor').value || '#cccccc';
        const borderWidth = document.querySelector('#bannerBorderWidth').value || '1px';
        const text = document.querySelector('#bannerText').value || '';

        const preview = document.querySelector('#bannerPreview');
        preview.innerHTML = `
            <div class="banner-preview" style="width: ${width}px; height: ${height}px; background-color: ${color}; border-radius: ${borderRadius}; border: ${borderWidth} solid ${borderColor};">
                ${image ? `<img src="${URL.createObjectURL(image)}" alt="${title}">` : ''}
                <div class="text" style="color: ${textColor}; font-size: ${fontSize};">${title || text}</div>
            </div>
        `;
    }
});

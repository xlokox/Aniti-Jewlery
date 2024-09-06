console.log('JavaScript file loaded');

document.getElementById('marketingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // מניעת שליחת הטופס בצורה רגילה

    const title = document.getElementById('marketingTitle').value;
    const content = document.getElementById('marketingContent').value;
    const image = document.getElementById('marketingImage').files[0];
    const color = document.getElementById('marketingColor').value;

    if (title && content && image && color) {
        if (!image.type.startsWith('image/')) {
            alert('נא לבחור קובץ תמונה בלבד.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const marketingPage = {
                type: 'marketingPage',
                title: title,
                content: content,
                image: e.target.result, // תמונה בקידוד Base64
                color: color
            };

            try {
                let items = JSON.parse(localStorage.getItem('items')) || [];
                console.log('Current items:', items); // הוסף את הלוג הזה
                items.push(marketingPage);
                localStorage.setItem('items', JSON.stringify(items));
                console.log('Items saved:', JSON.parse(localStorage.getItem('items'))); // הוסף את הלוג הזה

                alert('דף השיווק נשמר בהצלחה!');
                window.location.href = '../html/main.html'; // נתיב יחסי עבור קובץ בתוך אותה תיקיה
            } catch (error) {
                console.error('שגיאה בשמירה ל-localStorage:', error);
                alert('שגיאה בשמירה של דף השיווק.');
            }
        };
        reader.readAsDataURL(image);
    } else {
        alert('אנא מלא את כל השדות.');
    }
});

// Update marketing page preview live
document.querySelectorAll('#marketingForm input, #marketingForm textarea').forEach(input => {
    input.addEventListener('input', updatePreview);
});

function updatePreview() {
    const title = document.getElementById('marketingTitle').value || '';
    const content = document.getElementById('marketingContent').value || '';
    const image = document.getElementById('marketingImage').files[0];
    const color = document.getElementById('marketingColor').value || '#ffffff';

    const previewTitle = document.getElementById('previewTitle');
    const previewContent = document.getElementById('previewContent');
    const previewImage = document.getElementById('previewImage');

    previewTitle.textContent = title;
    previewContent.textContent = content;
    if (image) {
        const objectURL = URL.createObjectURL(image);
        previewImage.src = objectURL;
        previewImage.style.backgroundColor = color;

        // שחרור ה-URL לאחר זמן מה
        setTimeout(() => URL.revokeObjectURL(objectURL), 10000); // שחרור ה-URL לאחר 10 שניות
    } else {
        previewImage.src = '';
        previewImage.style.backgroundColor = color;
    }
}

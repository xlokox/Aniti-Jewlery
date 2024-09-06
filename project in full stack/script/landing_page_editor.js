document.querySelector('#landingPageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // מניעת שליחת הטופס בצורה רגילה
 
    // שליפת הערכים מהשדות
    const title = document.querySelector('#pageTitle').value;
    const subtitle = document.querySelector('#pageSubtitle').value;
    const content = document.querySelector('#pageContent').value;
    const ctaText = document.querySelector('#ctaText').value;
    const ctaLink = document.querySelector('#ctaLink').value;
    const backgroundImage = document.querySelector('#backgroundImage').value;
    const category = document.querySelector('#pageCategory').value;
    const publishDate = document.querySelector('#publishDate').value;
 
    // הדפס למעקב
    console.log("Title:", title);
    console.log("Subtitle:", subtitle);
    console.log("Content:", content);
    console.log("CTA Text:", ctaText);
    console.log("CTA Link:", ctaLink);
    console.log("Background Image:", backgroundImage);
    console.log("Category:", category);
    console.log("Publish Date:", publishDate);
 
    // בדיקה שהשדות מלאים
    if (title && content && ctaText && ctaLink && backgroundImage && category) {
        const landingPage = {
            type: 'landingPage',
            title: title,
            subtitle: subtitle,
            content: content,
            ctaText: ctaText,
            ctaLink: ctaLink,
            backgroundImage: backgroundImage,
            category: category,
            publishDate: publishDate
        };
 
        // שליפת הרשימה הנוכחית מה-localStorage
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(landingPage);
        localStorage.setItem('items', JSON.stringify(items));
 
        // הצגת התראה והעבר לדף הראשי
        alert('דף הנחיתה נשמר בהצלחה!');
        window.location.href = '../html/main.html'; // נתיב יחסי עבור קובץ בתוך אותה תיקיה
    } else {
        alert('אנא מלא את כל השדות.');
    }
 });
 
 document.querySelectorAll('#landingPageForm input, #landingPageForm textarea, #landingPageForm select').forEach(input => {
    input.addEventListener('input', updatePreview);
 });
 
 function updatePreview() {
    const title = document.querySelector('#pageTitle').value;
    const subtitle = document.querySelector('#pageSubtitle').value;
    const content = document.querySelector('#pageContent').value;
    const ctaText = document.querySelector('#ctaText').value;
    const ctaLink = document.querySelector('#ctaLink').value;
    const backgroundImage = document.querySelector('#backgroundImage').value;
    const category = document.querySelector('#pageCategory').value;
    const publishDate = document.querySelector('#publishDate').value;
 
    const previewContent = document.querySelector('#previewContent');
    previewContent.innerHTML = `
        <div style="background-image: url('${backgroundImage}'); background-size: cover; padding: 20px; color: white;">
            <h1>${title}</h1>
            <h2>${subtitle}</h2>
            <p>${content}</p>
            <a href="${ctaLink}" style="display: block; background-color: #4CAF50; color: white; text-align: center; padding: 10px; text-decoration: none; border-radius: 5px;">${ctaText}</a>
            <p>קטגוריה: ${category}</p>
            <p>תאריך פרסום: ${publishDate}</p>
        </div>
    `;
 }
 
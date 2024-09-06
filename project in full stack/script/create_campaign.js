document.addEventListener('DOMContentLoaded', function() {
    // טעינת קמפיינים קיימים
    loadCampaigns();
 
    document.querySelector('#campaignForm').addEventListener('submit', function(event) {
        event.preventDefault();
 
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const category = document.querySelector('#category').value;
        const imageUpload = document.querySelector('#imageUpload').files[0];
 
        if (title && description && category && imageUpload) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const campaign = {
                    title: title,
                    description: description,
                    category: category,
                    image: e.target.result // תמונה בקידוד Base64
                };
 
                let campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
                campaigns.push(campaign);
                localStorage.setItem('campaigns', JSON.stringify(campaigns));
 
                alert('קמפיין נשמר בהצלחה!');
                loadCampaigns(); // רענון הטבלה עם הקמפיינים הקיימים
                document.querySelector('#campaignForm').reset(); // ניקוי הטופס
            };
            reader.readAsDataURL(imageUpload);
        } else {
            alert('אנא מלא את כל השדות.');
        }
    });
 
    function loadCampaigns() {
        const tableBody = document.querySelector('#campaignTableBody');
        tableBody.innerHTML = ''; // ניקוי התוכן הקיים
 
        const campaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        campaigns.forEach(campaign => {
            const row = document.createElement('tr');
 
            const categoryCell = document.createElement('td');
            categoryCell.textContent = campaign.category;
            row.appendChild(categoryCell);
 
            const imageCell = document.createElement('td');
            const image = document.createElement('img');
            image.src = campaign.image;
            image.alt = 'Campaign Image';
            image.style.width = '100px'; // הגדרת רוחב תמונה
            imageCell.appendChild(image);
            row.appendChild(imageCell);
 
            const titleCell = document.createElement('td');
            titleCell.textContent = campaign.title;
            row.appendChild(titleCell);
 
            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = campaign.description;
            row.appendChild(descriptionCell);
 
            tableBody.appendChild(row);
        });
    }
 });
 
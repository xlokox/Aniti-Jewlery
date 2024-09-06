document.addEventListener('DOMContentLoaded', () => {
    // פונקציה להתחלת טיימר הבאנר
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
                    const formattedUrl = new URL(url, window.location.origin); // ודא שה-URL תקין
                    window.open(formattedUrl, '_blank');
                } catch (e) {
                    console.error('URL is not valid:', url);
                }
            } else {
                console.error('No URL specified for button');
            }
        });
    });
});

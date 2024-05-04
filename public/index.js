document.addEventListener('DOMContentLoaded', function() {
    const activityDisplay = document.getElementById('activity-display');
    const generateButton = document.getElementById('generate-btn');

    generateButton.addEventListener('click', function() {
        activityDisplay.textContent = "Loading..."; // Ladeindikator setzen
        fetch('/random-activity')
            .then(response => response.text())
            .then(activity => {
                if(activity) {
                    activityDisplay.textContent = activity;
                } else {
                    activityDisplay.textContent = "No activity found. Try again!";
                }
            })
            .catch(error => {
                console.error('Error fetching activity:', error);
                activityDisplay.textContent = "Failed to load activity. Check console for details.";
            });
    });

    fetch('/versioned-content?path=/style.css')
        .then(response => response.text())
        .then(cssPath => {
            const link = document.getElementById('versionedCss');
            link.href = cssPath;
        })
        .catch(error => {
            console.error('Error fetching versioned CSS:', error);
        });
});
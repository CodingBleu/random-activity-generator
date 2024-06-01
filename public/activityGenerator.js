// Funktion zum Laden der CSS-Datei mit Version
export function loadVersionedCss() {
    fetch('/versioned-content?path=/style.css')
        .then(response => response.text())
        .then(cssPath => {
            const link = document.getElementById('versionedCss');
            link.href = cssPath;
        })
        .catch(error => {
            console.error('Error fetching versioned CSS:', error);
        });
}

// Funktion zum Generieren einer zufälligen Aktivität
export function generateActivity() {
    const activityDisplay = document.getElementById('activity-display');
    const participantsInput = document.getElementById('participants');
    const categorySelect = document.getElementById('category');

    const participants = participantsInput.value;
    const category = categorySelect.value;

    fetch(`/random-activity?participants=${participants}&category=${category}`)
        .then(response => response.json())
        .then(data => {
            if (data.description) {
                activityDisplay.textContent = `Aktivität: ${data.description}`;

                if (category === 'random') {
                    let optionExists = false;
                    for (let i = 0; i < categorySelect.options.length; i++) {
                        if (categorySelect.options[i].value === data.category) {
                            categorySelect.selectedIndex = i;
                            optionExists = true;
                            break;
                        }
                    }
                }
            } else {
                activityDisplay.textContent = "Keine Aktivität gefunden. Versuchen Sie es erneut!";
            }
        })
        .catch(error => {
            console.error('Error fetching activity:', error);
            activityDisplay.textContent = "Keine Aktivität gefunden.";
        });
}

// Event-Listener für DOMContentLoaded
export function setupEventListeners() {
    document.addEventListener('DOMContentLoaded', function() {
        const generateButton = document.getElementById('generate-btn');
        generateButton.addEventListener('click', generateActivity);
        loadVersionedCss();
    });
}
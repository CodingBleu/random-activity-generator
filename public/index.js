// Warten, bis der gesamte Inhalt der Website geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // das HTML-Element holen, in dem die Aktivität angezeigt werden soll 
    const activityDisplay = document.getElementById('activity-display');
    // das HTML-Element für den Button holen, der eine neue Aktivität generiert
    const generateButton = document.getElementById('generate-btn');

    // Funktion wird ausgeführt, wenn der Button geklickt wird
    generateButton.addEventListener('click', function() {
        // Während auf die neue Aktivität gewartet wird, wird "Loading..." angezeigt
        activityDisplay.textContent = "Loading...";

        //Anfrage an den Server senden, um eine zufällige Aktivität zu holen
        fetch('/random-activity')
            .then(response => response.text()) // Antwort in Text konvertieren 
            .then(activity => {
                // Wenn eine Aktivität zurückgegeben wird, wird diese angezeigt
                if(activity) {
                    activityDisplay.textContent = activity;
                } else {
                    // Wenn keine Aktivität gefunden wird, zeigen wir eine Fehlermeldung an
                    activityDisplay.textContent = "No activity found. Try again!";
                }
            })
            // Wenn ein Fehler auftritt, wird er in der  Konsole angezeigt 
            .catch(error => {
                console.error('Error fetching activity:', error);
                activityDisplay.textContent = "Failed to load activity. Check console for details.";
            });
    });

    // Anfrage an den Server senden, um die Version der CSS-Datei zu holen 
    fetch('/versioned-content?path=/style.css')
        .then(response => response.text()) // Antwort in Text konvertieren
        .then(cssPath => {
            // HTML-Element für den Link zur CSS-Datei holen
            const link = document.getElementById('versionedCss');
            // Pfad des CSS-Links auf den zurückgegebenen Pfad setzen
            link.href = cssPath;
        })
        .catch(error => {
            // Wenn ein Fehler auftritt, wird er in der Konsole angezeigt
            console.error('Error fetching versioned CSS:', error);
        });
});
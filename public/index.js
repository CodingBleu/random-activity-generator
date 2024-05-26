// Warten, bis der gesamte Inhalt der Website geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // das HTML-Element holen, in dem die Aktivität angezeigt werden soll 
    const activityDisplay = document.getElementById('activity-display');
    // das HTML-Element für den Button holen, der eine neue Aktivität generiert
    const generateButton = document.getElementById('generate-btn');
    // das HTML-Element für die Teilnehmeranzahl holen
    const participantsInput = document.getElementById('participants');
    // das HTML-Element für die Kategorie holen
    const categorySelect = document.getElementById('category');

    // Funktion wird ausgeführt, wenn der Button geklickt wird
    generateButton.addEventListener('click', function() {
        const participants = participantsInput.value; //Teilnehmeranzahl erfassen
        const category = categorySelect.value; //Kategorie erfassen

         // Anfrage an den Server senden, um eine zufällige Aktivität mit entsprechenden Parametern zu holen
         fetch(`/random-activity?participants=${participants}&category=${category}`)
         .then(response => response.json()) // Antwort in JSON konvertieren
         .then(data => {
             // Wenn eine Aktivität zurückgegeben wird, wird diese angezeigt
             if(data.description) {
                 activityDisplay.textContent = `Aktivität: ${data.description}`;
                 
                 // Kategorie im Dropdown auf die zufällige Kategorie setzen, falls 'random' gewählt wurde
                 if (category === 'random') {
                     let optionExists = false;

                     // Prüfen, ob die zufällige Kategorie bereits im Dropdown existiert
                     for (let i = 0; i < categorySelect.options.length; i++) {
                         if (categorySelect.options[i].value === data.category) {
                             categorySelect.selectedIndex = i;
                             optionExists = true;
                             break;
                         }
                     }
                 }
             } else {
                 // Wenn keine Aktivität gefunden wird, zeigen wir eine Fehlermeldung an
                 activityDisplay.textContent = "Keine Aktivität gefunden. Versuchen Sie es erneut!";
             }
         })
         // Wenn ein Fehler auftritt, wird er in der Konsole angezeigt 
         .catch(error => {
             console.error('Error fetching activity:', error);
             activityDisplay.textContent = "Keine Aktivität gefunden.";
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
// Funktion zum Laden der CSS-Datei mit Version
// Diese Funktion lädt eine versionierte CSS-Datei dynamisch.
export function loadVersionedCss() {
  // Anfrage an den Server, um den Pfad zur versionierten CSS-Datei zu erhalten
  fetch("/versioned-content?path=/style.css")
    .then((response) => response.text()) // Wenn die Antwort empfangen wird, wird der Text (der Pfad) extrahiert
    .then((cssPath) => {
      // Das <link> Element für das CSS wird gefunden
      const link = document.getElementById("versionedCss");
      // Der 'href'-Wert des <link> Elements wird auf den neuen Pfad gesetzt
      link.href = cssPath;
    })
    .catch((error) => {
      // Fehlerbehandlung, falls beim Abrufen der CSS-Datei ein Fehler auftritt
      console.error("Error fetching versioned CSS:", error);
    });
}

// Funktion zum Generieren einer zufälligen Aktivität
// Diese Funktion fordert eine zufällige Aktivität basierend auf Benutzereingaben an.
export function generateActivity() {
  // Referenzen auf die HTML-Elemente für die Anzeige und Eingabe der Aktivität
  const activityDisplay = document.getElementById("activity-display");
  const participantsInput = document.getElementById("participants");
  const categorySelect = document.getElementById("category");
  const locationSelect = document.getElementById("location");

  // Werte aus den Eingabefeldern werden entnommen
  const participants = participantsInput.value;
  const category = categorySelect.value;
  const location = locationSelect.value;

  // Verstecken der Aktivitätsanzeige, während die neue Aktivität geladen wird
  activityDisplay.classList.remove("show");
  activityDisplay.classList.add("hide");

  // Anfrage an den Server, um eine zufällige Aktivität zu erhalten
  fetch(
    `/random-activity?participants=${participants}&category=${category}&location=${location}`
  )
    .then((response) => response.json()) // Antwort wird in JSON umgewandelt
    .then((data) => {
      if (data.description) {
        activityDisplay.textContent = `Aktivität: ${data.description}`;
        activityDisplay.classList.remove("hide");
        activityDisplay.classList.add("show");

        // Wenn die Kategorie 'random' war, wird die tatsächliche Kategorie in der Auswahl gesetzt
        if (category === "random") {
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
        // Falls keine Aktivität gefunden wurde, wird eine entsprechende Nachricht angezeigt
        activityDisplay.textContent =
          "Keine Aktivität gefunden. Versuchen Sie es erneut!";
        activityDisplay.classList.add("show");
        activityDisplay.classList.remove("hide");
        setTimeout(() => {
          activityDisplay.classList.remove("show");
          activityDisplay.classList.add("hide");
        }, 3000); // Nachricht wird nach 3 Sekunden ausgeblendet
      }
    })
    .catch((error) => {
      // Fehlerbehandlung, falls beim Abrufen der Aktivität ein Fehler auftritt
      console.error("Error fetching activity:", error);
      activityDisplay.textContent =
        "Keine Aktivität gefunden. Versuchen Sie es erneut!";
      activityDisplay.classList.remove("hide");
      activityDisplay.classList.add("show");
      setTimeout(() => {
        activityDisplay.classList.remove("show");
        activityDisplay.classList.add("hide");
      }, 3000); // Nachricht wird nach 3 Sekunden ausgeblendet
    });
}

// Event-Listener für DOMContentLoaded
// Diese Funktion richtet Event-Listener ein, sobald das DOM vollständig geladen ist.
export function setupEventListeners() {
  document.addEventListener("DOMContentLoaded", function () {
    // Button zum Generieren einer Aktivität wird gefunden
    const generateButton = document.getElementById("generate-btn");
    // Event-Listener wird hinzugefügt, der die generateActivity Funktion bei Klick aufruft
    generateButton.addEventListener("click", generateActivity);
    // CSS wird geladen
    loadVersionedCss();
  });
}

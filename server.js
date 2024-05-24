// Einbinden der benötigten Module
const express = require('express');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Erstellung einer neuen Express-App
const app = express();

// Festlegen des Ports, auf dem der Server laufen soll
const port = 3000;

// Verbindung zur SQLite-Datenbank
const db = new sqlite3.Database('./activities.db', (err) => {
  if (err) {
    // Gibt eine Fehlermeldung aus, wenn die Verbindung zur Datenbank fehlschlägt
      console.error(err.message);
  }
  // Bestätige die erfolgreiche Verbindung zur Datenbank
  console.log('Connected to the activities database.');
});

// Einfaches Cache-Objekt als Ersatz für HttpContext.Cache --> Ersatz für eine komplexe Cashing-Strategie
const cache = {};

// Konfiguration des Servers, um statische Dateien aus dem "public"-Verzeichnis zu bedienen
app.use(express.static('public'));

// Eine zufällige Aktivität aus der Datenbank basierend auf der Teilnehmeranzahl wird abgerufen durch get
app.get('/random-activity', (req, res) => {
  const participants = parseInt(req.query.participants) || 1; //Teilnehmeranzahl aus der Anfrage abrufen
  const category = req.query.category;

  db.get("SELECT description FROM activities WHERE participants = ? AND category = ? ORDER BY RANDOM() LIMIT 1", [participants, category], (err, row) => {
      if (err) {
         // Ein Datenbankfehler wird ausgegeben und sendet einen 500 Statuscode
        console.error("Database error: ", err.message);
          res.status(500).send("Error fetching activity");
      } else if (row) {
        // Die abgerufene Aktivität wird gesendet, wenn vorhanden
          res.send(row.description);
      } else {
        // Ein 404 Statuscode wird ausgegeben, wenn keine Aktivität gefunden wurde
          res.status(404).send("Keine Aktivitäten gefunden");
      }
  });
});

// Inhalte werden mit Versionsinformation versehen durch GET
app.get('/versioned-content', (req, res) => {
  try {
    const contentPath = req.query.path; // Pfad der angeforderten Datei
    const versionedPath = versionedContent(contentPath); // Versionierter Pfad wird erzeugt
    res.send(versionedPath); // Versionierten Pfad wird zurück gesendet
  } catch (error) {
    // Fehler wird ausgegeben und sendet einen 500 Statuscode
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Funktion, die den versionierten Pfad einer Datei basierend auf ihrer letzten Änderung erzeugt
function versionedContent(contentPath) {
  if (!cache[contentPath]) {
    const physicalPath = path.join(__dirname, 'public', contentPath); // Vollständiger Pfad der Datei
    console.log('Trying to access:', physicalPath);
    const fileInfo = fs.statSync(physicalPath); // Hole Dateiinformationen
    const version = "v=" + fileInfo.mtime.toISOString().replace(/[^0-9]/g, "").substring(0, 14); // Versionsstring wird erzeugt

    const translatedContentPath = contentPath;
    const versionedContentPath = contentPath.includes("?")
      ? `${translatedContentPath}&${version}` // Version wird zu einem Pfad mit vorhandenen Query-Parametern hinzugefügt
      : `${translatedContentPath}?${version}`; // Füge Version zu einem Pfad ohne Query-Parameter hinzu

     // Speichere den versionierten Pfad im Cache und stelle ihn nach 1 Minute zum Löschen ein
    cache[contentPath] = versionedContentPath;
    setTimeout(() => { delete cache[contentPath]; }, 60000); // Cache für 1 Minute

    return versionedContentPath;
  } else {
    return cache[contentPath];  // Liefert den Pfad aus dem Cache, falls vorhanden
  }
}

// Startet den Server auf dem angegebenen Port und erstellt eine Bestätigungsnachricht in der Konsole
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
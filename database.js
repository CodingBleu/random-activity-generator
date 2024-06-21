// sqlite3 Modul impoortieren und verbose-Modus aktivieren, der detailliertere Logs liefert
import sqlite3 from "sqlite3";

// Name der Datenbankdatei definieren
const dbName = "activities.db";

// Erstellen der SQLite-Datenbankdatei
const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    // Gibt eine Fehlermeldung aus, falls beim Verbinden zur Datenbank ein Fehler auftritt
    return console.error(err.message);
  }
  // Verbindung zur Datenbank wird bestätigt
  console.log(`Connected to the ${dbName} database.`);
});

// Funktion für die zufällige Auswahl einer Kategorie
function getRandomCategory() {
  const categories = [
    "Sport",
    "Culture",
    "Education",
    "Information",
    "Culinary",
    "Housework",
  ];
  return categories[Math.floor(Math.random() * categories.length)];
}

// Startet die Ausführung der Datenbankoperationen
db.serialize(() => {
  // Löscht die bestehende Tabelle 'activities', wenn sie existiert
  db.run("DROP TABLE IF EXISTS activities", (err) => {
    if (err) {
      // Gibt eine Fehlermeldung aus, falls beim Löschen der Tabelle ein Fehler auftritt
      console.error("Error dropping table:", err.message);
      return;
    }
    // Bestätigt, dass die Tabelle erfolgreich gelöscht wurde
    console.log("Table dropped");

    // Tabelle 'activities' erstellen
    db.run(
      `CREATE TABLE activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            description TEXT NOT NULL,
            participants INTEGER NOT NULL,
            category TEXT NOT NULL,
            location TEXT NOT NULL
        )`,
      (err) => {
        if (err) {
          // Gibt einen Fehler aus, falls beim Erstellen der Tabelle ein Problem aufgetreten ist
          console.error("Error creating table:", err.message);
          return;
        }
        // Bestätigen, dass die Tabelle erfolgreich erstellt wurde
        console.log("Table created");

        // Liste der Aktivitäten mit Teilnehmeranzahl, die in die Datenbank eingefügt werden sollen
        const activities = [
          ...Array.from({ length: 4 }, (_, i) => ({
            description: "Tennis spielen",
            participants: i + 1,
            category: "Sport",
            location: "outdoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Ein Spaziergang im Park",
            participants: i + 1,
            category: "Culture",
            location: "outdoor",
          })),
          ...Array.from({ length: 1 }, (_, i) => ({
            description: "Ein Buch lesen",
            participants: i + 1,
            category: "Education",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Ein neues Rezept kochen",
            participants: i + 1,
            category: "Culinary",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Einen Dokumentarfilm ansehen",
            participants: i + 1,
            category: "Information",
            location: "indoor",
          })),
          ...Array.from({ length: 8 }, (_, i) => ({
            description: "Ein Brettspiel spielen",
            participants: i + 2,
            category: "Sport",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Gartenarbeit machen",
            participants: i + 1,
            category: "Housework",
            location: "outdoor",
          })),
          ...Array.from({ length: 12 }, (_, i) => ({
            description: "Volleyball spielen",
            participants: i + 2,
            category: "Sport",
            location: "outdoor",
          })),
          ...Array.from({ length: 20 }, (_, i) => ({
            description: "Ein Museum besuchen",
            participants: i + 1,
            category: "Culture",
            location: "indoor",
          })),
          ...Array.from({ length: 5 }, (_, i) => ({
            description: "Eine Fahrradtour veranstalten",
            participants: i + 1,
            category: "Sport",
            location: "outdoor",
          })),
          ...Array.from({ length: 1 }, (_, i) => ({
            description: "Schreibe eine Kurzgeschichte",
            participants: i + 1,
            category: "Education",
            location: "indoor",
          })),
          ...Array.from({ length: 1 }, (_, i) => ({
            description: "Yoga",
            participants: i + 1,
            category: "Sport",
            location: "indoor",
          })),
          ...Array.from({ length: 1 }, (_, i) => ({
            description: "Meditation",
            participants: i + 1,
            category: "Sport",
            location: "indoor",
          })),
          ...Array.from({ length: 4 }, (_, i) => ({
            description: "Geo-Bingo",
            participants: i + 2,
            category: "Culture",
            location: "outdoor",
          })),
          ...Array.from({ length: 15 }, (_, i) => ({
            description: "Kunstgalerie besuchen",
            participants: i + 1,
            category: "Culture",
            location: "indoor",
          })),
          ...Array.from({ length: 4 }, (_, i) => ({
            description: "Kinoabend",
            participants: i + 1,
            category: "Culture",
            location: "indoor",
          })),
          ...Array.from({ length: 4 }, (_, i) => ({
            description: "Bouldern",
            participants: i + 1,
            category: "Sport",
            location: "outdoor",
          })),
          ...Array.from({ length: 4 }, (_, i) => ({
            description: "Ins Schwimmbad gehen",
            participants: i + 1,
            category: "Sport",
            location: "indoor",
          })),
          ...Array.from({ length: 4 }, (_, i) => ({
            description: "Badetag am See",
            participants: i + 1,
            category: "Sport",
            location: "outdoor",
          })),
          ...Array.from({ length: 10 }, (_, i) => ({
            description: "Grillen",
            participants: i + 2,
            category: "Culinary",
            location: "outdoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Jogging",
            participants: i + 1,
            category: "Sport",
            location: "outdoor",
          })),
          ...Array.from({ length: 3 }, (_, i) => ({
            description: "Bastelprojekt",
            participants: i + 1,
            category: "Education",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Tanzen",
            participants: i + 1,
            category: "Sport",
            location: "indoor",
          })),
          ...Array.from({ length: 12 }, (_, i) => ({
            description: "Bowling",
            participants: i + 2,
            category: "Sport",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Fahrrad reparieren",
            participants: i + 1,
            category: "Housework",
            location: "outdoor",
          })),
          ...Array.from({ length: 1 }, (_, i) => ({
            description: "Fotobuch erstellen",
            participants: i + 1,
            category: "Housework",
            location: "indoor",
          })),
          ...Array.from({ length: 1 }, (_, i) => ({
            description: "Musikinstrument üben",
            participants: i + 1,
            category: "Education",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Musikinstrument üben",
            participants: i + 1,
            category: "Education",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Puzzeln",
            participants: i + 1,
            category: "Culture",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Kochkurs online",
            participants: i + 1,
            category: "Culinary",
            location: "indoor",
          })),
          ...Array.from({ length: 4 }, (_, i) => ({
            description: "Astronomieabend",
            participants: i + 1,
            category: "Information",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Geschürspüler ausräumen",
            participants: i + 1,
            category: "Housework",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Geschürspüler einräumen",
            participants: i + 1,
            category: "Housework",
            location: "indoor",
          })),
          ...Array.from({ length: 1 }, (_, i) => ({
            description: "Staubsaugen",
            participants: i + 1,
            category: "Housework",
            location: "indoor",
          })),
          ...Array.from({ length: 1 }, (_, i) => ({
            description: "Fenster putzen",
            participants: i + 1,
            category: "Housework",
            location: "indoor",
          })),
          ...Array.from({ length: 1 }, (_, i) => ({
            description: "Müll rausbringen",
            participants: i + 1,
            category: "Housework",
            location: "indoor",
          })),
          ...Array.from({ length: 3 }, (_, i) => ({
            description: "Theaterstück besuchen",
            participants: i + 1,
            category: "Culture",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Konzert besuchen",
            participants: i + 1,
            category: "Culture",
            location: "indoor",
          })),
          ...Array.from({ length: 1 }, (_, i) => ({
            description: "Buchclub treffen",
            participants: i + 1,
            category: "Culture",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Sprachen lernen",
            participants: i + 1,
            category: "Education",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Naturwissenschaftliches Experiment",
            participants: i + 1,
            category: "Education",
            location: "indoor",
          })),
          ...Array.from({ length: 3 }, (_, i) => ({
            description: "Backen",
            participants: i + 1,
            category: "Culinary",
            location: "indoor",
          })),
          ...Array.from({ length: 5 }, (_, i) => ({
            description: "Weinverkostung",
            participants: i + 1,
            category: "Culinary",
            location: "outdoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Nachrichten schauen",
            participants: i + 1,
            category: "Information",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Wissenschaftspodcast hören",
            participants: i + 1,
            category: "Information",
            location: "indoor",
          })),
          ...Array.from({ length: 2 }, (_, i) => ({
            description: "Wäsche waschen",
            participants: i + 1,
            category: "Housework",
            location: "indoor",
          })),
        ];

        for (const activity of activities) {
          //Falls keine Kategorie angegeben ist, wähle eine zufällige Kategorie
          if (!activity.category) {
            activity.category = getRandomCategory();
          }
        }

        // Füge jede Aktivität mit Teilnehmeranzahl in die Datenbanktabelle ein
        activities.forEach((activity) => {
          db.run(
            `INSERT INTO activities (description, participants, category, location) VALUES (?, ?, ?, ?)`,
            [
              activity.description,
              activity.participants,
              activity.category,
              activity.location,
            ],
            (err) => {
              if (err) {
                // Gibt eine Fehlermeldung aus, falls beim Einfügen der Daten ein Fehler auftritt
                console.error("Error inserting data:", err.message);
              }
            }
          );
        });
      }
    );
  });
});
export default db;

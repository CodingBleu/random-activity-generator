// sqlite3 Modul impoortieren und verbose-Modus aktivieren, der detailliertere Logs liefert
const sqlite3 = require('sqlite3').verbose();

// Name der Datenbankdatei definieren
const dbName = 'activities.db';

// Erstellen der SQLite-Datenbankdatei
const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        // Gibt eine Fehlermeldung aus, falls beim Verbinden zur Datenbank ein Fehler auftritt
        return console.error(err.message);
    }
    // Verbindung zur Datenbank wird bestätigt
    console.log(`Connected to the ${dbName} database.`);
});

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
        console.log('Table dropped');

        // Tabelle 'activities' mit einem zusätzlichen Feld für Teilnehmeranzahl erstellen
        db.run(`CREATE TABLE activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            description TEXT NOT NULL,
            participants INTEGER NOT NULL
        )`, (err) => {
            if (err) {
                // Gibt einen Fehler aus, falls beim Erstellen der Tabelle ein Problem aufgetreten ist
                console.error("Error creating table:", err.message);
                return;
            }
            // Bestätigen, dass die Tabelle erfolgreich erstellt wurde
            console.log('Table created');

            // Liste der Aktivitäten mit Teilnehmeranzahl, die in die Datenbank eingefügt werden sollen
            const activities = [
                ...Array.from({length: 4}, (_, i) => ({
                    description: 'Tennis spielen',
                    participants: i + 1
                })),
                ...Array.from({length: 2}, (_, i) => ({
                    description: 'Ein Spaziergang im Park',
                    participants: i + 1
                })),
                ...Array.from({length: 1}, (_, i) => ({
                    description: 'Ein Buch lesen',
                    participants: i + 1
                })),
                ...Array.from({length: 2}, (_, i) => ({
                    description: 'Ein neues Rezept kochen',
                    participants: i + 1
                })),
                ...Array.from({length: 2}, (_, i) => ({
                    description: 'Einen Dokumentarfilm ansehen',
                    participants: i + 1
                })),
                ...Array.from({length: 8}, (_, i) => ({
                    description: 'Ein Brettspiel spielen',
                    participants: i + 2
                })),
                ...Array.from({length: 2}, (_, i) => ({
                    description: 'Gartenarbeit machen',
                    participants: i + 1
                })),
                ...Array.from({length: 12}, (_, i) => ({
                    description: 'Volleyball spielen',
                    participants: i + 2
                })),
                ...Array.from({length: 20}, (_, i) => ({
                    description: 'Ein Museum besuchen',
                    participants: i + 1
                })),
                ...Array.from({length: 5}, (_, i) => ({
                    description: 'Eine Fahrradtour veranstalten',
                    participants: i + 1
                })),
                ...Array.from({length: 1}, (_, i) => ({
                    description: 'Schreibe eine Kurzgeschichte',
                    participants: i + 1
                })),
            ];

            // Füge jede Aktivität mit Teilnehmeranzahl in die Datenbanktabelle ein
            activities.forEach(activity => {
                db.run(`INSERT INTO activities (description, participants) VALUES (?, ?)`, [activity.description, activity.participants], err => {
                    if (err) {
                        // Gibt eine Fehlermeldung aus, falls beim Einfügen der Daten ein Fehler auftritt
                        console.error("Error inserting data:", err.message);
                    }
                });
            });
        })
    });
});
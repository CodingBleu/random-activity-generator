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
                {description: 'Machen Sie einen Spaziergang im Park', participants: 2},
                {description: 'Ein Buch lesen', participants: 1},
                {description: 'Kochen Sie ein neues Rezept', participants: 2},
                {description: 'Sehen Sie sich einen Dokumentarfilm an', participants: 1},
                {description: 'Ein Brettspiel spielen', participants: 4},
                {description: 'Machen Sie etwas Gartenarbeit', participants: 1},
                {description: 'Probieren Sie ein neues Hobby aus', participants: 1},
                {description: 'Ein Museum besuchen', participants: 2},
                {description: 'Eine Fahrradtour machen', participants: 1},
                {description: 'Schreiben Sie eine Kurzgeschichte', participants: 1},
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
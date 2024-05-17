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

        // Erstelle eine neue Tabelle 'activites'
        db.run(`CREATE TABLE activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            description TEXT NOT NULL
        )`, (err) => {
            if (err) {
                // Gibt einen Fehler aus, falls beim Erstellen der Tabelle ein Problem aufgetreten ist
                console.error("Error creating table:", err.message);
                return;
            }
            // Bestätigen, dass die Tabelle erfolgreich erstellt wurde
            console.log('Table created');

            // Liste der Aktivitäten, die in die Datenbank eingefügt werden sollen
            const activities = [
                'Machen Sie einen Spaziergang im Park',
                'Ein Buch lesen',
                'Kochen Sie ein neues Rezept',
                'Sehen Sie sich einen Dokumentarfilm an',
                'Ein Brettspiel spielen',
                'Machen Sie etwas Gartenarbeit',
                'Probieren Sie ein neues Hobby aus',
                'Ein Museum besuchen',
                'Eine Fahrradtour machen',
                'Schreiben Sie eine Kurzgeschichte'
            ];

            // Füge jede Aktivität in die Datenbanktabelle ein
            activities.forEach(activity => {
                db.run(`INSERT INTO activities (description) VALUES (?)`, [activity], err => {
                    if (err) {
                        // Gibt eine Fehlermeldung aus, falls beim Einfügen der Daten ein Fehler auftritt
                        console.error("Error inserting data:", err.message);
                    }
                });
            });
        })
    });
});
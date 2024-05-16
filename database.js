// SQLite3-Modul wird geladen, um damit zu arbeiten
const sqlite3 = require('sqlite3').verbose();

// Name der Datenbank
const dbName = 'activities.db';

// Verbindung zur Datenbank wird erstellt
const db = new sqlite3.Database(dbName, (err) => {
    //Wenn ein Fehler auftritt, wird dieser ausgegeben
    if (err) {
        return console.error(err.message);
    }
    // Erfolgreiche Verbindung wird bestätigt
    console.log(`Connected to the ${dbName} database.`);
});

// Mehrere Dtenbank in Folge werden ausgeführt 
db.serialize(() => {
    // Eine Tabelle namens 'activities', falls sie noch nicht existiert
    db.run(`
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL
        )
    `, (err) => {
        // Wenn ein Fehler beim erstellen der Datenbank auftritt, wird dieser ausgegeben
        if (err) {
            console.error("Error creating table:", err.message);
            return;
        }
        // Erfolgreiches Erstellen der Tabelle wird bestätigt
        console.log('Table created');
        
        // Eine Liste von Aktivitäten, die in die Tabelle eingefügt werden sollen
        const activities = [
            'Go for a walk in the park',
            'Read a book',
            'Cook a new recipe',
            'Watch a documentary',
            'Play a board game',
            'Do some gardening',
            'Try a new hobby',
            'Visit a museum',
            'Go for a bike ride',
            'Write a short story'
        ];

        // Für jede Aktivität in der Liste...
        activities.forEach(activity => {
            // ...wird sie in die Tabelle 'activities' eingefügt
            db.run(`INSERT INTO activities (description) VALUES (?)`, [activity], err => {
                // Wenn ein Fehler beim Einfügen der Daten auftritt, wird dieser ausgegeben
                if (err) {
                    console.error("Error inserting data:", err.message);
                }
            });
        });
    });
});
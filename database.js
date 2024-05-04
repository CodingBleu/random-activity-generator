const sqlite3 = require('sqlite3').verbose();
const dbName = 'activities.db';
const db = new sqlite3.Database(dbName, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Connected to the ${dbName} database.`);
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Error creating table:", err.message);
            return;
        }
        console.log('Table created');
        
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

        activities.forEach(activity => {
            db.run(`INSERT INTO activities (description) VALUES (?)`, [activity], err => {
                if (err) {
                    console.error("Error inserting data:", err.message);
                }
            });
        });
    });
});
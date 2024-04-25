document.getElementById('generate-btn').addEventListener('click', function() {
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

    const randomIndex = Math.floor(Math.random() * activities.length);
    const randomActivity = activities[randomIndex];

    document.getElementById('activity-display').textContent = randomActivity;
});
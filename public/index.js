document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('generate-btn');
  btn.addEventListener('click', function() {
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

  fetch('/versioned-content?path=/style.css')
      .then(response => response.text())
      .then(cssPath => {
          const link = document.getElementById('versionedCss');
          link.href = cssPath;
      })
      .catch(error => console.error('Error fetching versioned CSS:', error));
});
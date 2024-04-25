
const packageJson = require('../package.json');
const version = packageJson.version;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('version-display').textContent = `Version: ${version}`;
})
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Einfaches Cache-Objekt als Ersatz für HttpContext.Cache
const cache = {};

app.use(express.static('public'));

app.get('/versioned-content', (req, res) => {
  try {
    const contentPath = req.query.path;
    const versionedPath = versionedContent(contentPath);
    res.send(versionedPath);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

function versionedContent(contentPath) {
  if (!cache[contentPath]) {
    const physicalPath = path.join(__dirname, 'public', contentPath);
    console.log('Trying to access:', physicalPath);
    const fileInfo = fs.statSync(physicalPath);
    const version = "v=" + fileInfo.mtime.toISOString().replace(/[^0-9]/g, "").substring(0, 14);

    const translatedContentPath = contentPath;
    const versionedContentPath = contentPath.includes("?")
      ? `${translatedContentPath}&${version}`
      : `${translatedContentPath}?${version}`;

    // Caching mit einfachem Ablauf, ohne Cache-Priorität oder Callback
    cache[contentPath] = versionedContentPath;
    setTimeout(() => { delete cache[contentPath]; }, 60000); // Cache für 1 Minute

    return versionedContentPath;
  } else {
    return cache[contentPath];
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
const fs = require('fs');
let data = fs.readFileSync('src/index.css', 'utf-8');

data = data.replace(
  "html, body {",
  "html {\n    scroll-behavior: smooth;\n  }\n  html, body {"
);

fs.writeFileSync('src/index.css', data);

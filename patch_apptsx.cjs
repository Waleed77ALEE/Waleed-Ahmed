const fs = require('fs');
let data = fs.readFileSync('src/App.tsx', 'utf-8');

if (!data.includes('import { FloatingWhatsApp }')) {
  data = data.replace(
    "import { Footer } from './components/Footer';",
    "import { Footer } from './components/Footer';\nimport { FloatingWhatsApp } from './components/FloatingWhatsApp';"
  );
}

if (!data.includes('<FloatingWhatsApp whatsappNumber={whatsappNumber} />')) {
  data = data.replace(
    "<Footer ",
    "<FloatingWhatsApp whatsappNumber={whatsappNumber} />\n        <Footer "
  );
}

fs.writeFileSync('src/App.tsx', data);

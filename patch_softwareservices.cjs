const fs = require('fs');
let data = fs.readFileSync('src/components/SoftwareServices.tsx', 'utf-8');

data = data.replace(
  "Premium <span className=\"bg-gradient-to-r from-cyan-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent\">Software Licenses</span>",
  "Professional <span className=\"bg-gradient-to-r from-cyan-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent\">Software & Solutions</span>"
);

fs.writeFileSync('src/components/SoftwareServices.tsx', data);

const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx,json}', { nodir: true });
files.push('metadata.json');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/AleePay/g, 'WALEEDKHANAFRIDI.ONLINE');
  content = content.replace(/Alee Customers/g, 'Waleed Customers');
  content = content.replace(/Alee<span/g, 'WALEEDKHANAFRIDI.<span');
  content = content.replace(/Pay<\/span>/g, 'ONLINE</span>');
  content = content.replace(/Alee772002/g, 'Waleed772002');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

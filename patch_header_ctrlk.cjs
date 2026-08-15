const fs = require('fs');
let data = fs.readFileSync('src/components/Header.tsx', 'utf-8');

data = data.replace(
  /  useEffect\(\(\) => \{\n    const handleKeyDown = \(e: KeyboardEvent\) => \{\n      if \(\(e\.metaKey \|\| e\.ctrlKey\) && e\.key\.toLowerCase\(\) === 'k'\) \{\n        e\.preventDefault\(\);\n        setIsSearchOpen\(true\);\n      \}\n    \};\n    window\.addEventListener\('keydown', handleKeyDown\);\n    return \(\) => window\.removeEventListener\('keydown', handleKeyDown\);\n  \}, \[\]\);\n/,
  ""
);

fs.writeFileSync('src/components/Header.tsx', data);

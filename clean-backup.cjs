const fs = require('fs');

// Read the file and fix any encoding issues
const filePath = 'd:\\AI\\backup-jsonbin-2026-01-27-003104.json';
const data = fs.readFileSync(filePath, 'utf8');

// Parse and re-stringify to clean it
const parsed = JSON.parse(data);
const cleaned = JSON.stringify(parsed, null, 2);

// Write cleaned version
fs.writeFileSync('d:\\AI\\backup-clean.json', cleaned);
console.log('✅ File cleaned and saved as backup-clean.json');

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Define your color replacements here
const colorMap = {
  'bg-yellow-500': 'bg-primary',
  'text-green-500': 'text-secondary',
  'border-yellow-700': 'border-accent',
  // Add more mappings as needed
};

// Adjust this to match the files you want to scan
const files = glob.sync('src/**/*.{js,jsx,ts,tsx,html}', { absolute: true });

files.forEach((filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace all color classes
  Object.entries(colorMap).forEach(([oldClass, newClass]) => {
    const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
    content = content.replace(regex, newClass);
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${filePath}`);
});

console.log('Tailwind color replacement complete!');


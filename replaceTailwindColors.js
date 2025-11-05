#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Color mapping configuration
const colorMappings = [
  // Yellow variations -> primary
  { from: /text-yellow-500/g, to: 'text-primary' },
  { from: /text-yellow-400/g, to: 'text-primary-light' },
  { from: /text-yellow-600/g, to: 'text-primary-dark' },
  { from: /bg-yellow-500/g, to: 'bg-primary' },
  { from: /bg-yellow-400/g, to: 'bg-primary-light' },
  { from: /bg-yellow-600/g, to: 'bg-primary-dark' },
  { from: /border-yellow-500/g, to: 'border-primary' },
  { from: /border-yellow-400/g, to: 'border-primary-light' },
  { from: /border-yellow-600/g, to: 'border-primary-dark' },
  { from: /from-yellow-500/g, to: 'from-primary' },
  { from: /from-yellow-600/g, to: 'from-primary-dark' },
  { from: /to-yellow-500/g, to: 'to-primary' },
  { from: /to-yellow-600/g, to: 'to-primary-dark' },
  { from: /hover:bg-yellow-600/g, to: 'hover:bg-primary-dark' },
  { from: /hover:bg-yellow-500/g, to: 'hover:bg-primary' },
  { from: /hover:text-yellow-500/g, to: 'hover:text-primary' },
  { from: /hover:text-yellow-400/g, to: 'hover:text-primary-light' },
  { from: /hover:border-yellow-500/g, to: 'hover:border-primary' },
  { from: /group-hover:text-yellow-500/g, to: 'group-hover:text-primary' },
  { from: /group-hover:text-yellow-400/g, to: 'group-hover:text-primary-light' },

  // Green variations -> secondary
  { from: /text-green-500/g, to: 'text-secondary' },
  { from: /text-green-400/g, to: 'text-secondary-light' },
  { from: /text-green-600/g, to: 'text-secondary-dark' },
  { from: /text-green-700/g, to: 'text-secondary-dark' },
  { from: /text-green-800/g, to: 'text-secondary-dark' },
  { from: /text-green-900/g, to: 'text-secondary-dark' },
  { from: /bg-green-500/g, to: 'bg-secondary' },
  { from: /bg-green-600/g, to: 'bg-secondary' },
  { from: /bg-green-700/g, to: 'bg-secondary' },
  { from: /bg-green-800/g, to: 'bg-secondary-dark' },
  { from: /bg-green-900/g, to: 'bg-secondary-dark' },
  { from: /border-green-500/g, to: 'border-secondary' },
  { from: /border-green-600/g, to: 'border-secondary' },
  { from: /border-green-700/g, to: 'border-secondary' },
  { from: /border-green-800/g, to: 'border-secondary-dark' },
  { from: /from-green-500/g, to: 'from-secondary' },
  { from: /from-green-600/g, to: 'from-secondary' },
  { from: /from-green-700/g, to: 'from-secondary' },
  { from: /from-green-800/g, to: 'from-secondary-dark' },
  { from: /from-green-900/g, to: 'from-secondary-dark' },
  { from: /to-green-500/g, to: 'to-secondary' },
  { from: /to-green-600/g, to: 'to-secondary' },
  { from: /to-green-700/g, to: 'to-secondary' },
  { from: /to-green-800/g, to: 'to-secondary-dark' },
  { from: /to-green-900/g, to: 'to-secondary-dark' },
  { from: /hover:bg-green-700/g, to: 'hover:bg-secondary' },
  { from: /hover:bg-green-800/g, to: 'hover:bg-secondary-dark' },
  { from: /hover:border-green-500/g, to: 'hover:border-secondary' },
  { from: /hover:from-yellow-600/g, to: 'hover:from-primary' },
  { from: /hover:to-yellow-500/g, to: 'hover:to-primary' },

  // Opacity variations
  { from: /yellow-500\/(\d+)/g, to: 'primary/\$1' },
  { from: /green-700\/(\d+)/g, to: 'secondary/\$1' },
  { from: /green-800\/(\d+)/g, to: 'secondary-dark/\$1' },
  { from: /green-900\/(\d+)/g, to: 'secondary-dark/\$1' },

  // Hex colors in CSS
  { from: /#eab308/g, to: '#fbbf24' },  // yellow to gold
  { from: /#15803d/g, to: '#1e40af' },  // green to blue
  { from: /#f59e0b/g, to: '#fbbf24' },  // amber to gold
  { from: /#22c55e/g, to: '#3b82f6' },  // light green to light blue
  
  // CSS variable references
  { from: /var$--yellow-primary$/g, to: 'rgb(251 191 36)' },
  { from: /var$--green-primary$/g, to: 'rgb(30 64 175)' },
  { from: /var$--accent$/g, to: 'rgb(220 38 38)' },
];

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    let changes = 0;

    colorMappings.forEach(({ from, to }) => {
      const matches = content.match(from);
      if (matches) {
        changes += matches.length;
        content = content.replace(from, to);
      }
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated \${filePath} (\${changes} replacements)`);
      return changes;
    } else {
      console.log(`⏭️  Skipped \${filePath} (no changes needed)`);
      return 0;
    }
  } catch (error) {
    console.error(`❌ Error processing \${filePath}:`, error.message);
    return 0;
  }
}

function walkDirectory(dir, fileExtensions = ['.jsx', '.js', '.css']) {
  let totalChanges = 0;
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        totalChanges += walkDirectory(filePath, fileExtensions);
      }
    } else if (fileExtensions.some(ext => file.endsWith(ext))) {
      totalChanges += processFile(filePath);
    }
  });

  return totalChanges;
}

// Main execution
console.log('🎨 Starting color replacement...\n');

const srcDir = path.join(__dirname, 'src');
const totalChanges = walkDirectory(srcDir);

console.log(`\n🎉 Complete! Made \${totalChanges} total replacements.`);
console.log('\n⚠️  Next steps:');
console.log('1. Stop your dev server (Ctrl+C)');
console.log('2. Run: npm run dev');
console.log('3. Hard refresh browser (Cmd+Shift+R or Ctrl+Shift+R)\n');

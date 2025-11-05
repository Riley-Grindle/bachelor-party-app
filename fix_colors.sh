#!/bin/bash

# Replace yellow colors
find src/components -type f -name "*.jsx" -exec sed -i '' 's/text-yellow-500/text-primary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/text-yellow-400/text-primary-light/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/text-yellow-600/text-primary-dark/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/bg-yellow-500/bg-primary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/bg-yellow-600/bg-primary-dark/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/border-yellow-500/border-primary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/hover:bg-yellow-600/hover:bg-primary-dark/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/hover:border-yellow-500/hover:border-primary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/hover:text-yellow-500/hover:text-primary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/hover:text-yellow-400/hover:text-primary-light/g' {} +

# Replace green colors
find src/components -type f -name "*.jsx" -exec sed -i '' 's/text-green-700/text-secondary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/text-green-400/text-secondary-light/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/bg-green-700/bg-secondary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/bg-green-800/bg-secondary-dark/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/bg-green-900/bg-secondary-dark/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/border-green-700/border-secondary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/border-green-800/border-secondary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/from-green-900/from-secondary-dark/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/to-green-800/to-secondary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/hover:from-yellow-600/hover:from-primary/g' {} +
find src/components -type f -name "*.jsx" -exec sed -i '' 's/hover:to-yellow-500/hover:to-primary-light/g' {} +

echo "✅ Colors replaced! Restart your dev server."

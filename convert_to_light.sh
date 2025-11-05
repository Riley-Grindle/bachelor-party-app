#!/bin/bash

echo "🔧 Fixing text colors for light theme..."

# Main page headings - should be dark on light background
find src/components -name "*.jsx" -exec sed -i '' \
  -e 's/"text-5xl md:text-6xl font-bold text-gray-900/"text-5xl 
md:text-6xl font-bold text-gray-900/g' \
  -e 's/"text-4xl font-bold text-gray-900/"text-4xl font-bold 
text-gray-900/g' \
  -e 's/"text-3xl font-bold text-gray-900/"text-3xl font-bold 
text-gray-900/g' \
  {} +

# Text inside colored card headers should be white
find src/components -name "*.jsx" -exec sed -i '' \
  -e 's/from-blue-600 to-blue-500 px-6 py-4/from-blue-600 to-blue-500 px-6 
py-4/g' \
  -e 's/from-red-600 to-red-500 px-6 py-4/from-red-600 to-red-500 px-6 
py-4/g' \
  {} +

# Headers inside gradient cards need white text
# Draft.jsx team headers
sed -i '' \
  -e 's/</h3><h3>TEAM A&lt;\/h3&gt;/</h3><h3>TEAM A&lt;\/h3&gt;/g' \
  -e 's/</h3><h3>TEAM B&lt;\/h3&gt;/</h3><h3>TEAM B&lt;\/h3&gt;/g' \
  src/components/Draft.jsx

# Itinerary day headers
sed -i '' \
  -e 's/</h3><h3>/</h3><h3>/g' \
  src/components/Itinerary.jsx

# Resort venue headers on colored backgrounds
sed -i '' \
  -e 's/</h3><h3 src="">TEAM A</h3>
// REPLACE WITH:
<h3>TEAM A</h3>

// FIND:
<h3>TEAM B</h3>
// REPLACE WITH:
<h3>TEAM B</h3>

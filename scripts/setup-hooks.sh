#!/usr/bin/env sh

# Make all husky hooks executable
echo "🔧 Setting up Git hooks..."

# Find and make all husky hooks executable
if [ -d ".husky" ]; then
  find .husky -type f -name "*" ! -name "_" ! -name ".*" -exec chmod +x {} \;
  echo "✅ Git hooks are now executable"
else
  echo "❌ .husky directory not found"
  exit 1
fi

echo "🎉 Setup complete!"

#!/bin/bash
# Update version and build date in SEB Config Generator
# Usage: ./scripts/update-version.sh v0.18.0a4

set -e

# Check if version argument is provided
if [ -z "$1" ]; then
    echo "❌ Error: No version specified"
    echo "Usage: $0 <version>"
    echo "Example: $0 v0.18.0a4"
    exit 1
fi

NEW_VERSION="$1"

# Validate version format (optional, basic check)
if [[ ! "$NEW_VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+[a-z0-9]*$ ]]; then
    echo "⚠️  Warning: Version format doesn't match expected pattern (v0.18.0a3)"
    echo "Continue anyway? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

# Generate current timestamp
BUILD_TIMESTAMP=$(date +"%Y-%m-%d %H:%M")
BUILD_ISO=$(date +"%Y-%m-%dT%H:%M:00")

# File to update
APP_FILE="js/app.js"

# Check if file exists
if [ ! -f "$APP_FILE" ]; then
    echo "❌ Error: $APP_FILE not found"
    exit 1
fi

echo "🔄 Updating version information..."
echo "   Version: $NEW_VERSION"
echo "   Build:   $BUILD_TIMESTAMP"
echo ""

# Create backup
cp "$APP_FILE" "${APP_FILE}.bak"
echo "📦 Backup created: ${APP_FILE}.bak"

# Update version in header comment (line 3)
sed -i '' "3s|^// Version: .*|// Version: $NEW_VERSION|" "$APP_FILE"

# Update build date in header comment (line 4)
sed -i '' "4s|^// Build: .*|// Build: $BUILD_TIMESTAMP|" "$APP_FILE"

# Update APP_VERSION constant
sed -i '' "s|const APP_VERSION = 'v[^']*';|const APP_VERSION = '$NEW_VERSION';|" "$APP_FILE"

# Update BUILD_DATE constant
sed -i '' "s|const BUILD_DATE = new Date('[^']*');|const BUILD_DATE = new Date('$BUILD_ISO');|" "$APP_FILE"

echo "✅ Version updated successfully!"
echo ""
echo "📝 Changes made:"
grep -n "// Version:" "$APP_FILE" | head -1
grep -n "// Build:" "$APP_FILE" | head -1
grep -n "const APP_VERSION" "$APP_FILE" | head -1
grep -n "const BUILD_DATE" "$APP_FILE" | head -1
echo ""
echo "🔍 Verify changes:"
echo "   git diff $APP_FILE"
echo ""
echo "♻️  Remove backup:"
echo "   rm ${APP_FILE}.bak"

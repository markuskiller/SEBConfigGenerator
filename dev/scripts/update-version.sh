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

# Files to update
APP_FILE="js/app.js"
APACHE_FILE="configs/apache/.htaccess"
NGINX_FILE="configs/nginx/sebconfiggenerator.conf"
README_FILE="configs/README.md"
HEADERS_FILE="_headers"

# Check if files exist
if [ ! -f "$APP_FILE" ]; then
    echo "❌ Error: $APP_FILE not found"
    exit 1
fi

if [ ! -f "$APACHE_FILE" ]; then
    echo "⚠️  Warning: $APACHE_FILE not found (skipping)"
fi

if [ ! -f "$NGINX_FILE" ]; then
    echo "⚠️  Warning: $NGINX_FILE not found (skipping)"
fi

if [ ! -f "$README_FILE" ]; then
    echo "⚠️  Warning: $README_FILE not found (skipping)"
fi

if [ ! -f "$HEADERS_FILE" ]; then
    echo "⚠️  Warning: $HEADERS_FILE not found (skipping)"
fi

echo "🔄 Updating version information..."
echo "   Version: $NEW_VERSION"
echo "   Build:   $BUILD_TIMESTAMP"
echo ""

# Create backups
cp "$APP_FILE" "${APP_FILE}.bak"
echo "📦 Backups created:"
echo "   ${APP_FILE}.bak"

if [ -f "$APACHE_FILE" ]; then
    cp "$APACHE_FILE" "${APACHE_FILE}.bak"
    echo "   ${APACHE_FILE}.bak"
fi

if [ -f "$NGINX_FILE" ]; then
    cp "$NGINX_FILE" "${NGINX_FILE}.bak"
    echo "   ${NGINX_FILE}.bak"
fi

if [ -f "$README_FILE" ]; then
    cp "$README_FILE" "${README_FILE}.bak"
    echo "   ${README_FILE}.bak"
fi

if [ -f "$HEADERS_FILE" ]; then
    cp "$HEADERS_FILE" "${HEADERS_FILE}.bak"
    echo "   ${HEADERS_FILE}.bak"
fi

echo ""

# Update js/app.js (4 locations)
echo "📝 Updating js/app.js..."
sed -i '' "3s|^// Version: .*|// Version: $NEW_VERSION|" "$APP_FILE"
sed -i '' "4s|^// Build: .*|// Build: $BUILD_TIMESTAMP|" "$APP_FILE"
sed -i '' "s|const APP_VERSION = 'v[^']*';|const APP_VERSION = '$NEW_VERSION';|" "$APP_FILE"
sed -i '' "s|const BUILD_DATE = new Date('[^']*');|const BUILD_DATE = new Date('$BUILD_ISO');|" "$APP_FILE"

# Update configs/apache/.htaccess
if [ -f "$APACHE_FILE" ]; then
    echo "📝 Updating configs/apache/.htaccess..."
    sed -i '' "s|^# Version: v.*|# Version: $NEW_VERSION|" "$APACHE_FILE"
    sed -i '' "s|^# Updated: .*|# Updated: $(date +"%Y-%m-%d")|" "$APACHE_FILE"
fi

# Update configs/nginx/sebconfig.conf
if [ -f "$NGINX_FILE" ]; then
    echo "📝 Updating configs/nginx/sebconfig.conf..."
    sed -i '' "s|^# Version: v.*|# Version: $NEW_VERSION|" "$NGINX_FILE"
    sed -i '' "s|^# Updated: .*|# Updated: $(date +"%Y-%m-%d")|" "$NGINX_FILE"
fi

# Update configs/README.md
if [ -f "$README_FILE" ]; then
    echo "📝 Updating configs/README.md..."
    sed -i '' "s|^\*\*Version:\*\* v.*|**Version:** $NEW_VERSION  |" "$README_FILE"
    sed -i '' "s|^\*\*Last Updated:\*\* .*|**Last Updated:** $(date +"%Y-%m-%d")  |" "$README_FILE"
fi

# Update _headers
if [ -f "$HEADERS_FILE" ]; then
    echo "📝 Updating _headers..."
    sed -i '' "s|^# Version: v.*|# Version: $NEW_VERSION|" "$HEADERS_FILE"
fi

echo ""
echo "✅ Version updated successfully in all files!"
echo ""
echo "📝 Changes summary:"
echo "   js/app.js (4 locations):"
grep -n "// Version:" "$APP_FILE" | head -1
grep -n "const APP_VERSION" "$APP_FILE" | head -1

if [ -f "$APACHE_FILE" ]; then
    echo "   configs/apache/.htaccess:"
    grep -n "# Version:" "$APACHE_FILE" | head -1
fi

if [ -f "$NGINX_FILE" ]; then
    echo "   configs/nginx/sebconfig.conf:"
    grep -n "# Version:" "$NGINX_FILE" | head -1
fi

if [ -f "$README_FILE" ]; then
    echo "   configs/README.md:"
    grep -n "Version:" "$README_FILE" | tail -1
fi

if [ -f "$HEADERS_FILE" ]; then
    echo "   _headers:"
    grep -n "# Version:" "$HEADERS_FILE" | head -1
fi

echo ""
echo "🔍 Verify changes:"
echo "   git diff js/app.js"
echo "   git diff configs/"
echo ""
echo "♻️  Remove backups:"
echo "   rm js/app.js.bak"
if [ -f "${APACHE_FILE}.bak" ]; then
    echo "   rm ${APACHE_FILE}.bak"
fi
if [ -f "${NGINX_FILE}.bak" ]; then
    echo "   rm ${NGINX_FILE}.bak"
fi
if [ -f "${README_FILE}.bak" ]; then
    echo "   rm ${README_FILE}.bak"
fi
if [ -f "${HEADERS_FILE}.bak" ]; then
    echo "   rm ${HEADERS_FILE}.bak"
fi

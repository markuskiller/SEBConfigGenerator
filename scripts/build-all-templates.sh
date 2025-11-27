#!/bin/sh
# ============================================================================
# Build All Templates - Master Build Script
# Runs all template generation scripts in the correct order
# ============================================================================

set -e

# Determine the project root (script is in scripts/ directory)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🔨 Building All Templates..."
echo ""

# Track success/failure
BUILD_ERRORS=0

# ============================================================================
# 1. Service Presets & Subjects
# ============================================================================
echo "📦 Building service presets and subjects..."
if sh "$SCRIPT_DIR/build-service-presets.sh"; then
    echo "✅ Service presets built successfully"
else
    echo "❌ Service presets build failed"
    BUILD_ERRORS=$((BUILD_ERRORS + 1))
fi
echo ""

# ============================================================================
# 2. Platform Options (SEB settings for Windows/macOS/iPadOS)
# ============================================================================
echo "🖥️  Building platform options..."
if sh "$SCRIPT_DIR/build-platform-options.sh"; then
    echo "✅ Platform options built successfully"
else
    echo "❌ Platform options build failed"
    BUILD_ERRORS=$((BUILD_ERRORS + 1))
fi
echo ""

# ============================================================================
# 3. Translations
# ============================================================================
echo "🌍 Building translations..."
if sh "$SCRIPT_DIR/build-translations.sh"; then
    echo "✅ Translations built successfully"
else
    echo "❌ Translations build failed"
    BUILD_ERRORS=$((BUILD_ERRORS + 1))
fi
echo ""

# ============================================================================
# 4. Browser Capture Template
# ============================================================================
echo "🌐 Building browser capture template..."
if sh "$SCRIPT_DIR/build-browser-capture.sh"; then
    echo "✅ Browser capture template built successfully"
else
    echo "❌ Browser capture template build failed"
    BUILD_ERRORS=$((BUILD_ERRORS + 1))
fi
echo ""

# ============================================================================
# 5. Security Levels
# ============================================================================
echo "🔒 Building security levels..."
if sh "$SCRIPT_DIR/build-security-levels.sh"; then
    echo "✅ Security levels built successfully"
else
    echo "❌ Security levels build failed"
    BUILD_ERRORS=$((BUILD_ERRORS + 1))
fi
echo ""

# ============================================================================
# Summary
# ============================================================================
echo "=========================================="
if [ $BUILD_ERRORS -eq 0 ]; then
    echo "✨ All templates built successfully!"
    echo ""
    echo "📊 Generated files:"
    echo "   - templates/generated/presets.js"
    echo "   - templates/generated/subjects.js"
    echo "   - templates/generated/preset-groups.js"
    echo "   - templates/generated/seb-options-*.js (3 files)"
    echo "   - templates/generated/wikipedia-mapping.js"
    echo "   - templates/generated/seb-option-labels.js"
    echo "   - templates/generated/translations.js"
    echo "   - templates/generated/browser-capture.js"
    echo "   - templates/generated/security-levels.js"
    echo "   - templates/generated/xml-data.js"
    echo ""
    echo "🎉 Ready for deployment!"
    exit 0
else
    echo "⚠️  Build completed with $BUILD_ERRORS error(s)"
    echo "Please check the output above for details"
    exit 1
fi

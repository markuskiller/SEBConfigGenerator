#!/bin/bash
# Local deployment script for SEB Config Generator
# Automates all steps: build, version update, commit, push
# Usage: ./scripts/deploy.sh [version] [commit-message]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC}  $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "scripts/deploy.sh" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
print_step "Current branch: $CURRENT_BRANCH"

# Parse arguments
NEW_VERSION=""
COMMIT_MSG=""

if [ $# -eq 0 ]; then
    # No arguments - just rebuild and commit without version bump
    SKIP_VERSION=true
elif [ $# -eq 1 ]; then
    # One argument - version only
    NEW_VERSION="$1"
    SKIP_VERSION=false
elif [ $# -ge 2 ]; then
    # Two+ arguments - version and commit message
    NEW_VERSION="$1"
    shift
    COMMIT_MSG="$*"
    SKIP_VERSION=false
fi

echo ""
print_step "Deployment Steps:"
echo "   1. Check for uncommitted changes"
echo "   2. Rebuild generated files"
if [ "$SKIP_VERSION" != "true" ]; then
    echo "   3. Update version to $NEW_VERSION"
    echo "   4. Commit and push changes"
else
    echo "   3. Commit and push changes"
fi
echo ""

# Step 1: Check for uncommitted changes
print_step "Step 1: Checking git status..."
if ! git diff --quiet || ! git diff --cached --quiet; then
    print_warning "You have uncommitted changes:"
    git status --short
    echo ""
    echo "Continue with deployment? This will include these changes. (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        print_error "Deployment aborted."
        exit 1
    fi
fi
print_success "Git status checked"

# Step 2: Rebuild generated files
print_step "Step 2: Rebuilding generated files..."
echo ""

# Build all templates using master build script
print_step "  → Running build-all-templates.sh..."
if bash scripts/build-all-templates.sh; then
    print_success "  All templates built successfully"
else
    print_error "  Failed to build templates"
    exit 1
fi

echo ""
print_success "All generated files rebuilt"

# Step 3: Update version (if provided)
if [ "$SKIP_VERSION" != "true" ]; then
    print_step "Step 3: Updating version to $NEW_VERSION..."
    
    # Validate version format
    if [[ ! "$NEW_VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+[a-z0-9]*$ ]]; then
        print_warning "Version format doesn't match expected pattern (v0.19.0a6)"
        echo "Continue anyway? (y/N)"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            print_error "Deployment aborted."
            exit 1
        fi
    fi
    
    # Generate timestamps
    BUILD_TIMESTAMP=$(date +"%Y-%m-%d %H:%M")
    BUILD_ISO=$(date +"%Y-%m-%dT%H:%M:00")
    
    # Update js/app.js
    APP_FILE="js/app.js"
    sed -i '' "3s|^// Version: .*|// Version: $NEW_VERSION|" "$APP_FILE"
    sed -i '' "4s|^// Build: .*|// Build: $BUILD_TIMESTAMP|" "$APP_FILE"
    sed -i '' "s|const APP_VERSION = 'v[^']*';|const APP_VERSION = '$NEW_VERSION';|" "$APP_FILE"
    sed -i '' "s|const BUILD_DATE = new Date('[^']*');|const BUILD_DATE = new Date('$BUILD_ISO');|" "$APP_FILE"
    
    # Update config files if they exist
    [ -f "configs/apache/.htaccess" ] && sed -i '' "s|^# Version: v.*|# Version: $NEW_VERSION|" "configs/apache/.htaccess"
    [ -f "configs/nginx/sebconfiggenerator.conf" ] && sed -i '' "s|^# Version: v.*|# Version: $NEW_VERSION|" "configs/nginx/sebconfiggenerator.conf"
    [ -f "configs/README.md" ] && sed -i '' "s|^\*\*Version:\*\* v.*|**Version:** $NEW_VERSION  |" "configs/README.md"
    [ -f "_headers" ] && sed -i '' "s|^# Version: v.*|# Version: $NEW_VERSION|" "_headers"
    
    # Update README.md badges based on branch
    if [ -f "README.md" ]; then
        if [ "$CURRENT_BRANCH" = "dev" ]; then
            # Update dev badge (line 4) - replace any version or "dev" with new version
            sed -i '' "4s|badge/Cloudflare%20Dev-[^-]*-orange|badge/Cloudflare%20Dev-${NEW_VERSION}-orange|" "README.md"
        elif [ "$CURRENT_BRANCH" = "main" ]; then
            # Update stable/main badge (line 3) - replace any version or "stable" with new version
            sed -i '' "3s|badge/Cloudflare%20Stable-[^-]*-brightgreen|badge/Cloudflare%20Stable-${NEW_VERSION}-brightgreen|" "README.md"
        fi
    fi
    
    print_success "Version updated to $NEW_VERSION"
    echo ""
fi

# Step 4: Stage all changes
print_step "Step $([ "$SKIP_VERSION" != "true" ] && echo "4" || echo "3"): Staging changes..."
git add -A

# Show what will be committed
echo ""
print_step "Changes to be committed:"
git status --short
echo ""

# Create commit message
if [ -z "$COMMIT_MSG" ]; then
    if [ "$SKIP_VERSION" != "true" ]; then
        COMMIT_MSG="chore: release $NEW_VERSION

- Rebuild generated files
- Update version information"
    else
        COMMIT_MSG="chore: rebuild generated files

- Update presets, subjects, translations"
    fi
fi

# Confirm commit
echo -e "${YELLOW}Commit message:${NC}"
echo "$COMMIT_MSG"
echo ""
echo "Proceed with commit and push to $CURRENT_BRANCH? (y/N)"
read -r response
if [[ ! "$response" =~ ^[Yy]$ ]]; then
    print_error "Deployment aborted. Changes are staged but not committed."
    echo "To unstage: git reset"
    exit 1
fi

# Commit
print_step "Committing changes..."
git commit -m "$COMMIT_MSG"
print_success "Changes committed"

# Push
print_step "Pushing to origin/$CURRENT_BRANCH..."
git push origin "$CURRENT_BRANCH"
print_success "Pushed to origin/$CURRENT_BRANCH"

echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo ""
print_step "Next steps:"
if [ "$CURRENT_BRANCH" = "dev" ]; then
    echo "   → Check Cloudflare Pages: https://dev.focusmode.ch"
    echo "   → Check GitHub Actions: https://github.com/markuskiller/SEBConfigGenerator/actions"
    echo "   → Test thoroughly before merging to main"
elif [ "$CURRENT_BRANCH" = "main" ]; then
    echo "   → Check production: https://focusmode.ch"
    echo "   → Verify deployment on both platforms"
else
    print_warning "You're on branch '$CURRENT_BRANCH' - make sure this is correct!"
fi
echo ""

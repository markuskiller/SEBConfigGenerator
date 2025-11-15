#!/bin/bash
# ============================================================================
# Generate JavaScript data files from XML/JSON templates
# ============================================================================
# This script converts templates to JavaScript constants for offline usage
# Run this script whenever you update:
#   - templates/source/example_config.xml
#   - templates/seb-options-*.json
# ============================================================================

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🔧 Generating JavaScript data files from templates..."
echo "📂 Project root: $PROJECT_ROOT"
echo ""

# Generate xml-data.js
echo "📝 Generating xml-data.js from example_config.xml..."
echo "// Auto-generated from example_config.xml - DO NOT EDIT MANUALLY" > "$PROJECT_ROOT/templates/xml-data.js"
echo "// To regenerate: Run scripts/build-platform-options.sh" >> "$PROJECT_ROOT/templates/xml-data.js"
echo -n "const EXAMPLE_CONFIG_XML = \`" >> "$PROJECT_ROOT/templates/xml-data.js"
cat "$PROJECT_ROOT/templates/source/example_config.xml" >> "$PROJECT_ROOT/templates/xml-data.js"
echo "\`;" >> "$PROJECT_ROOT/templates/xml-data.js"

echo "✅ Generated templates/xml-data.js"

# Generate location JS files from JSON
echo ""
echo "📍 Generating location JS files from JSON..."

for json_file in "$PROJECT_ROOT/templates/source/seb-options/seb-options-"*.json; do
    if [ -f "$json_file" ]; then
        basename=$(basename "$json_file" .json)
        platform=$(echo "$basename" | sed 's/seb-options-//')
        varname="LOCATIONS_$(echo $platform | tr '[:lower:]' '[:upper:]')"
        js_file="$PROJECT_ROOT/templates/generated/$basename.js"
        
        echo "  - Processing $basename.json → $varname"
        
        cat > "$js_file" << EOF
// Auto-generated from $basename.json - DO NOT EDIT MANUALLY
// To regenerate: Run scripts/build-platform-options.sh
const $varname = 
EOF
        
        cat "$json_file" >> "$js_file"
        echo ";" >> "$js_file"
        
        echo "    ✅ Generated $(basename "$js_file")"
    fi
done

echo ""
echo "🎉 All JavaScript data files generated successfully!"
echo ""
echo "📊 Generated files:"
ls -lh "$PROJECT_ROOT/templates/"*.js | awk '{print "   " $9 " (" $5 ")"}'
echo ""
echo "💡 Don't forget to commit the updated files:"
echo "   git add templates/*.js"
echo "   git commit -m 'Update generated template data files'"

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

# Generate Wikipedia mapping JS from JSON
echo ""
echo "📚 Generating Wikipedia mapping JS from JSON..."

wiki_json="$PROJECT_ROOT/templates/source/wikipedia-mapping.json"
wiki_js="$PROJECT_ROOT/templates/generated/wikipedia-mapping.js"

if [ -f "$wiki_json" ]; then
    echo "  - Processing wikipedia-mapping.json → WIKIPEDIA_ARTICLES"
    
    # Use jq to flatten the nested structure (exclude _comment fields)
    if command -v jq &> /dev/null; then
        echo "// Auto-generated from wikipedia-mapping.json - DO NOT EDIT MANUALLY" > "$wiki_js"
        echo "// To regenerate: Run scripts/build-platform-options.sh" >> "$wiki_js"
        echo "const WIKIPEDIA_ARTICLES = " >> "$wiki_js"
        jq 'del(._comment) | [to_entries[] | .value | to_entries[]] | map({(.key): .value}) | add' "$wiki_json" >> "$wiki_js"
        echo ";" >> "$wiki_js"
        echo "    ✅ Generated wikipedia-mapping.js"
    else
        echo "    ⚠️  jq not found, skipping Wikipedia mapping generation"
        echo "    💡 Install jq: brew install jq (macOS) or apt-get install jq (Linux)"
    fi
fi

# Generate SEB option labels translations JS from JSON
echo ""
echo "📝 Generating SEB option labels translations JS from JSON..."

labels_json="$PROJECT_ROOT/templates/source/seb-option-labels.json"
labels_js="$PROJECT_ROOT/templates/generated/seb-option-labels.js"

if [ -f "$labels_json" ]; then
    echo "  - Processing seb-option-labels.json → SEB_OPTION_LABELS"
    
    if command -v jq &> /dev/null; then
        echo "// Auto-generated from seb-option-labels.json - DO NOT EDIT MANUALLY" > "$labels_js"
        echo "// To regenerate: Run scripts/build-platform-options.sh" >> "$labels_js"
        echo "const SEB_OPTION_LABELS = " >> "$labels_js"
        jq 'del(._comment, ._note)' "$labels_json" >> "$labels_js"
        echo ";" >> "$labels_js"
        echo "    ✅ Generated seb-option-labels.js"
    else
        echo "    ⚠️  jq not found, skipping option labels generation"
    fi
fi

echo ""
echo "🎉 All JavaScript data files generated successfully!"
echo ""
echo "📊 Generated files:"
ls -lh "$PROJECT_ROOT/templates/"*.js | awk '{print "   " $9 " (" $5 ")"}'
echo ""
echo "💡 Don't forget to commit the updated files:"
echo "   git add templates/*.js"
echo "   git commit -m 'Update generated template data files'"

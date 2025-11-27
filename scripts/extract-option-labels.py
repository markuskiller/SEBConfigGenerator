#!/usr/bin/env python3
"""
Extract all SEB config option keys from example_config.xml and map them to
translated labels from seb-option-labels.js for use in translations.
"""

import re
import json
import xml.etree.ElementTree as ET
from pathlib import Path
import subprocess

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
XML_FILE = PROJECT_ROOT / "templates" / "source" / "example_config.xml"
LABELS_FILE = PROJECT_ROOT / "templates" / "generated" / "seb-option-labels.js"
DE_TRANS = PROJECT_ROOT / "translations" / "de.json"
EN_TRANS = PROJECT_ROOT / "translations" / "en.json"

def extract_keys_from_xml(xml_path):
    """Extract all unique <key> elements from XML that are direct config keys."""
    tree = ET.parse(xml_path)
    root = tree.getroot()
    
    keys = set()
    
    # Find all <key> elements that are direct children of the root <dict>
    dict_elem = root.find('.//dict')
    if dict_elem is not None:
        for i, child in enumerate(dict_elem):
            if child.tag == 'key':
                key_name = child.text
                # Skip nested keys (like in URLFilterRules array)
                if key_name and not key_name in ['action', 'active', 'expression', 'regex']:
                    keys.add(key_name)
    
    return sorted(keys)

def load_seb_option_labels(labels_path):
    """Load SEB_OPTION_LABELS from the JS file using Node.js."""
    # Use Node.js to properly parse the JavaScript file
    js_code = f"""
    const fs = require('fs');
    const content = fs.readFileSync('{labels_path}', 'utf8');
    eval(content);
    console.log(JSON.stringify(SEB_OPTION_LABELS));
    """
    
    try:
        result = subprocess.run(
            ['node', '-e', js_code],
            capture_output=True,
            text=True,
            check=True
        )
        return json.loads(result.stdout)
    except (subprocess.CalledProcessError, FileNotFoundError):
        # Fallback: try to parse manually
        with open(labels_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract just the options section which has the actual option names as keys
        # Look for lines like: "allowPDFPlugIn": "text",
        labels = {'de': {}, 'en': {}}
        
        # Extract German labels
        de_section = re.search(r'"de":\s*\{([\s\S]*?)(?=\n\s*\},?\s*\n\s*"en")', content)
        if de_section:
            for match in re.finditer(r'"([a-zA-Z][a-zA-Z0-9]*)": "([^"]*)"', de_section.group(1)):
                key, value = match.groups()
                if not key.startswith('_comment'):
                    labels['de'][key] = value
        
        # Extract English labels  
        en_section = re.search(r'"en":\s*\{([\s\S]*?)\n\s*\}\s*;?\s*$', content)
        if en_section:
            for match in re.finditer(r'"([a-zA-Z][a-zA-Z0-9]*)": "([^"]*)"', en_section.group(1)):
                key, value = match.groups()
                if not key.startswith('_comment'):
                    labels['en'][key] = value
        
        return labels

def clean_label(label):
    """Clean up label by removing parenthetical info and platform suffixes."""
    if not label:
        return label
    
    # Remove trailing parentheses content
    cleaned = re.sub(r'\s*\([^)]*\)\s*$', '', label)
    # Remove trailing platform names
    cleaned = re.sub(r'\s+(Win|Mac|iOS|iPadOS|macOS)\s*$', '', cleaned)
    
    return cleaned.strip()

def main():
    print("🔍 Extracting option keys from XML...")
    keys = extract_keys_from_xml(XML_FILE)
    print(f"   Found {len(keys)} unique keys")
    
    print("\n📖 Loading SEB option labels...")
    seb_labels = load_seb_option_labels(LABELS_FILE)
    
    print("\n🔤 Loading existing translations...")
    with open(DE_TRANS, 'r', encoding='utf-8') as f:
        de_trans = json.load(f)
    
    with open(EN_TRANS, 'r', encoding='utf-8') as f:
        en_trans = json.load(f)
    
    print("\n🏗️  Building option label mappings...")
    
    # Create option label sections
    de_option_labels = {}
    en_option_labels = {}
    
    found_count = 0
    missing_count = 0
    
    for key in keys:
        # Try to find label in SEB_OPTION_LABELS
        de_label = seb_labels.get('de', {}).get(key)
        en_label = seb_labels.get('en', {}).get(key)
        
        if de_label:
            de_option_labels[key] = clean_label(de_label)
            found_count += 1
        else:
            missing_count += 1
            print(f"   ⚠️  Missing DE label for: {key}")
        
        if en_label:
            en_option_labels[key] = clean_label(en_label)
    
    print(f"\n📊 Results:")
    print(f"   ✓ Found labels: {found_count}")
    print(f"   ⚠ Missing labels: {missing_count}")
    
    # Add to translations under "optionLabels" key
    de_trans['optionLabels'] = de_option_labels
    en_trans['optionLabels'] = en_option_labels
    
    print("\n💾 Saving updated translations...")
    with open(DE_TRANS, 'w', encoding='utf-8') as f:
        json.dump(de_trans, f, ensure_ascii=False, indent=2)
    
    with open(EN_TRANS, 'w', encoding='utf-8') as f:
        json.dump(en_trans, f, ensure_ascii=False, indent=2)
    
    print("\n✅ Done! Run 'bash scripts/build-translations.sh' to regenerate translations.js")

if __name__ == '__main__':
    main()

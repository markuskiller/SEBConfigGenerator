# Service & Subject Templates

This directory contains the template system for SEB Config Generator presets.

## 📁 Directory Structure

```
templates/
├── source/                   # Source JSON/XML files (edit these!)
│   ├── services/             # Service/tool presets
│   │   ├── onenote.json      # OneNote preset
│   │   ├── whiteboard.json   # Whiteboard.fi preset
│   │   ├── duden.json        # Duden dictionary
│   │   └── ...               # More services
│   ├── subjects/             # Subject configurations
│   │   ├── german.json       # German language tools
│   │   ├── english.json      # English language tools
│   │   └── french.json       # French language tools
│   ├── platforms/            # Platform-specific boolean options
│   │   ├── boolean-options-locations-macos.json
│   │   ├── boolean-options-locations-windows.json
│   │   └── boolean-options-locations-ipados.json
│   └── example_config.xml    # SEB config XML template
└── generated/                # Generated JS files (auto-generated)
    ├── presets.js            # All service presets
    ├── subjects.js           # All subject configurations
    ├── preset-groups.js      # Categorized preset groups
    ├── boolean-options-locations-*.js  # Platform option mappings
    └── xml-data.js           # XML template as JS constant
```

## 🎯 How to Add a New Service

### 1. Create a new JSON file in `source/services/`

Example: `templates/source/services/mynewservice.json`

```json
{
  "id": "mynewservice",
  "name": "My New Service",
  "description": "Description for UI",
  "category": "noLogin",
  "startUrl": "https://example.com",
  "domains": [
    "example.com",
    "*.example.com"
  ]
}
```

### 2. Available Categories

- `noLogin` - Services without authentication (e.g., Kahoot, Whiteboard.fi)
- `withLogin` - Services requiring login (e.g., OneNote, Word Online)
- `allowedTools` - Subject-specific tools (dictionaries, calculators)

For `allowedTools`, add `"language": "german"` (or english, french, etc.)

### 3. Run the build script

```bash
bash scripts/build-service-presets.sh
```

### 4. Test your changes

The generated files are automatically imported by `js/app.js`.

## 🌍 How to Add a New Subject

### 1. Create a new JSON file in `source/subjects/`

Example: `templates/source/subjects/spanish.json`

```json
{
  "id": "spanish",
  "name": "Español",
  "toolPresets": ["rae", "wordreference"]
}
```

### 2. Add the corresponding tool services

Create `source/services/rae.json` and `source/services/wordreference.json`

### 3. Run the build script

```bash
bash scripts/build-service-presets.sh
```

## 🔄 When to Rebuild

Run `bash scripts/build-service-presets.sh` whenever you:
- Add a new service JSON file
- Modify an existing service JSON file
- Add a new subject JSON file
- Change subject tool associations

## 🤝 Contributing

1. Fork the repository
2. Add your service/subject JSON files
3. Run the build script
4. Test the changes locally
5. Submit a pull request

**Note:** Only modify files in `source/` directory. Never edit files in `generated/` directly!

## 📝 JSON Schema Reference

### Service Preset Schema

```typescript
{
  id: string;              // Unique identifier (lowercase, no spaces)
  name: string;            // Display name for UI
  description: string;     // Brief description
  category: "noLogin" | "withLogin" | "allowedTools";
  language?: string;       // Required for allowedTools category
  startUrl: string;        // Starting URL
  domains: string[];       // Allowed domains (wildcards supported)
  blockedDomains?: string[]; // Optional: Explicitly blocked domains
}
```

### Subject Schema

```typescript
{
  id: string;              // Unique identifier (lowercase)
  name: string;            // Display name for UI
  toolPresets: string[];   // Array of tool preset IDs
}
```

---

**Script:** `scripts/build-service-presets.sh`

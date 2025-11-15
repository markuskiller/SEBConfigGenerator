# Service & Subject Templates

This directory contains the template system for SEB Config Generator presets.

## 📁 Directory Structure

```
templates/
├── source/                   # Source JSON/XML files (edit these!)
│   ├── services/             # Service presets (Kahoot, Miro, etc.)
│   │   ├── etherpad.json
│   │   ├── onenote.json
│   │   ├── whiteboard.json
│   │   └── ...
│   ├── reference-tools/      # Reference tools (dictionaries, etc.)
│   │   ├── duden.json
│   │   ├── oxford.json
│   │   ├── larousse.json
│   │   └── ...
│   ├── subjects/             # Subject configurations
│   │   ├── german.json       # German language tools
│   │   ├── english.json      # English language tools
│   │   ├── french.json       # French language tools
│   │   └── all-tools.json    # All reference tools
│   ├── seb-options/          # Platform-specific SEB options
│   │   ├── seb-options-macos.json
│   │   ├── seb-options-windows.json
│   │   └── seb-options-ipados.json
│   └── example_config.xml    # SEB config XML template
└── generated/                # Generated JS files (auto-generated!)
    ├── presets.js            # All service & tool presets
    ├── subjects.js           # All subject configurations
    ├── preset-groups.js      # Categorized preset groups
    ├── translations.js       # Compiled translations
    ├── seb-options-*.js      # Platform-specific option mappings
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

### 3. Deploy your changes

```bash
# Use the deploy script to rebuild, commit, and push
./scripts/deploy.sh
```

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

### 3. Deploy your changes

```bash
# Use the deploy script to rebuild, commit, and push
./scripts/deploy.sh
```

## 🔄 Build & Deployment Workflow

### Quick Deploy (Recommended)

Use the automated deployment script:

```bash
# Without version bump (just rebuild and commit)
./scripts/deploy.sh

# With version bump
./scripts/deploy.sh v0.19.0a7

# With version bump and custom commit message
./scripts/deploy.sh v0.19.0a7 "feat: add Spanish language support"
```

The deploy script automatically:
1. Rebuilds all generated files
2. Updates version (if specified)
3. Commits all changes
4. Pushes to current branch

### Manual Build (if needed)

Run build scripts manually:

```bash
# Rebuild all presets and templates
bash scripts/build-service-presets.sh

# Rebuild translations only
bash scripts/build-translations.sh
```

**Important:** Generated files are committed to git! This ensures:
- ✅ Consistency between Cloudflare Pages and GitHub Pages
- ✅ No build step needed during deployment
- ✅ Traceable versions in git history

## 🤝 Contributing

1. Fork the repository
2. Add/modify JSON files in `source/` directory
3. Use `./scripts/deploy.sh` to rebuild and deploy
4. Test on dev.focusmode.ch
5. Submit a pull request

**Note:** Only modify files in `source/` directory. Files in `generated/` are auto-generated!

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

## 📚 Additional Documentation

- [Build Scripts Documentation](../scripts/README.md) - Detailed script usage
- [Project Description](../docs/en/PROJECT_DESCRIPTION_EN.md)
- [Deployment Checklist](../docs/en/DEPLOYMENT_CHECKLIST.md)

**Main Scripts:**
- `scripts/deploy.sh` - Automated deployment (recommended)
- `scripts/build-service-presets.sh` - Build presets/templates
- `scripts/build-translations.sh` - Build translations

````

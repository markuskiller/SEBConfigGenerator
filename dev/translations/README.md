# Translations

This directory contains UI translations for the SEB Config Generator.

## 📁 Structure

```
translations/
├── de.json          # German translations
├── en.json          # English translations
└── README.md        # This file
```

## 🌍 Adding a New Language

1. **Copy an existing translation file** (e.g., `en.json`)
2. **Rename it** to your language code (e.g., `fr.json` for French)
3. **Translate all values** (keep the keys unchanged)
4. **Run the build script** to generate `translations.js`:
   ```bash
   bash scripts/build-translations.sh
   ```
5. **Test the application** with the new language

## 🔑 Translation Keys

### UI Elements
- `title`, `subtitle`: Main page header
- `step1`, `step2`, `step3`, `step4`: Wizard steps
- `groupNoLogin`, `groupWithLogin`, `groupAllowedTools`: Service categories

### Presets (Services & Tools)
- `preset<ID>`: Display name (e.g., `presetOnenote`)
- `preset<ID>Desc`: Description (e.g., `presetOnenoteDesc`)

**Important:** When adding a new service/tool to `templates/source/`, you must add corresponding translation keys:
```json
{
  "presetNewService": "Service Name",
  "presetNewServiceDesc": "Service description"
}
```

### Subjects
- `subjectGerman`, `subjectEnglish`, `subjectFrench`: Subject names

### Security Levels
- `securityRelaxed`, `securityBalanced`, `securityStrict`: Security level names
- `security*Desc`: Security level descriptions

## 🔄 Workflow for New Tools

When adding a new tool to `templates/source/reference-tools/`:

1. **Create the JSON file** (in English):
   ```json
   {
     "id": "newtool",
     "name": "New Tool",
     "description": "Tool description in English",
     "category": "tool",
     "language": "german",
     "startUrl": "https://example.com",
     "domains": ["example.com"]
   }
   ```

2. **Add translations** to all language files:
   ```json
   {
     "presetNewtool": "Translated Name",
     "presetNewtoolDesc": "Translated description"
   }
   ```

3. **Run build scripts**:
   ```bash
   bash scripts/build-service-presets.sh
   bash scripts/build-translations.sh
   ```

## 📝 Translation Guidelines

- **Keep keys identical** across all language files
- **Preserve HTML tags** in translated text (e.g., `<br>`, `<strong>`)
- **Preserve placeholders** like `%s` or `{variable}` if used
- **Test thoroughly** after adding translations
- **Use native speakers** for quality translations when possible

## 🛠️ Build Process

The build script (`scripts/build-translations.sh`) generates `templates/generated/translations.js`:

```javascript
const TRANSLATIONS = {
  de: { /* German translations */ },
  en: { /* English translations */ }
};
```

This file is loaded in `index.html` before `app.js`.

## ⚠️ Important Notes

- **Don't edit** `templates/generated/translations.js` directly (auto-generated)
- **Always edit** the source JSON files in `translations/`
- **Commit both** source JSON and generated JS files
- **Run build script** after any translation changes

## 🤝 Contributing

When contributing new translations:
1. Fork the repository
2. Add your translation file (e.g., `fr.json`)
3. Ensure all keys from `en.json` are present
4. Run the build script and test
5. Submit a pull request with both the JSON and generated JS file

## 📚 Supported Languages

- 🇩🇪 German (`de.json`)
- 🇬🇧 English (`en.json`)

Want to add your language? Submit a PR!

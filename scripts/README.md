# Build & Deployment Scripts

Diese Scripts automatisieren das Build- und Deployment-Verfahren für den SEB Config Generator.

## 🚀 deploy.sh (Hauptscript)

**Empfohlenes Script für alle Deployments.** Führt automatisch alle notwendigen Schritte aus.

### Verwendung

```bash
# Nur Rebuild + Commit (ohne Version Bump)
./scripts/deploy.sh

# Mit Version Bump
./scripts/deploy.sh v0.19.0a6

# Mit Version Bump + Custom Commit Message
./scripts/deploy.sh v0.19.0a6 "feat: add new feature"
```

### Was das Script macht

1. ✅ Prüft Git-Status
2. 🔨 Führt `build-service-presets.sh` aus
3. 🌍 Führt `build-translations.sh` aus
4. 📝 Updated Version in allen Files (optional)
5. 📦 Staged alle Änderungen
6. 💬 Erstellt Commit
7. 🚀 Pusht zu origin

### Deployment-Workflow

**Für normale Updates (ohne Version Bump):**
```bash
# 1. Änderungen an Source-Dateien machen
vim templates/source/services/my-service.json

# 2. Deploy-Script ausführen
./scripts/deploy.sh
```

**Für Release mit Version Bump:**
```bash
# 1. Alle Änderungen fertig
# 2. Deploy mit neuer Version
./scripts/deploy.sh v0.19.0a6
```

---

## 🔨 build-service-presets.sh

Generiert JavaScript-Dateien aus JSON-Templates.

### Output
- `templates/generated/presets.js`
- `templates/generated/preset-groups.js`
- `templates/generated/subjects.js`
- `templates/generated/xml-data.js`

### Verwendung
```bash
bash scripts/build-service-presets.sh
```

**Hinweis:** Wird automatisch von `deploy.sh` aufgerufen.

---

## 🌍 build-translations.sh

Generiert JavaScript-Dateien aus JSON-Übersetzungen.

### Output
- `templates/generated/translations.js`

### Verwendung
```bash
bash scripts/build-translations.sh
```

**Hinweis:** Wird automatisch von `deploy.sh` aufgerufen.

---

## 📝 update-version.sh (Legacy)

Ändert nur die Version, ohne Build oder Deployment.

**⚠️ Veraltet:** Verwenden Sie stattdessen `deploy.sh v0.19.0a6`

### Verwendung
```bash
./scripts/update-version.sh v0.19.0a6
```

---

## 📋 Typische Workflows

### Neuen Service hinzufügen

```bash
# 1. JSON erstellen
vim templates/source/services/new-service.json

# 2. Deployen
./scripts/deploy.sh
```

### Übersetzung ändern

```bash
# 1. Translation bearbeiten
vim translations/de.json

# 2. Deployen
./scripts/deploy.sh
```

### Release vorbereiten

```bash
# 1. Alle Änderungen abgeschlossen
# 2. Version bump + deploy
./scripts/deploy.sh v0.19.0a6

# 3. Testen auf dev.focusmode.ch
# 4. Wenn OK: Merge zu main
git checkout main
git merge dev
git push origin main
```

---

## 🔍 Manuelle Builds (wenn nötig)

Falls Sie nur die generierten Dateien neu bauen möchten, ohne zu committen:

```bash
# Alle Presets und Templates
bash scripts/build-service-presets.sh

# Nur Übersetzungen
bash scripts/build-translations.sh
```

---

## ⚙️ Technische Details

### Generated Files sind committed

Die generierten Dateien in `templates/generated/` sind bewusst im Git committed:
- ✅ Konsistenz zwischen Cloudflare Pages und GitHub Pages
- ✅ Keine Build-Zeit beim Deployment
- ✅ Exakte Version ist sichtbar im Git
- ✅ Einfaches Rollback möglich

### Dependencies

- **jq**: Wird für JSON-Processing benötigt
  ```bash
  # macOS
  brew install jq
  
  # Ubuntu/Debian
  sudo apt-get install jq
  ```

---

## 🆘 Troubleshooting

### "Permission denied" beim Ausführen

```bash
chmod +x scripts/deploy.sh
```

### Build-Script schlägt fehl

Prüfen Sie, ob `jq` installiert ist:
```bash
which jq
```

### Merge-Konflikte in generierten Dateien

1. Source-Files mergen
2. Build-Scripts neu ausführen:
   ```bash
   bash scripts/build-service-presets.sh
   bash scripts/build-translations.sh
   ```
3. Generierte Files stagen und Merge abschliessen

---

## 📚 Weitere Dokumentation

- [Project Description](../docs/en/PROJECT_DESCRIPTION_EN.md)
- [Deployment Checklist](../docs/en/DEPLOYMENT_CHECKLIST.md)
- [Quick Reference](../docs/en/QUICK_REFERENCE.txt)

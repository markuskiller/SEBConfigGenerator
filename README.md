# SEB Configuration Generator

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Stable-v0.22.1-brightgreen?logo=cloudflare)](https://focusmode.ch)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Dev-v0.22.2rc1 - SharePoint link parsing improvements + info boxes-orange?logo=cloudflare)](https://dev.focusmode.ch)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Mirror-yellow)](https://markuskiller.github.io/SEBConfigGenerator)
[![GitHub issues](https://img.shields.io/github/issues/markuskiller/SEBConfigGenerator)](https://github.com/markuskiller/SEBConfigGenerator/issues)
[![Language](https://img.shields.io/badge/languages-DE%20%7C%20EN-blue)](https://focusmode.ch?lang=en)
[![Privacy](https://img.shields.io/badge/privacy-100%25%20local%20ZIP-orange)](https://github.com/markuskiller/SEBConfigGenerator/archive/refs/heads/main.zip)
[![Safe Exam Browser](https://img.shields.io/badge/SEB-Download-blueviolet)](https://safeexambrowser.org/download_en.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Browser-based Safe Exam Browser (SEB) configuration generator for creating focused learning environments in classroom teaching.**

---

## Quick Links

**🌐 Online SEB Config Generator: [focusmode.ch](https://focusmode.ch)**
- Latest DEV version: [dev.focusmode.ch](https://dev.focusmode.ch)
- GitHub Pages (Mirror): [markuskiller.github.io/SEBConfigGenerator](https://markuskiller.github.io/SEBConfigGenerator)

**📚 Documentation:**
- 🇩🇪 [Schnellstart (German)](docs/de/SCHNELLSTART.md) | [Detaillierte Anleitung](docs/de/ANLEITUNG.md)
- 🇬🇧 [Quick Start (English)](docs/en/QUICKSTART.md) | [Detailed Guide](docs/en/GUIDE.md)

**💻 Offline Use:**
- Download: [Latest Release (ZIP)](https://github.com/markuskiller/SEBConfigGenerator/archive/refs/heads/main.zip) or [Latest Dev (ZIP)](https://github.com/markuskiller/SEBConfigGenerator/archive/refs/heads/dev.zip)
- Extract and open `index.html` in your browser
- ✅ 100% local processing - no internet required

---

## Features

- ✅ **Pre-configured Services** - OneNote, Word, Kahoot, Mentimeter, Miro, Padlet, Whiteboard.fi, Slido, Etherpad *(PRs welcome)*
- ✅ **Multi-Tool Support** - Combine multiple services in one configuration
- ✅ **Bilingual Interface** - German and English *(PRs welcome)*
- ✅ **Privacy-First** - 100% browser-local processing, no data transmission
- ✅ **Flexible Domain Control** - Wildcards, custom domains, blocked domains
- ✅ **Moodle Quiz Integration** - Export URL lists for direct copy-paste into Moodle SEB settings
- ✅ **Subject-Specific Tools** - Pre-configured dictionaries and reference tools *(PRs welcome)*
- ✅ **Domain Capture Tools** - PowerShell script and browser console helpers
- ✅ **Open Source** - MIT License, auditable code

---

## Use Cases

**✅ Designed for:**
- Digital worksheets during supervised lessons
- Collaborative writing assignments
- Interactive tool usage (Kahoot, Mentimeter, Padlet)
- Focused work periods with controlled internet access
- Research tasks with approved resources

**❌ Not designed for:**
- High-stakes exams (insufficient security)
- Unsupervised assessments
- Preventing determined circumvention

---

## Technical Stack

- **Client-side only** - Pure HTML/CSS/JavaScript
- **No dependencies** - No npm, no build process
- **Data processing** - 100% in-browser JSON to XML conversion
- **Extensible templating & translations architecture** - PRs welcome!
- **Output formats** - `.seb.plist` (import into SEB Config Tool) or Moodle Quiz URL lists (copy-paste)
- **Deployment** - Static files via Cloudflare Pages and GitHub Pages
- **Build automation** - Bash scripts for template generation

---

## Development

### Project Structure

```
SEBConfigGenerator/
├── index.html              # Main application
├── js/                     # Application logic
├── templates/              # Service presets and configuration templates
│   ├── source/             # Human-editable JSON source files
│   └── generated/          # Auto-generated JavaScript modules
├── scripts/                # Build and deployment automation
│   ├── deploy.sh           # Automated deployment script
│   ├── build-service-presets.sh
│   └── build-translations.sh
└── docs/                   # Public-facing documentation
    ├── de/                 # German docs (SCHNELLSTART.md, ANLEITUNG.md)
    └── en/                 # English docs (QUICKSTART.md, GUIDE.md)

```

### Setup

```bash
# Clone repository
git clone https://github.com/markuskiller/SEBConfigGenerator.git
cd SEBConfigGenerator

# Open in browser
open index.html

# Or use local server
python -m http.server 8000
```

### Building Templates

```bash
# Rebuild service presets and translations
./scripts/build-service-presets.sh
./scripts/build-translations.sh

# Or use automated deployment script
./scripts/deploy.sh
```

See [scripts/README.md](scripts/README.md) for detailed build documentation.

### Deployment

**Automated (recommended):**
```bash
./scripts/deploy.sh v0.19.0  # Rebuild + version bump + commit + push
```

**Manual:**
```bash
./scripts/build-service-presets.sh
./scripts/build-translations.sh
git add .
git commit -m "Update generated templates"
git push origin dev
```

Deployment targets:
- **dev branch** → [dev.focusmode.ch](https://dev.focusmode.ch) (Cloudflare Pages)
- **main branch** → [focusmode.ch](https://focusmode.ch) (Cloudflare Pages)
- **Mirror of main/dev branches** → [GitHub Pages](https://markuskiller.github.io/SEBConfigGenerator)

---

## Contributing

Contributions welcome! 

We particularly welcome contributions of the following JSON template sources:
- **service templates** (e.g. socrative.com)
- **reference tool templates** (e.g. dictionary.cambridge.org)
- **subject templates** (e.g. Maths or History)
- **translations** (e.g. French or Spanish)

```
├── templates/                # Service presets and configuration templates
│   ├── source/               # Human-editable JSON source files
│   │   ├── services/         # Individual service configurations
│   │   │   ├── kahoot.json
│   │   │   ├── mentimeter.json
│   │   │   └── ...
│   │   ├── reference-tools/  # Subject-specific reference tools
│   │   │   ├── duden.json
│   │   │   ├── oxford.json
│   │   │   └── ...
│   │   ├── subjects/         # Pre-configured subject bundles
│   │       ├── german.json
│   │       ├── french.json
│   │       └── ...
│   └── generated/            # Auto-generated JavaScript modules
│
└── translations/             # UI language files
       ├── de.json
       ├── en.json
       └── ...
```

Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request (create **one pull request per service/tool/new language**)

---

## License

MIT License - See [LICENSE](LICENSE) for details.

---

## About Safe Exam Browser

Safe Exam Browser (SEB) is a secure browser environment for taking online exams. This generator creates SEB configuration files optimized for classroom teaching scenarios.

**Official SEB Resources:**
- Website: [safeexambrowser.org](https://safeexambrowser.org)
- Download: [Safe Exam Browser Releases](https://safeexambrowser.org/download_en.html)
- Documentation: [SEB Manual](https://safeexambrowser.org/documentation/)

---

**`(c) 2025 Markus Killer (focusmode.ch)`** 🎓
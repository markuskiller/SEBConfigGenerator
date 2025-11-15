# SEB Configuration Generator

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-stable-brightgreen?logo=cloudflare)](https://focusmode.ch)
[![Latest DEV version](https://img.shields.io/badge/Cloudflare%20Pages-dev-orange?logo=cloudflare)](https://dev.focusmode.ch)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-BackUp-yellow)](https://markuskiller.github.io/SEBConfigGenerator)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/markuskiller/SEBConfigGenerator/actions)
[![GitHub issues](https://img.shields.io/github/issues/markuskiller/SEBConfigGenerator)](https://github.com/markuskiller/SEBConfigGenerator/issues)
[![Language](https://img.shields.io/badge/languages-DE%20%7C%20EN-blue)](https://focusmode.ch?lang=en)
[![Privacy](https://img.shields.io/badge/privacy-100%25%20local-orange)](https://github.com/markuskiller/SEBConfigGenerator)
[![Safe Exam Browser](https://img.shields.io/badge/SEB-Download-blueviolet)](https://safeexambrowser.org/download_en.html)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Browser-based Safe Exam Browser (SEB) configuration generator for creating focused learning environments in classroom teaching.**

---

## Quick Links

**🌐 Live Generator:**
- Production: [focusmode.ch](https://focusmode.ch)
- Development: [dev.focusmode.ch](https://dev.focusmode.ch)
- GitHub Pages: [markuskiller.github.io/SEBConfigGenerator](https://markuskiller.github.io/SEBConfigGenerator)

**📚 Documentation:**
- 🇩🇪 [Schnellstart (German)](docs/de/SCHNELLSTART.md) | [Detaillierte Anleitung](docs/de/ANLEITUNG.md)
- 🇬🇧 [Quick Start (English)](docs/en/QUICKSTART.md) | [Detailed Guide](docs/en/GUIDE.md)

**💻 Offline Use:**
- Download: [Latest Release (ZIP)](https://github.com/markuskiller/SEBConfigGenerator/archive/refs/heads/main.zip)
- Extract and open `index.html` in your browser
- ✅ 100% local processing - no internet required

---

## Features

- ✅ **9 Pre-configured Services** - OneNote, Word, Kahoot, Mentimeter, Miro, Padlet, Whiteboard.fi, Slido, Etherpad
- ✅ **Multi-Tool Support** - Combine multiple services in one configuration
- ✅ **Bilingual Interface** - German and English
- ✅ **Privacy-First** - 100% browser-local processing, no data transmission
- ✅ **Flexible Domain Control** - Wildcards, custom domains, blocked domains
- ✅ **Subject-Specific Tools** - Pre-configured dictionaries and reference tools
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
- **Data processing** - 100% in-browser using Web Crypto API
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
│   ├── source/            # Human-editable JSON source files
│   └── generated/         # Auto-generated JavaScript modules
├── scripts/               # Build and deployment automation
│   ├── deploy.sh         # Automated deployment script
│   ├── build-service-presets.sh
│   └── build-translations.sh
├── docs/                  # Public-facing documentation
│   ├── de/               # German docs (SCHNELLSTART.md, ANLEITUNG.md)
│   └── en/               # English docs (QUICKSTART.md, GUIDE.md)
└── internal-docs/        # Developer documentation
    ├── development/      # Technical specs and architecture
    ├── guides/          # Internal how-to guides
    └── translation/     # Translation workflow docs
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
- **main branch** → [focusmode.ch](https://focusmode.ch) (Cloudflare Pages) + [GitHub Pages](https://markuskiller.github.io/SEBConfigGenerator)

---

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

See [internal-docs/](internal-docs/) for development documentation.

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

**Version:** v0.19.0b2  
**Created by teachers, for teachers** 🎓
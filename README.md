# SEB Konfigurations-Generator

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://markuskiller.github.io/SEBConfigGenerator)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/markuskiller/SEBConfigGenerator/actions)
[![GitHub issues](https://img.shields.io/github/issues/markuskiller/SEBConfigGenerator)](https://github.com/markuskiller/SEBConfigGenerator/issues)
[![Language](https://img.shields.io/badge/languages-DE%20%7C%20EN-blue)](https://markuskiller.github.io/SEBConfigGenerator)
[![Privacy](https://img.shields.io/badge/privacy-100%25%20local-orange)](https://markuskiller.github.io/SEBConfigGenerator)
[![Safe Exam Browser](https://img.shields.io/badge/SEB-compatible-blueviolet)](https://safeexambrowser.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Web-basierter Generator für Safe Exam Browser (SEB) Konfigurationen - erstellen Sie fokussierte Lernumgebungen für Schüler*innen.




**🌐 Live-Demo:** [SEBConfigGenerator](https://markuskiller.github.io/SEBConfigGenerator)

- 🌐❌ **Lokal browser-basiert** - Keine Installation nötig / kann auch lokal ohne Internetverbindung genutzt werden ([Download ZIP](https://github.com/markuskiller/SEBConfigGenerator/archive/refs/heads/main.zip)) -> ZIP-Datei entpacken und auf index.html doppelklicken

**🌐 Latest Development Version (Experimentell!):** [SEBConfigGenerator (latest dev)](https://markuskiller.github.io/SEBConfigGenerator/dev)

- 🌐❌ **Lokal browser-basiert (latest dev version)** ([Download ZIP (latest dev)](https://github.com/markuskiller/SEBConfigGenerator/archive/refs/heads/dev.zip)) -> ZIP-Datei entpacken und auf index.html doppelklicken

## 🎯 Empfohlener Ansatz: Google Sites Hub

Der einfachste Weg, den SEB im Unterricht zu nutzen, wenn man nicht vollumfänglich auf ein LMS (Moodle, ILIAS, openOLAT etc.) setzen kann/möchte:

1. **Google Sites als zentrale Einstiegsseite** - eine "geheime" Sites-URL als Gatekeeper
2. **Multi-Tool-Integration** - Links zu allen benötigten Diensten (Kahoot, Mentimeter, Padlet, etc.)
3. **Einfache Kontrolle** - Sie sehen sofort, wer im SEB-Fokus-Modus ist
4. **Flexible Stundenplanung** - Verschiedene Aktivitäten nacheinander über Links

### Warum dieser Ansatz funktioniert:

✅ **Zentrale Kontrolle** - Eine Seite für alle Aktivitäten  
✅ **Keine Tool-Hopping** - Alle Links an einem Ort  
✅ **Sichere Navigation** - Nur freigegebene Domains erreichbar  
✅ **Transparenz** - SuS wissen genau, was erlaubt ist
✅ **Einfache Verifikation** - Wer die Sites-Seite sieht, ist im SEB (Farben/Bilder helfen bei der raschen viusellen Kontrolle, ob alle am richtigen Ort sind) 

## 🚀 Schnellstart

### Schritt 1: Sites-Seite erstellen
```
1. Google Sites öffnen
2. Neue Seite erstellen (z.B. "Lektion-2024-11-09")
3. Sichtbarkeit: "Jeder mit Link" (URL wird komplex/geheim)
4. Inhalt hinzufügen:
   - Begrüssung
   - Liste der heutigen Aktivitäten
   - Links zu Tools (Kahoot, Mentimeter, etc.)
```

### Schritt 2: Konfiguration erstellen
```
1. Generator öffnen
2. Tools auswählen (mehrere möglich):
   ✓ Kahoot
   ✓ Mentimeter
   ✓ Padlet
3. Start-URL: Ihre geheime Google-Sites-URL
4. Custom Domains hinzufügen:
   (nur nötig, falls zusätzliche Links/Dienste 
   innerhalb des SEB zugänglich sein 
   sollen)
   z.B. ganzer Dienst oder nur spezifischer Eintrag
   de.wikipedia.org
   https://de.wikipedia.org/wiki/Lehrtechnologie
5. Download → Im Config Tool finalisieren
```

### Schritt 3: Verteilen
```
1. .seb-Datei im SEB Config Tool verschlüsseln
2. An Schüler*innen verteilen
3. SuS starten .seb → landen auf Ihrer Sites-Seite
4. Von dort aus Links zu Aktivitäten nutzen
```

## 📚 Dokumentation

- 🇩🇪 [Deutsche Schnellstart-Anleitung](docs/de/SCHNELLSTART_ANLEITUNG.md)
- 🇬🇧 [English Teacher Guide](docs/en/TEACHER_GUIDE.md)
- 🌐 [Browser Domain Capture (DE)](docs/de/BROWSER_CAPTURE_ANLEITUNG.md)
- 🌐 [Browser Domain Capture (EN)](docs/en/BROWSER_CAPTURE_GUIDE.md)

## 🛠️ Features

- ✅ **Multi-Service Support** - Kombiniere beliebig viele Tools
- ✅ **9 vorkonfigurierte Dienste** - OneNote, Word, Kahoot, Mentimeter, Miro, Padlet, etc.
- ✅ **Bilingual** - Deutsch und Englisch
- ✅ **Browser-basiert** - Keine Installation nötig / kann auch lokal ohne Internetverbindung genutzt werden ([Download ZIP](https://github.com/markuskiller/SEBConfigGenerator/archive/refs/heads/main.zip)) -> ZIP-Datei entpacken und auf index.html doppelklicken
- ✅ **Domain Capture Tools** - PowerShell Script + Browser Console
- ✅ **Wildcard-Support** - Flexible Domain-Patterns
- ✅ **Duplikatserkennung** - Automatische Bereinigung

## 🎓 Beispiel: Typische Lektion

**Szenario:** Interaktive Mathestunde mit 3 Tools

**Sites-Seite Inhalt:**
```
📐 Mathematik - Quadratische Gleichungen
════════════════════════════════════════

✅ CHECK: Siehst du diesen Text? → Du bist im SEB!

📋 Ablauf heute:
─────────────────
1️⃣ [10 Min] Kahoot Quiz - Wiederholung
   🔗 kahoot.it → PIN: 1234567

2️⃣ [15 Min] Mentimeter - Umfrage zu Verständnis
   🔗 menti.com → Code: 8765 4321

3️⃣ [20 Min] Padlet - Sammlung von Lösungsstrategien
   🔗 padlet.com/klasse/mathe-2024

💡 Hilfe? → Hand heben!
```

**Generator-Einstellungen:**
- Dienste: Kahoot + Mentimeter + Padlet
- Start-URL: `https://sites.google.com/view/mathe-lektion-xyz123`
- Sicherheit: Ausgewogen

**Ergebnis:** SuS bleiben fokussiert, alle Tools funktionieren, keine Ablenkungen

## 🌟 Verfügbare Dienste

| Dienst | Typ | Session-Join ohne Login |
|--------|-----|------------------------|
| **Kahoot!** | Quiz/Umfragen | ✅ Ja (PIN) |
| **Mentimeter** | Live-Umfragen | ✅ Ja (Code) |
| **Slido** | Q&A/Umfragen | ✅ Ja (Event-Code) |
| **Whiteboard.fi** | Whiteboard | ✅ Ja (Session) |
| **Padlet** | Pinnwand | ✅ Ja (Link) |
| **Miro** | Whiteboard | ⚠️ Guest-Zugang möglich |
| **Etherpad** | Texteditor | ✅ Ja (Link) |
| **OneNote** | Notizbuch | ❌ Login erforderlich |
| **Word Online** | Textverarbeitung | ❌ Login erforderlich |

**Tipp:** Tools mit Session-Join sind ideal für SEB, da sie weniger Authentifizierungs-Domains benötigen.

## 📖 Vollständige Anleitungen

Siehe die Dokumentation im `docs/` Verzeichnis für:
- Detaillierte Schritt-für-Schritt-Anleitungen
- Fehlerbehebung
- Best Practices
- Praxis-Szenarien
- Checklisten

## 🤝 Beitragen

Feedback und Verbesserungsvorschläge sind willkommen! Öffnen Sie ein Issue oder Pull Request.

## 📄 Lizenz

MIT

---

**Erstellt für Lehrkräfte, von Lehrkräften** 🎓
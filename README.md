# SEB Konfigurations-Generator

Web-basierter Generator für Safe Exam Browser Konfigurationen - erstellen Sie fokussierte Lernumgebungen für Schüler*innen.

**🌐 Live-Demo:** [SEBConfigGenerator](https://markuskiller.github.io/SEBConfigGenerator)

**🌐 Latest Development Version (Experimentell!):** [SEBConfigGenerator](https://markuskiller.github.io/SEBConfigGenerator/dev)

## 🎯 Empfohlener Ansatz: Google Sites Hub

Der beste Weg, SEB im Bildungsumfeld zu nutzen:

1. **Google Sites als zentrale Einstiegsseite** - eine "geheime" Sites-URL als Gatekeeper
2. **Multi-Tool-Integration** - Links zu allen benötigten Diensten (Kahoot, Mentimeter, Padlet, etc.)
3. **Einfache Kontrolle** - Sie sehen sofort, wer im SEB-Fokus-Modus ist
4. **Flexible Stundenplanung** - Verschiedene Aktivitäten nacheinander über Links

### Warum dieser Ansatz funktioniert:

✅ **Zentrale Kontrolle** - Eine Seite für alle Aktivitäten  
✅ **Einfache Verifikation** - Wer die Sites-Seite sieht, ist im SEB  
✅ **Keine Tool-Hopping** - Alle Links an einem Ort  
✅ **Sichere Navigation** - Nur freigegebene Domains erreichbar  
✅ **Transparenz** - SuS wissen genau, was erlaubt ist

## 🚀 Schnellstart

### Schritt 1: Sites-Seite erstellen
```
1. Google Sites öffnen
2. Neue Seite erstellen (z.B. "Lektion-2024-11-09")
3. Sichtbarkeit: "Jeder mit Link" (URL wird komplex/geheim)
4. Inhalt hinzufügen:
   - Begrüßung
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
3. Start-URL: Ihre geheime Sites-URL
4. Custom Domains hinzufügen:
   sites.google.com
   *.googleusercontent.com
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
- ✅ **Browser-basiert** - Keine Installation nötig
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

[Siehe LICENSE Datei]

---

**Erstellt für Lehrkräfte, von Lehrkräften** 🎓
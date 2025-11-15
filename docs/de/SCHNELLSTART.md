# Schnellstart: SEB Konfigurations-Generator

**Erstellen Sie Fokus-Umgebungen für digitalen Unterricht in 15 Minuten**

---

## Was ist das?

Generiert Safe Exam Browser (SEB) Konfigurationen für **fokussierten Unterricht** - blockiert Ablenkungen, erlaubt nur ausgewählte Lerntools.

**✅ Geeignet für:**
- Digitale Arbeitsblätter im Unterricht
- Kollaborative Aktivitäten (Padlet, Miro, etc.)
- Interaktive Quiz (Kahoot, Mentimeter)
- Fokussiertes Arbeiten mit Nachschlagewerken

**❌ NICHT geeignet für:**
- Abschlussprüfungen (zu wenig Sicherheit)
- Unbeaufsichtigte Arbeiten

---

## 🚀 In 3 Schritten zur ersten Konfiguration

### 1. Google Sites Startseite erstellen (5-10 Min)

```
sites.google.com → Neue Seite
├─ Name: "Fach_Klasse_Datum_Thema"
├─ Inhalt: Ablauf & Links zu Tools
└─ Veröffentlichen: 
     - ✅ "Jeder mit Link" aber
     - ❌ Seite nicht indexieren lassen
     - ⚠️ Vorschlag URL: `Fach_Klasse_Datum` + **geheime Zeichenfolge** 
```

**Beispiel-Inhalt:**
```
📍 Englisch - Conditional Sentences
   
Heute im Unterricht:
• Kahoot Quiz (10 Min) → https://kahoot.it/...
• Padlet Diskussion (20 Min) → https://padlet.com/...
• Oxford Dictionary erlaubt

```

### 2. Konfiguration generieren (2-5 Min)

**Generator öffnen:** https://focusmode.ch

1. **Dienst wählen:** z.B. "Ohne Anmeldung" → alle Tools die Sie brauchen anklicken
2. **Erlaubte Hilfsmittel wählen:** z.B. "Englisch" (Dictionary)
3. **Start-URL einfügen:** Ihre **geheime** Google Sites URL
4. **(Optional) Benutzerdefinierte Seiten einfügen:** z.B. Link zu Wikipedia-Artikel
4. **Download:** `.seb` Datei herunterladen

---

⚠️ **Achtung:** Die heruntergeladene .seb-Datei ist nur eine Vorlage! Die folgenden Schritte müssen zwingend ausgeführt werden, bevor die Konfiguration produktiv im Unterricht eingesetzt und an die Schülerinnen und Schüler verteilt werden kann.

---

5. Im SEB Config Tool öffnen
6. Einstellungen verfeinern und verschlüsseln
7. Als finale .seb-Datei speichern
8. Verschlüsselte Datei an Schüler*innen verteilen 

### 3. An Schüler*innen verteilen (1 Min)

- `.seb` Datei via Classroom/Teams/E-Mail teilen
- **Wichtig:** Dateiname macht klar wofür: `Englisch_G22e_2025-11-15_Conditionals.seb`

---

## 📚 Weiterführend

**Detaillierte Anleitung:** [ANLEITUNG.md](ANLEITUNG.md)
- Verschiedene Szenarien
- Tipps & Tricks
- Troubleshooting

**Technische Dokumentation:** [../../README.md](../../README.md) (Englisch)

---

## 💡 Schnelle Tipps

### Multi-Tool Konfigurationen
Wählen Sie mehrere Dienste gleichzeitig - SuS können zwischen ihnen wechseln:
- ✅ Kahoot + Mentimeter + Whiteboard.fi
- ✅ Padlet + Duden
- ✅ Etherpad + Alle Nachschlagewerke

### Sichtbarkeitskontrolle
Fügen Sie auf Google Sites ein auffälliges Bild oder eine auffällige Farbe ein:
- Sofort sichtbar, wer im SEB-Modus ist
- Schnelle visuelle Kontrolle im Klassenzimmer

### URL-Organisation
Schema: `Fach_Klasse_Datum_Thema`
- Wiederverwendbar für ähnliche Lektionen
- Einfach zu archivieren

---

## ⚠️ Wichtige Hinweise

**Datenschutz:** 
- ✅ 100% lokal - keine Datenübermittlung
- ✅ Kann offline verwendet werden

**Vorbereitung:**
- Testen Sie die Konfiguration selbst vorher
- Haben Sie einen Plan B (falls technische Probleme)
- Erklären Sie SuS das Vorgehen einmal

**Bei Problemen:**
- SEB beenden: Ctrl+Q (Win) / Cmd+Q (Mac) mit **Quit/unlock password**
- Oder: Rechner neu starten und mit **Settings password = START-Passwort** wieder einsteigen (⚠️ Achtung: sehr rasch pädagogische Massnahmen ergreifen, falls SuS einen erzwungenen harten Neustart zur Umgehung des Fokus-Modus anwenden - 💡 Tipp: Komplexität des Startpassworts erhöhen und dieses jeweils nur kurz projizieren)

---

**🔗 Generator:** https://focusmode.ch
**📧 Fragen?** Siehe detaillierte [ANLEITUNG.md](ANLEITUNG.md)

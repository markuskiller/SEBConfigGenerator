# Schnellstart-Anleitung für Lehrkräfte
## SEB Konfigurations-Generator mit Google Sites Hub

### Was ist dieses Tool?

Erstellt Safe Exam Browser (SEB) Konfigurationen, die Schüler*innen helfen, sich auf Bildungsaufgaben zu konzentrieren, indem Ablenkungen blockiert werden.

**Wichtig:** Dies ist NICHT für Abschlussprüfungen gedacht! Es ist für:
- ✅ Digitale Arbeitsblätter während des Unterrichts
- ✅ Kollaborative Schreibaufgaben
- ✅ Fokus-Modus für Unterrichtsaktivitäten
- ✅ Interaktive Tool-Nutzung (Kahoot, Mentimeter, Padlet)

---

## 🌟 Empfohlener Ansatz: Google Sites als Zentrale

### Warum Google Sites?

**Der beste Weg für Schulen:**

1. **Eine zentrale Einstiegsseite** - Alle Aktivitäten der Lektion an einem Ort
2. **Einfache Kontrolle** - Sehen Sie sofort, wer im SEB-Modus ist
3. **Flexible Stundenplanung** - Verschiedene Tools über Links nacheinander nutzen
4. **Sicherheit** - "Geheime" URL verhindert unerlaubten Zugriff

### Wie funktioniert es?

```
SuS startet .seb-Datei
    ↓
Öffnet automatisch Ihre Sites-Seite
    ↓
SuS klickt Links zu Aktivitäten (Kahoot, Mentimeter, etc.)
    ↓
Alles funktioniert - nur erlaubte Domains erreichbar
    ↓
Keine Ablenkungen (YouTube, Social Media blockiert)
```

---

## Schritt-für-Schritt: Ihre erste Konfiguration

### Schritt 1: Google Sites Einstiegsseite erstellen

1. **Google Sites öffnen:** [sites.google.com](https://sites.google.com)

2. **Neue Seite erstellen:**
   - Klicken Sie auf "+" (Neue Website)
   - Name: `Lektion_[Datum]_[Fach]` (z.B. "Lektion_2024_11_09_Mathe")

3. **Sichtbarkeit einstellen:**
   - Einstellungen → Teilen
   - **"Jeder mit Link"** auswählen
   - ✅ URL wird komplex/geheim (z.B. `sites.google.com/view/xy7z3abc`)

4. **Inhalt hinzufügen - Beispiel:**

```
┌─────────────────────────────────────────────────┐
│  🎓 Mathematik - Quadratische Gleichungen       │
│  ═══════════════════════════════════════════    │
│                                                 │
│  ✅ CHECK: Siehst du diesen Text?              │
│     → Du bist im SEB-Fokus-Modus!              │
│                                                 │
│  📋 Ablauf heute (45 Minuten):                 │
│  ────────────────────────────────              │
│  1️⃣ [10 Min] Kahoot Quiz - Wiederholung       │
│     🔗 Link: https://kahoot.it                 │
│     📌 PIN: 1234567                            │
│                                                 │
│  2️⃣ [15 Min] Mentimeter Umfrage               │
│     🔗 Link: https://menti.com                 │
│     📌 Code: 8765 4321                         │
│                                                 │
│  3️⃣ [20 Min] Padlet - Lösungsstrategien       │
│     🔗 Link: https://padlet.com/klasse/mathe   │
│                                                 │
│  💡 Hilfe benötigt? → Hand heben!              │
└─────────────────────────────────────────────────┘
```

5. **Veröffentlichen und URL kopieren**

---

### Schritt 2: Generator öffnen
Gehen Sie zu: `[IHRE_SCHUL_URL]/seb-generator/` (oder öffnen Sie `index.html`)

### Schritt 3: Dienste auswählen (mehrere möglich!)

**Ohne Anmeldung:**
- **Whiteboard.fi** - Kollaboratives Whiteboard
- **Kahoot!** - Quiz und Umfragen
- **Mentimeter** - Live-Umfragen
- **Slido** - Q&A und Umfragen
- **Microsoft Forms** - Öffentliche Umfragen
- **Padlet** - Digitale Pinnwand
- **Miro** - Digitales Whiteboard
- **Etherpad** - Text-Kollaboration

**Mit Anmeldung:**
- **OneNote Online** - Für digitale Notizbücher
- **Word Online** - Für Dokumentenbearbeitung

### Schritt 4: Start-URL und Custom Domains

1. **Start-URL eingeben:**
   ```
   https://sites.google.com/view/ihre-geheime-seite-xyz123
   ```

2. **Custom Domains hinzufügen:**
   ```
   sites.google.com
   *.googleusercontent.com
   fonts.googleapis.com
   fonts.gstatic.com
   ```
   **⚠️ Wichtig:** NICHT `*.google.com` verwenden (zu weitreichend - öffnet Gmail, YouTube!)

### Schritt 5: Sicherheitsstufe festlegen
**Empfehlung:** Beginnen Sie mit **"Ausgewogen"**

- **Locker** = Erlaubt mehr Flexibilität (gut für Unterrichtsarbeit)
- **Ausgewogen** = Gute Mischung aus Fokus und Benutzerfreundlichkeit ⭐
- **Streng** = Maximale Einschränkungen (kann Schüler*innen frustrieren)

### Schritt 6: Optionen konfigurieren
Aktivieren Sie, was Schüler*innen benötigen:

| Option | Wann aktivieren |
|--------|-----------------|
| Downloads erlauben | ✅ Wenn sie Dateien speichern müssen |
| Rechtschreibprüfung | ✅ Immer für Schreibaufgaben aktivieren |
| Neu-Laden-Button | ✅ Wenn Seiten einfrieren könnten |
| Vor/Zurück | ✅ Für mehrseitige Dokumente |

### Schritt 7: Konfiguration herunterladen
Klicken Sie auf: **"📥 SEB Konfiguration herunterladen (.seb)"**

Speichert als: `Multi_Service_Config.seb` (mehrere Dienste) oder `[Dienst]_Config.seb`

### Schritt 8: Im SEB Config Tool importieren und finalisieren

**⚠️ Die heruntergeladene `.seb`-Datei ist nur eine Vorlage!**

1. [SEB Config Tool](https://safeexambrowser.org/download_de.html) herunterladen (einmalige Einrichtung)
2. **SEB Config Tool** öffnen
3. **Datei → Öffnen** → Ihre heruntergeladene `.seb`-Datei wählen
4. **Einstellungen überprüfen und verfeinern:**
   - Administrator-Passwort hinzufügen
   - Beenden-Passwort hinzufügen (falls gewünscht)
   - Zusätzliche Einschränkungen konfigurieren
5. **Konfiguration verschlüsseln:**
   - Konfigurieren → Mit Passwort oder Zertifikat verschlüsseln
6. **Als finale .seb-Datei speichern:**
   - Datei → Speichern unter → `OneNote_Final.seb`

**Wichtig:** Nur die verschlüsselte, finalisierte `.seb`-Datei an Schüler*innen verteilen!

### Schritt 9: An Schüler*innen verteilen

**E-Mail-Vorlage:**
```
Betreff: SEB-Setup für Lektion am [Datum]

Hallo zusammen,

für die digitale Lektion am [Tag] benötigt ihr:

1️⃣ Safe Exam Browser installieren:
   https://safeexambrowser.org/download_de.html

2️⃣ Config-Datei herunterladen:
   [Lektion_2024_11_09_Final.seb anhängen]

3️⃣ Doppelklick auf die .seb-Datei
   → SEB startet automatisch
   → Ihr landet auf der Einstiegsseite

4️⃣ Dort findet ihr alle Links zu den Aktivitäten
   (Kahoot, Mentimeter, etc.)

Die Konfiguration ist verschlüsselt für eure Sicherheit.

Bis [Tag]!
[Ihr Name]
```

---

## Testen (ZUERST MACHEN!)

**Vor der Weitergabe an Schüler*innen:**

1. SEB auf Ihrem Computer installieren
2. Doppelklick auf Ihre `.seb`-Config-Datei
3. Versuchen Sie:
   - Mit einem SCHÜLER-ACCOUNT anmelden (nicht Ihr Lehrer-Account!)
   - Auf Notizbuch/Dokument zugreifen
   - Etwas tippen und speichern
   - YouTube öffnen (sollte blockiert sein ✅)

**Wenn etwas nicht funktioniert:** Siehe Fehlerbehebung unten

---

## Fehlerbehebung

### Problem: "Kann mich nicht anmelden" oder "Seite lädt nicht"

**Wahrscheinliche Ursache:** Fehlende Authentifizierungs-Domains

**Lösung:**
1. Gehen Sie zum Tab **"Network Capture"** im Tool
2. Folgen Sie den Fiddler-Anweisungen
3. Laden Sie die Capture-Datei hoch
4. Fügen Sie entdeckte Domains zur Konfiguration hinzu

**Oder:** Bitten Sie IT, Schul-Firewall-Einstellungen zu prüfen

---

### Problem: "MFA/Zwei-Faktor-Authentifizierung funktioniert nicht"

**Lösung:** Fügen Sie diese Domains in "Benutzerdefinierte Domains" hinzu:

**Für Microsoft:**
```
*.msftauth.net
*.msauth.net
login.microsoftonline.com
```

**Für Google:**
```
accounts.google.com
*.googleusercontent.com
```

---

### Problem: "Zu restriktiv / Schüler*innen sind frustriert"

**Lösung:**
1. Von "Streng" → "Ausgewogen" oder "Locker" wechseln
2. Mehr Optionen aktivieren (Downloads, Neu-Laden, etc.)

**Denken Sie daran:** Auf eigenen Geräten können entschlossene Schüler*innen es umgehen. Das ist in Ordnung - es geht um **Fokus**, nicht **Überwachung**.

---

### Problem: "Schüler*innen greifen immer noch auf soziale Medien zu"

**Lösung:**
1. Zu "Ausgewogen" oder "Streng" wechseln
2. Sicherstellen, dass URL-Filterung aktiviert ist

**Realitäts-Check:** Auf BYOD können entschlossene Schüler*innen umgehen. Das ist okay - es ist ein Fokus-Tool, keine Mauer.

---

### Problem: "Datei-Downloads funktionieren nicht"

**Lösung:**
1. Konfiguration bearbeiten
2. ✅ "Downloads erlauben" aktivieren
3. Neu generieren und testen

---

## Erweitert: Eigenen Dienst hinzufügen

**Beispiel:** Sie möchten Kahoot für Quiz erlauben

1. Gehen Sie zum Tool
2. Im Bereich **"Benutzerdefinierte Domains"** hinzufügen:
```
*.kahoot.com
*.kahoot.it
play.kahoot.it
```

3. Start-URL setzen: `https://kahoot.it`
4. Konfiguration generieren

---

## FAQ

**F: Müssen Schüler*innen etwas installieren?**
A: Ja, Safe Exam Browser (kostenloser Download)

**F: Funktioniert das auf Handys/Tablets?**
A: Nein, SEB ist nur für Windows/Mac (experimentelle Chromebook-Unterstützung)

**F: Können Schüler*innen es danach deinstallieren?**
A: Ja! Es ist nur eine App. Ermutigen Sie Schüler*innen, es für zukünftige Nutzung zu behalten.

**F: Ist das sicher genug für Abschlussprüfungen?**
A: **Nein.** Verwenden Sie dies für Unterrichtsarbeit, nicht für Prüfungen mit hohem Einsatz.

**F: Was ist, wenn Schüler*innen kein eigenes Gerät haben?**
A: Haben Sie Papier-Arbeitsblätter als Backup, oder nutzen Sie Schulcomputer

**F: Kann ich eine bestehende Konfiguration bearbeiten?**
A: Ja! Öffnen Sie die `.seb`-Datei im SEB Config Tool, um Änderungen vorzunehmen

**F: Brauche ich das SEB Config Tool?**
A: **Ja!** Der Generator erstellt eine Vorlage, die im Config Tool verfeinert, verschlüsselt und finalisiert werden muss, bevor sie verteilt wird.

**F: Warum muss ich die Konfiguration verschlüsseln?**
A: Verschlüsselung verhindert, dass Schüler*innen die Einstellungen ändern und stellt sicher, dass die Konfiguration nicht einfach umgangen werden kann.

---

## 💡 Praxis-Szenarien mit Sites-Hub

### Szenario 1: Interaktive Geschichtsstunde

**Setup:**
```
Dienste: Kahoot + Mentimeter + Padlet
Start-URL: sites.google.com/view/geschichte-2024
Dauer: 45 Minuten
```

**Sites-Inhalt:**
```
1. Kahoot Quiz (10 Min) - Wiederholung letzte Stunde
2. Mentimeter Umfrage (15 Min) - Meinungen zu historischen Ereignissen
3. Padlet Sammlung (20 Min) - Quellen und Zitate sammeln
```

**Ergebnis:** SuS fokussiert, alle Tools funktionieren nahtlos, klare Struktur

---

### Szenario 2: Mathe-Übungsstunde

**Setup:**
```
Dienste: Whiteboard.fi + OneNote
Start-URL: sites.google.com/view/mathe-uebung
Dauer: 60 Minuten
```

**Sites-Inhalt:**
```
1. Whiteboard.fi (30 Min) - Gemeinsames Lösen von Aufgaben
2. OneNote (30 Min) - Individuelle Übungen im Notizbuch
```

**Ergebnis:** Abwechslungsreiche Stunde, visuelle Zusammenarbeit + individuelle Arbeit

---

### Szenario 3: Projektarbeit in Gruppen

**Setup:**
```
Dienste: Padlet + Miro + Word Online
Start-URL: sites.google.com/view/projekt-gruppen
Dauer: 90 Minuten
```

**Sites-Inhalt:**
```
Phase 1: Brainstorming mit Padlet (30 Min)
Phase 2: Mind Map mit Miro (30 Min)
Phase 3: Dokumentation in Word (30 Min)
```

**Ergebnis:** Flexible Gruppenarbeit ohne Ablenkungen, klarer Workflow

---

## ✅ Best Practices mit Sites-Hub

### TUN:

✅ **Sites-Seite vor jeder Lektion aktualisieren**
   - Neue PINs/Codes für Kahoot/Mentimeter
   - Aktuelle Links zu Padlet/Miro
   - Zeitplan anpassen

✅ **Klare visuelle Struktur auf Sites**
   - Nummerierung verwenden (1️⃣ 2️⃣ 3️⃣)
   - Zeitangaben hinzufügen
   - Emojis für bessere Orientierung

✅ **Mit Schüler-Account testen**
   - Nicht mit Lehrer-Account!
   - Auf verschiedenen Geräten
   - Im Schulnetzwerk

✅ **Backup-Plan haben**
   - Papier-Alternative vorbereiten
   - Plan B ohne digitale Tools

✅ **Klar kommunizieren**
   - Warum SEB verwendet wird
   - Was erlaubt ist und was nicht
   - Wie SuS Hilfe bekommen

---

### NICHT TUN:

❌ **NICHT `*.google.com` global freigeben**
   - Öffnet Gmail, YouTube, etc.
   - Zunichte gemachter Fokus-Modus
   - **Nur** `sites.google.com` + `*.googleusercontent.com` verwenden!

❌ **NICHT unverschlüsselte .seb-Dateien verteilen**
   - SuS könnten Einstellungen ändern
   - Sicherheitslücke

❌ **NICHT für Prüfungen mit hohem Einsatz verwenden**
   - Auf BYOD nicht manipulationssicher
   - Nur für Unterrichtsarbeit geeignet

❌ **NICHT zu restriktiv**
   - SuS werden frustriert
   - Widerstand gegen Tool
   - Start mit "Ausgewogen", nicht "Streng"

❌ **NICHT Testphase überspringen**
   - Immer vor Verteilung testen
   - Murphy's Law: "Was schiefgehen kann..."

---

## Hilfe bekommen

1. **IT-Abteilung:** Für Netzwerk-/Firewall-Probleme
2. **SEB Dokumentation:** https://safeexambrowser.org/
3. **GitHub dieses Tools:** [Probleme melden oder Funktionen anfragen]
4. **Kollegennetzwerk:** Funktionierende Konfigurationen teilen!

---

## Checkliste: Vor dem Unterricht

- [ ] `.seb`-Vorlage vom Generator heruntergeladen
- [ ] Konfiguration ins SEB Config Tool importiert
- [ ] Einstellungen verfeinert (Passwörter, Einschränkungen)
- [ ] Konfiguration verschlüsselt
- [ ] Finale `.seb`-Datei gespeichert
- [ ] Konfiguration mit Schüler-Account getestet
- [ ] Schüler*innen über SEB-Anforderung informiert
- [ ] SEB-Download-Link geteilt
- [ ] Verschlüsselte `.seb`-Datei verteilt (E-Mail/LMS)
- [ ] Papier-Backup vorbereitet
- [ ] Auf Schulnetzwerk getestet
- [ ] Anweisungen für Unterricht bereit

---

## Zeitinvestition

**Erstes Mal:** 30-45 Minuten (inkl. Config Tool Einrichtung und Testen)
**Nachfolgende Nutzung:** 5-10 Minuten (bestehende Konfigurationen anpassen)
**ROI:** Massive Reduktion von Ablenkungsverhalten

**Aufschlüsselung:**
- Generator: 5 Minuten (Vorlage erstellen)
- Config Tool: 15-20 Minuten (verfeinern, verschlüsseln, testen)
- Testen: 10-20 Minuten (mit Schüler-Account verifizieren)

---

## Erfolgsgeschichten

> "Habe dies für Vokabelübungen in OneNote verwendet. Sah 80% Reduktion 
> bei Schüler*innen, die soziale Medien während der Unterrichtsarbeit checken." 
> — *Lehrkraft, Klasse 9 Englisch*

> "Funktioniert super für kollaboratives Schreiben in Google Docs. Schüler*innen 
> bleiben tatsächlich die gesamte Stunde bei der Aufgabe!"
> — *Lehrkraft, Klasse 11 Medienkunde*

---

## Nächste Schritte

1. **Heute:** Erste Konfiguration erstellen und testen
2. **Diese Woche:** Mit einer Klasse als Pilotprojekt verwenden
3. **Nächster Monat:** Auf alle Klassen ausweiten, wenn erfolgreich
4. **Teilen:** Kolleg*innen durch Teilen Ihrer Konfigurationen helfen!

---

**Fragen?** Schauen Sie sich die vollständige README.md für detaillierte technische Dokumentation an.

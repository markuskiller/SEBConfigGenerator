# Schnellstart-Anleitung für Lehrpersonen
## SEB Konfigurations-Generator mit Google Sites

### Was ist dieses Tool?

Erstellt Safe Exam Browser (SEB) Konfigurationen, die Schüler*innen helfen, sich auf den Unterricht zu konzentrieren, indem Ablenkungen blockiert werden.

**Wichtig:** Dies ist NICHT für Abschlussprüfungen gedacht! Es ist für:
- ✅ Digitale Arbeitsblätter während des Unterrichts
- ✅ Kollaborative Schreibaufgaben
- ✅ Fokus-Modus für Unterrichtsaktivitäten
- ✅ Interaktive Tool-Nutzung (Kahoot, Mentimeter, Padlet)

---

## Inhaltsverzeichnis

1. [Empfohlener Ansatz: Google Sites als Start-Seite](#-empfohlener-ansatz-google-sites-seite-als-start-seite-wählen)
2. [Schritt-für-Schritt: Ihre erste Konfiguration](#schritt-für-schritt-ihre-erste-konfiguration)
3. [Troubleshooting](#troubleshooting)
4. [Erweitert: Eigenen Service hinzufügen](#erweitert-eigenen-service-hinzufügen)
5. [FAQ](#faq)
6. [Praktische Szenarien mit Sites Hub](#-praktische-szenarien-mit-sites-hub)
7. [Best Practices mit Google Sites Einstiegsseiten](#-best-practices-mit-google-sites-einstiegsseiten)
8. [Hilfe erhalten](#hilfe-erhalten)
9. [Checkliste: Vor dem Unterricht](#checkliste-vor-dem-unterricht)

---

## 🌟 Empfohlener Ansatz: 'Google Sites'-Seite als Start-Seite wählen

### Warum Google Sites?

**Technisch einfachster Weg, um einen Fokus-Modus im Unterricht zu erreichen, wenn man nicht vollumfänglich auf ein LMS setzen möchte/kann:**

1. **Eine zentrale Einstiegsseite** - Alle Aktivitäten der Lektion an einem Ort
2. **Einfache Kontrolle** - Sehen Sie sofort, wer im SEB-Modus ist
3. **Flexible Unterrichtsplanung** - Verschiedene Tools über Links nacheinander nutzen
4. **Kontrolle** - "Geheime" URL verhindert Zugriff ausserhalb der SEB-Umgebung

### Wie funktioniert es?

```
SuS startet .seb-Datei
    ↓
Öffnet automatisch Ihre Google-Sites-Seite
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
   - Name: `[Fach]_[Klasse]_[Datum]_[Thema]` (z.B. "Englisch_G22e_2025-11-10_Conditionals")

3. **Inhalt hinzufügen - Beispiel:**

```
┌─────────────────────────────────────────────────┐
│  Englisch - Revision Conditionals 15/11/2025    │
│  ═══════════════════════════════════════════    │
│                                                 │
│    CHECK: Visueller Hinweis für LP              │
│           Farbe / Bild -> auf                   │
│           Bildschirm ist einfach                │
│           ersichtlich ob SuS im                 │
│           SEB-Modus sind                        │
│                                                 │                        
│    Ablauf heute (45 Minuten):                   │
│  ────────────────────────────────               │
│  1 [10 Min] Kahoot Quiz - Wiederholung          │
│        Link: https://kahoot.it                  │
│                                                 │
│                                                 │
│  2 [15 Min] Mentimeter Umfrage                  │
│        Link: https://menti.com                  │
│                                                 │
│                                                 │
│  3 [20 Min] Padlet - Lösungsstrategien          │
│        Link: https://padlet.com/klasse/mathe    │
│                                                 │
│  Hilfe benötigt? → Hand heben!                  │
└─────────────────────────────────────────────────┘
```

4. **Sichtbarkeit einstellen, Veröffentlichen und URL kopieren:**
   - **"Publizieren"** auswählen
   - ❌ **Seite nicht indexieren lassen**
   - ⚠️ **Vorschlag URL:** `Fach_Klasse_Datum` + **geheime Zeichenfolge** (z.B. `sites.google.com/view/Englisch_G22e_2025-11-10xy7z3abc`)
   - **URL kopieren** - Sie benötigen sie für den Generator

---

### Schritt 2: Generator öffnen
Gehen Sie zu: `https://focusmode.ch`

Alternativ (offline): Laden Sie die [ZIP-Datei](https://github.com/markuskiller/SEBConfigGenerator/archive/refs/heads/main.zip) herunter, entpacken Sie sie und öffnen Sie `index.html` lokal im Browser.

---

⚠️ **Datenschutz:** Bei beiden Methoden werden **keinerlei Daten übermittelt**, die gesamte Verarbeitung passiert **lokal in Ihrem Browser**. Dies kann gerne auch durch ein Code-Review z.B. durch gängige generative KI-Modelle (z.B. ChatGPT, Claude.ai, Gemeni, ...) verifiziert werden. Der gesamte Code ist OpenSource und steht unter [github.com/markuskiller/SEBConfigGenerator](https://github.com/markuskiller/SEBConfigGenerator) zur Verfügung.

---

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

Für obiges Beispiel im Englisch-Unterricht werden folgende Dienste ausgewählt:
- Kahoot
- Menti
- Padlet

### Schritt 4: Start-URL und Custom Domains

1. **Start-URL eingeben:**
   ```
   https://sites.google.com/view/ihre-geheime-seite-xyz123
   ```

Für obiges Beispiel: `sites.google.com/view/Englisch_G22e_2025-11-10xy7z3abc`

### Schritt 5: Mit Standardwerten fortfahren

Für eine funktionierende SEB-Konfigurations-Vorlage können die Standardwerte im Normalfall unverändert übernommen werden. Das Finetuning kann im SEB-Config-Tool erfolgen.

### Schritt 6: Konfiguration herunterladen
Klicken Sie auf: **"📥 SEB Konfiguration herunterladen (.seb)"**

Wird unter `Multi_Service_Config.seb` (mehrere Dienste), `[Dienst]_Config.seb` (ausgewählter Dienst) oder unter dem manuell eingegebenen Dateinamen gespeichert.

---

⚠️ **Wichtig:** Die heruntergeladene .seb-Datei ist nur eine Vorlage! Die folgenden Schritte müssen zwingend ausgeführt werden, bevor die Konfiguration produktiv im Unterricht eingesetzt und an die Schülerinnen und Schüler verteilt werden kann.

---

### Schritt 7: Im SEB Config Tool importieren und finalisieren

1. [SEB Config Tool](https://safeexambrowser.org/download_de.html) herunterladen (einmalige Einrichtung)
2. **SEB Config Tool** öffnen
3. **Datei → Öffnen** → Ihre heruntergeladene `.seb`-Datei wählen
4. **Reiter 'General' → Einstellungen überprüfen und verfeinern:**
   - Administrator-Passwort hinzufügen (wird benötigt, um Konfigurationsdatei später anzupassen)
   - Beenden-Passwort (='Quit/unlock password') hinzufügen (falls gewünscht)
   - Zusätzliche Einschränkungen konfigurieren
5. **Reiter 'Config' → Konfiguration verschlüsseln & START-Passwort setzen:**
   - Konfigurieren → Mit Passwort und/oder Zertifikat verschlüsseln
   - **⚠️ Das 'SETTINGS'-Passwort ist gleichzeitig das START-Passwort für die SuS**
6. **Als finale .seb-Datei speichern:**
   - Datei → Speichern unter → `[Fach]_[Klasse]_[Datum]_[Thema].seb` (z.B. `Englisch_G22e_2025-11-15_Conditionals.seb`)

**Wichtig:** Nur die verschlüsselte, finalisierte `.seb`-Datei an Schüler*innen verteilen!

### Schritt 8: Testen & Verteilen

**Testen - ⚠️ Vor der Weitergabe an Schüler*innen:**

1. SEB auf Ihrem Computer installieren
2. Doppelklick auf Ihre finale `.seb`-Konfigurationsdatei
3. Versuchen Sie:
   - Mit einem SCHÜLER-(TEST-)ACCOUNT anmelden (nicht mit LP-Account)
   - Auf freigegebene Ressourcen zugreifen
   - Etwas tippen und speichern, falls vorgesehen
   - Falls das Erstellen/Besuchen von Links über eine freigegebene Seite möglich ist, versuchen eine Seite aufzurufen, die gesperrt sein sollte (z.B. MS Teams)

**Wenn etwas nicht funktioniert:** Siehe Fehlerbehebung unten

**An Schüler*innen verteilen:**

Oft ist es sinnvoll, den [Safe Exam Browser](https://safeexambrowser.org/download_de.html) gemeinsam im Unterricht zu installieren (einmal pro Semester bzw. bei Verfügbarkeit einer neuen Version).

Die verschlüsselte Konfigurationsdatei kann über den üblichen Kommunikationskanal mit Dateiaustauschmöglichkeit (z.B. MS Teams, Google Classroom oder E-Mail) an die SuS verteilt werden.

**Wichtig:** Dateiname sollte klar machen, wofür die Konfiguration ist: `Englisch_G22e_2025-11-15_Conditionals.seb`

---

## Fehlerbehebung

### Problem: "Kann mich nicht anmelden" oder "Seite lädt nicht"

**Wahrscheinliche Ursache:** Fehlende Authentifizierungs-Domains

**Lösung:**
1. Gehen Sie zum Tab **"Network Capture"** im Tool
2. Folgen Sie den Fiddler-Anweisungen
3. Laden Sie die Capture-Datei hoch
4. Fügen Sie entdeckte Domains zur Konfiguration hinzu

**Oder:** Bitten Sie IT, Schul-Firewall-Einstellungen zu prüfen und beim der Analyse der notwendigen Domain-Verbindungen zu unterstützen.

---

### Problem: "MFA/Zwei-Faktor-Authentifizierung funktioniert nicht"

**Lösung:** Fügen Sie alle notwendigen Domains im Abschnitt "Benutzerdefinierte Domains" hinzu. Gehen Sie dazu gemäss Hilfestellungen im Abschnitt 'Network Capture' vor:

**Für Microsoft (z.B.):**
```
*.msftauth.net
*.msauth.net
login.microsoftonline.com
...
```

**Für Google (z.B.):**
```
accounts.google.com
*.googleusercontent.com
...
```

---

### Problem: "Zu restriktiv / Schüler*innen sind frustriert"

**Lösung:**
1. Von "Streng" → "Ausgewogen" oder "Locker" wechseln
2. Mehr Optionen aktivieren (Downloads, Neu-Laden, etc.)

**Denken Sie daran:** Auf eigenen Geräten können entschlossene Schüler*innen die Restriktionen immer umgehen, wenn genügend Wissen, Zeit & Motivation vorhanden ist. Das ist in Ordnung - es geht um **Fokus**, nicht primär **Überwachung**. Solche Probleme müssen auf der pädagogischen Ebene gelöst werden.

---

### Problem: "Schüler*innen greifen immer noch auf soziale Medien zu"

**Lösung:**
1. Zu "Ausgewogen" oder "Streng" wechseln
2. Sicherstellen, dass URL-Filterung aktiviert ist

**Denken Sie daran:** Auf eigenen Geräten können entschlossene Schüler*innen die Restriktionen immer umgehen, wenn genügend Wissen, Zeit & Motivation vorhanden ist. Das ist in Ordnung - es geht um **Fokus**, nicht primär **Überwachung**. Solche Probleme müssen auf der pädagogischen Ebene gelöst werden.

---

### Problem: "Datei-Downloads funktionieren nicht"

**Lösung:**
1. Konfiguration bearbeiten
2. ✅ "Downloads erlauben" aktivieren
3. Neu generieren und testen

---

## Erweitert: Eigenen Dienst hinzufügen

**Beispiel:** Sie möchten Wikipedia für Quiz erlauben

1. Gehen Sie zum Tool
2. Im Bereich **"Benutzerdefinierte Domains"** hinzufügen:
```
de.wikipedia.org
```

3. Wikipedia als Start-URL setzen oder innerhalb der bereits freigegebenen Ressourcen (z.B. auf der Google-Site-Einstiegsseite) auf `https://de.wikipedia.org` verlinken
4. Konfiguration generieren

---

## FAQ

**F: Müssen Schüler*innen etwas installieren?**
A: Ja, Safe Exam Browser (kostenloser Download)

**F: Funktioniert das auf Handys/Tablets?**
A: Nicht auf allen Tablets, SEB ist für Windows/macOS und iPadOS verfügbar.

**F: Können Schüler*innen es danach deinstallieren?**
A: Ja! Es ist nur eine App. Ermutigen Sie Schüler*innen, es für zukünftige Nutzung zu behalten.

**F: Ist das sicher genug für Abschlussprüfungen?**
A: **Nein.** Verwenden Sie dies auf BYOD-Geräten der Schülerinnen und Schüler nur für Unterrichtsarbeit, nicht für wichtige summative Prüfungen.

**F: Was ist, wenn Schüler*innen kein eigenes Gerät haben bzw. ihr Gerät vergessen haben?**
A: Nutzen Sie - falls möglich - Schulcomputer.

**F: Kann ich eine bestehende Konfiguration bearbeiten?**
A: Ja! Öffnen Sie die `.seb`-Datei im SEB Config Tool, um Änderungen vorzunehmen (aber vor Weitergabe an SuS unbedingt verschlüsseln!)

**F: Brauche ich das SEB Config Tool?**
A: **Ja!** Der Generator erstellt eine Vorlage, die im Config Tool verfeinert, verschlüsselt und finalisiert werden muss, bevor sie verteilt wird.

**F: Warum muss ich die Konfiguration verschlüsseln?**
A: Verschlüsselung verhindert, dass Schüler*innen die Einstellungen ändern und stellt sicher, dass die Konfiguration nicht einfach umgangen werden kann. Zusätzlich gilt das 'Settings'-Passwort als **START-Passwort** für den Fokus-Modus.

---

## 💡 Praxis-Szenarien mit Sites-Hub

### Szenario 1: Interaktive Geschichtsstunde

**Setup:**
```
Dienste: Kahoot + Mentimeter + Padlet + 3 Wikipedia-Artikel
Start-URL: sites.google.com/view/geschichte-2025-xsX9rgeT5G4
Dauer: 45 Minuten
```

**Sites-Inhalt:**
```
1. Kahoot Quiz (10 Min) - Wiederholung letzte Stunde
2. Mentimeter Umfrage (15 Min) - Meinungen zu historischen Ereignissen
3. Padlet Sammlung (20 Min) - Quellen und Zitate sammeln
```

**Ergebnis:** SuS fokussiert, alle Tools funktionieren nahtlos, klare Struktur
**💡 Tipp:** Die 3 direkten Links zu den Wikipedia-Artikeln können im SEBConfigGenerator im Abschnitt `3. Benutzerdefinierte Domains (Optional)` per Copy-Paste eingefügt werden.
---

### Szenario 2: Mathe-Übungsstunde

**Setup:**
```
Dienste: Whiteboard.fi + GeoGebra
Start-URL: sites.google.com/view/mathe-uebung-jeHg6fT7q
Dauer: 60 Minuten
```

**Sites-Inhalt:**
```
1. Whiteboard.fi (30 Min) - Gemeinsames Lösen von Aufgaben
2. GeoGebra (30 Min) - Individuelle Lösen von Übungen
```

**Ergebnis:** Abwechslungsreiche Stunde, visuelle Zusammenarbeit + individuelle Arbeit

---

### Szenario 3: Projektarbeit in Gruppen

**Setup:**
```
Dienste: Padlet + Miro + Etherpad
Start-URL: sites.google.com/view/projekt-gruppen-xHbnN5r8y3X
Dauer: 90 Minuten
```

**Sites-Inhalt:**
```
Phase 1: Brainstorming mit Padlet (30 Min)
Phase 2: Mind Map mit Miro (30 Min)
Phase 3: Dokumentation in Etherpad (30 Min)
```

**Ergebnis:** Flexible Gruppenarbeit ohne Ablenkungen, klarer Workflow

---

## ✅ Best Practices mit Google-Sites-Einstiegsseiten

### TUN:

✅ **Sites-Seite vor jeder Lektion aktualisieren**
   - Neue Links für Kahoot/Mentimeter
   - Aktuelle Links zu Padlet/Miro
   - Zeitplan anpassen

✅ **Klare visuelle Struktur auf Sites**
   - Nummerierung verwenden (1️⃣ 2️⃣ 3️⃣)
   - Zeitangaben hinzufügen
   - auffälliges Bild oder eine auffällige Farbe verwenden (für einfache visuelle Kontrolle, ob SuS im Fokus-Modus sind)

✅ **Mit Schüler-Account testen**
   - Nicht mit Lehrer-Account!
   - Auf verschiedenen Geräten
   - Im Schulnetzwerk

✅ **Backup-Plan haben**
   - Plan B ohne Einschränkungen / ohne digitale Tools

✅ **Klar kommunizieren**
   - Warum SEB verwendet wird
   - Was erlaubt ist und was nicht
   - Wie SuS Hilfe bekommen

---

### NICHT TUN:

❌ **NICHT unverschlüsselte .seb-Dateien verteilen**
   - SuS könnten Einstellungen ändern
   - Sicherheitslücke

❌ **NICHT für wichtige summative Prüfungen verwenden**
   - Auf BYOD nicht manipulationssicher
   - Nur für Unterrichtsarbeit geeignet

❌ **NICHT zu restriktiv**
   - SuS werden frustriert
   - Widerstand gegen Tool
   - Start mit "Ausgewogen", nicht "Streng"

❌ **NICHT Testphase überspringen**
   - V.a. in der Anfangsphase immer vor Verteilung testen
   - Murphy's Law: "Was schiefgehen kann..."

---

## Hilfe bekommen

1. **IT-Abteilung:** Für Netzwerk-/Firewall-Probleme
2. **SEB Dokumentation:** https://safeexambrowser.org/
3. **GitHub-Issues dieses Tools:** [Probleme melden oder Funktionen anfragen](https://github.com/markuskiller/SEBConfigGenerator/issues)
4. **Kollegennetzwerk:** Funktionierende Konfigurationen teilen!

---

## Checkliste: Vor dem Unterricht

- [ ] `.seb`-Vorlage vom Generator heruntergeladen
- [ ] Konfiguration ins SEB Config Tool importiert
- [ ] Einstellungen verfeinert (Passwörter, Einschränkungen)
- [ ] Konfiguration verschlüsselt
- [ ] Finale `.seb`-Datei gespeichert
- [ ] Konfiguration mit Schüler-Account getestet
- [ ] Schüler*innen über SEB-Anforderung informiert / bzw. gemeinsame Installation im Unterricht
- [ ] SEB-Download-Link geteilt
- [ ] Verschlüsselte `.seb`-Datei verteilt (E-Mail/LMS)
- [ ] Backup-Plan vorbereitet
- [ ] Auf Schulnetzwerk getestet
- [ ] Anweisungen für Unterricht bereit

---

## Zeitinvestition

**Erstes Mal:** 30-45 Minuten (inkl. Config Tool Einrichtung und Testen)
**Nachfolgende Nutzung:** 5-10 Minuten (bestehende Konfigurationen anpassen)
**Mehrwert:** Massive Reduktion von Ablenkungsverhalten

**Aufschlüsselung:**
- Generator: 5 Minuten (Vorlage erstellen)
- Config Tool: 15-20 Minuten (verfeinern, verschlüsseln, testen)
- Testen: 10-20 Minuten (mit Schüler-Account verifizieren)

---

## Nächste Schritte

1. **Heute:** Erste Konfiguration erstellen und testen
2. **Diese Woche:** Mit einer Klasse als Pilotprojekt verwenden
3. **Nächster Monat:** Auf alle Klassen ausweiten, wenn erfolgreich
4. **Teilen:** Kolleg*innen durch Teilen Ihrer Konfigurationen helfen!

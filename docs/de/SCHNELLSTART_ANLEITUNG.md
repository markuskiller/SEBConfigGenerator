# Schnellstart-Anleitung für Lehrkräfte
## SEB Konfigurations-Generator in 5 Minuten

### Was ist dieses Tool?

Erstellt Safe Exam Browser (SEB) Konfigurationen, die Schüler*innen helfen, sich auf Bildungsaufgaben (wie OneNote oder Google Docs) auf ihren eigenen Geräten zu konzentrieren, indem Ablenkungen blockiert werden.

**Wichtig:** Dies ist NICHT für Abschlussprüfungen gedacht! Es ist für:
- ✅ Digitale Arbeitsblätter während des Unterrichts
- ✅ Kollaborative Schreibaufgaben
- ✅ Fokus-Modus für Unterrichtsaktivitäten
- ✅ Ersatz für Papier, wenn digitaler Zugang benötigt wird

---

## Schritt-für-Schritt: Ihre erste Konfiguration

### 1. Tool öffnen
Gehen Sie zu: `[IHRE_SCHUL_URL]/seb-generator/` (oder öffnen Sie `index.html`)

### 2. Dienst auswählen
Klicken Sie auf eine dieser Schaltflächen:
- **OneNote Online** - Für digitale Notizbücher
- **Word Online** - Für Dokumentenbearbeitung
- **Google Docs** - Für Google Workspace

### 3. Sicherheitsstufe festlegen
**Empfehlung:** Beginnen Sie mit **"Ausgewogen"**

- **Locker** = Erlaubt mehr Flexibilität (gut für Unterrichtsarbeit)
- **Ausgewogen** = Gute Mischung aus Fokus und Benutzerfreundlichkeit ⭐
- **Streng** = Maximale Einschränkungen (kann Schüler*innen frustrieren)

### 4. Optionen konfigurieren
Aktivieren Sie, was Schüler*innen benötigen:

| Option | Wann aktivieren |
|--------|-----------------|
| Downloads erlauben | ✅ Wenn sie Dateien speichern müssen |
| Rechtschreibprüfung | ✅ Immer für Schreibaufgaben aktivieren |
| Neu-Laden-Button | ✅ Wenn Seiten einfrieren könnten |
| Vor/Zurück | ✅ Für mehrseitige Dokumente |

### 5. Konfiguration herunterladen
Klicken Sie auf: **"SEB Konfiguration herunterladen (.seb)"**

Speichert als: `OneNote_Config.seb` (oder ähnlich)

### 6. Im SEB Config Tool importieren und finalisieren

Die heruntergeladene `.seb`-Datei ist eine Vorlage, die verfeinert werden muss:

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

### 7. An Schüler*innen verteilen

**E-Mail-Vorlage:**
```
Betreff: Digitale Aufgabe - Einrichtung

Hallo zusammen,

für die Aktivität am Dienstag benötigt ihr Safe Exam Browser:

1. SEB herunterladen: https://safeexambrowser.org/download_de.html
2. Config-Datei herunterladen: [OneNote_Final.seb anhängen]
3. Doppelklick auf die .seb-Datei - SEB startet automatisch
4. Mit eurem Schul-Account anmelden, wenn ihr dazu aufgefordert werdet

Hinweis: Die Konfigurationsdatei ist zu eurer Sicherheit verschlüsselt.

Bis Dienstag!
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

## Praxis-Szenarien

### Szenario 1: OneNote Unterrichtsnotizen
**Ziel:** Schüler*innen machen Notizen während der Vorlesung

**Konfiguration:**
- Dienst: OneNote Online
- Sicherheit: Locker
- Optionen: ✅ Rechtschreibprüfung, ✅ Vor/Zurück
- Dauer: 45-minütige Unterrichtsstunde

**Ergebnis:** Schüler*innen bleiben fokussiert, weniger Ablenkungen als bei offenen Laptops

---

### Szenario 2: Zeitlich begrenzte Schreibaufgabe
**Ziel:** 30-minütige Schreibaufgabe in Word Online

**Konfiguration:**
- Dienst: Word Online
- Sicherheit: Ausgewogen
- Optionen: ✅ Rechtschreibprüfung, ❌ Downloads (Cloud-Speicherung erzwingen)
- Hinweis: Zeitlimit in SEB-Einstellungen hinzufügen

**Ergebnis:** Schüler*innen können nicht im Internet surfen, müssen sich aufs Schreiben konzentrieren

---

### Szenario 3: Kollaboratives Google Doc
**Ziel:** Gruppen-Bearbeitungsprojekt

**Konfiguration:**
- Dienst: Google Docs
- Sicherheit: Locker
- Optionen: ✅ Alle aktiviert
- Hinzufügen: *.google.com für volle Kollaborationsfunktionen

**Ergebnis:** Schüler*innen können zusammenarbeiten ohne Ablenkungen

---

## Best Practices

### ✅ TUN:
- Konfigurationen mit Schüler-Accounts testen, bevor Sie sie im Unterricht verwenden
- Klar kommunizieren, warum Sie SEB verwenden
- Einen Papier-Backup-Plan haben
- Mit permissiven Einstellungen beginnen
- Feedback von Schüler*innen einholen

### ❌ NICHT TUN:
- Für Prüfungen mit hohem Einsatz auf BYOD verwenden
- Annehmen, dass es manipulationssicher ist
- Zu restriktiv machen (Schüler*innen werden widerstehen)
- Testphase überspringen
- Vergessen zu aktualisieren, wenn Dienste sich ändern

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

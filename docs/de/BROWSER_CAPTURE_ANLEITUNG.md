# Browser-basierte Domain-Erfassung

## 🌐 Keine Downloads erforderlich!

Diese Anleitung zeigt, wie Sie Netzwerk-Domains nur mit Ihrem Browser erfassen können - perfekt für macOS, Linux oder jedes System, auf dem PowerShell nicht verfügbar ist.

---

## Methode 1: Bookmarklet (Empfohlen)

### Einmalige Einrichtung (30 Sekunden)

1. **Lesezeichenleiste anzeigen** (falls ausgeblendet):
   - Chrome/Edge: Drücken Sie `Ctrl+Shift+B` (Windows) oder `Cmd+Shift+B` (Mac)
   - Firefox: Drücken Sie `Ctrl+Shift+B` (Windows) oder `Cmd+Shift+B` (Mac)
   - Safari: Darstellung → Favoritenleiste einblenden

2. **Bookmarklet erstellen**:
   - Rechtsklick auf Ihre Lesezeichenleiste
   - Wählen Sie "Seite hinzufügen" oder "Lesezeichen hinzufügen"
   - **Name**: `SEB Domain Erfassung`
   - **URL**: Kopieren Sie den Code aus dem Abschnitt [Bookmarklet-Code](#bookmarklet-code)
   - Speichern

### Verwendung

1. **Browser-Cache leeren** (wichtig!):
   - Chrome: `Ctrl+Shift+Delete` → Browserdaten löschen
   - Firefox: `Ctrl+Shift+Delete` → Neueste Chronik löschen
   - Safari: Safari → Verlauf löschen

2. **Zu Ihrem Dienst navigieren**:
   - Beispiel: Gehen Sie zu `https://www.onenote.com`
   - Melden Sie sich mit einem Test-Schüler-Account an
   - Klicken Sie sich durch die Oberfläche (Notizbücher öffnen, Seiten erstellen, etc.)

3. **Bookmarklet anklicken**:
   - Klicken Sie auf "SEB Domain Erfassung" in Ihrer Lesezeichenleiste
   - Ein Dialog erscheint mit allen erfassten Domains

4. **Ergebnisse kopieren**:
   - Klicken Sie auf "In Zwischenablage kopieren"
   - Fügen Sie die Liste in das Feld "Benutzerdefinierte Domains" im SEB Konfigurations-Generator ein

---

## Methode 2: Browser DevTools (Alternative)

### Für Chrome, Edge oder Brave

1. **DevTools öffnen**: Drücken Sie `F12` oder `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)

2. **Zum Network-Tab**: Klicken Sie oben auf "Network" / "Netzwerk"

3. **Cache leeren und neu laden**: 
   - Rechtsklick auf den Aktualisieren-Button
   - Wählen Sie "Cache leeren und vollständig neu laden"

4. **Dienst verwenden**:
   - Anmelden
   - Durch verschiedene Bereiche navigieren
   - Typische Schüleraktivitäten durchführen

5. **Domains extrahieren**:
   - Klicken Sie auf den Tab "Console" / "Konsole" in DevTools
   - Fügen Sie den Code aus dem Abschnitt [DevTools-Skript](#devtools-skript) ein
   - Drücken Sie Enter
   - Domains werden automatisch in die Zwischenablage kopiert

### Für Firefox

1. **DevTools öffnen**: Drücken Sie `F12`

2. **Netzwerk-Tab**: Klicken Sie auf "Netzwerkanalyse"

3. **Cache deaktivieren**: Einstellungen (Zahnrad-Symbol) → "Cache deaktivieren" aktivieren

4. **Seite neu laden**: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

5. **Dienst normal verwenden**

6. **Skript ausführen**:
   - Wechseln Sie zum Tab "Konsole"
   - Fügen Sie das Skript aus [DevTools-Skript](#devtools-skript) ein
   - Drücken Sie Enter

### Für Safari

1. **DevTools aktivieren** (nur beim ersten Mal):
   - Safari → Einstellungen → Erweitert
   - "Menü 'Entwickler' in der Menüleiste anzeigen" aktivieren

2. **Web-Inspektor öffnen**: Drücken Sie `Cmd+Option+I`

3. **Netzwerk-Tab**: Klicken Sie auf "Netzwerk"

4. **Dienst verwenden** und Traffic erfassen

5. **Skript in Konsole ausführen** (wie bei anderen Browsern)

---

## Bookmarklet-Code

**Kopieren Sie diesen gesamten Block** (einschließlich `javascript:`) und fügen Sie ihn als URL Ihres Lesezeichens ein:

```javascript
javascript:(function(){const domains=new Set();performance.getEntries().forEach(e=>{try{const u=new URL(e.name);if(u.hostname&&!u.hostname.match(/^(localhost|127\.0\.0\.1|::1)$/)){domains.add(u.hostname)}}catch(err){}});if(typeof PerformanceObserver!=='undefined'){const observer=new PerformanceObserver(list=>{list.getEntries().forEach(e=>{try{const u=new URL(e.name);if(u.hostname&&!u.hostname.match(/^(localhost|127\.0\.0\.1|::1)$/)){domains.add(u.hostname)}}catch(err){}})});observer.observe({entryTypes:['resource']});}const sorted=[...domains].sort();let output='SEB Domain Erfassung\n'+'='.repeat(50)+'\n\n';output+='Domains insgesamt: '+sorted.length+'\n\n';output+='DOMAINS (unten kopieren):\n'+'-'.repeat(50)+'\n';output+=sorted.join('\n')+'\n';output+='-'.repeat(50)+'\n\n';output+='Wildcards (empfohlen):\n'+'-'.repeat(50)+'\n';const wildcards=new Set();sorted.forEach(d=>{const parts=d.split('.');if(parts.length>2){wildcards.add('*.'+parts.slice(-2).join('.'))}else{wildcards.add(d)}});output+=[...wildcards].sort().join('\n');const modal=document.createElement('div');modal.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:30px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.3);z-index:999999;max-width:600px;max-height:80vh;overflow:auto;font-family:monospace;';const pre=document.createElement('pre');pre.textContent=output;pre.style.cssText='background:#f5f5f5;padding:15px;border-radius:6px;overflow:auto;max-height:400px;font-size:12px;';const btnContainer=document.createElement('div');btnContainer.style.cssText='margin-top:20px;display:flex;gap:10px;';const copyBtn=document.createElement('button');copyBtn.textContent='📋 In Zwischenablage kopieren';copyBtn.style.cssText='padding:12px 20px;background:#5e72e4;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;flex:1;';copyBtn.onclick=()=>{navigator.clipboard.writeText(sorted.join('\n')).then(()=>{copyBtn.textContent='✓ Kopiert!';setTimeout(()=>copyBtn.textContent='📋 In Zwischenablage kopieren',2000)})};const closeBtn=document.createElement('button');closeBtn.textContent='✕ Schließen';closeBtn.style.cssText='padding:12px 20px;background:#e9ecef;color:#32325d;border:none;border-radius:6px;cursor:pointer;font-weight:600;';closeBtn.onclick=()=>modal.remove();btnContainer.appendChild(copyBtn);btnContainer.appendChild(closeBtn);modal.appendChild(pre);modal.appendChild(btnContainer);document.body.appendChild(modal)})();
```

---

## DevTools-Skript

**WICHTIG:** Kopieren Sie das Skript direkt aus dem SEB Generator (Button "🌐 Browser Helper")!

Das Skript zeigt automatisch **nur neue Domains**, die noch nicht in Ihrer gewählten Preset-Konfiguration enthalten sind.

### Funktionen:

✅ **Intelligente Filterung**: Vergleicht erfasste Domains mit aktuellem Preset  
✅ **Wildcard-Matching**: Erkennt `*.domain.com` Muster im Preset  
✅ **Klare Ausgabe**: Zeigt nur Domains, die Sie hinzufügen müssen  
✅ **Statistik**: Sehen Sie, wie viele Domains bereits abgedeckt sind

### Verwendung:

1. **Wählen Sie Ihr Preset** im SEB Generator (z.B. OneNote)
2. **Klicken Sie auf "🌐 Browser Helper"** Button
3. **Kopieren Sie das Console Script** aus dem Dialog
4. **Öffnen Sie Ihren Dienst** und nutzen Sie ihn vollständig
5. **F12 drücken** → Console Tab
6. **Script einfügen** und Enter drücken

### Ausgabe-Beispiel:

```
🛡️ SEB Domain Capture
============================================================

📊 Total captured: 23 domains
✓ Already in preset: 18 domains
🆕 New domains found: 5 domains

============================================================
📋 COPY THESE NEW DOMAINS:
============================================================

cdn.example.com
fonts.example.net
*.media-cdn.com
analytics.service.io
static.resource.org

============================================================

📝 HOW TO USE:
  1. Select the domain list above (click & drag)
  2. Right-click → Copy (or Ctrl+C / Cmd+C)
  3. Paste into "Custom Domains" field in SEB Generator

============================================================
```

### Falls keine neuen Domains gefunden werden:

```
✅ NO NEW DOMAINS NEEDED!
All captured domains are already in the preset.
```

Das bedeutet, Ihr Preset deckt bereits alles ab - keine zusätzlichen Domains nötig!

---

## Tipps für beste Ergebnisse

### ✅ TUN:
- **Cache leeren** vor Beginn der Erfassung
- **Test-Schüler-Account verwenden** (nicht Ihr Lehrer-Account - diese haben möglicherweise andere Berechtigungen)
- **Alle Funktionen durchklicken**, die benötigt werden:
  - Dokumente/Notizbücher öffnen
  - Neue Elemente erstellen
  - Dateien hoch-/herunterladen
  - Rechtschreibprüfung verwenden
  - Hilfe/Support aufrufen
- **Warten Sie, bis Seiten vollständig geladen sind**
- **Erfassung mehrmals durchführen** während Ihrer Sitzung, um alle Domains zu erfassen

### ❌ NICHT TUN:
- Auf einer Seite mit persönlichen Daten erfassen (Bookmarklet kann die Seite sehen)
- Durchhetzen - geben Sie Seiten Zeit zum Laden von Ressourcen
- Vergessen, mit Schüler-Account-Berechtigungen zu testen
- Cache-Leerung überspringen (alte Domains können erscheinen)

---

## Fehlerbehebung

### "Keine Domains erfasst" oder sehr wenige Domains

**Lösung:**
1. Stellen Sie sicher, dass Sie Cache geleert und neu geladen haben
2. Interagieren Sie mehr mit dem Dienst (Links klicken, Funktionen öffnen)
3. Versuchen Sie stattdessen die DevTools-Methode (zuverlässiger)
4. Warten Sie länger auf das Laden von Ressourcen

### "Zwischenablage-Kopie fehlgeschlagen"

**Lösung:**
- Wählen Sie die Domains manuell aus der Konsolen-Ausgabe aus und kopieren Sie sie
- Chrome blockiert manchmal Zwischenablage-Zugriff - versuchen Sie stattdessen das Bookmarklet

### "Zu viele Domains" (Hunderte)

**Lösung:**
- Verwenden Sie die "Wildcard"-Empfehlungen statt einzelner Domains
- Filtern Sie offensichtliche Drittanbieter-Analytics heraus (z.B. `googletagmanager.com`, `hotjar.com`)
- Konzentrieren Sie sich auf Domains, die zu Ihrem Dienstanbieter passen

### Domains funktionieren nicht in SEB

**Lösung:**
- Testen Sie zuerst mit den **exakten Domains** (nicht Wildcards)
- Fügen Sie Authentifizierungs-Domains hinzu:
  - Microsoft: `login.microsoftonline.com`, `*.msauth.net`
  - Google: `accounts.google.com`, `*.gstatic.com`
- Prüfen Sie auf fehlende CDN-Domains (normalerweise `*.cdn.*` oder `*.azureedge.net`)

---

## Vergleich: Browser vs PowerShell

| Feature | Browser-Methode | PowerShell-Skript |
|---------|-----------------|-------------------|
| **Plattform** | ✅ Alle (Mac/Win/Linux) | ❌ Nur Windows |
| **Installation** | ✅ Keine nötig | ⚠️ Benötigt Fiddler |
| **Benutzerfreundlichkeit** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Vollständigkeit** | ⭐⭐⭐⭐ (gut) | ⭐⭐⭐⭐⭐ (am besten) |
| **Echtzeit** | ❌ Nur nach Erfassung | ✅ Live-Überwachung |

**Empfehlung:** 
- **Browser-Methode verwenden** für schnelle Erfassungen und die meisten Dienste
- **PowerShell verwenden** für komplexe Dienste oder vollständige Enterprise-Deployments

---

## Beispiel-Workflow

### OneNote-Domains erfassen

```
1. Chrome öffnen (Inkognito-/Privates Fenster)
2. Cache leeren: Ctrl+Shift+Delete
3. DevTools öffnen: F12
4. Netzwerk-Tab → "Cache deaktivieren" aktivieren
5. Gehen zu: https://www.onenote.com
6. Mit Test-Schüler-Account anmelden
7. Notizbuch öffnen
8. Neue Seite erstellen
9. Text eingeben
10. Bild hinzufügen
11. Notizbuch teilen
12. Zum Konsole-Tab wechseln
13. DevTools-Skript einfügen
14. Enter drücken
15. ✓ Domains in Zwischenablage kopiert!
16. Zum SEB Konfigurations-Generator gehen
17. In Feld "Benutzerdefinierte Domains" einfügen
18. .seb-Konfigurationsdatei herunterladen
19. Testen!
```

---

## Nächste Schritte

Nach Erfassung der Domains:

1. **In SEB Konfigurations-Generator einfügen**
2. **Domain-Liste in der Vorschau prüfen** (sollte vernünftig aussehen)
3. **.seb-Vorlage herunterladen**
4. **Ins SEB Config Tool importieren**
5. **Verfeinern, verschlüsseln und finale Version speichern**
6. **Mit Schüler-Account verifizieren** im SEB-Browser

---

## Fragen?

- Vollständige Lehrkraft-Anleitung: [SCHNELLSTART_ANLEITUNG.md](SCHNELLSTART_ANLEITUNG.md)
- Englische Version: [BROWSER_CAPTURE_GUIDE.md](../en/BROWSER_CAPTURE_GUIDE.md)
- PowerShell-Alternative: [scripts/capture-helper.ps1](../../scripts/capture-helper.ps1)

**Viel Erfolg beim Erfassen! 🎯**

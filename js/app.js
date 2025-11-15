// ============================================================================
// SEB Config Generator - Main Application
// Version: v0.19.0a1
// Build: 2025-11-15 14:01
// ============================================================================

// ============================================================================
// TRANSLATIONS / ÜBERSETZUNGEN
// ============================================================================
const TRANSLATIONS = {
de: {
    title: "SEB Konfigurations-Generator",
    subtitle: "Erstellen Sie Safe Exam Browser Konfigurationen für Fokus-Modus im Unterricht",
    step1: "1. Dienst auswählen",
    groupNoLogin: "Ohne Anmeldung",
    groupWithLogin: "Mit Anmeldung",
    groupAllowedTools: "Erlaubte Hilfsmittel",
    selectSubject: "Fach auswählen",
    // Subject translations - add more as needed (subjectFrench, subjectSpanish, etc.)
    subjectGerman: "Deutsch",
    subjectEnglish: "Englisch",
    subjectFrench: "Französisch",
    step2: "2. Konfigurationseinstellungen",
    step3: "3. Benutzerdefinierte Domains (Optional)",
    step4: "4. Download",
    advancedSettings: "Erweiterte Einstellungen",
    previewAndDownload: "Vorschau & Download",
    advancedHelpTitle: "Erweiterte Hilfe",
    startUrl: "Start-URL",
    configName: "Konfigurationsname",
    
    // SharePoint configuration
    sharepointLinkLabel: "SharePoint-Link (Optional - für erweiterte Filterung)",
    sharepointLinkPlaceholder: "https://schule.sharepoint.com/sites/...",
    sharepointOptionsTitle: "📎 SharePoint-Einschränkungen",
    sharepointPastePrompt: "Fügen Sie einen SharePoint-Link ein, um erweiterte Filteroptionen zu aktivieren",
    sharepointHelpOneNote: "💡 OneNote: Rechtsklick auf Seite → 'Link zu dieser Seite kopieren'. Achtung: Abschnitts- oder Seiteneinschränkung nur sinnvoll in kollaborativen Bereichen/Abschnitten eines Notizbuchs (ausser reiner Lesezugriff reicht aus).",
    sharepointHelpWord: "💡 Word: Link aus Browser-Adresszeile kopieren (wenn Dokument geöffnet). Achtung bei Kollaboration: Datei muss in Ordner mit Schreibzugriff sein. Für eigene Versionen: 'nur diese Datei' nicht auswählen → Ordnerzugriff ermöglichen.",
    experimentalWarningTitle: "⚠️ Experimentelle Funktion",
    experimentalWarningText: "OneNote/Word Online mit SharePoint-Einschränkungen ist in der Beta-Phase. Unbedingt gründlich testen, bevor die Konfiguration an Schüler*innen verteilt wird. In vielen Fällen funktioniert es nur, wenn Network Capture in exakt derselben Umgebung kurz vor dem Einsatz im Unterricht durchgeführt wird.",
    experimentalWarningLink: "→ Network Capture Helper nutzen",
    restrictToSchoolSharepoint: "Nur SharePoint unserer Schule",
    restrictToTeamsSite: "Nur diese Teams-Site/Gruppe",
    restrictToNotebook: "Nur dieses Notizbuch",
    restrictToSection: "Nur dieser Abschnitt",
    restrictToPage: "Nur diese Seite",
    restrictToFolder: "Nur Dateien in diesem Ordner",
    restrictToFile: "Nur diese Datei",
    sharepointDetected: "SharePoint-Domäne erkannt",
    teamsSiteDetected: "Teams-Site erkannt",
    notebookDetected: "Notizbuch erkannt",
    sectionDetected: "Abschnitt erkannt",
    pageDetected: "Seite erkannt",
    folderDetected: "Ordner erkannt",
    fileDetected: "Datei erkannt",
    securityLevel: "Sicherheitsstufe",
    securityLevelExperimentalTitle: "⚙️ Experimentell",
    securityLevelExperimentalText: "Die Sicherheitsstufen 'Locker' und 'Streng' sind noch in Entwicklung und haben derzeit nur minimale Auswirkungen auf die Konfiguration.",
    
    // Boolean options groups
    allBooleanOptions: "Alle True-/False-Optionen",
    platformReference: "📚 Menü-Referenz für:",
    experimentalFeature: "Experimentelle Funktion",
    booleanOptionsWarning: "Diese Funktion befindet sich in Entwicklung. Die Menü-Referenzen werden schrittweise für alle Plattformen ergänzt. Verwenden Sie diese Optionen mit Vorsicht und testen Sie die generierte Konfiguration gründlich.",
    booleanOptionsInfo: "Diese Optionen werden dynamisch aus der SEB-Konfigurationsvorlage geladen. Standardwerte sind bereits gesetzt.",
    browserOptions: "🌐 Browser-Einstellungen",
    securityOptions: "🔒 Sicherheit & Zugriff",
    interfaceOptions: "🖥️ Benutzeroberfläche",
    systemOptions: "⚙️ System & Prozesse",
    networkOptions: "🌍 Netzwerk",
    mobileOptions: "📱 Mobile (iOS/iPadOS)",
    otherOptions: "📋 Weitere Optionen",
    sebConfigToolLocation: "SEB Config Tool",
    
    additionalOptions: "Zusätzliche Optionen",
    allowDownloads: "Datei-Downloads erlauben",
    allowSpellCheck: "Rechtschreibprüfung erlauben",
    showReloadButton: "Neu-Laden-Button anzeigen",
    allowBackForward: "Vor/Zurück-Navigation erlauben",
    customDomainsLabel: "Zusätzliche erlaubte Domains hinzufügen (eine pro Zeile)",
    customDomainsPlaceholder: "beispiel.ch\n*.schule-domain.ch",
    blockedDomainsLabel: "Domains sperren (Optional, nur bei Wildcards in 'Zusätzliche Domains')",
    blockedDomainsPlaceholder: "# Beispiel: Falls Sie *.beispiel.ch erlauben\n# aber mail.beispiel.ch sperren möchten:\nmail.beispiel.ch",
    proTipTitle: "💡 Profi-Tipp",
    proTipText: "Verwenden Sie Wildcards (*) um alle Subdomains zu erlauben. Zum Beispiel: *.microsoft.com erlaubt login.microsoft.com, account.microsoft.com, usw.<br><br><strong>Hinweis:</strong> Doppelte Domains werden automatisch entfernt.",
    allowedDomains: "Erlaubte Domains",
    downloadBtn: "📥 SEB Konfiguration herunterladen (.seb)",
    copyBtn: "📋 Domain-Liste kopieren",
    criticalWarningTitle: "Wichtiger Hinweis:",
    criticalWarningText: "Die heruntergeladene .seb-Datei ist nur eine Vorlage! Die unten beschriebenen 'Nächsten Schritte' müssen zwingend ausgeführt werden, bevor die Konfiguration produktiv im Unterricht eingesetzt und an die Schülerinnen und Schüler verteilt werden kann.",
    nextStepsTitle: "Nächste Schritte",
    nextStepsText: "1. SEB-Konfigurationsdatei herunterladen (.seb)<br>2. Im SEB Config Tool öffnen<br>3. Einstellungen verfeinern und verschlüsseln<br>4. Als finale .seb-Datei speichern<br>5. Verschlüsselte Datei an Schüler*innen verteilen",
    helperScriptTitle: "Network Capture Helper",
    helperScriptText: "Benötigen Sie Hilfe beim Erfassen von Netzwerk-Domains? Wählen Sie die passende Methode für Ihr System:",
    downloadHelperBtn: "⬇️ PowerShell (Windows)",
    browserHelperBtn: "🌐 Browser-Methode (Alle OS)",
    helperDocsTitle: "📖 Hilfe & Anleitungen:",
    browserCaptureLink: "Browser Capture Anleitung",
    quickstartLink: "Schnellstart mit Google Sites",
    quickRefLink: "Schnellreferenz",
    mainDocLink: "Vollständige Anleitung",
    
    // Presets
    presetOnenote: "OneNote Online",
    presetOnenoteDesc: "Microsoft OneNote Web-Client",
    presetWord: "Word Online",
    presetWordDesc: "Microsoft Word Web-Client",
    presetTeams: "Microsoft Teams",
    presetTeamsDesc: "Teams Web-Client für Zusammenarbeit",
    presetGdocs: "Google Docs",
    presetGdocsDesc: "Google Workspace Dokumenteneditor",
    presetGsheets: "Google Tabellen",
    presetGsheetsDesc: "Google Workspace Tabellenkalkulation",
    presetWhiteboard: "Whiteboard.fi",
    presetWhiteboardDesc: "Kollaboratives Online-Whiteboard",
    presetPadlet: "Padlet",
    presetPadletDesc: "Digitale Pinnwand für Zusammenarbeit",
    presetKahoot: "Kahoot!",
    presetKahootDesc: "Gamifizierte Quizze und Umfragen",
    presetMentimeter: "Mentimeter",
    presetMentimeterDesc: "Live-Umfragen und interaktive Präsentationen",
    presetMiro: "Miro",
    presetMiroDesc: "Digitales Whiteboard für Zusammenarbeit",
    presetSlido: "Slido",
    presetSlidoDesc: "Live Q&A und Umfragen",
    presetEtherpad: "Etherpad",
    presetEtherpadDesc: "Kollaboratives Textdokument",
    presetForms: "Microsoft Forms",
    presetFormsDesc: "Umfragen und Formulare (öffentlich)",
    presetDuden: "Duden",
    presetDudenDesc: "Deutsches Wörterbuch und Rechtschreibung",
    presetDwds: "DWDS",
    presetDwdsDesc: "Digitales Wörterbuch der deutschen Sprache",
    presetOxford: "Oxford Dictionary",
    presetOxfordDesc: "Englisches Lernwörterbuch",
    presetCambridge: "Cambridge Dictionary",
    presetCambridgeDesc: "Cambridge Englisch Wörterbuch",
    presetLarousse: "Larousse",
    presetLarousseDesc: "Französisches Wörterbuch und Enzyklopädie",
    presetReverso: "Reverso",
    presetReversoDesc: "Französisches Kontext-Wörterbuch und Übersetzung",
    
    // Security levels
    securityRelaxed: "Locker",
    securityRelaxedDesc: "Fokus-Modus - blockiert Ablenkungen, erlaubt Flexibilität",
    securityBalanced: "Ausgewogen",
    securityBalancedDesc: "Empfohlen - gutes Gleichgewicht zwischen Sicherheit und Benutzerfreundlichkeit",
    securityStrict: "Streng",
    securityStrictDesc: "Maximale Einschränkungen (kann Schüler frustrieren)",
    
    // Messages
    copiedMsg: "✓ Kopiert!",
    configNamePlaceholder: "Meine_Schule_",
    
    // Privacy
    privacyTitle: "Datenschutz:",
    privacyText: "Alle Daten werden ausschließlich lokal in Ihrem Browser verarbeitet. Es werden keine Konfigurationsdaten oder Eingaben an unseren Server gesendet oder gespeichert. Nur Ihre Sprachpräferenz wird lokal im Browser gespeichert.",
    suggestService: "Dienst oder Hilfsmittel vorschlagen / Problem melden",
    
    // Version info
    versionLabel: "Version",
    buildLabel: "Build"
},
en: {
    title: "SEB Config Generator",
    subtitle: "Create Safe Exam Browser configurations for educational focus mode",
    step1: "1. Choose Service",
    groupNoLogin: "No Login Required",
    groupWithLogin: "Login Required",
    groupAllowedTools: "Allowed Reference Tools",
    selectSubject: "Select Subject",
    // Subject translations - add more as needed (subjectFrench, subjectSpanish, etc.)
    subjectGerman: "German",
    subjectEnglish: "English",
    subjectFrench: "French",
    step2: "2. Configuration Settings",
    step3: "3. Custom Domains (Optional)",
    step4: "4. Download",
    advancedSettings: "Advanced Settings",
    previewAndDownload: "Preview & Download",
    advancedHelpTitle: "Advanced Help",
    startUrl: "Start URL",
    configName: "Configuration Name",
    
    // SharePoint configuration
    sharepointLinkLabel: "SharePoint Link (Optional - for advanced filtering)",
    sharepointLinkPlaceholder: "https://school.sharepoint.com/sites/...",
    sharepointOptionsTitle: "📎 SharePoint Restrictions",
    sharepointPastePrompt: "Paste a SharePoint link to enable advanced filtering options",
    sharepointHelpOneNote: "💡 OneNote: Right-click on page → 'Copy link to this page'. Note: Section or page restrictions only make sense for collaborative sections/areas of a notebook (unless read-only access is sufficient).",
    sharepointHelpWord: "💡 Word: Copy link from browser address bar (when document is open). Note for collaboration: File must be in folder with write access. For saving own versions: Don't select 'only this file' → enable folder access.",
    experimentalWarningTitle: "⚠️ Experimental Feature",
    experimentalWarningText: "OneNote/Word Online with SharePoint restrictions is in beta. Thoroughly test before deploying to students. In many cases it only works if Network Capture is run in exactly the same environment soon before the config is used in class.",
    experimentalWarningLink: "→ Use Network Capture Helper",
    restrictToSchoolSharepoint: "Only our school's SharePoint",
    restrictToTeamsSite: "Only this Teams site/group",
    restrictToNotebook: "Only this notebook",
    restrictToSection: "Only this section",
    restrictToPage: "Only this page",
    restrictToFolder: "Only files in this folder",
    restrictToFile: "Only this file",
    sharepointDetected: "SharePoint domain detected",
    teamsSiteDetected: "Teams site detected",
    notebookDetected: "Notebook detected",
    sectionDetected: "Section detected",
    pageDetected: "Page detected",
    folderDetected: "Folder detected",
    fileDetected: "File detected",
    securityLevel: "Security Level",
    securityLevelExperimentalTitle: "⚙️ Experimental",
    securityLevelExperimentalText: "The security levels 'Relaxed' and 'Strict' are still in development and currently have minimal impact on the configuration.",
    
    // Boolean options groups
    allBooleanOptions: "All True/False Options",
    platformReference: "📚 Menu Reference for:",
    experimentalFeature: "Experimental Feature",
    booleanOptionsWarning: "This feature is under development. Menu references are being added gradually for all platforms. Use these options with caution and thoroughly test the generated configuration.",
    booleanOptionsInfo: "These options are dynamically loaded from the SEB configuration template. Default values are already set.",
    browserOptions: "🌐 Browser Settings",
    securityOptions: "🔒 Security & Access",
    interfaceOptions: "🖥️ User Interface",
    systemOptions: "⚙️ System & Processes",
    networkOptions: "🌍 Network",
    mobileOptions: "📱 Mobile (iOS/iPadOS)",
    otherOptions: "📋 Other Options",
    sebConfigToolLocation: "SEB Config Tool",
    
    additionalOptions: "Additional Options",
    allowDownloads: "Allow file downloads",
    allowSpellCheck: "Allow spell check",
    showReloadButton: "Show reload button",
    allowBackForward: "Allow back/forward navigation",
    customDomainsLabel: "Add additional allowed domains (one per line)",
    customDomainsPlaceholder: "example.ch\n*.school-domain.ch",
    blockedDomainsLabel: "Block domains (Optional, only needed for wildcards in 'Additional Domains')",
    blockedDomainsPlaceholder: "# Example: If you allow *.example.ch\n# but want to block mail.example.ch:\nmail.example.ch",
    proTipTitle: "💡 Pro Tip",
    proTipText: "Use wildcards (*) to allow all subdomains. For example: *.microsoft.com allows login.microsoft.com, account.microsoft.com, etc.<br><br><strong>Note:</strong> Duplicate domains are automatically removed.",
    allowedDomains: "Allowed Domains",
    downloadBtn: "📥 Download SEB Config (.seb)",
    copyBtn: "📋 Copy Domain List",
    criticalWarningTitle: "Important Notice:",
    criticalWarningText: "The downloaded .seb file is only a template! The 'Next Steps' described below must be completed before the configuration can be used in production and distributed to students.",
    nextStepsTitle: "Next Steps",
    nextStepsText: "1. Download the SEB configuration file (.seb)<br>2. Open in SEB Config Tool<br>3. Refine settings and encrypt<br>4. Save as final .seb file<br>5. Distribute encrypted file to students",
    helperScriptTitle: "Network Capture Helper",
    helperScriptText: "Need help capturing network domains? Choose the method that works for your system:",
    downloadHelperBtn: "⬇️ PowerShell (Windows)",
    browserHelperBtn: "🌐 Browser Method (All OS)",
    helperDocsTitle: "📖 Help & Guides:",
    browserCaptureLink: "Browser Capture Guide",
    quickstartLink: "Quick Start with Google Sites",
    quickRefLink: "Quick Reference",
    mainDocLink: "Complete Guide",
    
    // Presets
    presetOnenote: "OneNote Online",
    presetOnenoteDesc: "Microsoft OneNote web client",
    presetWord: "Word Online",
    presetWordDesc: "Microsoft Word web client",
    presetTeams: "Microsoft Teams",
    presetTeamsDesc: "Teams web client for collaboration",
    presetGdocs: "Google Docs",
    presetGdocsDesc: "Google Workspace document editor",
    presetGsheets: "Google Sheets",
    presetGsheetsDesc: "Google Workspace spreadsheet editor",
    presetWhiteboard: "Whiteboard.fi",
    presetWhiteboardDesc: "Collaborative online whiteboard",
    presetPadlet: "Padlet",
    presetPadletDesc: "Digital bulletin board for collaboration",
    presetKahoot: "Kahoot!",
    presetKahootDesc: "Gamified quizzes and polls",
    presetMentimeter: "Mentimeter",
    presetMentimeterDesc: "Live polls and interactive presentations",
    presetMiro: "Miro",
    presetMiroDesc: "Digital whiteboard for collaboration",
    presetSlido: "Slido",
    presetSlidoDesc: "Live Q&A and polls",
    presetEtherpad: "Etherpad",
    presetEtherpadDesc: "Collaborative text document",
    presetForms: "Microsoft Forms",
    presetFormsDesc: "Surveys and forms (public)",
    presetDuden: "Duden",
    presetDudenDesc: "German dictionary and spelling",
    presetDwds: "DWDS",
    presetDwdsDesc: "Digital Dictionary of German Language",
    presetOxford: "Oxford Dictionary",
    presetOxfordDesc: "English learner's dictionary",
    presetCambridge: "Cambridge Dictionary",
    presetCambridgeDesc: "Cambridge English Dictionary",
    presetLarousse: "Larousse",
    presetLarousseDesc: "French dictionary and encyclopedia",
    presetReverso: "Reverso",
    presetReversoDesc: "French contextual dictionary and translation",
    
    // Security levels
    securityRelaxed: "Relaxed",
    securityRelaxedDesc: "Focus mode - blocks distractions but allows flexibility",
    securityBalanced: "Balanced",
    securityBalancedDesc: "Recommended - good balance of security and usability",
    securityStrict: "Strict",
    securityStrictDesc: "Maximum restrictions (may frustrate students)",
    
    // Messages
    copiedMsg: "✓ Copied!",
    configNamePlaceholder: "My_School_",
    
    // Privacy
    privacyTitle: "Privacy:",
    privacyText: "All data is processed locally in your browser. No configuration data or inputs are sent to or stored on our server. Only your language preference is saved locally in your browser.",
    suggestService: "Suggest Service or Tool / Report Issue",
    
    // Version info
    versionLabel: "Version",
    buildLabel: "Build"
}
};

// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================
const PRESETS = {
onenote: {
    startUrl: "https://www.onenote.com/notebooks",
    // Note: *.sharepoint.com covers school-specific SharePoint sites (e.g., school1.sharepoint.com)
    domains: ["*.microsoft.com","*.microsoftonline.com","*.msauth.net","*.msftauth.net","login.live.com","account.live.com","*.live.com","*.office.com","*.office.net","*.office365.com","*.officeapps.live.com","*.sharepoint.com","*.sharepointonline.com","*.onenote.com","onenote.officeapps.live.com","*.msocdn.com","*.msecnd.net","*.azureedge.net","*.windows.net","*.static.microsoft","browser.events.data.microsoft.com","chc-onenote.officeapps.live.com","common.online.office.com","euc-common.online.office.com","login.microsoftonline.com","res-1.cdn.office.net","res-1.public.onecdn.static.microsoft","wise-m.public.cdn.office.net","wise.public.cdn.office.net"],
    blockedDomains: ["outlook.office.com","outlook.office365.com","teams.microsoft.com","teams.live.com"]
},
word: {
    startUrl: "https://www.office.com/launch/word",
    // Note: *.sharepoint.com covers school-specific SharePoint sites (e.g., school1.sharepoint.com)
    domains: ["*.microsoft.com","*.microsoftonline.com","*.msauth.net","*.msftauth.net","login.live.com","account.live.com","*.live.com","*.office.com","*.office.net","*.office365.com","*.officeapps.live.com","*.sharepoint.com","*.sharepointonline.com","*.msocdn.com","*.msecnd.net","*.azureedge.net","*.windows.net","*.static.microsoft","browser.events.data.microsoft.com","common.online.office.com","euc-common.online.office.com","login.microsoftonline.com","res-1.cdn.office.net","res-1.public.onecdn.static.microsoft","wise-m.public.cdn.office.net","wise.public.cdn.office.net"],
    blockedDomains: ["outlook.office.com","outlook.office365.com","teams.microsoft.com","teams.live.com"]
},
whiteboard: {
    startUrl: "https://whiteboard.fi",
    domains: ["whiteboard.fi","whiteboard-storage-*.s3.*.amazonaws.com","cdn.jsdelivr.net","fonts.googleapis.com","fonts.gstatic.com"]
},
padlet: {
    startUrl: "https://padlet.com",
    domains: ["padlet.com","*.padlet.com","padlet.net","*.padlet.pics"]
},
kahoot: {
    startUrl: "https://kahoot.it",
    domains: ["kahoot.it","*.kahoot.it","kahoot.com","*.kahoot.com"]
},
mentimeter: {
    startUrl: "https://www.menti.com",
    domains: ["menti.com","*.menti.com","mentimeter.com","*.mentimeter.com"]
},
miro: {
    startUrl: "https://miro.com",
    domains: ["miro.com","*.miro.com","*.mirocdn.com"]
},
slido: {
    startUrl: "https://www.slido.com",
    domains: ["slido.com","*.slido.com","*.sli.do"]
},
etherpad: {
    startUrl: "https://etherpad.org",
    domains: ["etherpad.org","*.etherpad.org"]
},
forms: {
    startUrl: "https://forms.office.com",
    domains: ["forms.office.com","*.forms.office.com","*.microsoft.com","*.microsoftonline.com","*.office.com","*.office365.com","*.msocdn.com","*.msecnd.net","*.azureedge.net"]
},
duden: {
    startUrl: "https://www.duden.de",
    domains: ["duden.de","*.duden.de","*.doubleclick.net","*.googletagmanager.com","*.stroeerdigitalgroup.de","*.taboola.com","*.yieldlove.com","mitself.net"]
},
dwds: {
    startUrl: "https://www.dwds.de",
    domains: ["dwds.de","*.dwds.de"]
},
oxford: {
    startUrl: "https://www.oxfordlearnersdictionaries.com",
    domains: ["oxfordlearnersdictionaries.com","*.oxfordlearnersdictionaries.com","*.oup.com","*.cookielaw.org","*.doubleclick.net","*.google-analytics.com","*.google.com","*.googletagmanager.com","*.onetrust.com","*.polarbyte.com","html-load.com"]
},
cambridge: {
    startUrl: "https://dictionary.cambridge.org",
    domains: ["dictionary.cambridge.org","*.cambridge.org"]
},
larousse: {
    startUrl: "https://www.larousse.fr/dictionnaires",
    domains: ["larousse.fr","*.larousse.fr"]
},
reverso: {
    startUrl: "https://www.reverso.net/",
    domains: ["reverso.net","*.reverso.net","context.reverso.net"]
}
};

// ============================================================================
// SUBJECTS CONFIGURATION - Easily extensible for additional languages
// ============================================================================
const SUBJECTS = {
german: {
    toolPresets: ['duden', 'dwds']
},
english: {
    toolPresets: ['oxford', 'cambridge']
},
french: {
    toolPresets: ['larousse', 'reverso']
}
// Add more subjects here as needed:
// spanish: { toolPresets: ['rae', 'wordreference'] },
// italian: { toolPresets: ['treccani', 'dizionario'] }
};

const PRESET_GROUPS = {
noLogin: ['whiteboard', 'kahoot', 'mentimeter', 'slido', 'forms', 'padlet', 'miro', 'etherpad'],
withLogin: ['onenote', 'word'],
// Generate allowedTools from SUBJECTS configuration
allowedTools: Object.fromEntries(
    Object.entries(SUBJECTS).map(([key, config]) => [key, config.toolPresets])
)
};

const SECURITY_LEVELS = {
relaxed: {
    settings: {allowSwitchToApplications:false,allowQuit:true,browserViewMode:0,enableBrowserWindowToolbar:true,showMenuBar:false}
},
balanced: {
    settings: {allowSwitchToApplications:false,allowQuit:true,browserViewMode:0,enableBrowserWindowToolbar:true,showMenuBar:false}
},
strict: {
    settings: {allowSwitchToApplications:false,allowQuit:false,browserViewMode:1,enableBrowserWindowToolbar:false,showMenuBar:false}
}
};

// ============================================================================
// SHAREPOINT LINK PARSING
// ============================================================================
function parseSharePointLink(url, serviceType) {
if (!url || !url.trim()) return null;

try {
    const result = {
        isSharePoint: false,
        domain: null,
        teamsSite: null,
        notebook: null,
        section: null,
        pageName: null,
        pageId: null,
        sectionId: null,
        folder: null,
        fileName: null,
        fileId: null
    };
    
    // OneNote links often contain two parts separated by space: web URL and onenote: protocol
    // Example: "https://.../_layouts/Doc.aspx?... onenote:https://.../Notebook/Section.one#PageName&section-id={...}&page-id={...}"
    let webUrl = url;
    let oneNoteProtocolUrl = null;
    
    if (url.includes(' onenote:')) {
        const parts = url.split(' onenote:');
        webUrl = parts[0].trim();
        oneNoteProtocolUrl = 'https:' + parts[1].trim(); // Re-add https: prefix
    }
    
    const parsed = new URL(webUrl);
    
    // Check if it's a SharePoint URL
    if (!parsed.hostname.includes('sharepoint.com')) {
        return null;
    }
    
    result.isSharePoint = true;
    result.domain = parsed.hostname;
    
    // Extract Teams site (e.g., /sites/msteams_763fd2/)
    const siteMatch = parsed.pathname.match(/\/sites\/([^\/]+)/);
    if (siteMatch) {
        result.teamsSite = siteMatch[1];
    }
    
    if (serviceType === 'onenote') {
        // If we have the onenote: protocol URL, parse it for precise information
        if (oneNoteProtocolUrl) {
            try {
                const oneNoteUrl = new URL(oneNoteProtocolUrl);
                
                // Extract notebook name from path: /SiteAssets/Englisch%20G22e-Notizbuch/
                const notebookMatch = oneNoteUrl.pathname.match(/\/SiteAssets\/([^\/]+)/);
                if (notebookMatch) {
                    result.notebook = decodeURIComponent(notebookMatch[1]);
                }
                
                // Extract section (.one file): /_Inhaltsbibliothek/Language%20Hub%20(Years%203-4).one
                const sectionMatch = oneNoteUrl.pathname.match(/\/([^\/]+\.one)/i);
                if (sectionMatch) {
                    result.section = decodeURIComponent(sectionMatch[1]);
                }
                
                // Extract page name from hash: #Participle%20clauses
                if (oneNoteUrl.hash) {
                    const pageNameMatch = oneNoteUrl.hash.match(/#([^&]+)/);
                    if (pageNameMatch) {
                        result.pageName = decodeURIComponent(pageNameMatch[1]);
                    }
                }
                
                // Extract section-id from hash
                const sectionIdMatch = oneNoteUrl.hash.match(/section-id=\{([^}]+)\}/);
                if (sectionIdMatch) {
                    result.sectionId = sectionIdMatch[1];
                }
                
                // Extract page-id from hash
                const pageIdMatch = oneNoteUrl.hash.match(/page-id=\{([^}]+)\}/);
                if (pageIdMatch) {
                    result.pageId = pageIdMatch[1];
                }
            } catch (e) {
                // Fallback to web URL parsing if onenote: URL parsing fails
                console.warn('OneNote protocol URL parsing failed, falling back to web URL', e);
            }
        }
        
        // Fallback: try to extract from web URL if onenote: protocol wasn't available
        if (!result.notebook) {
            const notebookMatch = webUrl.match(/\/([^\/]+)-Notizbuch/i);
            if (notebookMatch) {
                result.notebook = decodeURIComponent(notebookMatch[1] + '-Notizbuch');
            }
        }
        
        if (!result.section) {
            const sectionMatch = webUrl.match(/\/([^\/]+\.one)/i);
            if (sectionMatch) {
                result.section = decodeURIComponent(sectionMatch[1]);
            }
        }
        
        // Extract section-id and page-id from wd=target(...) parameter (web URL format)
        // Format: wd=target(SectionPath.one|{SECTION-ID}/PageName|{PAGE-ID}/)
        if (!result.sectionId || !result.pageId) {
            const wdMatch = webUrl.match(/[&?]wd=([^&]+)/);
            if (wdMatch) {
                const wdDecoded = decodeURIComponent(wdMatch[1]);
                
                // Extract section ID: .one|{GUID}/
                if (!result.sectionId) {
                    const sectionIdMatch = wdDecoded.match(/\.one\|([A-F0-9-]+)\//i);
                    if (sectionIdMatch) {
                        result.sectionId = sectionIdMatch[1];
                    }
                }
                
                // Extract page ID: Must come AFTER the section ID pattern
                // Look for: /PageName|{GUID}/ that comes after .one|{SECTION-ID}/
                if (!result.pageId) {
                    const afterSection = wdDecoded.match(/\.one\|[A-F0-9-]+\/(.+)/i);
                    if (afterSection) {
                        const pageIdMatch = afterSection[1].match(/\|([A-F0-9-]+)\//i);
                        if (pageIdMatch) {
                            result.pageId = pageIdMatch[1];
                        }
                    }
                }
            }
        }
    } else if (serviceType === 'word') {
        // Extract file ID (sourcedoc)
        const fileIdMatch = url.match(/sourcedoc[=%]+\{([^}]+)\}/i);
        if (fileIdMatch) {
            result.fileId = fileIdMatch[1];
        }
        
        // Extract file name from path
        const fileNameMatch = parsed.pathname.match(/\/([^\/]+\.docx?)$/i);
        if (fileNameMatch) {
            result.fileName = decodeURIComponent(fileNameMatch[1]);
        }
        
        // Extract folder from path (between /sites/xxx/ and the file)
        const folderMatch = parsed.pathname.match(/\/sites\/[^\/]+\/(.+?)\/[^\/]+\.docx?/i);
        if (folderMatch) {
            result.folder = decodeURIComponent(folderMatch[1]);
        }
    }
    
    return result;
} catch (e) {
    return null;
}
}

// ============================================================================
// XML PARSER FOR BOOLEAN OPTIONS
// ============================================================================
async function loadAndParseBooleanOptions() {
try {
    console.log('📥 Loading XML template from embedded data...');
    
    // Check if EXAMPLE_CONFIG_XML is available (loaded from xml-data.js)
    if (typeof EXAMPLE_CONFIG_XML === 'undefined') {
        console.error('❌ EXAMPLE_CONFIG_XML not found! Make sure xml-data.js is loaded.');
        return false;
    }
    
    const xmlText = EXAMPLE_CONFIG_XML;
    console.log('📝 XML text length:', xmlText.length);
    console.log('📝 First 200 chars:', xmlText.substring(0, 200));
    
    // Parse XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
    
    // Check for parsing errors
    const parseError = xmlDoc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
        console.error('❌ XML parsing error:', parseError[0].textContent);
        return false;
    }
    
    console.log('✅ XML parsed successfully');
    console.log('📊 Root element:', xmlDoc.documentElement.tagName);
    
    // Extract all boolean options
    const allKeys = xmlDoc.getElementsByTagName('key');
    const optionsMap = new Map(); // Use Map to automatically handle duplicates
    
    for (let i = 0; i < allKeys.length; i++) {
        const keyElement = allKeys[i];
        const keyName = keyElement.textContent.trim();
        const nextSibling = keyElement.nextElementSibling;
        
        // Check if the next element is <true/> or <false/>
        if (nextSibling && (nextSibling.tagName === 'true' || nextSibling.tagName === 'false')) {
            const defaultValue = nextSibling.tagName === 'true';
            // Only add if not already in map (first occurrence wins)
            if (!optionsMap.has(keyName)) {
                optionsMap.set(keyName, { key: keyName, defaultValue });
            }
        }
    }
    
    // Convert Map to Array
    const options = Array.from(optionsMap.values());
    
    // Categorize options into groups
    const groups = {
        browser: { title: 'browserOptions', options: [] },
        security: { title: 'securityOptions', options: [] },
        interface: { title: 'interfaceOptions', options: [] },
        system: { title: 'systemOptions', options: [] },
        network: { title: 'networkOptions', options: [] },
        mobile: { title: 'mobileOptions', options: [] },
        other: { title: 'otherOptions', options: [] }
    };
    
    // Categorize each option
    options.forEach(opt => {
        const key = opt.key;
        let group = 'other';
        
        // Browser-related
        if (key.match(/browser|window|page|zoom|plugin|java|pdf|popup|webview|reload|url|navigation|addressbar/i)) {
            group = 'browser';
        }
        // Security-related
        else if (key.match(/allow|prohibit|block|hook|detect|monitor|quit|exit|password|security|proctoring|screenshot|capture|recording|virtual|mirroring|sharing|switch/i)) {
            group = 'security';
        }
        // Interface/UI-related
        else if (key.match(/show|hide|enable|disable|display|toolbar|menu|button|icon|status|appearance/i)) {
            group = 'interface';
        }
        // Mobile-specific
        else if (key.match(/mobile|ios|ipad|touch|asam|aac|guided|orientation|formfactor/i)) {
            group = 'mobile';
        }
        // System-related
        else if (key.match(/process|application|desktop|shell|task|update|install|log|audio|battery|wlan/i)) {
            group = 'system';
        }
        // Network-related
        else if (key.match(/network|socket|ping|dns/i)) {
            group = 'network';
        }
        
        groups[group].options.push(opt);
    });
    
    // Store parsed data
    parsedBooleanOptions.groups = groups;
    parsedBooleanOptions.options = {};
    options.forEach(opt => {
        parsedBooleanOptions.options[opt.key] = opt.defaultValue;
        parsedBooleanOptions.userSelections[opt.key] = opt.defaultValue; // Initialize with defaults
    });
    
    console.log(`✅ Parsed ${options.length} boolean options from XML`);
    console.log('📊 Groups distribution:');
    Object.keys(groups).forEach(key => {
        console.log(`   - ${key}: ${groups[key].options.length} options`);
    });
    return true;
} catch (error) {
    console.error('Failed to load/parse boolean options from XML:', error);
    return false;
}
}

// ============================================================================
// LOAD BOOLEAN OPTIONS LOCATIONS FROM JSON (PLATFORM-SPECIFIC)
// ============================================================================
let booleanOptionsLocations = {};

async function loadBooleanOptionsLocations(platform = 'windows') {
// Check if already loaded for this platform
if (booleanOptionsLocations[platform]) {
    return booleanOptionsLocations[platform];
}

try {
    console.log(`📍 Loading boolean options locations for ${platform}...`);
    
    // Get data from embedded JavaScript constants
    // Try to access the global variable directly (const variables are not on window object)
    let data = null;
    
    try {
        if (platform === 'windows' && typeof LOCATIONS_WINDOWS !== 'undefined') {
            data = LOCATIONS_WINDOWS;
        } else if (platform === 'macos' && typeof LOCATIONS_MACOS !== 'undefined') {
            data = LOCATIONS_MACOS;
        } else if (platform === 'ipados' && typeof LOCATIONS_IPADOS !== 'undefined') {
            data = LOCATIONS_IPADOS;
        }
    } catch (e) {
        console.warn(`⚠️ LOCATIONS_${platform.toUpperCase()} not found! Make sure boolean-options-locations-${platform}.js is loaded.`);
        return null;
    }
    
    if (!data) {
        console.warn(`⚠️ No location data for ${platform}`);
        return null;
    }
    
    booleanOptionsLocations[platform] = data;
    
    const optionCount = Object.keys(data.options).length;
    const versionInfo = data._metadata.sebVersion !== 'TBD' ? ` (SEB v${data._metadata.sebVersion})` : '';
    console.log(`✅ Loaded locations for ${optionCount} options${versionInfo}`);
    return data;
} catch (error) {
    console.error(`Failed to load boolean options locations for ${platform}:`, error);
    return null;
}
}

function getOptionLocation(key) {
const platformData = booleanOptionsLocations[currentPlatform];
if (!platformData || !platformData.options || !platformData.options[key]) {
    return null;
}

const optionData = platformData.options[key];

// For Windows format (with macDifferent field)
if (currentPlatform === 'windows') {
    const windowsLoc = optionData.windows;
    const macDiff = optionData.macDifferent;
    
    if (macDiff) {
        return `${windowsLoc} (Mac: ${macDiff})`;
    }
    return windowsLoc;
}

// For macOS/iPadOS format (direct location)
return optionData.location || optionData.windows || null;
}

function getTranslatedText(key) {
const platformData = booleanOptionsLocations[currentPlatform];
if (!platformData || !platformData._translations || !platformData._translations[currentLang]) {
    return key === 'notDocumented' ? 
        (currentLang === 'de' ? 'Noch nicht dokumentiert' : 'Not yet documented') :
        (currentLang === 'de' ? 'Diese Option ist noch nicht in der Dokumentation erfasst' : 'This option is not yet documented');
}
return platformData._translations[currentLang][key];
}

// Platform selection handler
async function selectPlatform(platform) {
console.log(`🔄 Switching to ${platform} platform...`);
currentPlatform = platform;

// Update button styles
document.querySelectorAll('.platform-btn').forEach(btn => {
    const btnPlatform = btn.getAttribute('data-platform');
    if (btnPlatform === platform) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }
});

// Load locations for this platform if not already loaded
await loadBooleanOptionsLocations(platform);

// Re-render options to show new locations
renderBooleanOptions();
console.log(`✅ Switched to ${platform} platform`);
}

// Generate human-readable label from key name
function generateOptionLabel(key) {
// Remove common prefixes
let label = key.replace(/^(allow|enable|show|display|disable|hide|block|force|create|detect|mobile|browser|new|exam|inside|config)/, '');

// Insert spaces before capital letters
label = label.replace(/([A-Z])/g, ' $1').trim();

// Capitalize first letter
label = label.charAt(0).toUpperCase() + label.slice(1);

return label || key;
}

// ============================================================================
// VERSION & BUILD INFO
// ============================================================================
const APP_VERSION = 'v0.19.0a1';
const BUILD_DATE = new Date('2025-11-15T14:01:00'); // Format: YYYY-MM-DDTHH:mm:ss

function formatBuildDate(lang) {
const day = String(BUILD_DATE.getDate()).padStart(2, '0');
const month = String(BUILD_DATE.getMonth() + 1).padStart(2, '0');
const year = BUILD_DATE.getFullYear();
const hours = String(BUILD_DATE.getHours()).padStart(2, '0');
const minutes = String(BUILD_DATE.getMinutes()).padStart(2, '0');

if (lang === 'de') {
    return `${day}.${month}.${year} ${hours}:${minutes}`;
} else {
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
}

// ============================================================================
// STATE
// ============================================================================
let currentLang = 'de';
let selectedPresets = []; // Start with no preset selected - user must choose
let currentSecurityLevel = 'balanced';
let currentSelectedSubject = ''; // Track selected subject for allowed tools

// SharePoint link state
let sharepointConfig = {
onenote: { parsedLink: null, restrictions: {} },
word: { parsedLink: null, restrictions: {} }
};

// Boolean options parsed from XML template (lazy loaded on demand)
let parsedBooleanOptions = {
loaded: false, // Track if options have been loaded
groups: {},
options: {},
userSelections: {} // Track user's checkbox selections
};

// Platform selection for boolean options reference
let currentPlatform = 'windows'; // Default platform

// ============================================================================
// LANGUAGE MANAGEMENT
// ============================================================================
function setLanguage(lang) {
currentLang = lang;
document.documentElement.lang = lang;

// Update all elements with data-i18n attribute
document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = TRANSLATIONS[lang][key];
        } else {
            el.innerHTML = TRANSLATIONS[lang][key];
        }
    }
});

// Update placeholder attributes
document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[lang][key]) {
        el.placeholder = TRANSLATIONS[lang][key];
    }
});

// Update language toggle buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
});

// Update documentation links based on language
updateDocLinks(lang);

// Update version info
updateVersionInfo(lang);

// Update SharePoint help text if visible
const sharepointHelp = document.getElementById('sharepointHelp');
if (sharepointHelp && sharepointHelp.style.display !== 'none') {
    const hasOneNote = selectedPresets.includes('onenote');
    const hasWord = selectedPresets.includes('word');
    
    if (hasOneNote && !hasWord) {
        sharepointHelp.textContent = t('sharepointHelpOneNote');
    } else if (hasWord && !hasOneNote) {
        sharepointHelp.textContent = t('sharepointHelpWord');
    } else if (hasOneNote && hasWord) {
        sharepointHelp.textContent = t('sharepointHelpOneNote') + '\n\n' + t('sharepointHelpWord');
    }
}

// Re-render boolean options if they are already loaded (to update translated hint texts)
if (parsedBooleanOptions.loaded) {
    renderBooleanOptions();
}

// Re-render dynamic content
renderPresets();
renderSecurityLevels();

// Save language preference
localStorage.setItem('sebConfigLang', lang);
}

function updateVersionInfo(lang) {
const versionInfo = document.getElementById('versionInfo');
if (versionInfo) {
    const versionLabel = t('versionLabel');
    const buildLabel = t('buildLabel');
    const buildDate = formatBuildDate(lang);
    versionInfo.innerHTML = `${versionLabel}: ${APP_VERSION} | ${buildLabel}: ${buildDate}`;
}
}

function updateDocLinks(lang) {
// Base GitHub URL for rendered markdown
const baseGitHubUrl = 'https://github.com/markuskiller/SEBConfigGenerator/blob/main/';

// Main documentation link in header
const mainDocLink = document.getElementById('mainDocLink');
if (mainDocLink) {
    if (lang === 'de') {
        mainDocLink.href = baseGitHubUrl + 'docs/de/SCHNELLSTART_ANLEITUNG.md';
    } else {
        mainDocLink.href = baseGitHubUrl + 'docs/en/TEACHER_GUIDE.md';
    }
}

// Browser capture guide (in Advanced section)
const browserCaptureLink = document.getElementById('browserCaptureLink');
if (browserCaptureLink) {
    if (lang === 'de') {
        browserCaptureLink.href = baseGitHubUrl + 'docs/de/BROWSER_CAPTURE_ANLEITUNG.md';
    } else {
        browserCaptureLink.href = baseGitHubUrl + 'docs/en/BROWSER_CAPTURE_GUIDE.md';
    }
}

// Quickstart/Sites guide (in Basic section)
const quickstartLinkBasic = document.getElementById('quickstartLinkBasic');
if (quickstartLinkBasic) {
    if (lang === 'de') {
        quickstartLinkBasic.href = baseGitHubUrl + 'docs/de/SCHNELLSTART_ANLEITUNG.md';
    } else {
        quickstartLinkBasic.href = baseGitHubUrl + 'docs/en/TEACHER_GUIDE.md';
    }
}

// Quick reference (in Basic section)
const quickRefLinkBasic = document.getElementById('quickRefLinkBasic');
if (quickRefLinkBasic) {
    if (lang === 'de') {
        quickRefLinkBasic.href = baseGitHubUrl + 'docs/de/SCHNELLREFERENZ.txt';
    } else {
        quickRefLinkBasic.href = baseGitHubUrl + 'docs/en/QUICK_REFERENCE.txt';
    }
}
}

function t(key) {
return TRANSLATIONS[currentLang][key] || key;
}

// ============================================================================
// UI RENDERING
// ============================================================================
function renderPresets() {
const container = document.getElementById('presetButtons');
container.innerHTML = '';

// Group 1: No Login Required
const group1Title = document.createElement('h3');
group1Title.classList.add('preset-group-title');
group1Title.innerHTML = `🌐 ${t('groupNoLogin')}`;
container.appendChild(group1Title);

PRESET_GROUPS.noLogin.forEach(key => {
    const btn = document.createElement('button');
    btn.className = `preset-btn ${selectedPresets.includes(key) ? 'active' : ''}`;
    btn.innerHTML = `
        <h3>${t('preset' + key.charAt(0).toUpperCase() + key.slice(1))}</h3>
        <p>${t('preset' + key.charAt(0).toUpperCase() + key.slice(1) + 'Desc')}</p>
    `;
    btn.onclick = () => togglePreset(key);
    container.appendChild(btn);
});

// Group 2: Login Required
const group2Title = document.createElement('h3');
group2Title.classList.add('preset-group-title', 'spacing-top');
group2Title.innerHTML = `🔐 ${t('groupWithLogin')}`;
container.appendChild(group2Title);

PRESET_GROUPS.withLogin.forEach(key => {
    const btn = document.createElement('button');
    btn.className = `preset-btn ${selectedPresets.includes(key) ? 'active' : ''}`;
    btn.innerHTML = `
        <h3>${t('preset' + key.charAt(0).toUpperCase() + key.slice(1))}</h3>
        <p>${t('preset' + key.charAt(0).toUpperCase() + key.slice(1) + 'Desc')}</p>
    `;
    btn.onclick = () => togglePreset(key);
    container.appendChild(btn);
});

// Experimental warning for OneNote and Word (shown when either is selected)
let experimentalWarning = document.getElementById('experimentalWarning');
if (!experimentalWarning) {
    // Create warning element if it doesn't exist
    experimentalWarning = document.createElement('div');
    experimentalWarning.id = 'experimentalWarning';
    experimentalWarning.classList.add('preset-experimental-warning');
    
    const warningTitle = document.createElement('strong');
    experimentalWarning.appendChild(warningTitle);
    
    const warningText = document.createElement('div');
    experimentalWarning.appendChild(warningText);
    
    const warningLink = document.createElement('a');
    warningLink.href = '#networkCaptureHelper';
    experimentalWarning.appendChild(warningLink);
    
    container.appendChild(experimentalWarning);
}

// Update warning visibility and content
const hasOneNote = selectedPresets.includes('onenote');
const hasWord = selectedPresets.includes('word');
const hasOneNoteOrWord = hasOneNote || hasWord;

if (hasOneNoteOrWord) {
    experimentalWarning.style.display = 'block';
    const warningTitle = experimentalWarning.querySelector('strong');
    const warningText = experimentalWarning.querySelector('div');
    const warningLink = experimentalWarning.querySelector('a');
    warningTitle.textContent = t('experimentalWarningTitle');
    
    // Replace "Network Capture" with a link in the warning text
    const text = t('experimentalWarningText');
    const linkText = '<a href="#networkCaptureHelper" style="color:#856404;font-weight:600;text-decoration:underline;">Network Capture</a>';
    warningText.innerHTML = text.replace('Network Capture', linkText);
    
    warningLink.textContent = t('experimentalWarningLink');
} else {
    experimentalWarning.style.display = 'none';
}

// Group 3: Allowed Tools (with subject selection)
const group3Title = document.createElement('h3');
group3Title.classList.add('preset-group-title', 'spacing-top');
group3Title.innerHTML = `📚 ${t('groupAllowedTools')}`;
container.appendChild(group3Title);

// Subject selector - dynamically generated from SUBJECTS configuration
const subjectSelector = document.createElement('div');
subjectSelector.classList.add('preset-subject-selector');

const subjectLabel = document.createElement('label');
subjectLabel.classList.add('preset-subject-label');
subjectLabel.textContent = `${t('selectSubject')}:`;
subjectSelector.appendChild(subjectLabel);

const subjectSelect = document.createElement('select');
subjectSelect.id = 'subjectSelect';
subjectSelect.classList.add('preset-subject-select');

// Default option
const defaultOption = document.createElement('option');
defaultOption.value = '';
defaultOption.textContent = `-- ${t('selectSubject')} --`;
subjectSelect.appendChild(defaultOption);

// Dynamically add options from SUBJECTS configuration
Object.keys(SUBJECTS).forEach(subjectKey => {
    const option = document.createElement('option');
    option.value = subjectKey;
    // Capitalize first letter for translation key: german -> subjectGerman
    const translationKey = 'subject' + subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1);
    option.textContent = t(translationKey);
    subjectSelect.appendChild(option);
});

subjectSelector.appendChild(subjectSelect);
container.appendChild(subjectSelector);

// Tools container (initially hidden)
const toolsContainer = document.createElement('div');
toolsContainer.id = 'allowedToolsContainer';
toolsContainer.classList.add('preset-tools-container');
container.appendChild(toolsContainer);

// Add event listener to subject selector and restore previous selection
setTimeout(() => {
    const select = document.getElementById('subjectSelect');
    if (select) {
        // Restore previously selected subject
        if (currentSelectedSubject) {
            select.value = currentSelectedSubject;
            renderAllowedTools(currentSelectedSubject);
        }
        select.addEventListener('change', (e) => renderAllowedTools(e.target.value));
    }
}, 0);
}

function renderAllowedTools(subject) {
const container = document.getElementById('allowedToolsContainer');
if (!container) return;

// Store the selected subject
currentSelectedSubject = subject;

container.innerHTML = '';

if (!subject || !PRESET_GROUPS.allowedTools[subject]) return;

PRESET_GROUPS.allowedTools[subject].forEach(key => {
    const btn = document.createElement('button');
    btn.className = `preset-btn ${selectedPresets.includes(key) ? 'active' : ''}`;
    btn.innerHTML = `
        <h3>${t('preset' + key.charAt(0).toUpperCase() + key.slice(1))}</h3>
        <p>${t('preset' + key.charAt(0).toUpperCase() + key.slice(1) + 'Desc')}</p>
    `;
    btn.onclick = () => togglePreset(key);
    container.appendChild(btn);
});
}

function renderSecurityLevels() {
const container = document.getElementById('securityLevel');
container.innerHTML = '';

['relaxed', 'balanced', 'strict'].forEach(key => {
    const div = document.createElement('div');
    div.className = `security-option ${key === currentSecurityLevel ? 'active' : ''}`;
    div.innerHTML = `
        <h4>${t('security' + key.charAt(0).toUpperCase() + key.slice(1))}</h4>
        <p>${t('security' + key.charAt(0).toUpperCase() + key.slice(1) + 'Desc')}</p>
    `;
    div.onclick = () => selectSecurityLevel(key);
    container.appendChild(div);
});

// Show/update experimental warning for relaxed and strict levels
updateSecurityLevelWarning();
}

function renderSharePointOptions(serviceType, parsedLink) {
const container = document.getElementById('sharepointOptions');
if (!parsedLink || !parsedLink.isSharePoint) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
}

container.style.display = 'block';
container.innerHTML = '';

// Title
const title = document.createElement('h4');
title.classList.add('preset-tool-title');
title.textContent = t('sharepointOptionsTitle');
container.appendChild(title);

const optionsDiv = document.createElement('div');
optionsDiv.classList.add('preset-tool-options');

// School SharePoint option
if (parsedLink.domain) {
    const checkbox = createSharePointCheckbox(
        serviceType,
        'schoolSharepoint',
        t('restrictToSchoolSharepoint'),
        `${t('sharepointDetected')}: ${parsedLink.domain}`
    );
    optionsDiv.appendChild(checkbox);
}

// Teams site option
if (parsedLink.teamsSite) {
    const checkbox = createSharePointCheckbox(
        serviceType,
        'teamsSite',
        t('restrictToTeamsSite'),
        `${t('teamsSiteDetected')}: ${parsedLink.teamsSite}`
    );
    optionsDiv.appendChild(checkbox);
}

// OneNote-specific options
if (serviceType === 'onenote') {
    if (parsedLink.notebook) {
        const checkbox = createSharePointCheckbox(
            serviceType,
            'notebook',
            t('restrictToNotebook'),
            `${t('notebookDetected')}: ${parsedLink.notebook}`
        );
        optionsDiv.appendChild(checkbox);
    }
    
    if (parsedLink.section) {
        const checkbox = createSharePointCheckbox(
            serviceType,
            'section',
            t('restrictToSection'),
            `${t('sectionDetected')}: ${parsedLink.section}`
        );
        optionsDiv.appendChild(checkbox);
    }
    
    if (parsedLink.pageId) {
        const detectedInfo = parsedLink.pageName 
            ? `${t('pageDetected')}: ${parsedLink.pageName}`
            : `${t('pageDetected')}`;
        const checkbox = createSharePointCheckbox(
            serviceType,
            'page',
            t('restrictToPage'),
            detectedInfo
        );
        optionsDiv.appendChild(checkbox);
    }
}

// Word-specific options
if (serviceType === 'word') {
    if (parsedLink.folder) {
        const checkbox = createSharePointCheckbox(
            serviceType,
            'folder',
            t('restrictToFolder'),
            `${t('folderDetected')}: ${parsedLink.folder}`
        );
        optionsDiv.appendChild(checkbox);
    }
    
    if (parsedLink.fileId) {
        const checkbox = createSharePointCheckbox(
            serviceType,
            'file',
            t('restrictToFile'),
            `${t('fileDetected')}`
        );
        optionsDiv.appendChild(checkbox);
    }
}

container.appendChild(optionsDiv);
}

function createSharePointCheckbox(serviceType, restrictionType, label, detectedInfo) {
const div = document.createElement('div');
div.classList.add('preset-option-item');

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.id = `sp_${serviceType}_${restrictionType}`;
checkbox.classList.add('preset-option-checkbox');
checkbox.onchange = () => {
    if (!sharepointConfig[serviceType].restrictions) {
        sharepointConfig[serviceType].restrictions = {};
    }
    sharepointConfig[serviceType].restrictions[restrictionType] = checkbox.checked;
    updatePreview();
};

const labelEl = document.createElement('label');
labelEl.htmlFor = checkbox.id;
labelEl.classList.add('preset-option-label');
labelEl.textContent = label;

const infoEl = document.createElement('div');
infoEl.classList.add('preset-option-info');
infoEl.textContent = detectedInfo;

div.appendChild(checkbox);
div.appendChild(labelEl);
div.appendChild(infoEl);

return div;
}

function togglePreset(key) {
// Check if this is an allowed tool (Hilfsmittel)
const isAllowedTool = Object.values(PRESET_GROUPS.allowedTools).flat().includes(key);

const index = selectedPresets.indexOf(key);
if (index === -1) {
    selectedPresets.push(key);
} else {
    selectedPresets.splice(index, 1);
}

// Show/hide SharePoint link field for OneNote and Word
const sharepointLinkGroup = document.getElementById('sharepointLinkGroup');
const sharepointHelp = document.getElementById('sharepointHelp');
const hasOneNote = selectedPresets.includes('onenote');
const hasWord = selectedPresets.includes('word');
const hasOneNoteOrWord = hasOneNote || hasWord;

sharepointLinkGroup.style.display = hasOneNoteOrWord ? 'block' : 'none';

// Update experimental warning visibility (created in renderPresets)
const experimentalWarning = document.getElementById('experimentalWarning');
if (experimentalWarning) {
    if (hasOneNoteOrWord) {
        experimentalWarning.style.display = 'block';
        const warningTitle = experimentalWarning.querySelector('strong');
        const warningText = experimentalWarning.querySelector('div');
        const warningLink = experimentalWarning.querySelector('a');
        warningTitle.textContent = t('experimentalWarningTitle');
        
        // Replace "Network Capture" with a link in the warning text
        const text = t('experimentalWarningText');
        const linkText = '<a href="#networkCaptureHelper" style="color:#856404;font-weight:600;text-decoration:underline;">Network Capture</a>';
        warningText.innerHTML = text.replace('Network Capture', linkText);
        
        warningLink.textContent = t('experimentalWarningLink');
    } else {
        experimentalWarning.style.display = 'none';
    }
}

// Show appropriate help text
if (hasOneNote && !hasWord) {
    sharepointHelp.style.display = 'block';
    sharepointHelp.textContent = t('sharepointHelpOneNote');
} else if (hasWord && !hasOneNote) {
    sharepointHelp.style.display = 'block';
    sharepointHelp.textContent = t('sharepointHelpWord');
} else if (hasOneNote && hasWord) {
    sharepointHelp.style.display = 'block';
    sharepointHelp.textContent = t('sharepointHelpOneNote') + '\n\n' + t('sharepointHelpWord');
} else {
    sharepointHelp.style.display = 'none';
}

// No longer enforce "at least one main preset" - allow using only Hilfsmittel
// Users can now select only reference tools (e.g., Duden) with a custom start URL

// Update start URL to first selected main preset (if any)
const firstMainPreset = selectedPresets.find(p => !Object.values(PRESET_GROUPS.allowedTools).flat().includes(p));
if (firstMainPreset && PRESETS[firstMainPreset]) {
    document.getElementById('startUrl').value = PRESETS[firstMainPreset].startUrl;
} else if (selectedPresets.length > 0 && !firstMainPreset) {
    // If only Hilfsmittel selected, use first tool's start URL as suggestion
    const firstTool = selectedPresets[0];
    if (PRESETS[firstTool]) {
        document.getElementById('startUrl').value = PRESETS[firstTool].startUrl;
    }
}

// Update config name
const mainPresetsForName = selectedPresets.filter(p => !Object.values(PRESET_GROUPS.allowedTools).flat().includes(p));
const toolPresetsForName = selectedPresets.filter(p => Object.values(PRESET_GROUPS.allowedTools).flat().includes(p));

if (mainPresetsForName.length === 1) {
    const presetName = t('preset' + mainPresetsForName[0].charAt(0).toUpperCase() + mainPresetsForName[0].slice(1));
    document.getElementById('configName').value = `${presetName.replace(/\s+/g, '_')}_Config`;
} else if (mainPresetsForName.length > 1) {
    document.getElementById('configName').value = `Multi_Service_Config`;
} else if (toolPresetsForName.length === 1) {
    // Only one Hilfsmittel selected
    const presetName = t('preset' + toolPresetsForName[0].charAt(0).toUpperCase() + toolPresetsForName[0].slice(1));
    document.getElementById('configName').value = `${presetName.replace(/\s+/g, '_')}_Config`;
} else if (toolPresetsForName.length > 1) {
    document.getElementById('configName').value = `Reference_Tools_Config`;
} else {
    document.getElementById('configName').value = '';
}

renderPresets();
updatePreview();
}

function selectSecurityLevel(key) {
currentSecurityLevel = key;
renderSecurityLevels();
}

function updateSecurityLevelWarning() {
const container = document.getElementById('securityLevel').parentElement;
let warningDiv = document.getElementById('securityLevelWarning');

// Show warning only for relaxed or strict levels
const showWarning = currentSecurityLevel === 'relaxed' || currentSecurityLevel === 'strict';

if (showWarning) {
    if (!warningDiv) {
        // Create warning element if it doesn't exist
        warningDiv = document.createElement('div');
        warningDiv.id = 'securityLevelWarning';
        warningDiv.classList.add('preset-category-warning');
        
        const warningTitle = document.createElement('strong');
        warningDiv.appendChild(warningTitle);
        
        const warningText = document.createElement('div');
        warningDiv.appendChild(warningText);
        
        container.appendChild(warningDiv);
    }
    
    // Update content
    const warningTitle = warningDiv.querySelector('strong');
    const warningText = warningDiv.querySelector('div');
    warningTitle.textContent = t('securityLevelExperimentalTitle');
    warningText.textContent = t('securityLevelExperimentalText');
    warningDiv.style.display = 'block';
} else if (warningDiv) {
    // Hide warning for balanced level
    warningDiv.style.display = 'none';
}
}

// ============================================================================
// BOOLEAN OPTIONS RENDERING
// ============================================================================
function renderBooleanOptions() {
const container = document.getElementById('booleanOptionsContainer');
if (!container) {
    console.error('❌ Container not found!');
    return;
}

console.log('📦 Container found, clearing content...');
container.innerHTML = '';

// Info box
const infoBox = document.createElement('div');
infoBox.classList.add('preset-info-box');
infoBox.innerHTML = `<strong>ℹ️ ${t('allBooleanOptions')}</strong><br>${t('booleanOptionsInfo')}`;
container.appendChild(infoBox);
console.log('ℹ️ Info box added');

// Render each group
const groupOrder = ['browser', 'security', 'interface', 'system', 'network', 'mobile', 'other'];
console.log('🔍 Processing groups:', groupOrder);

groupOrder.forEach(groupKey => {
    const group = parsedBooleanOptions.groups[groupKey];
    console.log(`  - Group ${groupKey}:`, group);
    if (!group || !group.options || group.options.length === 0) {
        console.log(`  ⚠️ Skipping ${groupKey} (no options)`);
        return;
    }
    console.log(`  ✅ Rendering ${groupKey} with ${group.options.length} options`);
    
    // Group container (collapsible)
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('bool-group-container');
    
    // Group header (clickable)
    const groupHeader = document.createElement('div');
    groupHeader.classList.add('bool-group-header');
    groupHeader.innerHTML = `
        <strong>${t(group.title)}</strong>
        <span>(${group.options.length} ${currentLang === 'de' ? 'Optionen' : 'options'})</span>
    `;
    
    // Options content (initially hidden)
    const groupContent = document.createElement('div');
    groupContent.classList.add('bool-group-content');
    
    // Toggle functionality
    groupHeader.addEventListener('click', () => {
        groupContent.classList.toggle('show');
    });
    
    // Render options in grid
    const optionsGrid = document.createElement('div');
    optionsGrid.classList.add('bool-options-grid');
    
    group.options.forEach(opt => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('bool-option-item');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `bool_${opt.key}`;
        checkbox.checked = parsedBooleanOptions.userSelections[opt.key];
        checkbox.classList.add('bool-option-checkbox');
        checkbox.addEventListener('change', (e) => {
            parsedBooleanOptions.userSelections[opt.key] = e.target.checked;
        });
        
        const label = document.createElement('label');
        label.htmlFor = `bool_${opt.key}`;
        label.classList.add('bool-option-label');
        
        const labelText = document.createElement('div');
        labelText.classList.add('bool-option-label-text');
        labelText.textContent = generateOptionLabel(opt.key);
        
        const keyName = document.createElement('div');
        keyName.classList.add('bool-option-key');
        keyName.textContent = opt.key;
        
        const tooltip = document.createElement('div');
        tooltip.classList.add('bool-option-tooltip');
        
        // Get location from JSON (English labels as in original tool)
        const location = getOptionLocation(opt.key);
        if (location) {
            tooltip.textContent = `📍 ${t('sebConfigToolLocation')}: ${location}`;
            tooltip.title = location;
        } else {
            // Use translated hint texts for undocumented options
            const notDocText = getTranslatedText('notDocumented');
            const notDocHint = getTranslatedText('notDocumentedHint');
            tooltip.textContent = `📍 ${t('sebConfigToolLocation')}: ${notDocText}`;
            tooltip.title = notDocHint;
            tooltip.classList.add('undocumented');
        }
        
        label.appendChild(labelText);
        label.appendChild(keyName);
        label.appendChild(tooltip);
        
        optionDiv.appendChild(checkbox);
        optionDiv.appendChild(label);
        optionsGrid.appendChild(optionDiv);
    });
    
    groupContent.appendChild(optionsGrid);
    groupDiv.appendChild(groupHeader);
    groupDiv.appendChild(groupContent);
    container.appendChild(groupDiv);
});
}

function getSharePointRestrictionInfo() {
// Returns information about SharePoint restrictions for display purposes
// No longer generates URL filter patterns - restrictions are now handled via specific whitelist URLs
const info = [];

['onenote', 'word'].forEach(serviceType => {
    const config = sharepointConfig[serviceType];
    if (!config.parsedLink || !config.parsedLink.isSharePoint) return;
    
    const { parsedLink, restrictions } = config;
    
    // Build the replaced and replacement URLs for display
    let genericUrl = `*.sharepoint.com`;
    let specificUrl = `https://${parsedLink.domain}`;
    let restrictionLevel = '';
    let restrictionName = '';
    
    // Determine the most specific restriction level
    if (serviceType === 'onenote') {
        if (restrictions.page && parsedLink.pageId && parsedLink.pageName) {
            specificUrl += `/.../*wd=*${parsedLink.pageId}*`;
            restrictionLevel = currentLang === 'de' ? 'Seite' : 'Page';
            restrictionName = parsedLink.pageName;
        } else if (restrictions.section && parsedLink.sectionId && parsedLink.section) {
            specificUrl += `/.../*${parsedLink.sectionId}*`;
            restrictionLevel = currentLang === 'de' ? 'Abschnitt' : 'Section';
            restrictionName = parsedLink.section;
        } else if (restrictions.notebook && parsedLink.notebook) {
            specificUrl += `/SiteAssets/${parsedLink.notebook}/*`;
            restrictionLevel = currentLang === 'de' ? 'Notizbuch' : 'Notebook';
            restrictionName = parsedLink.notebook;
        } else if (restrictions.teamsSite && parsedLink.teamsSite) {
            specificUrl += `/sites/${parsedLink.teamsSite}/*`;
            restrictionLevel = currentLang === 'de' ? 'Teams-Site' : 'Teams Site';
            restrictionName = parsedLink.teamsSite;
        } else if (restrictions.schoolSharepoint) {
            specificUrl += '/*';
            restrictionLevel = currentLang === 'de' ? 'Schul-SharePoint' : 'School SharePoint';
            restrictionName = parsedLink.domain;
        }
    } else if (serviceType === 'word') {
        if (restrictions.file && parsedLink.fileId && parsedLink.fileName) {
            specificUrl += `/.../*sourcedoc={${parsedLink.fileId}}*`;
            restrictionLevel = currentLang === 'de' ? 'Datei' : 'File';
            restrictionName = parsedLink.fileName;
        } else if (restrictions.folder && parsedLink.folder) {
            specificUrl += `/${parsedLink.folder}/*`;
            restrictionLevel = currentLang === 'de' ? 'Ordner' : 'Folder';
            restrictionName = parsedLink.folder;
        } else if (restrictions.teamsSite && parsedLink.teamsSite) {
            specificUrl += `/sites/${parsedLink.teamsSite}/*`;
            restrictionLevel = currentLang === 'de' ? 'Teams-Site' : 'Teams Site';
            restrictionName = parsedLink.teamsSite;
        } else if (restrictions.schoolSharepoint) {
            specificUrl += '/*';
            restrictionLevel = currentLang === 'de' ? 'Schul-SharePoint' : 'School SharePoint';
            restrictionName = parsedLink.domain;
        }
    }
    
    if (restrictionLevel) {
        info.push({
            genericUrl,
            specificUrl,
            restrictionLevel,
            restrictionName,
            serviceType
        });
    }
});

return info;
}

// Legacy function name for backwards compatibility - now returns restriction info
function getSharePointUrlPatterns() {
const patterns = [];

// Check both OneNote and Word configurations
['onenote', 'word'].forEach(serviceType => {
    const config = sharepointConfig[serviceType];
    if (!config.parsedLink || !config.parsedLink.isSharePoint) return;
    
    const { parsedLink, restrictions } = config;
    
    // Build URL patterns based on enabled restrictions
    if (restrictions.schoolSharepoint && parsedLink.domain) {
        // Restrict to specific SharePoint domain
        patterns.push({
            expression: `*${parsedLink.domain}*`,
            active: true,
            action: 1, // Allow
            label: currentLang === 'de' ? 'Schul-SharePoint' : 'School SharePoint',
            name: parsedLink.domain || null
        });
    }
    
    if (restrictions.teamsSite && parsedLink.teamsSite) {
        // Restrict to specific Teams site
        patterns.push({
            expression: `*/sites/${parsedLink.teamsSite}/*`,
            active: true,
            action: 1, // Allow
            label: currentLang === 'de' ? 'Teams-Site' : 'Teams Site',
            name: parsedLink.teamsSite || null
        });
    }
    
    if (serviceType === 'onenote') {
        // IMPORTANT: SEB opens OneNote pages via the web URL (_layouts/Doc.aspx?...),
        // NOT via the onenote: protocol URL. Therefore, we must use GUIDs from the
        // web link's wd=target(...) parameter, which contains:
        // - Section GUID (937FFC30-10F8-7546-9E1D-BECCA08633E1)
        // - Page GUID (F07BB273-C7EF-1548-9CFF-A866F644BE47)
        
        // Notebook restriction: Use notebook name in URL path
        // The notebook name appears in the path as /SiteAssets/{NotebookName}/
        if (restrictions.notebook && parsedLink.notebook) {
            patterns.push({
                expression: `*/SiteAssets/${encodeURIComponent(parsedLink.notebook)}/*`,
                active: true,
                action: 1,
                label: currentLang === 'de' ? 'Notizbuch' : 'Notebook',
                name: parsedLink.notebook || null
            });
        }
        
        if (restrictions.section && parsedLink.sectionId) {
            // Match section GUID in wd=target(...) parameter
            patterns.push({
                expression: `*${parsedLink.sectionId}*`,
                active: true,
                action: 1,
                label: currentLang === 'de' ? 'Abschnitt' : 'Section',
                name: parsedLink.section || null
            });
        }
        
        if (restrictions.page && parsedLink.pageId) {
            // Match page GUID in wd=target(...) parameter
            patterns.push({
                expression: `*${parsedLink.pageId}*`,
                active: true,
                action: 1,
                label: currentLang === 'de' ? 'Seite' : 'Page',
                name: parsedLink.pageName || null
            });
        }
    }
    
    if (serviceType === 'word') {
        if (restrictions.folder && parsedLink.folder) {
            patterns.push({
                expression: `*/${encodeURIComponent(parsedLink.folder)}/*`,
                active: true,
                action: 1,
                label: currentLang === 'de' ? 'Ordner' : 'Folder',
                name: parsedLink.folder || null
            });
        }
        
        if (restrictions.file && parsedLink.fileId) {
            patterns.push({
                expression: `*sourcedoc={${parsedLink.fileId}}*`,
                active: true,
                action: 1,
                label: currentLang === 'de' ? 'Datei' : 'File',
                name: parsedLink.fileName || null
            });
        }
    }
});

return patterns;
}

function getAllDomains() {
const MAX_CUSTOM_DOMAINS = 500;  // Limit custom domains to prevent performance issues

// Combine domains from all selected presets
const presetDomains = [];
selectedPresets.forEach(presetKey => {
    if (PRESETS[presetKey]) {
        presetDomains.push(...PRESETS[presetKey].domains);
    }
});

const customDomains = document.getElementById('customDomains').value
    .split('\n')
    .slice(0, MAX_CUSTOM_DOMAINS)  // Limit number of lines
    .map(d => d.trim())
    .filter(d => d && !d.startsWith('#'));

// Check SharePoint restrictions and determine the most restrictive level
let sharepointRestrictionLevel = 0; // 0=none, 1=school, 2=site, 3=notebook/folder, 4=page/file
let specificSharePointDomain = null;

['onenote', 'word'].forEach(serviceType => {
    const config = sharepointConfig[serviceType];
    if (config.parsedLink && config.parsedLink.isSharePoint && config.parsedLink.domain) {
        const r = config.restrictions;
        
        // Determine restriction level (most specific wins)
        // Any restriction implies schoolSharepoint is active
        if (r.page || r.file) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 4);
            specificSharePointDomain = config.parsedLink.domain;
        } else if (r.section || r.notebook || r.folder) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 3);
            specificSharePointDomain = config.parsedLink.domain;
        } else if (r.teamsSite) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 2);
            specificSharePointDomain = config.parsedLink.domain;
        } else if (r.schoolSharepoint) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 1);
            specificSharePointDomain = config.parsedLink.domain;
        }
    }
});

// Apply domain filtering based on restriction level
let filteredPresetDomains = presetDomains;

if (sharepointRestrictionLevel >= 1) {
    // Level 1+: Remove SharePoint-related wildcards that would bypass restrictions
    // NOTE: *.sharepointonline.com is removed here - needs integration testing to verify
    // it's not required for 2FA/login. If login issues occur, may need to keep this wildcard.
    const sharePointWildcardsToRemove = [
        '*.sharepoint.com',
        '*.sharepointonline.com'  // TODO: Verify not needed for 2FA during integration tests
    ];
    
    filteredPresetDomains = filteredPresetDomains.filter(d => 
        !sharePointWildcardsToRemove.includes(d.toLowerCase())
    );
    
    if (sharepointRestrictionLevel >= 2) {
        // Level 2+: Also remove any tenant-specific wildcards (e.g., *.kshch0.sharepoint.com)
        filteredPresetDomains = filteredPresetDomains.filter(d => {
            const lowerD = d.toLowerCase();
            // Remove anything that starts with *. and contains sharepoint
            return !(lowerD.startsWith('*.') && (lowerD.includes('.sharepoint.com') || lowerD.includes('.sharepointonline.com')));
        });
    }
    
    // Add back specific SharePoint URLs based on restriction level
    // The more specific the restriction, the more specific the URL
    if (sharepointRestrictionLevel >= 1) {
        ['onenote', 'word'].forEach(serviceType => {
            const config = sharepointConfig[serviceType];
            if (!config.parsedLink || !config.parsedLink.isSharePoint) return;
            
            const { parsedLink, restrictions } = config;
            
            // Build the specific URL based on the most restrictive level
            let specificUrl = `https://${parsedLink.domain}`;
            
            // Add Teams site if available
            if (parsedLink.teamsSite && (restrictions.teamsSite || restrictions.notebook || restrictions.section || restrictions.page || restrictions.folder || restrictions.file)) {
                specificUrl += `/sites/${parsedLink.teamsSite}`;
            }
            
            if (serviceType === 'onenote') {
                if (restrictions.page && parsedLink.pageId) {
                    // Most specific: Page level - use full _layouts URL with page ID
                    // This allows only this specific page
                    specificUrl += `/*wd=*${parsedLink.pageId}*`;
                } else if (restrictions.section && parsedLink.sectionId) {
                    // Section level - use section ID in URL
                    specificUrl += `/*${parsedLink.sectionId}*`;
                } else if (restrictions.notebook && parsedLink.notebook) {
                    // Notebook level - use SiteAssets path
                    specificUrl += `/SiteAssets/${encodeURIComponent(parsedLink.notebook)}/*`;
                } else {
                    // School or Teams site level only
                    specificUrl += '/*';
                }
            } else if (serviceType === 'word') {
                if (restrictions.file && parsedLink.fileId) {
                    // File level - use sourcedoc parameter
                    specificUrl += `/*sourcedoc={${parsedLink.fileId}}*`;
                } else if (restrictions.folder && parsedLink.folder) {
                    // Folder level
                    specificUrl += `/${encodeURIComponent(parsedLink.folder)}/*`;
                } else {
                    // School or Teams site level only
                    specificUrl += '/*';
                }
            }
            
            filteredPresetDomains.push(specificUrl);
        });
    }
}

// Combine and remove duplicates (case-insensitive)
const allDomains = [...filteredPresetDomains, ...customDomains];
const uniqueDomains = [];
const seen = new Set();

allDomains.forEach(domain => {
    const lowerDomain = domain.toLowerCase();
    if (!seen.has(lowerDomain)) {
        seen.add(lowerDomain);
        uniqueDomains.push(domain);
    }
});

return uniqueDomains;
}

function updatePreview() {
const presetDomains = [];
selectedPresets.forEach(presetKey => {
    if (PRESETS[presetKey]) {
        presetDomains.push(...PRESETS[presetKey].domains);
    }
});

const customDomains = document.getElementById('customDomains').value
    .split('\n')
    .map(d => d.trim())
    .filter(d => d && !d.startsWith('#'));

const allDomainsBeforeDedup = [...presetDomains, ...customDomains];
const domains = getAllDomains();
const duplicatesRemoved = allDomainsBeforeDedup.length - domains.length;

const container = document.getElementById('domainPreview');
document.getElementById('domainCount').textContent = domains.length;

// Clear container safely
container.innerHTML = '';

// Show warning if duplicates were removed (add first)
if (duplicatesRemoved > 0) {
    const warningDiv = document.createElement('div');
    warningDiv.classList.add('preview-warning');
    const warningText = currentLang === 'de' 
        ? `⚠️ ${duplicatesRemoved} doppelte Domain(s) wurden entfernt`
        : `⚠️ ${duplicatesRemoved} duplicate domain(s) removed`;
    warningDiv.textContent = warningText;
    container.appendChild(warningDiv);
}

// Show SharePoint restriction info if active
let sharepointRestrictionLevel = 0;
let specificSharePointDomain = null;
let restrictionLabels = [];

['onenote', 'word'].forEach(serviceType => {
    const config = sharepointConfig[serviceType];
    if (config.parsedLink && config.parsedLink.isSharePoint && config.parsedLink.domain) {
        const r = config.restrictions;
        
        // Determine level first
        if (r.page || r.file) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 4);
        } else if (r.section || r.notebook || r.folder) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 3);
        } else if (r.teamsSite) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 2);
        } else if (r.schoolSharepoint) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 1);
        }
        
        // Build hierarchical label list (all parent levels are implicitly active)
        if (sharepointRestrictionLevel >= 1) {
            specificSharePointDomain = config.parsedLink.domain;
            restrictionLabels.push(currentLang === 'de' ? 'Schul-SharePoint' : 'School SharePoint');
        }
        if (sharepointRestrictionLevel >= 2 && r.teamsSite) {
            restrictionLabels.push(currentLang === 'de' ? 'Teams-Site' : 'Teams Site');
        }
        if (sharepointRestrictionLevel >= 3) {
            if (r.notebook) {
                restrictionLabels.push(currentLang === 'de' ? 'Notizbuch' : 'Notebook');
            }
            if (r.section) {
                restrictionLabels.push(currentLang === 'de' ? 'Abschnitt' : 'Section');
            }
            if (r.folder) {
                restrictionLabels.push(currentLang === 'de' ? 'Ordner' : 'Folder');
            }
        }
        if (sharepointRestrictionLevel >= 4) {
            if (r.page) {
                restrictionLabels.push(currentLang === 'de' ? 'Seite' : 'Page');
            }
            if (r.file) {
                restrictionLabels.push(currentLang === 'de' ? 'Datei' : 'File');
            }
        }
    }
});

if (sharepointRestrictionLevel > 0 && restrictionLabels.length > 0) {
    const spInfoDiv = document.createElement('div');
    spInfoDiv.classList.add('preview-sp-info');
    
    let spInfoText = '';
    if (sharepointRestrictionLevel === 1) {
        spInfoText = currentLang === 'de'
            ? `🔒 SharePoint: *.sharepoint.com → ${specificSharePointDomain}`
            : `🔒 SharePoint: *.sharepoint.com → ${specificSharePointDomain}`;
    } else if (sharepointRestrictionLevel >= 2) {
        const restrictionText = restrictionLabels.join(' → ');
        spInfoText = currentLang === 'de'
            ? `🔒 Einschränkungen: ${restrictionText} (Wildcards entfernt)`
            : `🔒 Restrictions: ${restrictionText} (wildcards removed)`;
    }
    
    spInfoDiv.textContent = spInfoText;
    container.appendChild(spInfoDiv);
}

// Show selected services/tools info
if (selectedPresets.length > 0) {
    const serviceNames = selectedPresets.map(key => 
        t('preset' + key.charAt(0).toUpperCase() + key.slice(1))
    ).join(', ');
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('preview-info-success');
    const infoText = currentLang === 'de'
        ? `✓ Ausgewählt: ${serviceNames}`
        : `✓ Selected: ${serviceNames}`;
    infoDiv.textContent = infoText;
    container.appendChild(infoDiv);
} else if (customDomains.length > 0) {
    // Show info when only custom domains are used
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('preview-info');
    const infoText = currentLang === 'de'
        ? `ℹ️ Nur benutzerdefinierte Domains`
        : `ℹ️ Custom domains only`;
    infoDiv.textContent = infoText;
    container.appendChild(infoDiv);
}

// Add allowed domains (XSS-safe with textContent)
domains.forEach(domain => {
    const div = document.createElement('div');
    div.className = 'domain-item';
    div.textContent = `✓ ${domain}`;
    container.appendChild(div);
});

// Show SharePoint restriction info box if active
const restrictionInfo = getSharePointRestrictionInfo();

if (restrictionInfo.length > 0) {
    const restrictionSectionDiv = document.createElement('div');
    restrictionSectionDiv.classList.add('preview-restriction-section');
    
    const restrictionTitleStrong = document.createElement('strong');
    restrictionTitleStrong.classList.add('preview-restriction-title');
    const restrictionTitle = currentLang === 'de' 
        ? '🔗 SharePoint-Einschränkungen (Spezifisch ersetzt Generisch)'
        : '🔗 SharePoint Restrictions (Specific Replaces Generic)';
    restrictionTitleStrong.textContent = restrictionTitle;
    restrictionSectionDiv.appendChild(restrictionTitleStrong);
    
    const restrictionExplain = document.createElement('div');
    restrictionExplain.classList.add('preview-restriction-explain');
    const explainText = currentLang === 'de'
        ? 'Generische Wildcards werden durch spezifische URLs ersetzt. Andere Domains (Login, 2FA etc.) bleiben unberührt:'
        : 'Generic wildcards are replaced by specific URLs. Other domains (login, 2FA etc.) remain unaffected:';
    restrictionExplain.textContent = explainText;
    restrictionSectionDiv.appendChild(restrictionExplain);
    
    // Display each restriction replacement
    restrictionInfo.forEach(info => {
        const replacementDiv = document.createElement('div');
        replacementDiv.classList.add('preview-replacement-item');
        
        // Show restriction level and name
        const levelDiv = document.createElement('div');
        levelDiv.classList.add('preview-replacement-level');
        levelDiv.textContent = `${info.restrictionLevel}: ${info.restrictionName}`;
        replacementDiv.appendChild(levelDiv);
        
        // Show generic URL (crossed out)
        const genericDiv = document.createElement('div');
        genericDiv.classList.add('preview-replacement-generic');
        genericDiv.textContent = `❌ ${info.genericUrl}`;
        replacementDiv.appendChild(genericDiv);
        
        // Show arrow
        const arrowDiv = document.createElement('div');
        arrowDiv.classList.add('preview-replacement-arrow');
        arrowDiv.textContent = '⬇️';
        replacementDiv.appendChild(arrowDiv);
        
        // Show specific URL (highlighted)
        const specificDiv = document.createElement('div');
        specificDiv.classList.add('preview-replacement-specific');
        specificDiv.textContent = `✅ ${info.specificUrl}`;
        replacementDiv.appendChild(specificDiv);
        
        restrictionSectionDiv.appendChild(replacementDiv);
    });
    
    container.appendChild(restrictionSectionDiv);
}

// Show blocked domains if any
const blockedDomains = [];
selectedPresets.forEach(presetKey => {
    const preset = PRESETS[presetKey];
    if (preset && preset.blockedDomains) {
        blockedDomains.push(...preset.blockedDomains);
    }
});

// Add custom blocked domains from user input
const MAX_BLOCKED_DOMAINS = 500;  // Limit blocked domains to prevent performance issues
const customBlockedInput = document.getElementById('blockedDomains').value;
if (customBlockedInput.trim()) {
    const customBlockedDomains = customBlockedInput
        .split('\n')
        .slice(0, MAX_BLOCKED_DOMAINS)  // Limit number of lines
        .map(domain => domain.trim())
        .filter(domain => domain && !domain.startsWith('#'));
    blockedDomains.push(...customBlockedDomains);
}

if (blockedDomains.length > 0) {
    const blockedTitleDiv = document.createElement('div');
    blockedTitleDiv.classList.add('preview-blocked-title');
    const blockedTitleStrong = document.createElement('strong');
    const blockedTitle = currentLang === 'de' 
        ? '🚫 Blockierte Domains (explizit gesperrt)'
        : '🚫 Blocked Domains (explicitly denied)';
    blockedTitleStrong.textContent = blockedTitle;
    blockedTitleDiv.appendChild(blockedTitleStrong);
    container.appendChild(blockedTitleDiv);
    
    // Add blocked domains (XSS-safe with textContent)
    blockedDomains.forEach(domain => {
        const div = document.createElement('div');
        div.className = 'domain-item blocked';
        div.textContent = `✗ ${domain}`;
        container.appendChild(div);
    });
}
}

// ============================================================================
// CONFIG GENERATION - XML (PLIST)
// ============================================================================
function generateConfigXML() {
const securitySettings = SECURITY_LEVELS[currentSecurityLevel].settings;
const domains = getAllDomains();
const startUrlInput = document.getElementById('startUrl').value;

// Validate start URL
if (!isValidURL(startUrlInput)) {
    const errorMsg = currentLang === 'de'
        ? 'Ungültige Start-URL. Bitte geben Sie eine gültige http:// oder https:// URL ein.'
        : 'Invalid start URL. Please enter a valid http:// or https:// URL.';
    alert(errorMsg);
    return null;
}

const startUrl = startUrlInput;

// Build URL filter rules XML (whitelist - action: 1)
let urlFilterRulesXML = '';
domains.forEach(domain => {
    urlFilterRulesXML += `\t\t<dict>
\t\t\t<key>action</key>
\t\t\t<integer>1</integer>
\t\t\t<key>active</key>
\t\t\t<true/>
\t\t\t<key>expression</key>
\t\t\t<string>${escapeXML(domain)}</string>
\t\t\t<key>regex</key>
\t\t\t<false/>
\t\t</dict>
`;
});

// NOTE: SharePoint restrictions are now handled via specific URLs in the whitelist above
// No separate URL filter patterns needed - this prevents conflicts with login/2FA domains

// Add blocked domains (blacklist - action: 0) from selected presets
selectedPresets.forEach(presetKey => {
    const preset = PRESETS[presetKey];
    if (preset && preset.blockedDomains) {
        preset.blockedDomains.forEach(domain => {
            urlFilterRulesXML += `\t\t<dict>
\t\t\t<key>action</key>
\t\t\t<integer>0</integer>
\t\t\t<key>active</key>
\t\t\t<true/>
\t\t\t<key>expression</key>
\t\t\t<string>${escapeXML(domain)}</string>
\t\t\t<key>regex</key>
\t\t\t<false/>
\t\t</dict>
`;
        });
    }
});

// Add custom blocked domains (blacklist - action: 0) from user input
const customBlockedInput = document.getElementById('blockedDomains').value;
if (customBlockedInput.trim()) {
    const MAX_BLOCKED_DOMAINS = 500;  // Limit blocked domains to prevent performance issues
    const customBlockedDomains = customBlockedInput
        .split('\n')
        .slice(0, MAX_BLOCKED_DOMAINS)  // Limit number of lines
        .map(domain => domain.trim())
        .filter(domain => domain && !domain.startsWith('#'));
    
    customBlockedDomains.forEach(domain => {
        urlFilterRulesXML += `\t\t<dict>
\t\t\t<key>action</key>
\t\t\t<integer>0</integer>
\t\t\t<key>active</key>
\t\t\t<true/>
\t\t\t<key>expression</key>
\t\t\t<string>${escapeXML(domain)}</string>
\t\t\t<key>regex</key>
\t\t\t<false/>
\t\t</dict>
`;
    });
}

// Generate complete plist XML with version info
const buildDateFormatted = formatBuildDate('en'); // Use international format for file
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<!-- Generated by SEB Config Generator ${APP_VERSION} (Build: ${buildDateFormatted}) -->
<!-- https://github.com/markuskiller/SEBConfigGenerator -->
<plist version="1.0">
<dict>
\t<key>URLFilterEnable</key>
\t<${urlFilterRulesXML.length > 0 ? 'true' : 'false'}/>
\t<key>URLFilterEnableContentFilter</key>
\t<false/>
\t<key>URLFilterRules</key>
\t<array>
${urlFilterRulesXML}\t</array>
\t<key>allowAudioCapture</key>
\t<false/>
\t<key>allowBrowsingBackForward</key>
\t<${document.getElementById('allowBackForward').checked ? 'true' : 'false'}/>
\t<key>allowDictionaryLookup</key>
\t<false/>
\t<key>allowDownUploads</key>
\t<${document.getElementById('allowDownloads').checked ? 'true' : 'false'}/>
\t<key>allowDownloads</key>
\t<${document.getElementById('allowDownloads').checked ? 'true' : 'false'}/>
\t<key>allowFlashFullscreen</key>
\t<false/>
\t<key>allowPreferencesWindow</key>
\t<false/>
\t<key>allowQuit</key>
\t<${securitySettings.allowQuit ? 'true' : 'false'}/>
\t<key>allowSpellCheck</key>
\t<${document.getElementById('allowSpellCheck').checked ? 'true' : 'false'}/>
\t<key>allowSwitchToApplications</key>
\t<${securitySettings.allowSwitchToApplications ? 'true' : 'false'}/>
\t<key>allowVideoCapture</key>
\t<false/>
\t<key>browserViewMode</key>
\t<integer>${securitySettings.browserViewMode}</integer>
\t<key>browserWindowAllowReload</key>
\t<${document.getElementById('showReloadButton').checked ? 'true' : 'false'}/>
\t<key>enableBrowserWindowToolbar</key>
\t<${securitySettings.enableBrowserWindowToolbar ? 'true' : 'false'}/>
\t<key>enablePlugIns</key>
\t<true/>
\t<key>enableSebBrowser</key>
\t<true/>
\t<key>enableZoomPage</key>
\t<true/>
\t<key>enableZoomText</key>
\t<true/>
\t<key>examSessionClearCookiesOnEnd</key>
\t<true/>
\t<key>examSessionClearCookiesOnStart</key>
\t<true/>
\t<key>newBrowserWindowAllowReload</key>
\t<${document.getElementById('showReloadButton').checked ? 'true' : 'false'}/>
\t<key>originatorVersion</key>
\t<string>SEB_Config_Generator_${APP_VERSION}_${buildDateFormatted.replace(/[/:]/g, '-').replace(/ /g, '_')}</string>
\t<key>removeBrowserProfile</key>
\t<false/>
\t<key>showMenuBar</key>
\t<${securitySettings.showMenuBar ? 'true' : 'false'}/>
\t<key>showReloadButton</key>
\t<${document.getElementById('showReloadButton').checked ? 'true' : 'false'}/>
\t<key>startURL</key>
\t<string>${escapeXML(startUrl)}</string>
\t<key>touchOptimized</key>
\t<false/>`;

// Add all boolean options from parsed XML (dynamically loaded)
// This includes ALL true/false options that were parsed from the template
let booleanOptionsXML = '';
if (parsedBooleanOptions.options && Object.keys(parsedBooleanOptions.options).length > 0) {
    // Sort keys alphabetically for consistent output
    const sortedKeys = Object.keys(parsedBooleanOptions.userSelections).sort();
    sortedKeys.forEach(key => {
        const value = parsedBooleanOptions.userSelections[key];
        booleanOptionsXML += `\n\t<key>${escapeXML(key)}</key>\n\t<${value ? 'true' : 'false'}/>`;
    });
}

const finalXML = xml + booleanOptionsXML + `
</dict>
</plist>`;

return finalXML;
}

function escapeXML(str) {
return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function sanitizeFilename(filename) {
// Remove potentially dangerous characters, allow only safe ones
// Uses Unicode property escapes to support all language characters (French, German, Italian, Spanish, etc.)
return filename
    .replace(/[^\p{L}\p{N}_\-]/gu, '_')  // Allow Unicode letters, numbers, underscore, dash
    .replace(/_{2,}/g, '_')  // Replace multiple underscores with single one
    .replace(/^_+|_+$/g, '')  // Remove leading/trailing underscores
    .substring(0, 100)  // Limit length to 100 characters
    || 'SEB_Config';  // Fallback if empty after sanitization
}

function isValidURL(url) {
// Validate URL format and protocol
if (!url || !url.trim()) {
    return false;
}
try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(parsed.protocol);
} catch {
    return false;
}
}

function downloadConfig() {
const configXML = generateConfigXML();

// Check if validation failed
if (!configXML) {
    return;
}

const rawConfigName = document.getElementById('configName').value || 'SEB_Config';
const configName = sanitizeFilename(rawConfigName);
const blob = new Blob([configXML], { type: 'application/xml' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `${configName}.seb`;
a.click();
URL.revokeObjectURL(url);
}

function copyDomains() {
const domains = getAllDomains().join('\n');
navigator.clipboard.writeText(domains).then(() => {
    const btn = document.getElementById('copyBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = t('copiedMsg');
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 2000);
});
}

// ============================================================================
// BROWSER HELPER FUNCTIONALITY
// ============================================================================
function showBrowserHelper() {
// Get current preset domains for filtering
const presetDomains = [];
selectedPresets.forEach(presetKey => {
    if (PRESETS[presetKey]) {
        presetDomains.push(...PRESETS[presetKey].domains);
    }
});
const presetDomainsJSON = JSON.stringify([...new Set(presetDomains)]);

const script = `// SEB Domain Capture Script - Run AFTER fully logging in and using the service
(function() {
console.clear();
console.log('%c🛡️ SEB Domain Capture', 'font-size:20px; color:#5e72e4; font-weight:bold;');
console.log('%c' + '='.repeat(60), 'color:#ccc;');

// Preset domains from current configuration
const presetDomains = ${presetDomainsJSON};
const presetSet = new Set(presetDomains.map(d => d.toLowerCase()));

const allDomains = new Set();

// Capture all network requests
performance.getEntries().forEach(entry => {
    try {
        const url = new URL(entry.name);
        if (url.hostname && !url.hostname.match(/^(localhost|127\\\\.0\\\\.0\\\\.1|::1)$/)) {
            allDomains.add(url.hostname.toLowerCase());
        }
    } catch (e) {}
});

// Filter out domains already in preset
const newDomains = [...allDomains].filter(domain => {
    // Check exact match
    if (presetSet.has(domain)) return false;
    
    // Check if domain matches any preset wildcard
    for (let preset of presetDomains) {
        if (preset.startsWith('*.')) {
            const suffix = preset.substring(1); // Remove *
            if (domain.endsWith(suffix) || domain === suffix.substring(1)) {
                return false;
            }
        }
    }
    return true;
}).sort();

console.log(\`\\n📊 Total captured: \${allDomains.size} domains\`);
console.log(\`✓ Already in preset: \${allDomains.size - newDomains.length} domains\`);
console.log(\`🆕 New domains found: \${newDomains.length} domains\\n\`);

if (newDomains.length === 0) {
    console.log('%c✅ NO NEW DOMAINS NEEDED!', 'color:#2dce89; font-size:18px; font-weight:bold;');
    console.log('%cAll captured domains are already in the preset.', 'color:#666;');
    console.log('\\n' + '='.repeat(60) + '\\n');
    return;
}

// Generate wildcards for new domains only
const wildcards = new Set();
newDomains.forEach(domain => {
    const parts = domain.split('.');
    if (parts.length > 2) {
        wildcards.add('*.' + parts.slice(-2).join('.'));
    } else {
        wildcards.add(domain);
    }
});

const output = [...wildcards].sort().join('\\n');

console.log('='.repeat(60));
console.log('%c📋 COPY THESE NEW DOMAINS:', 'color:#f5365c; font-size:16px; font-weight:bold;');
console.log('='.repeat(60) + '\\n');
console.log(output);
console.log('\\n' + '='.repeat(60));

console.log('\\n%c📝 HOW TO USE:', 'color:#5e72e4; font-weight:bold;');
console.log('  1. Select the domain list above (click & drag)');
console.log('  2. Right-click → Copy (or Ctrl+C / Cmd+C)');
console.log('  3. Paste into "Custom Domains" field in SEB Generator');
console.log('\\n' + '='.repeat(60) + '\\n');
})();`;

const bookmarklet = `javascript:(function(){const domains=new Set();performance.getEntries().forEach(e=>{try{const u=new URL(e.name);if(u.hostname&&!u.hostname.match(/^(localhost|127\\\\.0\\\\.0\\\\.1|::1)$/)){domains.add(u.hostname)}}catch(err){}});const sorted=[...domains].sort();let output='SEB Domain Capture\\n'+'='.repeat(50)+'\\n\\n';output+='Total domains: '+sorted.length+'\\n\\n';output+='DOMAINS:\\n'+'-'.repeat(50)+'\\n';output+=sorted.join('\\n')+'\\n';output+='-'.repeat(50)+'\\n\\n';output+='Wildcards (recommended):\\n'+'-'.repeat(50)+'\\n';const wildcards=new Set();sorted.forEach(d=>{const parts=d.split('.');if(parts.length>2){wildcards.add('*.'+parts.slice(-2).join('.'))}else{wildcards.add(d)}});output+=[...wildcards].sort().join('\\n');const modal=document.createElement('div');modal.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:30px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.3);z-index:999999;max-width:600px;max-height:80vh;overflow:auto;font-family:monospace;';const pre=document.createElement('pre');pre.textContent=output;pre.style.cssText='background:#f5f5f5;padding:15px;border-radius:6px;overflow:auto;max-height:400px;font-size:12px;';const btnContainer=document.createElement('div');btnContainer.style.cssText='margin-top:20px;display:flex;gap:10px;';const copyBtn=document.createElement('button');copyBtn.textContent='📋 Copy';copyBtn.style.cssText='padding:12px 20px;background:#5e72e4;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;flex:1;';copyBtn.onclick=()=>{navigator.clipboard.writeText(sorted.join('\\n')).then(()=>{copyBtn.textContent='✓ Copied!';setTimeout(()=>copyBtn.textContent='📋 Copy',2000)})};const closeBtn=document.createElement('button');closeBtn.textContent='✕';closeBtn.style.cssText='padding:12px 20px;background:#e9ecef;color:#32325d;border:none;border-radius:6px;cursor:pointer;font-weight:600;';closeBtn.onclick=()=>modal.remove();btnContainer.appendChild(copyBtn);btnContainer.appendChild(closeBtn);modal.appendChild(pre);modal.appendChild(btnContainer);document.body.appendChild(modal)})();`;

const instructions = currentLang === 'de' 
    ? {
        title: '🌐 Browser-basierte Domain-Erfassung',
        method1: 'Methode 1: Console Script (Empfohlen)',
        method1Steps: [
            '⚠️ WICHTIG: Zuerst Browser-Cache leeren (Strg+Shift+Entf / Cmd+Shift+Entf)',
            '1. Öffnen Sie den Dienst (z.B. OneNote) in einem neuen Tab',
            '2. Nutzen Sie den Dienst vollständig (einloggen, arbeiten)',
            '3. Drücken Sie F12 um DevTools zu öffnen',
            '4. Gehen Sie zum Tab "Konsole"',
            '5. Kopieren Sie das Skript unten und fügen Sie es ein',
            '6. Drücken Sie Enter',
            '7. Zeigt nur NEUE Domains (nicht bereits in Preset)',
            '8. Wählen Sie die Domains aus und kopieren Sie sie manuell',
            '9. Fügen Sie sie ins Feld "Benutzerdefinierte Domains" ein'
        ],
        method2: 'Methode 2: Bookmarklet',
        method2Steps: [
            '1. Erstellen Sie ein neues Lesezeichen',
            '2. Kopieren Sie den Bookmarklet-Code unten',
            '3. Fügen Sie ihn als URL des Lesezeichens ein',
            '4. Öffnen Sie Ihren Dienst und klicken Sie das Lesezeichen',
            '5. Ein Dialog zeigt alle Domains'
        ],
        consoleLabel: 'Console Script:',
        bookmarkletLabel: 'Bookmarklet Code:',
        copyScript: '📋 Script kopieren',
        copyBookmarklet: '📋 Bookmarklet kopieren',
        fullGuide: '📖 Vollständige Anleitung',
        close: 'Schließen'
    }
    : {
        title: '🌐 Browser-Based Domain Capture',
        method1: 'Method 1: Console Script (Recommended)',
        method1Steps: [
            '⚠️ IMPORTANT: First clear browser cache (Ctrl+Shift+Delete / Cmd+Shift+Delete)',
            '1. Open your service (e.g., OneNote) in a new tab',
            '2. Use the service fully (login, work normally)',
            '3. Press F12 to open DevTools',
            '4. Go to the "Console" tab',
            '5. Copy the script below and paste it',
            '6. Press Enter',
            '7. Shows only NEW domains (not already in preset)',
            '8. Select the domains and copy them manually',
            '9. Paste them into the "Custom Domains" field'
        ],
        method2: 'Method 2: Bookmarklet',
        method2Steps: [
            '1. Create a new bookmark',
            '2. Copy the bookmarklet code below',
            '3. Paste it as the bookmark URL',
            '4. Open your service and click the bookmark',
            '5. A dialog will show all domains'
        ],
        consoleLabel: 'Console Script:',
        bookmarkletLabel: 'Bookmarklet Code:',
        copyScript: '📋 Copy Script',
        copyBookmarklet: '📋 Copy Bookmarklet',
        fullGuide: '📖 Full Guide',
        close: 'Close'
    };

const modal = document.createElement('div');
modal.classList.add('browser-helper-modal');

const content = document.createElement('div');
content.classList.add('browser-helper-content');

content.innerHTML = `
    <h2 class="browser-helper-title">${instructions.title}</h2>
    
    <div class="browser-helper-method">
        <h3>${instructions.method1}</h3>
        ${instructions.method1Steps.map(step => `<div class="browser-helper-step">${step}</div>`).join('')}
        
        <div class="browser-helper-input-group">
            <label class="browser-helper-label">${instructions.consoleLabel}</label>
            <textarea readonly class="browser-helper-textarea">${script}</textarea>
            <button id="copyScriptBtn" class="browser-helper-copy-btn">${instructions.copyScript}</button>
        </div>
    </div>
    
    <div class="browser-helper-method secondary">
        <h3>${instructions.method2}</h3>
        ${instructions.method2Steps.map(step => `<div class="browser-helper-step">${step}</div>`).join('')}
        
        <div class="browser-helper-input-group">
            <label class="browser-helper-label">${instructions.bookmarkletLabel}</label>
            <textarea readonly class="browser-helper-textarea bookmarklet">${bookmarklet}</textarea>
            <button id="copyBookmarkletBtn" class="browser-helper-copy-btn">${instructions.copyBookmarklet}</button>
        </div>
    </div>
    
    <div class="browser-helper-actions">
        <a href="https://github.com/markuskiller/SEBConfigGenerator/blob/main/docs/${currentLang}/BROWSER_CAPTURE_${currentLang === 'de' ? 'ANLEITUNG' : 'GUIDE'}.md" target="_blank" rel="noopener noreferrer" class="browser-helper-guide-link">${instructions.fullGuide}</a>
        <button id="closeBrowserHelperBtn" class="browser-helper-close-btn">${instructions.close}</button>
    </div>
`;

modal.appendChild(content);
document.body.appendChild(modal);

// Event listeners
document.getElementById('copyScriptBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(script);
    const btn = document.getElementById('copyScriptBtn');
    const original = btn.textContent;
    btn.textContent = '✓ ' + (currentLang === 'de' ? 'Kopiert!' : 'Copied!');
    setTimeout(() => btn.textContent = original, 2000);
});

document.getElementById('copyBookmarkletBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(bookmarklet);
    const btn = document.getElementById('copyBookmarkletBtn');
    const original = btn.textContent;
    btn.textContent = '✓ ' + (currentLang === 'de' ? 'Kopiert!' : 'Copied!');
    setTimeout(() => btn.textContent = original, 2000);
});

document.getElementById('closeBrowserHelperBtn').addEventListener('click', () => {
    modal.remove();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
});
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================
function attachEventListeners() {
// Language toggle
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Main actions
document.getElementById('generateBtn').addEventListener('click', downloadConfig);
document.getElementById('copyBtn').addEventListener('click', copyDomains);
document.getElementById('customDomains').addEventListener('input', updatePreview);
document.getElementById('blockedDomains').addEventListener('input', updatePreview);
document.getElementById('startUrl').addEventListener('input', updatePreview);

// SharePoint link parsing
document.getElementById('sharepointLink').addEventListener('input', function() {
    const url = this.value.trim();
    if (!url) {
        document.getElementById('sharepointOptions').style.display = 'none';
        return;
    }
    
    // Determine which service type is selected
    let serviceType = null;
    if (selectedPresets.includes('onenote')) {
        serviceType = 'onenote';
    } else if (selectedPresets.includes('word')) {
        serviceType = 'word';
    }
    
    if (serviceType) {
        const parsed = parseSharePointLink(url, serviceType);
        sharepointConfig[serviceType].parsedLink = parsed;
        renderSharePointOptions(serviceType, parsed);
    }
});

// Browser helper
document.getElementById('browserHelperBtn').addEventListener('click', showBrowserHelper);

// Advanced section toggle
document.getElementById('advancedHeader').addEventListener('click', toggleAdvancedSection);

// Platform selection buttons (Boolean Options)
document.querySelectorAll('.platform-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const platform = btn.getAttribute('data-platform');
        selectPlatform(platform);
    });
});
}

// ============================================================================
// ADVANCED SECTION TOGGLE
// ============================================================================
async function toggleAdvancedSection() {
const content = document.getElementById('advancedContent');
const toggle = document.querySelector('.advanced-toggle');

if (content.classList.contains('expanded')) {
    content.classList.remove('expanded');
    toggle.classList.remove('expanded');
} else {
    content.classList.add('expanded');
    toggle.classList.add('expanded');
    
    // Lazy load boolean options on first expand
    if (!parsedBooleanOptions.loaded) {
        const container = document.getElementById('booleanOptionsContainer');
        if (container && container.children.length === 0) {
            // Detect and set user's platform
            const detectedPlatform = detectUserPlatform();
            currentPlatform = detectedPlatform;
            console.log(`🔍 Detected platform: ${detectedPlatform}`);
            
            // Update platform button to show detected platform as active
            document.querySelectorAll('.platform-btn').forEach(btn => {
                if (btn.getAttribute('data-platform') === detectedPlatform) {
                    btn.classList.add('active');
                }
            });
            
            // Show loading indicator
            container.innerHTML = '<div class="loading-indicator">⏳ ' + 
                (currentLang === 'de' ? 'Lade Optionen...' : 'Loading options...') + '</div>';
            
            // Load boolean options locations from JSON and parse options from XML template
            console.log('🔄 Starting to load boolean options...');
            
            // Load locations for detected platform (in parallel with XML parsing)
            const [locationsResult, optionsResult] = await Promise.all([
                loadBooleanOptionsLocations(detectedPlatform),
                loadAndParseBooleanOptions()
            ]);
            
            console.log('✅ Loaded options:', parsedBooleanOptions);
            parsedBooleanOptions.loaded = true;
            
            // Render boolean options
            console.log('🎨 Rendering boolean options...');
            renderBooleanOptions();
            console.log('✅ Rendering complete');
        }
    }
}
}

// ============================================================================
// DEV BANNER
// ============================================================================
function updateDevBanner() {
    // Check if this is a development version (alpha, beta, rc, dev)
    // Remove 'v' prefix and check if remaining string contains letters
    const versionWithoutV = APP_VERSION.replace(/^v/, '');
    const isDevelopmentVersion = /[a-z]/i.test(versionWithoutV);
    
    // Get banner element
    const devBanner = document.querySelector('.dev-banner');
    
    if (!devBanner) {
        return;
    }
    
    // Hide banner for production releases
    if (!isDevelopmentVersion) {
        devBanner.style.setProperty('display', 'none', 'important');
        return;
    }
    
    // Show banner for development versions
    devBanner.style.setProperty('display', 'flex', 'important');
    
    // Update version from APP_VERSION constant
    const devVersionEl = document.getElementById('devVersion');
    if (devVersionEl) {
        devVersionEl.textContent = APP_VERSION;
    }
    
    // Update build date/time from BUILD_DATE constant
    const devBuildEl = document.getElementById('devBuild');
    if (devBuildEl) {
        const day = String(BUILD_DATE.getDate()).padStart(2, '0');
        const month = String(BUILD_DATE.getMonth() + 1).padStart(2, '0');
        const year = BUILD_DATE.getFullYear();
        const hours = String(BUILD_DATE.getHours()).padStart(2, '0');
        const minutes = String(BUILD_DATE.getMinutes()).padStart(2, '0');
        devBuildEl.textContent = `${day}.${month}.${year} ${hours}:${minutes}`;
    }

// Try to fetch git commit ID from a separate file (if available)
// This will be generated during deployment
// Only attempt fetch if running on http/https (not file://)
const devCommitEl = document.getElementById('devCommit');
if (window.location.protocol === 'file:') {
    // Running locally without server
    if (devCommitEl) {
        devCommitEl.textContent = 'local';
    }
} else {
    // Running on server, try to fetch commit ID
    fetch('GIT_COMMIT.txt')
        .then(response => response.ok ? response.text() : null)
        .then(commitId => {
            if (devCommitEl && commitId) {
                // Show first 7 characters of commit hash
                devCommitEl.textContent = commitId.trim().substring(0, 7);
            } else if (devCommitEl) {
                devCommitEl.textContent = 'local';
            }
        })
        .catch(() => {
            if (devCommitEl) {
                devCommitEl.textContent = 'local';
            }
        });
}
}

// ============================================================================
// URL PARAMETER HANDLING
// ============================================================================
function getLanguageFromURL() {
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');

// Validate language parameter
if (langParam && (langParam === 'de' || langParam === 'en')) {
    return langParam;
}
return null;
}

// ============================================================================
// PLATFORM DETECTION
// ============================================================================
function detectUserPlatform() {
const userAgent = navigator.userAgent.toLowerCase();
const platform = navigator.platform.toLowerCase();

// Detect iOS/iPadOS/iPhone/visionOS
// Note: Modern iPads may identify as Mac, so check for touch points
// Vision Pro also runs visionOS (based on iOS)
if (/ipad/.test(userAgent) || 
    /iphone/.test(userAgent) || 
    /vision/.test(userAgent) ||
    (platform === 'macintel' && navigator.maxTouchPoints > 1)) {
    return 'ipados';
}

// Detect macOS
if (/mac/.test(platform)) {
    return 'macos';
}

// Default to Windows (most common for desktop usage)
return 'windows';
}

// ============================================================================
// INITIALIZATION
// ============================================================================
async function init() {
// Update dev banner with version info
updateDevBanner();

// Determine language: URL parameter > localStorage > default (German)
const urlLang = getLanguageFromURL();
const savedLang = localStorage.getItem('sebConfigLang');
const initialLang = urlLang || savedLang || 'de';

setLanguage(initialLang);

attachEventListeners();
updatePreview();
}

// Start the application
init();

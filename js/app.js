// ============================================================================
// SEB Config Generator - Main Application
// Version: v0.22.3a4
// Build: 2025-11-22 12:58

// ============================================================================

// ============================================================================
// DEBUG LOGGING
// ============================================================================
// Debug mode can be enabled via URL parameter: ?debug=true
// Example: https://dev.focusmode.ch/?debug=true
// This will show detailed console logs for:
// - XML parsing and loading
// - Boolean options processing
// - Dict structures rendering
// - Platform switching
// - Search functionality
const DEBUG_MODE = new URLSearchParams(window.location.search).get('debug') === 'true';

// Debug logger - only logs when DEBUG_MODE is true
const debugLog = (...args) => {
    if (DEBUG_MODE) {
        console.log(...args);
    }
};

// Log debug mode status on startup
if (DEBUG_MODE) {
    console.log('🐛 Debug mode enabled via ?debug=true');
}

// ============================================================================
// TRANSLATIONS / ÜBERSETZUNGEN
// ============================================================================
// TRANSLATIONS is loaded from external file:
// - templates/generated/translations.js
// Generated from: translations/*.json
// To modify translations, edit the JSON files and run: bash scripts/build-translations.sh

// OLD TRANSLATIONS OBJECT MOVED TO translations/*.json (lines 8-318 removed)
// ============================================================================

// ============================================================================


// ============================================================================
// PRESET CONFIGURATIONS
// ============================================================================
// PRESETS, SUBJECTS, and PRESET_GROUPS are loaded from external template files:
// - templates/generated/presets.js
// - templates/generated/subjects.js
// - templates/generated/preset-groups.js
//
// These files are auto-generated from JSON sources in templates/source/
// To add new services or subjects, edit the JSON files and run:
//   bash scripts/build-service-presets.sh
//
// DO NOT define PRESETS, SUBJECTS, or PRESET_GROUPS here - they come from templates!

// ============================================================================
// SECURITY LEVELS CONFIGURATION
// ============================================================================
// SECURITY_LEVELS is loaded from external file:
// - templates/generated/security-levels.js
// Generated from: templates/source/security-levels.json
// To modify security levels, edit the JSON file and run: bash scripts/build-security-levels.sh

// ============================================================================
// WIKIPEDIA ARTICLE MAPPING
// ============================================================================
// WIKIPEDIA_ARTICLES is loaded from external file:
// - templates/generated/wikipedia-mapping.js
// Generated from: templates/source/wikipedia-mapping.json
// To modify mappings, edit the JSON file and run: bash scripts/build-platform-options.sh

// Function to get Wikipedia article name for a process
function getWikipediaArticle(processName) {
    // Direct lookup
    if (WIKIPEDIA_ARTICLES[processName]) {
        return WIKIPEDIA_ARTICLES[processName];
    }
    
    // Try without extension
    const nameWithoutExt = processName.replace(/\.(exe|app|dmg|pkg)$/i, '');
    if (WIKIPEDIA_ARTICLES[nameWithoutExt]) {
        return WIKIPEDIA_ARTICLES[nameWithoutExt];
    }
    
    // Fallback: clean up name for generic search
    return nameWithoutExt.replace(/[-_]/g, ' ').replace(/\s+/g, '_');
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
function getTimestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}`;
}

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
    
    // OneNote links often contain two parts separated by space or newline: web URL and onenote: protocol
    // Example: "https://.../_layouts/Doc.aspx?... onenote:https://.../Notebook/Section.one#PageName&section-id={...}&page-id={...}"
    let webUrl = url;
    let oneNoteProtocolUrl = null;
    
    // Check for onenote: protocol (can be separated by space, newline, or directly concatenated)
    const oneNoteMatch = url.match(/[\s\n]*onenote:(https?:\/\/[^\s]*)/);
    if (oneNoteMatch) {
        const splitIndex = url.indexOf('onenote:');
        webUrl = url.substring(0, splitIndex).trim();
        oneNoteProtocolUrl = oneNoteMatch[1].trim();
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
        // Note: Only use simple path-based extraction if we don't have wd= parameter
        // (wd= parameter parsing below is more accurate for browser links)
        if (!result.notebook && !webUrl.includes('wd=')) {
            const notebookMatch = webUrl.match(/\/([^\/]+)-Notizbuch/i);
            if (notebookMatch) {
                result.notebook = decodeURIComponent(notebookMatch[1] + '-Notizbuch');
            }
        }
        
        if (!result.section && !webUrl.includes('wd=')) {
            const sectionMatch = webUrl.match(/\/([^\/]+\.one)/i);
            if (sectionMatch) {
                result.section = decodeURIComponent(sectionMatch[1]);
            }
        }
        
        // Parse wd=target(...) parameter (browser format)
        // Format: wd=target(Path/Notebook.one|{SECTION-ID}/PageName|{PAGE-ID}/)
        // Example: target(_Inhaltsbibliothek/Language+Hub+(Years+3-4\).one|937ffc30-10f8-7546-9e1d-becca08633e1/Unit+4+(Conditionals\)|2585ef37-ded7-174e-a582-6725c384f2e7/)
        const wdMatch = webUrl.match(/[&?]wd=([^&]+)/);
        if (wdMatch) {
            const wdDecoded = decodeURIComponent(wdMatch[1]);
            
            // Extract notebook and section from path before .one
            // Pattern: target(path/Notebook.one|...)
            const notebookSectionMatch = wdDecoded.match(/target\(([^|]+\.one)\|/i);
            if (notebookSectionMatch) {
                const fullPath = notebookSectionMatch[1];
                // Get the .one filename (section)
                // Note: Need to handle escaped characters like \) in the filename
                // Match everything after the last / or \ until .one (including escaped chars)
                const sectionFileMatch = fullPath.match(/([^\/]+\.one)$/i);
                if (sectionFileMatch && !result.section) {
                    // Clean up: replace + with spaces, remove backslash escapes
                    let sectionName = sectionFileMatch[1].replace(/\+/g, ' ').replace(/\\(.)/g, '$1');
                    result.section = decodeURIComponent(sectionName);
                }
                
                // Try to extract notebook from path (usually contains -Notizbuch or similar)
                if (!result.notebook) {
                    const pathParts = fullPath.split(/[\/\\]/);
                    for (const part of pathParts) {
                        if (part.includes('Notizbuch') || part.includes('Notebook')) {
                            result.notebook = decodeURIComponent(part.replace(/\+/g, ' '));
                            break;
                        }
                    }
                }
            }
            
            // Extract section ID: .one|{GUID}/ or .one|guid/
            if (!result.sectionId) {
                const sectionIdMatch = wdDecoded.match(/\.one\|([a-f0-9-]+)\//i);
                if (sectionIdMatch) {
                    result.sectionId = sectionIdMatch[1].toLowerCase();
                }
            }
            
            // Extract page name and ID
            // Pattern after section: /PageName|{PAGE-ID}/ or /PageName\)|page-id/
            const afterSectionMatch = wdDecoded.match(/\.one\|[a-f0-9-]+\/([^\/]+)/i);
            if (afterSectionMatch) {
                const pageInfo = afterSectionMatch[1];
                
                // Extract page name (before | but handle escaped \))
                if (!result.pageName) {
                    // Match everything before the last pipe (|)
                    const pageNameMatch = pageInfo.match(/^(.+)\|[a-f0-9-]+$/i);
                    if (pageNameMatch) {
                        // Clean up: replace + with spaces, remove backslash escapes
                        let pageName = pageNameMatch[1].replace(/\+/g, ' ').replace(/\\(.)/g, '$1');
                        result.pageName = decodeURIComponent(pageName);
                    }
                }
                
                // Extract page ID
                if (!result.pageId) {
                    const pageIdMatch = pageInfo.match(/\|([a-f0-9-]+)$/i);
                    if (pageIdMatch) {
                        result.pageId = pageIdMatch[1].toLowerCase();
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
    debugLog('📥 Loading XML template from embedded data...');
    
    // Check if exampleConfigXML is available (loaded from xml-data.js)
    if (typeof exampleConfigXML === 'undefined') {
        console.error('❌ exampleConfigXML not found! Make sure xml-data.js is loaded.');
        return false;
    }
    
    const xmlText = exampleConfigXML;
    debugLog('📝 XML text length:', xmlText.length);
    debugLog('📝 First 200 chars:', xmlText.substring(0, 200));
    
    // Parse XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
    
    // Check for parsing errors
    const parseError = xmlDoc.getElementsByTagName('parsererror');
    if (parseError.length > 0) {
        console.error('❌ XML parsing error:', parseError[0].textContent);
        return false;
    }
    
    debugLog('✅ XML parsed successfully');
    debugLog('📊 Root element:', xmlDoc.documentElement.tagName);
    
    // Extract boolean options from ROOT level only (not from nested dict arrays)
    // Find the root <dict> element (child of <plist>)
    const plistElement = xmlDoc.documentElement;
    const rootDict = plistElement.querySelector(':scope > dict');
    
    if (!rootDict) {
        console.error('❌ No root <dict> found in XML');
        return false;
    }
    
    const optionsMap = new Map(); // Use Map to automatically handle duplicates
    
    // Only process direct children of root dict
    const rootChildren = rootDict.children;
    for (let i = 0; i < rootChildren.length; i++) {
        const element = rootChildren[i];
        
        // Only process <key> elements that are direct children of root dict
        if (element.tagName === 'key') {
            const keyName = element.textContent.trim();
            const nextSibling = element.nextElementSibling;
            
            // Check if the next element is <true/> or <false/>
            if (nextSibling && (nextSibling.tagName === 'true' || nextSibling.tagName === 'false')) {
                const defaultValue = nextSibling.tagName === 'true';
                // Only add if not already in map (first occurrence wins)
                if (!optionsMap.has(keyName)) {
                    optionsMap.set(keyName, { key: keyName, defaultValue });
                }
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
        const { key } = opt;
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
    
    debugLog(`✅ Parsed ${options.length} boolean options from XML`);
    debugLog('📊 Groups distribution:');
    Object.keys(groups).forEach(key => {
        debugLog(`   - ${key}: ${groups[key].options.length} options`);
    });
    return true;
} catch (error) {
    console.error('Failed to load/parse boolean options from XML:', error);
    return false;
}
}

// ============================================================================
// PARSE DICT ARRAY STRUCTURES FROM XML
// ============================================================================
async function parseXMLDictArrays() {
try {
    debugLog('📦 Parsing dict array structures from XML...');
    
    // Check if XML is available
    if (typeof exampleConfigXML === 'undefined') {
        console.error('❌ exampleConfigXML not found!');
        return false;
    }
    
    // Parse XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(exampleConfigXML, 'application/xml');
    
    // Helper function to parse a dict element
    function parseDict(dictElement) {
        const dict = {};
        let currentKey = null;
        
        for (let child of dictElement.children) {
            if (child.tagName === 'key') {
                currentKey = child.textContent.trim();
            } else if (currentKey) {
                // Get value based on element type
                if (child.tagName === 'true') {
                    dict[currentKey] = true;
                } else if (child.tagName === 'false') {
                    dict[currentKey] = false;
                } else if (child.tagName === 'integer') {
                    dict[currentKey] = parseInt(child.textContent.trim());
                } else if (child.tagName === 'string') {
                    dict[currentKey] = child.textContent.trim();
                } else if (child.tagName === 'data') {
                    dict[currentKey] = child.textContent.trim(); // Base64 data
                }
                currentKey = null;
            }
        }
        return dict;
    }
    
    // Helper function to categorize a process
    function categorizeProcess(executable, identifier, description) {
        const name = (executable || '').toLowerCase();
        const id = (identifier || '').toLowerCase();
        const desc = (description || '').toLowerCase();
        const text = `${name} ${id} ${desc}`;
        
        // Categorization logic
        if (text.match(/teams|zoom|skype|discord|slack|telegram|whatsapp|signal|element|riot|meet|gotomeeting|communicator|lync|messages|imessage|facetime|adium|ichat/)) {
            return 'chat';
        }
        if (text.match(/anydesk|vnc|remote|teamviewer|chicken|chrome remote|desktop host|screen sharing|screenshare/)) {
            return 'remote';
        }
        if (text.match(/camtasia|recorder|obs|capture|screen|video|quicktime player/)) {
            return 'recording';
        }
        if (text.match(/chrome|firefox|safari|edge|brave|opera|vivaldi|browser/)) {
            return 'browser';
        }
        if (text.match(/gpt|ai|assistant|copilot|chatbot/)) {
            return 'ai';
        }
        if (text.match(/spotify|music|itunes|vlc|media player/)) {
            return 'media';
        }
        if (text.match(/helper|plugin|service|daemon|background/)) {
            return 'system';
        }
        return 'other';
    }
    
    // Parse prohibited processes
    const prohibitedKey = Array.from(xmlDoc.getElementsByTagName('key'))
        .find(k => k.textContent === 'prohibitedProcesses');
    
    if (prohibitedKey) {
        const arrayElement = prohibitedKey.nextElementSibling;
        if (arrayElement && arrayElement.tagName === 'array') {
            const dicts = arrayElement.getElementsByTagName('dict');
            
            for (let dict of dicts) {
                const parsed = parseDict(dict);
                const category = categorizeProcess(
                    parsed.executable,
                    parsed.identifier,
                    parsed.description
                );
                parsed.category = category;
                parsedDictStructures.prohibitedProcesses.push(parsed);
            }
            
            debugLog(`✅ Parsed ${parsedDictStructures.prohibitedProcesses.length} prohibited processes`);
        }
    }
    
    // Parse permitted processes
    const permittedKey = Array.from(xmlDoc.getElementsByTagName('key'))
        .find(k => k.textContent === 'permittedProcesses');
    
    if (permittedKey) {
        const arrayElement = permittedKey.nextElementSibling;
        if (arrayElement && arrayElement.tagName === 'array') {
            const dicts = arrayElement.getElementsByTagName('dict');
            
            for (let dict of dicts) {
                const parsed = parseDict(dict);
                const category = categorizeProcess(
                    parsed.executable,
                    parsed.identifier,
                    parsed.description
                );
                parsed.category = category;
                parsedDictStructures.permittedProcesses.push(parsed);
            }
            
            debugLog(`✅ Parsed ${parsedDictStructures.permittedProcesses.length} permitted processes`);
        }
    }
    
    // Parse embedded certificates
    const certsKey = Array.from(xmlDoc.getElementsByTagName('key'))
        .find(k => k.textContent === 'embeddedCertificates');
    
    if (certsKey) {
        const arrayElement = certsKey.nextElementSibling;
        if (arrayElement && arrayElement.tagName === 'array') {
            const dicts = arrayElement.getElementsByTagName('dict');
            
            for (let dict of dicts) {
                const parsed = parseDict(dict);
                parsedDictStructures.embeddedCertificates.push(parsed);
            }
            
            debugLog(`✅ Parsed ${parsedDictStructures.embeddedCertificates.length} embedded certificates`);
        }
    }
    
    // Parse URL filter rules
    const urlFilterKey = Array.from(xmlDoc.getElementsByTagName('key'))
        .find(k => k.textContent === 'URLFilterRules');
    
    if (urlFilterKey) {
        const arrayElement = urlFilterKey.nextElementSibling;
        if (arrayElement && arrayElement.tagName === 'array') {
            const dicts = arrayElement.getElementsByTagName('dict');
            
            for (let dict of dicts) {
                const parsed = parseDict(dict);
                parsedDictStructures.urlFilterRules.push(parsed);
            }
            
            debugLog(`✅ Parsed ${parsedDictStructures.urlFilterRules.length} URL filter rules`);
        }
    }
    
    // Group by category for easier rendering
    parsedDictStructures.categories = {
        chat: { title: 'Chat & Communication', processes: [] },
        remote: { title: 'Remote Access & Screen Sharing', processes: [] },
        recording: { title: 'Screen Recording & Capture', processes: [] },
        browser: { title: 'Web Browsers', processes: [] },
        ai: { title: 'AI Tools', processes: [] },
        media: { title: 'Media Players', processes: [] },
        system: { title: 'System Services', processes: [] },
        other: { title: 'Other Applications', processes: [] }
    };
    
    // Group prohibited processes by category
    parsedDictStructures.prohibitedProcesses.forEach((proc, index) => {
        const cat = proc.category || 'other';
        if (parsedDictStructures.categories[cat]) {
            parsedDictStructures.categories[cat].processes.push({
                ...proc,
                index,
                type: 'prohibited'
            });
        }
    });
    
    debugLog('📊 Category distribution:');
    Object.keys(parsedDictStructures.categories).forEach(key => {
        const count = parsedDictStructures.categories[key].processes.length;
        if (count > 0) {
            debugLog(`   - ${key}: ${count} processes`);
        }
    });
    
    parsedDictStructures.loaded = true;
    return true;
    
} catch (error) {
    console.error('Failed to parse dict array structures:', error);
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
    debugLog(`📍 Loading boolean options locations for ${platform}...`);
    
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
        console.warn(`⚠️ LOCATIONS_${platform.toUpperCase()} not found! Make sure seb-options-${platform}.js is loaded.`);
        return null;
    }
    
    if (!data) {
        console.warn(`⚠️ No location data for ${platform}`);
        return null;
    }
    
    booleanOptionsLocations[platform] = data;
    
    const optionCount = Object.keys(data.options).length;
    const versionInfo = data._metadata.sebVersion !== 'TBD' ? ` (SEB v${data._metadata.sebVersion})` : '';
    debugLog(`✅ Loaded locations for ${optionCount} options${versionInfo}`);
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

// For macOS format (with windowsDifferent field)
if (currentPlatform === 'macos') {
    const macosLoc = optionData.macos;
    const winDiff = optionData.windowsDifferent;
    
    if (winDiff) {
        return `${macosLoc} (Windows: ${winDiff})`;
    }
    return macosLoc;
}

// For iPadOS format (direct location)
return optionData.location || optionData.ipados || null;
}

function getTranslatedText(key) {
const platformData = booleanOptionsLocations[currentPlatform];
if (!platformData || !platformData._translations || !platformData._translations[currentLang]) {
    // Fallback to main translations
    return key === 'notDocumented' ? t('notDocumented') : t('notDocumentedHint');
}
return platformData._translations[currentLang][key];
}

// Get localized location for an option key
// Maps each path component (menu names and option name) to German
function getLocalizedLocation(optionKey) {
    // Get English location path from JSON
    const englishLocation = getOptionLocation(optionKey);
    
    if (!englishLocation) {
        return null;
    }
    
    // If not German, return English path
    if (currentLang !== 'de') {
        return englishLocation;
    }
    
    // Check if SEB_OPTION_LABELS is loaded
    if (typeof SEB_OPTION_LABELS === 'undefined' || !SEB_OPTION_LABELS.de) {
        console.warn('⚠️ SEB_OPTION_LABELS not loaded');
        return englishLocation;
    }
    
    const labels = SEB_OPTION_LABELS.de;
    
    // Helper function to translate path components
    const translatePath = (path) => {
        return path.split(' → ')
            .map(part => labels[part] || part)
            .join(' → ');
    };
    
    // Check if there's a platform difference notation (Mac: ... or Windows: ...)
    const diffMatch = englishLocation.match(/^(.+?)\s+\((Mac|Windows):\s+(.+)\)$/);
    
    if (diffMatch) {
        const [, mainPath, platformLabel, diffPath] = diffMatch;
        const localizedMain = translatePath(mainPath);
        const localizedDiff = translatePath(diffPath);
        return `${localizedMain} (${platformLabel}: ${localizedDiff})`;
    }
    
    // No platform difference, just translate the simple path
    return translatePath(englishLocation);
}

// Platform selection handler
async function selectPlatform(platform) {
debugLog(`🔄 Switching to ${platform} platform...`);
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
debugLog(`✅ Switched to ${platform} platform`);
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
const APP_VERSION = 'v0.22.3a4';
const BUILD_DATE = new Date('2025-11-22T12:58:00'); // Format: YYYY-MM-DDTHH:mm:ss

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

// Boolean options favorites (stored in localStorage)
let booleanOptionsFavorites = new Set();
try {
    const stored = localStorage.getItem('sebConfigFavorites');
    if (stored) {
        booleanOptionsFavorites = new Set(JSON.parse(stored));
    }
} catch (e) {
    console.warn('Could not load favorites from localStorage:', e);
}

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

// Dict structures parsed from XML template (lazy loaded on demand)
let parsedDictStructures = {
loaded: false,
prohibitedProcesses: [],
permittedProcesses: [],
embeddedCertificates: [],
urlFilterRules: [],
additionalResources: [],
categories: {}, // Grouped by category
userSelections: {} // Track checkbox changes
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
if (sharepointHelp && !sharepointHelp.classList.contains('hidden')) {
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
renderSecurityLevelDetails();
updateStartUrlField(); // Update start URL dropdown labels

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
        mainDocLink.href = baseGitHubUrl + 'docs/de/ANLEITUNG.md';
    } else {
        mainDocLink.href = baseGitHubUrl + 'docs/en/GUIDE.md';
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
        quickstartLinkBasic.href = baseGitHubUrl + 'docs/de/SCHNELLSTART.md';
    } else {
        quickstartLinkBasic.href = baseGitHubUrl + 'docs/en/QUICKSTART.md';
    }
}
}

function t(key) {
return TRANSLATIONS[currentLang][key] || key;
}

// Helper function to convert kebab-case service IDs to camelCase for translation keys
function toCamelCase(str) {
return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
}

// Helper function to get translation key for preset
function getPresetTranslationKey(presetId, suffix = '') {
const camelCaseId = toCamelCase(presetId);
const capitalized = camelCaseId.charAt(0).toUpperCase() + camelCaseId.slice(1);
return 'preset' + capitalized + suffix;
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
        <h3>${t(getPresetTranslationKey(key))}</h3>
        <p>${t(getPresetTranslationKey(key, 'Desc'))}</p>
    `;
    btn.addEventListener('click', () => togglePreset(key));
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
        <h3>${t(getPresetTranslationKey(key))}</h3>
        <p>${t(getPresetTranslationKey(key, 'Desc'))}</p>
    `;
    btn.addEventListener('click', () => togglePreset(key));
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
    experimentalWarning.classList.remove('hidden');
    const warningTitle = experimentalWarning.querySelector('strong');
    const warningText = experimentalWarning.querySelector('div');
    const warningLink = experimentalWarning.querySelector('a');
    warningTitle.textContent = t('experimentalWarningTitle');
    
    // Replace "Network Capture" with a link in the warning text
    const text = t('experimentalWarningText');
    const linkText = '<a href="#networkCaptureHelper" class="warning-link network-capture-link">Network Capture</a>';
    warningText.innerHTML = text.replace('Network Capture', linkText);
    
    // Add click handler to expand advanced section before scrolling
    const networkCaptureLink = warningText.querySelector('.network-capture-link');
    if (networkCaptureLink) {
        networkCaptureLink.addEventListener('click', (e) => {
            e.preventDefault();
            expandAdvancedSectionAndScroll('networkCaptureHelper');
        });
    }
    
    warningLink.textContent = t('experimentalWarningLink');
    // Also handle the main warning link
    warningLink.addEventListener('click', (e) => {
        e.preventDefault();
        expandAdvancedSectionAndScroll('networkCaptureHelper');
    });
} else {
    experimentalWarning.classList.add('hidden');
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
subjectLabel.setAttribute('for', 'subjectSelect');
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
        <h3>${t(getPresetTranslationKey(key))}</h3>
        <p>${t(getPresetTranslationKey(key, 'Desc'))}</p>
    `;
    btn.addEventListener('click', () => togglePreset(key));
    container.appendChild(btn);
});
}

function renderSecurityLevels() {
const container = document.getElementById('securityLevel');
container.innerHTML = '';

// Predefined levels
['relaxed', 'balanced', 'strict'].forEach(key => {
    const div = document.createElement('div');
    div.className = `security-option ${key === currentSecurityLevel ? 'active' : ''}`;
    div.innerHTML = `
        <h4>${t('security' + key.charAt(0).toUpperCase() + key.slice(1))}</h4>
        <p>${t('security' + key.charAt(0).toUpperCase() + key.slice(1) + 'Desc')}</p>
    `;
    div.addEventListener('click', () => selectSecurityLevel(key));
    container.appendChild(div);
});

// Custom level indicator (if active)
if (currentSecurityLevel === 'custom') {
    const div = document.createElement('div');
    div.className = 'security-option active';
    div.style.borderColor = '#9C27B0';
    div.innerHTML = `
        <h4>${t('securityLevelCustom')}</h4>
        <p>${t('securityLevelCustomDescription')}</p>
    `;
    div.style.cursor = 'default';
    container.appendChild(div);
}

// Show/update experimental warning for relaxed and strict levels
updateSecurityLevelWarning();
}

function renderSharePointOptions(serviceType, parsedLink) {
const container = document.getElementById('sharepointOptions');

if (!parsedLink || !parsedLink.isSharePoint) {
    if (container) {
        container.classList.add('hidden');
        container.innerHTML = '';
    }
    return;
}

if (!container) {
    return;
}

container.classList.remove('hidden');
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
checkbox.addEventListener('change', () => {
    if (!sharepointConfig[serviceType].restrictions) {
        sharepointConfig[serviceType].restrictions = {};
    }
    sharepointConfig[serviceType].restrictions[restrictionType] = checkbox.checked;
    updatePreview();
});

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

function updateStartUrlField() {
const startUrlInput = document.getElementById('startUrl');
const startUrlSelectorContainer = document.getElementById('startUrlSelectorContainer');
const startUrlSelector = document.getElementById('startUrlSelector');

if (selectedPresets.length === 0) {
    // No presets selected - clear field and hide dropdown
    startUrlInput.value = '';
    startUrlSelectorContainer.classList.remove('visible');
} else if (selectedPresets.length === 1) {
    // Single selection - set start URL directly from preset
    const presetKey = selectedPresets[0];
    if (PRESETS[presetKey]) {
        startUrlInput.value = PRESETS[presetKey].startUrl;
    }
    startUrlSelectorContainer.classList.remove('visible');
} else {
    // Multiple selections - show dropdown
    startUrlSelectorContainer.classList.add('visible');
    
    // Clear and populate dropdown
    startUrlSelector.innerHTML = '';
    
    // Add "Custom" option as default
    const customOption = document.createElement('option');
    customOption.value = '';
    customOption.textContent = currentLang === 'de' ? '🔧 Benutzerdefiniert (eigene URL eingeben)' : '🔧 Custom (enter your own URL)';
    startUrlSelector.appendChild(customOption);
    
    // Add option for each selected preset
    selectedPresets.forEach(presetKey => {
        const preset = PRESETS[presetKey];
        if (preset && preset.startUrl) {
            const option = document.createElement('option');
            option.value = preset.startUrl;
            const presetName = t(getPresetTranslationKey(presetKey));
            option.textContent = `${presetName} (${preset.startUrl})`;
            startUrlSelector.appendChild(option);
        }
    });
    
    // Set to custom (empty) by default
    startUrlSelector.value = '';
    startUrlInput.value = '';
    
    // Add change listener if not already added
    if (!startUrlSelector.hasAttribute('data-listener-attached')) {
        startUrlSelector.setAttribute('data-listener-attached', 'true');
        startUrlSelector.addEventListener('change', (e) => {
            startUrlInput.value = e.target.value;
        });
    }
}
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

if (sharepointLinkGroup) {
    if (hasOneNoteOrWord) {
        sharepointLinkGroup.classList.remove('hidden');
    } else {
        sharepointLinkGroup.classList.add('hidden');
    }
}

// Update experimental warning visibility (created in renderPresets)
const experimentalWarning = document.getElementById('experimentalWarning');
if (experimentalWarning) {
    if (hasOneNoteOrWord) {
        experimentalWarning.classList.remove('hidden');
        const warningTitle = experimentalWarning.querySelector('strong');
        const warningText = experimentalWarning.querySelector('div');
        const warningLink = experimentalWarning.querySelector('a');
        warningTitle.textContent = t('experimentalWarningTitle');
        
        // Replace "Network Capture" with a link in the warning text
        const text = t('experimentalWarningText');
        const linkText = '<a href="#networkCaptureHelper" class="warning-link network-capture-link">Network Capture</a>';
        warningText.innerHTML = text.replace('Network Capture', linkText);
        
        // Add click handler to expand advanced section before scrolling
        const networkCaptureLink = warningText.querySelector('.network-capture-link');
        if (networkCaptureLink) {
            networkCaptureLink.addEventListener('click', (e) => {
                e.preventDefault();
                expandAdvancedSectionAndScroll('networkCaptureHelper');
            });
        }
        
        warningLink.textContent = t('experimentalWarningLink');
        // Also handle the main warning link
        warningLink.addEventListener('click', (e) => {
            e.preventDefault();
            expandAdvancedSectionAndScroll('networkCaptureHelper');
        });
    } else {
        experimentalWarning.classList.add('hidden');
    }
}

// Show appropriate help text
if (sharepointHelp) {
    if (hasOneNote && !hasWord) {
        sharepointHelp.classList.remove('hidden');
        sharepointHelp.textContent = t('sharepointHelpOneNote');
    } else if (hasWord && !hasOneNote) {
        sharepointHelp.classList.remove('hidden');
        sharepointHelp.textContent = t('sharepointHelpWord');
    } else if (hasOneNote && hasWord) {
        sharepointHelp.classList.remove('hidden');
        sharepointHelp.textContent = t('sharepointHelpOneNote') + '\n\n' + t('sharepointHelpWord');
    } else {
        sharepointHelp.classList.add('hidden');
    }
}

// No longer enforce "at least one main preset" - allow using only Hilfsmittel
// Users can now select only reference tools (e.g., Duden) with a custom start URL

// Update start URL based on selection count
updateStartUrlField();

// Update config name
// Rule: If more than 1 preset/tool selected in total → use generic "FocusMode-{timestamp}"
//       If exactly 1 preset/tool selected → use specific name
//       If none selected → clear name
const totalSelected = selectedPresets.length;

if (totalSelected > 1) {
    // More than one service/tool selected → generic name
    const configNameEl = document.getElementById('configName');
    if (configNameEl) configNameEl.value = `FocusMode-${getTimestamp()}`;
} else if (totalSelected === 1) {
    // Exactly one service/tool selected → use its name
    const presetName = t('preset' + selectedPresets[0].charAt(0).toUpperCase() + selectedPresets[0].slice(1));
    const configNameEl = document.getElementById('configName');
    if (configNameEl) configNameEl.value = `${presetName.replace(/\s+/g, '_')}_Config-${getTimestamp()}`;
} else {
    // Nothing selected → clear name
    const configNameEl = document.getElementById('configName');
    if (configNameEl) configNameEl.value = '';
}

renderPresets();
updatePreview();
}

function selectSecurityLevel(key) {
currentSecurityLevel = key;

// Apply security level settings to userSelections
if (key !== 'custom' && SECURITY_LEVELS[key]) {
    const levelSettings = SECURITY_LEVELS[key].settings;
    Object.keys(levelSettings).forEach(optKey => {
        if (parsedBooleanOptions.userSelections.hasOwnProperty(optKey)) {
            parsedBooleanOptions.userSelections[optKey] = levelSettings[optKey];
        }
    });
}

renderSecurityLevels();
renderSecurityLevelDetails();
renderBooleanOptions(); // Re-render to show updated checkboxes
}

// Detect if current settings match a predefined security level
function detectSecurityLevel() {
    const securityLevelKeys = Object.keys(SECURITY_LEVELS);
    
    for (const levelKey of securityLevelKeys) {
        const levelSettings = SECURITY_LEVELS[levelKey].settings;
        let matches = true;
        
        for (const [key, value] of Object.entries(levelSettings)) {
            if (parsedBooleanOptions.userSelections[key] !== value) {
                matches = false;
                break;
            }
        }
        
        if (matches) {
            return levelKey;
        }
    }
    
    return 'custom';
}

// Called when any security-level-relevant option changes
function onSecurityRelevantOptionChange() {
    const detectedLevel = detectSecurityLevel();
    if (detectedLevel !== currentSecurityLevel) {
        currentSecurityLevel = detectedLevel;
        renderSecurityLevels();
        renderSecurityLevelDetails();
    }
}

// Generic function to create a boolean option tile (reusable)
function createBooleanOptionTile(optionKey, showFavoriteButton = true) {
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('bool-option-item');
    optionDiv.dataset.optionKey = optionKey;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `bool_${optionKey}`;
    checkbox.checked = parsedBooleanOptions.userSelections[optionKey] || false;
    checkbox.classList.add('bool-option-checkbox');
    checkbox.addEventListener('change', (e) => {
        parsedBooleanOptions.userSelections[optionKey] = e.target.checked;
        
        // Check if this is a security-relevant option
        const isSecurityRelevant = Object.keys(SECURITY_LEVELS).some(level =>
            SECURITY_LEVELS[level].settings.hasOwnProperty(optionKey)
        );
        
        if (isSecurityRelevant) {
            onSecurityRelevantOptionChange();
        }
        
        // Update all instances of this tile
        updateAllTilesForOption(optionKey);
    });
    
    const label = document.createElement('label');
    label.htmlFor = `bool_${optionKey}`;
    label.classList.add('bool-option-label');
    
    const labelText = document.createElement('div');
    labelText.classList.add('bool-option-label-text');
    labelText.textContent = generateOptionLabel(optionKey);
    
    const keyName = document.createElement('div');
    keyName.classList.add('bool-option-key');
    keyName.textContent = optionKey;
    
    label.appendChild(labelText);
    label.appendChild(keyName);
    
    optionDiv.appendChild(checkbox);
    optionDiv.appendChild(label);
    
    // Add favorite button if requested
    if (showFavoriteButton) {
        const favoriteBtn = document.createElement('button');
        favoriteBtn.classList.add('bool-option-favorite');
        favoriteBtn.innerHTML = booleanOptionsFavorites.has(optionKey) ? '⭐' : '☆';
        favoriteBtn.title = currentLang === 'de' ? 'Zu Favoriten hinzufügen/entfernen' : 'Add/remove from favorites';
        favoriteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleFavorite(optionKey);
        });
        optionDiv.appendChild(favoriteBtn);
    }
    
    return optionDiv;
}

// Update all tiles displaying a specific option
function updateAllTilesForOption(optionKey) {
    const allTiles = document.querySelectorAll(`[data-option-key="${optionKey}"]`);
    const isChecked = parsedBooleanOptions.userSelections[optionKey];
    
    allTiles.forEach(tile => {
        const checkbox = tile.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = isChecked;
        }
    });
}

// Toggle favorite status
function toggleFavorite(optionKey) {
    if (booleanOptionsFavorites.has(optionKey)) {
        booleanOptionsFavorites.delete(optionKey);
    } else {
        booleanOptionsFavorites.add(optionKey);
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('sebConfigFavorites', JSON.stringify([...booleanOptionsFavorites]));
    } catch (e) {
        console.warn('Could not save favorites to localStorage:', e);
    }
    
    // Re-render to update star icons
    renderBooleanOptions();
    renderSecurityLevelDetails();
}

// Render favorites group
function renderFavoritesGroup(container) {
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('bool-group-container');
    groupDiv.style.borderLeft = '3px solid #FFB300';
    
    const groupHeader = document.createElement('div');
    groupHeader.classList.add('bool-group-header');
    groupHeader.innerHTML = `
        <strong>${t('favoritesGroup')}</strong>
        <span>(${booleanOptionsFavorites.size} ${currentLang === 'de' ? 'Optionen' : 'options'})</span>
    `;
    
    const groupContent = document.createElement('div');
    groupContent.classList.add('bool-group-content', 'show'); // Always expanded
    
    // Don't allow closing favorites group
    groupHeader.style.cursor = 'default';
    
    if (booleanOptionsFavorites.size === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.style.cssText = 'padding: 1rem; color: #666; font-style: italic;';
        emptyMsg.textContent = t('noFavorites');
        groupContent.appendChild(emptyMsg);
    } else {
        const optionsGrid = document.createElement('div');
        optionsGrid.classList.add('bool-options-grid');
        
        [...booleanOptionsFavorites].forEach(key => {
            const tile = createBooleanOptionTile(key, true);
            optionsGrid.appendChild(tile);
        });
        
        groupContent.appendChild(optionsGrid);
    }
    
    groupDiv.appendChild(groupHeader);
    groupDiv.appendChild(groupContent);
    container.appendChild(groupDiv);
}

function renderSecurityLevelDetails() {
    const container = document.getElementById('securityLevelDetailsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Get security-relevant option keys
    const securityRelevantKeys = new Set();
    Object.values(SECURITY_LEVELS).forEach(level => {
        Object.keys(level.settings).forEach(key => securityRelevantKeys.add(key));
    });
    
    if (securityRelevantKeys.size === 0) return;
    
    // Create collapsible group header
    const groupHeader = document.createElement('div');
    groupHeader.classList.add('bool-group-header');
    groupHeader.innerHTML = `
        <strong>${t('securityLevelAffectedOptions')}</strong>
        <span>(${securityRelevantKeys.size} ${currentLang === 'de' ? 'Optionen' : 'options'})</span>
    `;
    
    // Create collapsible content
    const groupContent = document.createElement('div');
    groupContent.classList.add('bool-group-content');
    // Start collapsed
    
    // Toggle functionality
    groupHeader.addEventListener('click', () => {
        groupContent.classList.toggle('show');
    });
    
    // Info box
    const infoBox = document.createElement('div');
    infoBox.classList.add('preset-info-box');
    infoBox.style.marginBottom = '1rem';
    infoBox.innerHTML = `<strong>ℹ️</strong> ${t('securityLevelAffectedOptionsInfo')}`;
    groupContent.appendChild(infoBox);
    
    // Create options grid using shared tiles
    const optionsGrid = document.createElement('div');
    optionsGrid.classList.add('bool-options-grid');
    
    [...securityRelevantKeys].forEach(key => {
        const tile = createBooleanOptionTile(key, true);
        optionsGrid.appendChild(tile);
    });
    
    groupContent.appendChild(optionsGrid);
    
    container.appendChild(groupHeader);
    container.appendChild(groupContent);
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
    warningDiv.classList.remove('hidden');
} else if (warningDiv) {
    // Hide warning for balanced level
    warningDiv.classList.add('hidden');
}
}

// ============================================================================
// URL FILTER RULES RENDERING
// ============================================================================
function renderURLFilterRules() {
// Insert into placeholder that is positioned BEFORE boolean options
const placeholder = document.getElementById('urlFilterPlaceholder');
if (!placeholder) {
    console.error('❌ urlFilterPlaceholder not found!');
    return;
}

debugLog('🌐 Rendering URL filter rules section...');

// Create collapsible section for URL filter rules
const section = document.createElement('div');
section.classList.add('url-filter-section', 'bool-group-container');
section.style.marginBottom = '1.5rem';

// Header (collapsible) - styled like boolean option groups
const header = document.createElement('div');
header.classList.add('url-filter-header', 'bool-group-header');
header.style.cursor = 'pointer';

// Show placeholder text initially, will be updated when expanded
const placeholderText = currentLang === 'de' 
    ? 'Manuelle Regeln + automatisch generiert' 
    : 'Manual rules + auto-generated';

header.innerHTML = `
    <strong>🌐 ${currentLang === 'de' ? 'URL-Filter-Regeln' : 'URL Filter Rules'}</strong>
    <span>(${placeholderText})</span>
`;

// Content (initially hidden) - styled like boolean option group content
const content = document.createElement('div');
content.classList.add('url-filter-content', 'bool-group-content');
content.style.padding = '1rem';

// Toggle functionality with lazy loading
let contentLoaded = false;
header.addEventListener('click', async () => {
    const isExpanding = !content.classList.contains('show');
    
    if (isExpanding && !contentLoaded) {
        // Lazy load dict structures if not already loaded
        if (!parsedDictStructures.loaded) {
            debugLog('🔄 Lazy loading dict structures for URL filter rules...');
            content.innerHTML = '<div class="loading-indicator">⏳ ' + 
                (currentLang === 'de' ? 'Lade Filter-Regeln...' : 'Loading filter rules...') + '</div>';
            content.classList.add('show');
            
            await parseXMLDictArrays();
            parsedDictStructures.loaded = true;
            debugLog('✅ Dict structures loaded');
        }
        
        // Render content
        debugLog('🔄 Rendering URL filter rules content...');
        renderURLFilterContent(content);
        contentLoaded = true;
        
        // Update count badge with actual numbers
        const countSpan = header.querySelector('span');
        const ruleCount = parsedDictStructures.urlFilterRules.length;
        const autoGenText = currentLang === 'de' 
            ? `+ ${getAllDomains().length} automatisch generiert` 
            : `+ ${getAllDomains().length} auto-generated`;
        countSpan.textContent = `(${ruleCount} ${currentLang === 'de' ? 'manuell' : 'manual'} ${autoGenText})`;
    }
    
    // Toggle visibility
    content.classList.toggle('show');
});

section.appendChild(header);
section.appendChild(content);
placeholder.appendChild(section);

debugLog('✅ URL filter rules section shell created (lazy loading enabled)');
}

function renderURLFilterContent(container) {
container.innerHTML = '';

// Info box
const infoBox = document.createElement('div');
infoBox.style.cssText = `
    background: #e3f2fd;
    border-left: 4px solid #2196f3;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 4px;
`;
infoBox.innerHTML = currentLang === 'de'
    ? '<strong>ℹ️ Hinweis:</strong> Manuelle Filter-Regeln werden zusätzlich zu den automatisch generierten Preset-Domains verwendet. Regex-Patterns sind fortgeschrittene Optionen für erfahrene Nutzer.'
    : '<strong>ℹ️ Note:</strong> Manual filter rules are used in addition to auto-generated preset domains. Regex patterns are advanced options for experienced users.';
container.appendChild(infoBox);

// Rules list
const rulesList = document.createElement('div');
rulesList.classList.add('url-filter-rules-list');
rulesList.id = 'urlFilterRulesList';

if (parsedDictStructures.urlFilterRules.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.style.cssText = 'padding: 2rem; text-align: center; color: #666;';
    emptyMsg.textContent = currentLang === 'de' 
        ? 'Keine manuellen Filter-Regeln vorhanden. Klicken Sie "+ Neue Regel", um eine hinzuzufügen.'
        : 'No manual filter rules defined. Click "+ New Rule" to add one.';
    rulesList.appendChild(emptyMsg);
} else {
    parsedDictStructures.urlFilterRules.forEach((rule, index) => {
        const ruleCard = createURLFilterRuleCard(rule, index);
        rulesList.appendChild(ruleCard);
    });
}

container.appendChild(rulesList);

// Add new rule button
const addButton = document.createElement('button');
addButton.classList.add('btn', 'btn-secondary');
addButton.style.cssText = 'margin-top: 1rem;';
addButton.innerHTML = `➕ ${currentLang === 'de' ? 'Neue Regel' : 'New Rule'}`;
addButton.addEventListener('click', addNewURLFilterRule);
container.appendChild(addButton);
}

function createURLFilterRuleCard(rule, index) {
const card = document.createElement('div');
card.classList.add('url-filter-rule-card');
card.style.cssText = `
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
`;

const actionColor = rule.action === 1 ? '#4caf50' : '#f44336';
const actionLabel = rule.action === 1 
    ? (currentLang === 'de' ? '✓ Erlauben' : '✓ Allow') 
    : (currentLang === 'de' ? '✗ Blockieren' : '✗ Block');

    card.innerHTML = `
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <label style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" 
                       class="url-filter-active" 
                       data-index="${index}"
                       ${rule.active ? 'checked' : ''}>
                <span style="font-weight: 500;">${currentLang === 'de' ? 'Aktiv' : 'Active'}</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" 
                       class="url-filter-regex" 
                       data-index="${index}"
                       ${rule.regex ? 'checked' : ''}>
                <span>Regex</span>
            </label>
            <input type="text" 
                   class="url-filter-expression" 
                   data-index="${index}"
                   value="${(rule.expression || '').replace(/"/g, '&quot;')}"
                   placeholder="${currentLang === 'de' ? 'URL-Pattern oder Regex...' : 'URL pattern or regex...'}"
                   style="flex: 1; min-width: 200px; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px; font-family: monospace;">
            <select class="url-filter-action" 
                    data-index="${index}"
                    style="padding: 0.5rem; border: none; border-radius: 4px; background: ${actionColor}; color: white; font-weight: 500;">
                <option value="1" ${rule.action === 1 ? 'selected' : ''}>${currentLang === 'de' ? '✓ Erlauben' : '✓ Allow'}</option>
                <option value="0" ${rule.action === 0 ? 'selected' : ''}>${currentLang === 'de' ? '✗ Blockieren' : '✗ Block'}</option>
            </select>
            <button class="btn-icon url-filter-delete" 
                    data-index="${index}"
                    style="color: #f44336; padding: 0.5rem; cursor: pointer; border: none; background: transparent; font-size: 1.2rem;"
                    title="${currentLang === 'de' ? 'Regel löschen' : 'Delete rule'}">
                🗑️
            </button>
        </div>
    `;// Event listeners
card.querySelector('.url-filter-active').addEventListener('change', (e) => {
    parsedDictStructures.urlFilterRules[index].active = e.target.checked;
    debugLog(`URLFilter rule ${index} active: ${e.target.checked}`);
    updatePreview();
});

card.querySelector('.url-filter-regex').addEventListener('change', (e) => {
    parsedDictStructures.urlFilterRules[index].regex = e.target.checked;
    debugLog(`URLFilter rule ${index} regex: ${e.target.checked}`);
    updatePreview();
});

card.querySelector('.url-filter-expression').addEventListener('input', (e) => {
    parsedDictStructures.urlFilterRules[index].expression = e.target.value;
    debugLog(`URLFilter rule ${index} expression: ${e.target.value}`);
    updatePreview();
});

    card.querySelector('.url-filter-action').addEventListener('change', (e) => {
        parsedDictStructures.urlFilterRules[index].action = parseInt(e.target.value);
        debugLog(`URLFilter rule ${index} action: ${e.target.value}`);
        // Update background color
        const newColor = e.target.value === '1' ? '#4caf50' : '#f44336';
        e.target.style.background = newColor;
        updatePreview();
    });card.querySelector('.url-filter-delete').addEventListener('click', () => {
    if (confirm(currentLang === 'de' ? 'Regel wirklich löschen?' : 'Really delete this rule?')) {
        parsedDictStructures.urlFilterRules.splice(index, 1);
        // Re-render
        const container = document.querySelector('.url-filter-content');
        if (container) {
            renderURLFilterContent(container);
        }
        // Update count in header
        const countSpan = document.querySelector('.url-filter-header span');
        if (countSpan) {
            const ruleCount = parsedDictStructures.urlFilterRules.length;
            const autoGenText = currentLang === 'de' 
                ? `+ ${getAllDomains().length} automatisch generiert` 
                : `+ ${getAllDomains().length} auto-generated`;
            countSpan.textContent = `(${ruleCount} ${currentLang === 'de' ? 'manuell' : 'manual'} ${autoGenText})`;
        }
        // Update preview
        updatePreview();
    }
});

return card;
}

function addNewURLFilterRule() {
const newRule = {
    action: 1,  // Allow by default
    active: true,
    expression: '',
    regex: false
};

parsedDictStructures.urlFilterRules.push(newRule);

// Re-render
const container = document.querySelector('.url-filter-content');
if (container) {
    renderURLFilterContent(container);
}

// Update count in header
const countSpan = document.querySelector('.url-filter-header span');
if (countSpan) {
    const ruleCount = parsedDictStructures.urlFilterRules.length;
    const autoGenText = currentLang === 'de' 
        ? `+ ${getAllDomains().length} automatisch generiert` 
        : `+ ${getAllDomains().length} auto-generated`;
    countSpan.textContent = `(${ruleCount} ${currentLang === 'de' ? 'manuell' : 'manual'} ${autoGenText})`;
}

// Update preview
updatePreview();

debugLog('➕ New URL filter rule added');
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

debugLog('📦 Container found, clearing content...');
container.innerHTML = '';

// Info box
const infoBox = document.createElement('div');
infoBox.classList.add('preset-info-box');
infoBox.innerHTML = `<strong>ℹ️ ${t('allBooleanOptions')}</strong><br>${t('booleanOptionsInfo')}`;
container.appendChild(infoBox);
debugLog('ℹ️ Info box added');

// Render Favorites Group (always expanded, at top)
if (booleanOptionsFavorites.size > 0) {
    renderFavoritesGroup(container);
}

// Render each group
const groupOrder = ['browser', 'security', 'interface', 'system', 'network', 'mobile', 'other'];
debugLog('🔍 Processing groups:', groupOrder);

groupOrder.forEach(groupKey => {
    const group = parsedBooleanOptions.groups[groupKey];
    debugLog(`  - Group ${groupKey}:`, group);
    if (!group || !group.options || group.options.length === 0) {
        debugLog(`  ⚠️ Skipping ${groupKey} (no options)`);
        return;
    }
    debugLog(`  ✅ Rendering ${groupKey} with ${group.options.length} options`);
    
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
    
    // Render options in grid using shared tiles
    const optionsGrid = document.createElement('div');
    optionsGrid.classList.add('bool-options-grid');
    
    group.options.forEach(opt => {
        const tile = createBooleanOptionTile(opt.key, true);
        
        // Add location tooltip to label
        const label = tile.querySelector('.bool-option-label');
        if (label && !label.querySelector('.bool-option-tooltip')) {
            const tooltip = document.createElement('div');
            tooltip.classList.add('bool-option-tooltip');
            
            // Get English location (always shown as gray text)
            const englishLocation = getOptionLocation(opt.key);
            if (englishLocation) {
                // Gray text: always English (matches SEB Config Tool)
                tooltip.textContent = `📍 ${t('sebConfigToolLocation')}: ${englishLocation}`;
                
                // Tooltip hover: German if language is DE, otherwise English
                if (currentLang === 'de') {
                    const germanLocation = getLocalizedLocation(opt.key);
                    tooltip.title = germanLocation;
                } else {
                    tooltip.title = englishLocation;
                }
            } else {
                // Use translated hint texts for undocumented options
                const notDocText = getTranslatedText('notDocumented');
                const notDocHint = getTranslatedText('notDocumentedHint');
                tooltip.textContent = `📍 ${t('sebConfigToolLocation')}: ${notDocText}`;
                tooltip.title = notDocHint;
                tooltip.classList.add('undocumented');
            }
            
            label.appendChild(tooltip);
        }
        
        optionsGrid.appendChild(tile);
    });
    
    groupContent.appendChild(optionsGrid);
    groupDiv.appendChild(groupHeader);
    groupDiv.appendChild(groupContent);
    container.appendChild(groupDiv);
});
}

// ============================================================================
// DICT STRUCTURES RENDERING (Process Lists, Certificates, etc.)
// ============================================================================
async function renderDictStructures() {
const container = document.getElementById('dictStructuresContainer');
if (!container) {
    console.error('❌ dictStructuresContainer not found!');
    return;
}

debugLog('🎨 Rendering dict structures shells...');

// Clear existing content
container.innerHTML = '';

// Main container
const mainDiv = document.createElement('div');
mainDiv.classList.add('dict-structures-main');

// Section header
const sectionHeader = document.createElement('div');
sectionHeader.classList.add('dict-section-header');
sectionHeader.innerHTML = `
    <h3>📋 ${currentLang === 'de' ? 'Prozesslisten & Zertifikate' : 'Process Lists & Certificates'}</h3>
    <p class="subtitle">${currentLang === 'de' 
        ? 'Konfigurieren Sie blockierte/erlaubte Anwendungen und eingebettete Ressourcen' 
        : 'Configure prohibited/permitted applications and embedded resources'}</p>
`;
mainDiv.appendChild(sectionHeader);

// Info box
const infoBox = document.createElement('div');
infoBox.classList.add('preset-info-box');
infoBox.innerHTML = currentLang === 'de'
    ? '<strong>ℹ️ Hinweis:</strong> Ihre Änderungen an den Checkboxen werden automatisch in die generierte .seb-Datei übernommen.'
    : '<strong>ℹ️ Note:</strong> Your checkbox changes will be automatically included in the generated .seb file.';
mainDiv.appendChild(infoBox);

// Always render section shells (will lazy load on first expand or search)
// Prohibited Processes Section (shell only)
const prohibitedSection = createProcessListSection(
    'prohibited',
    '🚫 Prohibited Processes',
    'Blocked applications (will be loaded when expanded)'
);
mainDiv.appendChild(prohibitedSection);

// Permitted Processes Section (shell only)
const permittedSection = createProcessListSection(
    'permitted',
    '✅ Permitted Processes',
    'Allowed applications (will be loaded when expanded)'
);
mainDiv.appendChild(permittedSection);

// Certificates Section (shell only)
const certsSection = createCertificatesSection();
mainDiv.appendChild(certsSection);

container.appendChild(mainDiv);
debugLog('✅ Dict structures shells rendered (lazy loading enabled)');
}

// Helper function to create a process list section with categories
function createProcessListSection(type, title, description) {
const sectionDiv = document.createElement('div');
sectionDiv.classList.add('dict-section');

// Section header (collapsible)
const header = document.createElement('div');
header.classList.add('dict-section-header', 'collapsible');
header.innerHTML = `
    <span class="expand-icon">▶</span>
    <strong>${title}</strong>
    <span class="count-badge">${description}</span>
`;

// Content (initially hidden - lazy loading)
const content = document.createElement('div');
content.classList.add('dict-section-content');
content.style.display = 'none';

let contentLoaded = false;

// Toggle functionality with lazy loading
header.addEventListener('click', async () => {
    const isExpanding = content.style.display === 'none';
    
    if (isExpanding && !contentLoaded) {
        // Lazy load dict structures if not already loaded
        if (!parsedDictStructures.loaded) {
            debugLog(`🔄 Lazy loading dict structures for ${type} processes...`);
            content.innerHTML = '<div class="loading-indicator">⏳ ' + 
                (currentLang === 'de' ? 'Lade Prozesslisten...' : 'Loading process lists...') + '</div>';
            content.style.display = 'block';
            
            await parseXMLDictArrays();
            parsedDictStructures.loaded = true;
            debugLog('✅ Dict structures loaded');
        }
        
        // Render content
        debugLog(`🔄 Rendering ${type} processes...`);
        renderProcessCategories(content, type);
        contentLoaded = true;
        
        // Update count badge with actual numbers
        const countBadge = header.querySelector('.count-badge');
        const processCount = type === 'prohibited' 
            ? parsedDictStructures.prohibitedProcesses.length 
            : parsedDictStructures.permittedProcesses.length;
        countBadge.textContent = currentLang === 'de'
            ? `${processCount} Anwendungen`
            : `${processCount} applications`;
    }
    
    // Toggle visibility
    content.style.display = isExpanding ? 'block' : 'none';
    header.querySelector('.expand-icon').textContent = isExpanding ? '▼' : '▶';
});

sectionDiv.appendChild(header);
sectionDiv.appendChild(content);

return sectionDiv;
}

// Render process categories with search
function renderProcessCategories(container, type) {
container.innerHTML = '';

// Search bar
const searchDiv = document.createElement('div');
searchDiv.classList.add('dict-search-bar');
searchDiv.innerHTML = `
    <input type="text" 
           id="search_${type}" 
           class="dict-search-input" 
           placeholder="🔍 Search processes by name or identifier...">
    <span class="search-count" id="searchCount_${type}"></span>
`;
container.appendChild(searchDiv);

// Categories container
const categoriesDiv = document.createElement('div');
categoriesDiv.classList.add('dict-categories');

// Render each category
const categoryOrder = ['chat', 'remote', 'recording', 'browser', 'ai', 'media', 'system', 'other'];
categoryOrder.forEach(catKey => {
    const category = parsedDictStructures.categories[catKey];
    if (!category || category.processes.length === 0) return;
    
    const filteredProcesses = category.processes.filter(p => p.type === type);
    if (filteredProcesses.length === 0) return;
    
    const categoryDiv = createCategoryAccordion(catKey, category.title, filteredProcesses, type);
    categoriesDiv.appendChild(categoryDiv);
});

container.appendChild(categoriesDiv);

// Setup search functionality
const searchInput = document.getElementById(`search_${type}`);
const searchCount = document.getElementById(`searchCount_${type}`);

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const allProcessCards = categoriesDiv.querySelectorAll('.process-card');
    let visibleCount = 0;
    
    allProcessCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const identifier = card.dataset.identifier.toLowerCase();
        const matches = name.includes(searchTerm) || identifier.includes(searchTerm);
        
        card.style.display = matches ? 'block' : 'none';
        if (matches) visibleCount++;
    });
    
    searchCount.textContent = searchTerm ? `${visibleCount} found` : '';
    
    // Show/hide empty categories and auto-open categories with matches
    categoriesDiv.querySelectorAll('.dict-category').forEach(cat => {
        const visibleCards = cat.querySelectorAll('.process-card[style="display: block;"], .process-card:not([style])');
        const hasMatches = visibleCards.length > 0;
        
        cat.style.display = hasMatches ? 'block' : 'none';
        
        const catContent = cat.querySelector('.dict-category-content');
        const catIcon = cat.querySelector('.category-icon');
        
        // Auto-open category if it has matches and search term is not empty
        if (searchTerm && hasMatches && catContent && catContent.style.display === 'none') {
            catContent.style.display = 'grid';
            if (catIcon) catIcon.textContent = '▼';
        } else if (!searchTerm && catContent && catContent.style.display === 'grid') {
            // Collapse all categories when search is cleared
            catContent.style.display = 'none';
            if (catIcon) catIcon.textContent = '▶';
        }
    });
});
}

// Create category accordion
function createCategoryAccordion(catKey, title, processes, type) {
const catDiv = document.createElement('div');
catDiv.classList.add('dict-category');

const catHeader = document.createElement('div');
catHeader.classList.add('dict-category-header');
catHeader.innerHTML = `
    <span class="category-icon">▶</span>
    <strong>${title}</strong>
    <span class="category-count">(${processes.length})</span>
`;

const catContent = document.createElement('div');
catContent.classList.add('dict-category-content');
catContent.style.display = 'none';

// Toggle category
catHeader.addEventListener('click', () => {
    const isExpanding = catContent.style.display === 'none';
    catContent.style.display = isExpanding ? 'grid' : 'none';
    catHeader.querySelector('.category-icon').textContent = isExpanding ? '▼' : '▶';
});

// Render process cards
processes.forEach(proc => {
    const card = createProcessCard(proc, type);
    catContent.appendChild(card);
});

catDiv.appendChild(catHeader);
catDiv.appendChild(catContent);

return catDiv;
}

// Create individual process card
function createProcessCard(proc, type) {
const card = document.createElement('div');
card.classList.add('process-card');
card.dataset.name = proc.executable || '';
card.dataset.identifier = proc.identifier || '';

// Process icon/name
const header = document.createElement('div');
header.classList.add('process-header');

// Process name with VirusTotal link
const nameContainer = document.createElement('div');
nameContainer.classList.add('process-name-container');

const nameSpan = document.createElement('strong');
nameSpan.textContent = proc.executable || 'Unknown';
nameContainer.appendChild(nameSpan);

// Info links
if (proc.executable) {
    // Wikipedia link
    const wikiLink = document.createElement('a');
    const wikiArticle = getWikipediaArticle(proc.executable);
    wikiLink.href = `https://en.wikipedia.org/wiki/${wikiArticle}`;
    wikiLink.target = '_blank';
    wikiLink.rel = 'noopener noreferrer';
    wikiLink.classList.add('info-link', 'wiki-link');
    wikiLink.innerHTML = 'Ⓦ';
    wikiLink.title = t('openWikipedia');
    nameContainer.appendChild(wikiLink);
    
    // Google search link
    const googleLink = document.createElement('a');
    // Prefer identifier if available, otherwise use executable name
    const searchTerm = proc.identifier || (proc.executable + ' process');
    googleLink.href = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;
    googleLink.target = '_blank';
    googleLink.rel = 'noopener noreferrer';
    googleLink.classList.add('info-link', 'google-link');
    googleLink.innerHTML = 'Ⓖ';
    googleLink.title = t('googleSearchProcess');
    nameContainer.appendChild(googleLink);
}

header.appendChild(nameContainer);

// Identifier
if (proc.identifier) {
    const identifier = document.createElement('div');
    identifier.classList.add('process-identifier');
    identifier.textContent = proc.identifier;
    header.appendChild(identifier);
}

card.appendChild(header);

// Description (only if not empty)
if (proc.description) {
    const desc = document.createElement('div');
    desc.classList.add('process-description');
    desc.textContent = proc.description;
    card.appendChild(desc);
}

// Checkboxes for boolean fields
const checkboxes = document.createElement('div');
checkboxes.classList.add('process-checkboxes');

// Active
const activeCheck = createProcessCheckbox(proc, 'active', '✓ Active', type);
checkboxes.appendChild(activeCheck);

// Ignore in AAC
const ignoreCheck = createProcessCheckbox(proc, 'ignoreInAAC', '👁️ Ignore in AAC', type);
checkboxes.appendChild(ignoreCheck);

// Strong Kill
const strongCheck = createProcessCheckbox(proc, 'strongKill', '💪 Strong Kill', type);
checkboxes.appendChild(strongCheck);

// Current User
const userCheck = createProcessCheckbox(proc, 'currentUser', '👤 Current User', type);
checkboxes.appendChild(userCheck);

card.appendChild(checkboxes);

return card;
}

// Create checkbox for process field
function createProcessCheckbox(proc, field, label, type) {
const div = document.createElement('div');
div.classList.add('process-checkbox-item');

const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.id = `${type}_${proc.index}_${field}`;
checkbox.checked = proc[field] || false;
checkbox.addEventListener('change', (e) => {
    // Update data structure
    if (type === 'prohibited') {
        parsedDictStructures.prohibitedProcesses[proc.index][field] = e.target.checked;
    } else {
        parsedDictStructures.permittedProcesses[proc.index][field] = e.target.checked;
    }
    
    // Track change
    const key = `${type}_${proc.index}_${field}`;
    parsedDictStructures.userSelections[key] = e.target.checked;
    
    debugLog(`Updated ${proc.executable}.${field} = ${e.target.checked}`);
});

const lbl = document.createElement('label');
lbl.htmlFor = checkbox.id;
lbl.textContent = label;

// Add tooltip with explanation
const tooltipText = getProcessFieldTooltip(field);
if (tooltipText) {
    lbl.title = tooltipText;
    lbl.style.cursor = 'help';
}

div.appendChild(checkbox);
div.appendChild(lbl);

return div;
}

// Get tooltip text for process field
function getProcessFieldTooltip(field) {
const tooltips = {
    active: currentLang === 'de' 
        ? 'Aktiv: Wenn aktiviert, wird dieser Prozess von SEB blockiert/überwacht. Deaktivieren, um die Regel zu ignorieren.'
        : 'Active: When enabled, this process will be blocked/monitored by SEB. Disable to ignore this rule.',
    
    ignoreInAAC: currentLang === 'de'
        ? 'In AAC ignorieren: Wenn aktiviert, wird dieser Prozess NICHT blockiert, wenn SEB im AAC-Modus (Automatic Assessment Configuration) läuft. AAC ist ein besonders restriktiver macOS/iOS-Modus für Prüfungen.'
        : 'Ignore in AAC: When enabled, this process will NOT be blocked when SEB runs in AAC mode (Automatic Assessment Configuration). AAC is a highly restrictive macOS/iOS exam mode.',
    
    strongKill: currentLang === 'de'
        ? 'Strong Kill: Wenn aktiviert, wird der Prozess hart beendet (SIGKILL). Wenn deaktiviert, sanftes Beenden (SIGTERM). Strong Kill sollte nur für hartnäckige Prozesse verwendet werden.'
        : 'Strong Kill: When enabled, the process is forcefully terminated (SIGKILL). When disabled, graceful termination (SIGTERM). Use strong kill only for stubborn processes.',
    
    currentUser: currentLang === 'de'
        ? 'Aktueller Benutzer: Wenn aktiviert, wird der Prozess nur für den aktuellen Benutzer blockiert. Wenn deaktiviert, systemweit für alle Benutzer.'
        : 'Current User: When enabled, the process is only blocked for the current user. When disabled, blocked system-wide for all users.'
};

return tooltips[field] || '';
}

// Create certificates section
function createCertificatesSection() {
const sectionDiv = document.createElement('div');
sectionDiv.classList.add('dict-section');

const header = document.createElement('div');
header.classList.add('dict-section-header', 'collapsible');
header.innerHTML = `
    <span class="expand-icon">▶</span>
    <strong>📜 Embedded Certificates</strong>
    <span class="count-badge">Certificates (will be loaded when expanded)</span>
`;

const content = document.createElement('div');
content.classList.add('dict-section-content');
content.style.display = 'none';

let contentLoaded = false;

header.addEventListener('click', async () => {
    const isExpanding = content.style.display === 'none';
    
    if (isExpanding && !contentLoaded) {
        // Lazy load dict structures if not already loaded
        if (!parsedDictStructures.loaded) {
            debugLog('🔄 Lazy loading dict structures for certificates...');
            content.innerHTML = '<div class="loading-indicator">⏳ ' + 
                (currentLang === 'de' ? 'Lade Zertifikate...' : 'Loading certificates...') + '</div>';
            content.style.display = 'block';
            
            await parseXMLDictArrays();
            parsedDictStructures.loaded = true;
            debugLog('✅ Dict structures loaded');
        }
        
        // Render certificate list
        content.innerHTML = '';
        if (parsedDictStructures.embeddedCertificates.length === 0) {
            content.innerHTML = '<div class="preset-info-box" style="margin: 1rem;">' + 
                (currentLang === 'de' 
                    ? 'Keine eingebetteten Zertifikate im Template vorhanden.' 
                    : 'No embedded certificates in template.') + 
                '</div>';
        } else {
            parsedDictStructures.embeddedCertificates.forEach((cert, index) => {
                const certCard = document.createElement('div');
                certCard.classList.add('certificate-card');
                certCard.innerHTML = `
                    <strong>Certificate ${index + 1}</strong>
                    ${cert.name ? `<div>Name: ${cert.name}</div>` : ''}
                    ${cert.certificateDataBase64 ? '<div>📄 Certificate data embedded</div>' : ''}
                `;
                content.appendChild(certCard);
            });
        }
        
        // Update count badge
        const countBadge = header.querySelector('.count-badge');
        const certCount = parsedDictStructures.embeddedCertificates.length;
        countBadge.textContent = currentLang === 'de'
            ? `${certCount} Zertifikate`
            : `${certCount} certificates`;
        
        contentLoaded = true;
    }
    
    content.style.display = isExpanding ? 'block' : 'none';
    header.querySelector('.expand-icon').textContent = isExpanding ? '▼' : '▶';
});

sectionDiv.appendChild(header);
sectionDiv.appendChild(content);

return sectionDiv;
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

const customDomainsValue = document.getElementById('customDomains')?.value || '';
const customDomains = customDomainsValue
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

const customDomainsValue = document.getElementById('customDomains')?.value || '';
const customDomains = customDomainsValue
    .split('\n')
    .map(d => d.trim())
    .filter(d => d && !d.startsWith('#'));

const allDomainsBeforeDedup = [...presetDomains, ...customDomains];
const domains = getAllDomains();
const duplicatesRemoved = allDomainsBeforeDedup.length - domains.length;

const container = document.getElementById('domainPreview');
const domainCountEl = document.getElementById('domainCount');
if (domainCountEl) domainCountEl.textContent = domains.length;

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

// Add manual URL filter rules (allowed, non-regex) from advanced settings
if (parsedDictStructures.urlFilterRules && Array.isArray(parsedDictStructures.urlFilterRules)) {
    parsedDictStructures.urlFilterRules.forEach(rule => {
        if (rule.active && rule.expression && rule.action === 1 && !rule.regex) {
            const div = document.createElement('div');
            div.className = 'domain-item';
            const label = t('urlFilterAllowLabel');
            div.textContent = `✓ ${rule.expression} ${label}`;
            container.appendChild(div);
        }
    });
}

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

// Add manual URL filter rules (blocked, non-regex) from advanced settings
const urlFilterBlockedRules = [];
if (parsedDictStructures.urlFilterRules && Array.isArray(parsedDictStructures.urlFilterRules)) {
    parsedDictStructures.urlFilterRules.forEach(rule => {
        if (rule.active && rule.expression && rule.action === 0 && !rule.regex) {
            urlFilterBlockedRules.push(rule.expression);
        }
    });
}

// Add custom blocked domains from user input
const MAX_BLOCKED_DOMAINS = 500;  // Limit blocked domains to prevent performance issues
const customBlockedInput = document.getElementById('blockedDomains')?.value || '';
if (customBlockedInput.trim()) {
    const customBlockedDomains = customBlockedInput
        .split('\n')
        .slice(0, MAX_BLOCKED_DOMAINS)  // Limit number of lines
        .map(domain => domain.trim())
        .filter(domain => domain && !domain.startsWith('#'));
    blockedDomains.push(...customBlockedDomains);
}

if (blockedDomains.length > 0 || urlFilterBlockedRules.length > 0) {
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
    
    // Add URL filter blocked rules with label
    urlFilterBlockedRules.forEach(domain => {
        const div = document.createElement('div');
        div.className = 'domain-item blocked';
        const label = t('urlFilterBlockLabel');
        div.textContent = `✗ ${domain} ${label}`;
        container.appendChild(div);
    });
}

// Show regex rules from URL filter if any
const regexAllowed = [];
const regexBlocked = [];
if (parsedDictStructures.urlFilterRules && Array.isArray(parsedDictStructures.urlFilterRules)) {
    parsedDictStructures.urlFilterRules.forEach(rule => {
        if (rule.active && rule.expression && rule.regex) {
            if (rule.action === 1) {
                regexAllowed.push(rule.expression);
            } else if (rule.action === 0) {
                regexBlocked.push(rule.expression);
            }
        }
    });
}

if (regexAllowed.length > 0) {
    const regexTitleDiv = document.createElement('div');
    regexTitleDiv.classList.add('preview-blocked-title');
    const regexTitleStrong = document.createElement('strong');
    const regexTitle = t('previewRegexAllowedTitle');
    regexTitleStrong.textContent = regexTitle;
    regexTitleDiv.appendChild(regexTitleStrong);
    container.appendChild(regexTitleDiv);
    
    regexAllowed.forEach(pattern => {
        const div = document.createElement('div');
        div.className = 'domain-item';
        div.textContent = `✓ ${pattern}`;
        container.appendChild(div);
    });
}

if (regexBlocked.length > 0) {
    const regexTitleDiv = document.createElement('div');
    regexTitleDiv.classList.add('preview-blocked-title');
    const regexTitleStrong = document.createElement('strong');
    const regexTitle = t('previewRegexBlockedTitle');
    regexTitleStrong.textContent = regexTitle;
    regexTitleDiv.appendChild(regexTitleStrong);
    container.appendChild(regexTitleDiv);
    
    regexBlocked.forEach(pattern => {
        const div = document.createElement('div');
        div.className = 'domain-item blocked';
        div.textContent = `✗ ${pattern}`;
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
const startUrlInput = document.getElementById('startUrl')?.value || '';

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
const customBlockedInput = document.getElementById('blockedDomains')?.value || '';
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

// Add manual URL filter rules from advanced settings
parsedDictStructures.urlFilterRules.forEach(rule => {
    urlFilterRulesXML += `\t\t<dict>
\t\t\t<key>action</key>
\t\t\t<integer>${rule.action}</integer>
\t\t\t<key>active</key>
\t\t\t<${rule.active ? 'true' : 'false'}/>
\t\t\t<key>expression</key>
\t\t\t<string>${escapeXML(rule.expression || '')}</string>
\t\t\t<key>regex</key>
\t\t\t<${rule.regex ? 'true' : 'false'}/>
\t\t</dict>
`;
});

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

// Add dict structures (process lists, certificates, etc.)
let dictStructuresXML = '';
if (parsedDictStructures.loaded) {
    dictStructuresXML += generateDictStructuresXML();
}

return xml + booleanOptionsXML + dictStructuresXML + `
</dict>
</plist>`;
}

// ============================================================================
// GENERATE DICT STRUCTURES XML (Process Lists, Certificates, etc.)
// ============================================================================
function generateDictStructuresXML() {
let xml = '';

// Generate prohibited processes
if (parsedDictStructures.prohibitedProcesses.length > 0) {
    xml += `\n\t<key>prohibitedProcesses</key>\n\t<array>`;
    
    parsedDictStructures.prohibitedProcesses.forEach(proc => {
        xml += `\n\t\t<dict>`;
        xml += `\n\t\t\t<key>active</key>`;
        xml += `\n\t\t\t<${proc.active ? 'true' : 'false'}/>`;
        
        if (proc.allowedExecutables !== undefined) {
            xml += `\n\t\t\t<key>allowedExecutables</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.allowedExecutables)}</string>`;
        }
        
        xml += `\n\t\t\t<key>currentUser</key>`;
        xml += `\n\t\t\t<${proc.currentUser ? 'true' : 'false'}/>`;
        
        if (proc.description !== undefined) {
            xml += `\n\t\t\t<key>description</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.description)}</string>`;
        }
        
        if (proc.executable) {
            xml += `\n\t\t\t<key>executable</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.executable)}</string>`;
        }
        
        if (proc.identifier) {
            xml += `\n\t\t\t<key>identifier</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.identifier)}</string>`;
        }
        
        xml += `\n\t\t\t<key>ignoreInAAC</key>`;
        xml += `\n\t\t\t<${proc.ignoreInAAC ? 'true' : 'false'}/>`;
        
        if (proc.originalName !== undefined) {
            xml += `\n\t\t\t<key>originalName</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.originalName)}</string>`;
        }
        
        if (proc.os !== undefined) {
            xml += `\n\t\t\t<key>os</key>`;
            xml += `\n\t\t\t<integer>${proc.os}</integer>`;
        }
        
        xml += `\n\t\t\t<key>strongKill</key>`;
        xml += `\n\t\t\t<${proc.strongKill ? 'true' : 'false'}/>`;
        
        if (proc.user !== undefined) {
            xml += `\n\t\t\t<key>user</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.user)}</string>`;
        }
        
        if (proc.windowHandlingProcess !== undefined) {
            xml += `\n\t\t\t<key>windowHandlingProcess</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.windowHandlingProcess)}</string>`;
        }
        
        xml += `\n\t\t</dict>`;
    });
    
    xml += `\n\t</array>`;
}

// Generate permitted processes (if any exist)
if (parsedDictStructures.permittedProcesses.length > 0) {
    xml += `\n\t<key>permittedProcesses</key>\n\t<array>`;
    
    parsedDictStructures.permittedProcesses.forEach(proc => {
        xml += `\n\t\t<dict>`;
        // Same structure as prohibited processes
        xml += `\n\t\t\t<key>active</key>`;
        xml += `\n\t\t\t<${proc.active ? 'true' : 'false'}/>`;
        
        if (proc.allowedExecutables !== undefined) {
            xml += `\n\t\t\t<key>allowedExecutables</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.allowedExecutables)}</string>`;
        }
        
        xml += `\n\t\t\t<key>currentUser</key>`;
        xml += `\n\t\t\t<${proc.currentUser ? 'true' : 'false'}/>`;
        
        if (proc.description !== undefined) {
            xml += `\n\t\t\t<key>description</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.description)}</string>`;
        }
        
        if (proc.executable) {
            xml += `\n\t\t\t<key>executable</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.executable)}</string>`;
        }
        
        if (proc.identifier) {
            xml += `\n\t\t\t<key>identifier</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.identifier)}</string>`;
        }
        
        xml += `\n\t\t\t<key>ignoreInAAC</key>`;
        xml += `\n\t\t\t<${proc.ignoreInAAC ? 'true' : 'false'}/>`;
        
        if (proc.originalName !== undefined) {
            xml += `\n\t\t\t<key>originalName</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.originalName)}</string>`;
        }
        
        if (proc.os !== undefined) {
            xml += `\n\t\t\t<key>os</key>`;
            xml += `\n\t\t\t<integer>${proc.os}</integer>`;
        }
        
        xml += `\n\t\t\t<key>strongKill</key>`;
        xml += `\n\t\t\t<${proc.strongKill ? 'true' : 'false'}/>`;
        
        if (proc.user !== undefined) {
            xml += `\n\t\t\t<key>user</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.user)}</string>`;
        }
        
        if (proc.windowHandlingProcess !== undefined) {
            xml += `\n\t\t\t<key>windowHandlingProcess</key>`;
            xml += `\n\t\t\t<string>${escapeXML(proc.windowHandlingProcess)}</string>`;
        }
        
        xml += `\n\t\t</dict>`;
    });
    
    xml += `\n\t</array>`;
}

// Generate embedded certificates (if any exist)
if (parsedDictStructures.embeddedCertificates.length > 0) {
    xml += `\n\t<key>embeddedCertificates</key>\n\t<array>`;
    
    parsedDictStructures.embeddedCertificates.forEach(cert => {
        xml += `\n\t\t<dict>`;
        
        if (cert.certificateDataBase64) {
            xml += `\n\t\t\t<key>certificateDataBase64</key>`;
            xml += `\n\t\t\t<data>${cert.certificateDataBase64}</data>`;
        }
        
        if (cert.name) {
            xml += `\n\t\t\t<key>name</key>`;
            xml += `\n\t\t\t<string>${escapeXML(cert.name)}</string>`;
        }
        
        if (cert.type !== undefined) {
            xml += `\n\t\t\t<key>type</key>`;
            xml += `\n\t\t\t<integer>${cert.type}</integer>`;
        }
        
        xml += `\n\t\t</dict>`;
    });
    
    xml += `\n\t</array>`;
}

return xml;
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

const rawConfigName = document.getElementById('configName')?.value || 'SEB_Config';
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

    // Get translations
    const t = TRANSLATIONS[currentLang].browserCapture;

    // Build console script from template
    const script = BROWSER_CAPTURE_TEMPLATE.scriptTemplate.replace('${PRESET_DOMAINS_JSON}', presetDomainsJSON);
    const bookmarklet = BROWSER_CAPTURE_TEMPLATE.bookmarkletTemplate;

    // Create modal
    const modal = document.createElement('div');
    modal.classList.add('browser-helper-modal');

    const content = document.createElement('div');
    content.classList.add('browser-helper-content');

    content.innerHTML = `
        <h2 class="browser-helper-title">${t.title}</h2>
        
        <div class="browser-helper-method">
            <h3>${t.method1Title}</h3>
            ${t.method1Steps.map(step => `<div class="browser-helper-step">${step}</div>`).join('')}
            
            <div class="browser-helper-input-group">
                <label class="browser-helper-label">${t.consoleLabel}</label>
                <textarea readonly class="browser-helper-textarea">${script}</textarea>
                <button id="copyScriptBtn" class="browser-helper-copy-btn">${t.copyScript}</button>
            </div>
        </div>
        
        <div class="browser-helper-method secondary">
            <h3>${t.method2Title}</h3>
            ${t.method2Steps.map(step => `<div class="browser-helper-step">${step}</div>`).join('')}
            
            <div class="browser-helper-input-group">
                <label class="browser-helper-label">${t.bookmarkletLabel}</label>
                <textarea readonly class="browser-helper-textarea bookmarklet">${bookmarklet}</textarea>
                <button id="copyBookmarkletBtn" class="browser-helper-copy-btn">${t.copyBookmarklet}</button>
            </div>
        </div>
        
        <div class="browser-helper-actions">
            <a href="https://github.com/markuskiller/SEBConfigGenerator/blob/main/docs/${currentLang}/BROWSER_CAPTURE_${currentLang === 'de' ? 'ANLEITUNG' : 'GUIDE'}.md" target="_blank" rel="noopener noreferrer" class="browser-helper-guide-link">${t.fullGuide}</a>
            <button id="closeBrowserHelperBtn" class="browser-helper-close-btn">${t.close}</button>
        </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Event listeners
    document.getElementById('copyScriptBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(script);
        const btn = document.getElementById('copyScriptBtn');
        const original = btn.textContent;
        btn.textContent = '✓ ' + t.copied;
        setTimeout(() => btn.textContent = original, 2000);
    });

    document.getElementById('copyBookmarkletBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(bookmarklet);
        const btn = document.getElementById('copyBookmarkletBtn');
        const original = btn.textContent;
        btn.textContent = '✓ ' + t.copied;
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
// MOODLE EXPORT FUNCTIONS
// ============================================================================
function generateMoodleUrlConfig() {
const config = {
    expressionsAllowed: [],
    expressionsBlocked: [],
    regexAllowed: [],
    regexBlocked: []
};

// Collect domains from selected services
let presetDomains = [];
selectedPresets.forEach(presetId => {
    const preset = PRESETS[presetId];
    if (preset && preset.domains) {
        presetDomains.push(...preset.domains);
    }
    if (preset && preset.blockedDomains) {
        config.expressionsBlocked.push(...preset.blockedDomains);
    }
});

// Check SharePoint restrictions and determine the most restrictive level
let sharepointRestrictionLevel = 0; // 0=none, 1=school, 2=site, 3=notebook/folder, 4=page/file
let specificSharePointDomain = null;

['onenote', 'word'].forEach(serviceType => {
    const serviceConfig = sharepointConfig[serviceType];
    if (serviceConfig.parsedLink && serviceConfig.parsedLink.isSharePoint && serviceConfig.parsedLink.domain) {
        const r = serviceConfig.restrictions;
        
        // Determine restriction level (most specific wins)
        if (r.page || r.file) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 4);
            specificSharePointDomain = serviceConfig.parsedLink.domain;
        } else if (r.section || r.notebook || r.folder) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 3);
            specificSharePointDomain = serviceConfig.parsedLink.domain;
        } else if (r.teamsSite) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 2);
            specificSharePointDomain = serviceConfig.parsedLink.domain;
        } else if (r.schoolSharepoint) {
            sharepointRestrictionLevel = Math.max(sharepointRestrictionLevel, 1);
            specificSharePointDomain = serviceConfig.parsedLink.domain;
        }
    }
});

// Apply domain filtering based on SharePoint restriction level
let filteredPresetDomains = presetDomains;

if (sharepointRestrictionLevel >= 1) {
    // Level 1+: Remove SharePoint-related wildcards
    const sharePointWildcardsToRemove = [
        '*.sharepoint.com',
        '*.sharepointonline.com'
    ];
    
    filteredPresetDomains = filteredPresetDomains.filter(d => 
        !sharePointWildcardsToRemove.includes(d.toLowerCase())
    );
    
    if (sharepointRestrictionLevel >= 2) {
        // Level 2+: Remove tenant-specific wildcards
        filteredPresetDomains = filteredPresetDomains.filter(d => {
            const lowerD = d.toLowerCase();
            return !(lowerD.startsWith('*.') && (lowerD.includes('.sharepoint.com') || lowerD.includes('.sharepointonline.com')));
        });
    }
    
    // Add back specific SharePoint URLs based on restriction level
    ['onenote', 'word'].forEach(serviceType => {
        const serviceConfig = sharepointConfig[serviceType];
        if (!serviceConfig.parsedLink || !serviceConfig.parsedLink.isSharePoint) return;
        
        const { parsedLink, restrictions } = serviceConfig;
        
        // Build the specific URL based on the most restrictive level
        let specificUrl = `https://${parsedLink.domain}`;
        
        // Add Teams site if available
        if (parsedLink.teamsSite && (restrictions.teamsSite || restrictions.notebook || restrictions.section || restrictions.page || restrictions.folder || restrictions.file)) {
            specificUrl += `/sites/${parsedLink.teamsSite}`;
        }
        
        if (serviceType === 'onenote') {
            if (restrictions.page && parsedLink.pageId) {
                // Most specific: Page level - use page ID
                specificUrl += `/*wd=*${parsedLink.pageId}*`;
            } else if (restrictions.section && parsedLink.sectionId) {
                // Section level - use section ID
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

// Add filtered preset domains to config
config.expressionsAllowed.push(...filteredPresetDomains);

// Add manual URL filter rules from advanced settings (if loaded)
if (parsedDictStructures.urlFilterRules && Array.isArray(parsedDictStructures.urlFilterRules)) {
    parsedDictStructures.urlFilterRules.forEach(rule => {
        // Only include active rules
        if (rule.active && rule.expression) {
            // Regex rules
            if (rule.regex && rule.action === 1) {
                config.regexAllowed.push(rule.expression);
            } else if (rule.regex && rule.action === 0) {
                config.regexBlocked.push(rule.expression);
            // Wildcard rules
            } else if (!rule.regex && rule.action === 1) {
                config.expressionsAllowed.push(rule.expression);
            } else if (!rule.regex && rule.action === 0) {
                config.expressionsBlocked.push(rule.expression);
            }
        }
    });
}

// Add custom domains
const customDomainInput = document.getElementById('customDomains')?.value?.trim() || '';
if (customDomainInput) {
    const customDomains = customDomainInput.split('\n')
        .map(d => d.trim())
        .filter(d => d.length > 0);
    config.expressionsAllowed.push(...customDomains);
}

// Add blocked domains
const blockedDomainInput = document.getElementById('blockedDomains')?.value?.trim() || '';
if (blockedDomainInput) {
    const blockedDomains = blockedDomainInput.split('\n')
        .map(d => d.trim())
        .filter(d => d.length > 0);
    config.expressionsBlocked.push(...blockedDomains);
}

// Deduplicate and sort
config.expressionsAllowed = [...new Set(config.expressionsAllowed)].sort();
config.expressionsBlocked = [...new Set(config.expressionsBlocked)].sort();

return config;
}

function handleExportFormatChange(e) {
const format = e.target.value;
const sebBtn = document.getElementById('generateBtn');
const moodleBtn = document.getElementById('generateMoodleBtn');
const sebWarning = document.getElementById('sebWarningBox');
const nextStepsBox = document.getElementById('nextStepsBox');

if (format === 'moodle') {
    sebBtn.classList.add('hidden');
    moodleBtn.classList.remove('hidden');
    sebWarning.classList.add('hidden');
    nextStepsBox.classList.add('hidden');
} else {
    sebBtn.classList.remove('hidden');
    moodleBtn.classList.add('hidden');
    sebWarning.classList.remove('hidden');
    nextStepsBox.classList.remove('hidden');
}
}

function showMoodleModal() {
debugLog('🔵 showMoodleModal called');
const config = generateMoodleUrlConfig();
debugLog('📊 Moodle config generated:', config);

// Populate expression textareas
const expressionsAllowed = document.getElementById('moodleExpressionsAllowed');
const expressionsBlocked = document.getElementById('moodleExpressionsBlocked');
const expressionsAllowedSection = document.getElementById('moodleExpressionsAllowedSection');
const expressionsBlockedSection = document.getElementById('moodleExpressionsBlockedSection');

if (expressionsAllowed) {
    expressionsAllowed.value = config.expressionsAllowed.join('\n');
}
// Open Expressions Allowed section if it has content
if (config.expressionsAllowed.length > 0 && expressionsAllowedSection) {
    expressionsAllowedSection.setAttribute('open', '');
}

if (expressionsBlocked) {
    expressionsBlocked.value = config.expressionsBlocked.join('\n');
}
// Open Expressions Blocked section if it has content
if (config.expressionsBlocked.length > 0 && expressionsBlockedSection) {
    expressionsBlockedSection.setAttribute('open', '');
}

// Populate regex textareas
const regexAllowedTextarea = document.getElementById('moodleRegexAllowed');
const regexBlockedTextarea = document.getElementById('moodleRegexBlocked');

// Regex Allowed: Show user's regex rules if available, otherwise show example
const regexAllowedSection = document.getElementById('moodleRegexAllowedSection');
const regexAllowedCopyBtn = document.querySelector('[data-field="moodleRegexAllowed"]');
if (config.regexAllowed.length > 0 && regexAllowedTextarea) {
    regexAllowedTextarea.value = config.regexAllowed.join('\n');
    regexAllowedTextarea.classList.remove('moodle-example');
    regexAllowedTextarea.removeAttribute('readonly');
    // Show copy button
    if (regexAllowedCopyBtn) {
        regexAllowedCopyBtn.style.display = 'block';
    }
    // Hide/remove example note
    const note = regexAllowedTextarea.previousElementSibling;
    if (note && note.classList.contains('moodle-example-note')) {
        note.style.display = 'none';
    }
    // Open section since it has real data
    if (regexAllowedSection) {
        regexAllowedSection.setAttribute('open', '');
    }
} else if (regexAllowedTextarea) {
    // Show example (read-only)
    regexAllowedTextarea.value = '^https://moodle\\.example\\.com/mod/resource/view\\.php\\?id=\\d+$';
    regexAllowedTextarea.classList.add('moodle-example');
    regexAllowedTextarea.setAttribute('readonly', 'readonly');
    // Hide copy button
    if (regexAllowedCopyBtn) {
        regexAllowedCopyBtn.style.display = 'none';
    }
    // Show example note
    const note = regexAllowedTextarea.previousElementSibling;
    if (note && note.classList.contains('moodle-example-note')) {
        note.style.display = 'block';
    }
}

// Regex Blocked: Show user's regex rules if available, otherwise show example
const regexBlockedSection = document.getElementById('moodleRegexBlockedSection');
const regexBlockedCopyBtn = document.querySelector('[data-field="moodleRegexBlocked"]');
if (config.regexBlocked.length > 0) {
    if (regexBlockedTextarea) {
        regexBlockedTextarea.value = config.regexBlocked.join('\n');
        regexBlockedTextarea.classList.remove('moodle-example');
        regexBlockedTextarea.removeAttribute('readonly');
    }
    // Show copy button
    if (regexBlockedCopyBtn) {
        regexBlockedCopyBtn.style.display = 'block';
    }
    // Hide example note
    const note = regexBlockedTextarea.previousElementSibling;
    if (note && note.classList.contains('moodle-example-note')) {
        note.style.display = 'none';
    }
    if (regexBlockedSection) {
        regexBlockedSection.setAttribute('open', '');
    }
} else {
    // Show example (read-only)
    if (regexBlockedTextarea) {
        regexBlockedTextarea.value = '^https://.*\\.(facebook|twitter|instagram)\\.com/.*$';
        regexBlockedTextarea.classList.add('moodle-example');
        regexBlockedTextarea.setAttribute('readonly', 'readonly');
    }
    // Hide copy button
    if (regexBlockedCopyBtn) {
        regexBlockedCopyBtn.style.display = 'none';
    }
    // Show example note
    const note = regexBlockedTextarea?.previousElementSibling;
    if (note && note.classList.contains('moodle-example-note')) {
        note.style.display = 'block';
    }
}

// Show modal
const modal = document.getElementById('moodleModal');
debugLog('🎭 Modal element found:', modal);
if (modal) {
    modal.classList.remove('hidden');
    debugLog('✅ Modal should now be visible');
} else {
    console.error('❌ Modal element not found!');
}
}

function closeMoodleModal() {
const modal = document.getElementById('moodleModal');
if (modal) {
    modal.classList.add('hidden');
}
}

function copyMoodleField(fieldId) {
const textarea = document.getElementById(fieldId);
navigator.clipboard.writeText(textarea.value);

// Visual feedback
const summary = textarea.closest('details').querySelector('summary');
const originalText = summary.innerHTML;
summary.innerHTML = originalText.replace('</strong>', ' ✓ Kopiert!</strong>');
setTimeout(() => {
    summary.innerHTML = originalText;
}, 2000);
}

function downloadMoodleTxt() {
const config = generateMoodleUrlConfig();
const lang = document.documentElement.lang || 'de';
const t = TRANSLATIONS[lang];
const buildDate = formatBuildDate(lang);

// Build content using translation keys
let content = t.moodleTxtTitle + '\n';
content += '='.repeat(70) + '\n';
content += `*** SEBConfigGenerator ${APP_VERSION} - (Build: ${buildDate}) ***\n\n`;
content += t.moodleTxtWarning + '\n\n';
content += '='.repeat(70) + '\n\n';

// Expressions Allowed
content += t.moodleTxtExpressionsAllowedLabel + '\n';
content += t.moodleTxtCopyMarkerStart + '-'.repeat(70 - t.moodleTxtCopyMarkerStart.length) + '\n';
content += config.expressionsAllowed.join('\n');
content += '\n' + t.moodleTxtCopyMarkerEnd + '-'.repeat(70 - t.moodleTxtCopyMarkerEnd.length) + '\n\n';
content += '='.repeat(70) + '\n\n';

// Regex Allowed
content += t.moodleTxtRegexAllowedLabel + '\n';
content += '-'.repeat(94) + '\n';
if (config.regexAllowed.length > 0) {
    content += config.regexAllowed.join('\n') + '\n';
} else {
    content += t.moodleTxtRegexEmpty + '\n';
    content += t.moodleTxtRegexExample + '\n';
}
content += '\n\n';

// Expressions Blocked
content += t.moodleTxtExpressionsBlockedLabel + '\n';
content += t.moodleTxtCopyMarkerStart + '-'.repeat(70 - t.moodleTxtCopyMarkerStart.length) + '\n';
content += config.expressionsBlocked.join('\n');
content += '\n' + t.moodleTxtCopyMarkerEnd + '-'.repeat(70 - t.moodleTxtCopyMarkerEnd.length) + '\n\n';

// Regex Blocked
content += t.moodleTxtRegexBlockedLabel + '\n';
content += '-'.repeat(94) + '\n';
if (config.regexBlocked.length > 0) {
    content += config.regexBlocked.join('\n') + '\n';
} else {
    content += t.moodleTxtRegexEmpty + '\n';
    content += t.moodleTxtRegexBlockedExample + '\n';
}

// Create and download file
const blob = new Blob([content], { type: 'text/plain' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'moodle-seb-config.txt';
a.click();
URL.revokeObjectURL(url);
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

// Export format selection
document.querySelectorAll('input[name="exportFormat"]').forEach(radio => {
    radio.addEventListener('change', handleExportFormatChange);
});
document.getElementById('generateMoodleBtn').addEventListener('click', showMoodleModal);
document.getElementById('downloadMoodleTxt').addEventListener('click', downloadMoodleTxt);

// Modal close handlers
document.querySelector('.modal-close').addEventListener('click', closeMoodleModal);
document.getElementById('moodleModal').addEventListener('click', (e) => {
    if (e.target.id === 'moodleModal') closeMoodleModal();
});

// Moodle modal copy buttons (event delegation)
document.getElementById('moodleModal').addEventListener('click', (e) => {
    if (e.target.closest('.btn-copy')) {
        const button = e.target.closest('.btn-copy');
        const fieldId = button.getAttribute('data-field');
        if (fieldId) {
            copyMoodleField(fieldId);
        }
    }
});

// SharePoint link parsing
document.getElementById('sharepointLink').addEventListener('input', function() {
    let url = this.value.trim();
    
    // Extract SharePoint URL(s) from potential debug output or other text
    // Handle both single URL and dual URL (web + onenote:) formats
    if (url.includes('sharepoint.com')) {
        // Check if it contains onenote: protocol (macOS format)
        if (url.includes('onenote:')) {
            // Extract both parts: web URL and onenote: URL
            const webMatch = url.match(/(https:\/\/[^\s]+sharepoint\.com[^\s]*?)(?=\s|onenote:|$)/);
            const oneNoteMatch = url.match(/onenote:(https:\/\/[^\s]+)/);
            if (webMatch && oneNoteMatch) {
                url = webMatch[1] + ' onenote:' + oneNoteMatch[1];
            } else if (webMatch) {
                url = webMatch[1];
            }
        } else {
            // Single URL (browser format) - extract just the SharePoint URL
            const urlMatch = url.match(/(https:\/\/[^\s"]+sharepoint\.com[^\s"]*)/);
            if (urlMatch) {
                url = urlMatch[1];
            }
        }
    }
    
    debugLog('[SharePoint Input] URL:', url);
    
    if (!url) {
        document.getElementById('sharepointOptions')?.classList.add('hidden');
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
// Helper function to expand advanced section and scroll to element
async function expandAdvancedSectionAndScroll(elementId) {
    const content = document.getElementById('advancedContent');
    const toggle = document.querySelector('.advanced-toggle');
    
    // Expand if not already expanded
    if (!content.classList.contains('expanded')) {
        content.classList.add('expanded');
        toggle.classList.add('expanded');
        
        // Lazy load content if needed
        if (!parsedBooleanOptions.loaded) {
            const container = document.getElementById('booleanOptionsContainer');
            if (container && container.children.length === 0) {
                // Detect and set user's platform
                const detectedPlatform = detectUserPlatform();
                currentPlatform = detectedPlatform;
                debugLog(`🔍 Detected platform: ${detectedPlatform}`);
                
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
                debugLog('🔄 Starting to load boolean options...');
                
                // Load locations for detected platform (in parallel with XML parsing)
                const [locationsResult, optionsResult] = await Promise.all([
                    loadBooleanOptionsLocations(detectedPlatform),
                    loadAndParseBooleanOptions()
                ]);
                
                debugLog('✅ Loaded options:', parsedBooleanOptions);
                parsedBooleanOptions.loaded = true;
                
                // Render boolean options first (clears container)
                renderBooleanOptions();
                
                // Render dict structures (process lists, certificates) FIRST
                debugLog('🎨 Rendering dict structures...');
                await renderDictStructures();
                debugLog('✅ Dict structures rendered');
                
                // Render URL filter rules shell AFTER dict structures (collapsed, will lazy load on expand)
                debugLog('🌐 Rendering URL filter rules shell...');
                renderURLFilterRules();
                debugLog('✅ URL filter rules shell rendered');
                
                // Setup global search
                setupGlobalSearch();
                
                // Wait a bit for rendering to complete
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }
        
        // Wait for expansion animation
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Scroll to target element
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Highlight the element briefly
        targetElement.style.transition = 'background-color 0.3s ease';
        targetElement.style.backgroundColor = '#fff3cd';
        setTimeout(() => {
            targetElement.style.backgroundColor = '';
        }, 2000);
    }
}

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
            debugLog(`🔍 Detected platform: ${detectedPlatform}`);
            
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
            debugLog('🔄 Starting to load boolean options...');
            
            // Load locations for detected platform (in parallel with XML parsing)
            const [locationsResult, optionsResult] = await Promise.all([
                loadBooleanOptionsLocations(detectedPlatform),
                loadAndParseBooleanOptions()
            ]);
            
            debugLog('✅ Loaded options:', parsedBooleanOptions);
            parsedBooleanOptions.loaded = true;
            
            // Render boolean options first (clears container)
            debugLog('🎨 Rendering boolean options...');
            renderBooleanOptions();
            debugLog('✅ Rendering complete');
            
            // Render dict structures (process lists, certificates) FIRST
            debugLog('🎨 Rendering dict structures...');
            await renderDictStructures();
            debugLog('✅ Dict structures rendered');
            
            // Render URL filter rules shell AFTER dict structures (collapsed, will lazy load on expand)
            debugLog('🌐 Rendering URL filter rules shell...');
            renderURLFilterRules();
            debugLog('✅ URL filter rules shell rendered');
            
            // Setup global search after both are rendered
            setupGlobalSearch();
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
        devBanner.classList.add('hidden');
        return;
    }
    
    // Show banner for development versions
    devBanner.classList.remove('hidden');
    
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
            .then(response => {
                if (!response.ok) {
                    throw new Error('GIT_COMMIT.txt not found');
                }
                return response.text();
            })
            .then(commitId => {
                if (devCommitEl && commitId) {
                    // Show first 7 characters of commit hash
                    devCommitEl.textContent = commitId.trim().substring(0, 7);
                }
            })
            .catch(() => {
                if (devCommitEl) {
                    devCommitEl.textContent = 'N/A';
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

// Initialize export format buttons visibility (default: .seb selected)
document.getElementById('generateBtn')?.classList.remove('hidden');
document.getElementById('generateMoodleBtn')?.classList.add('hidden');
document.getElementById('sebWarningBox')?.classList.remove('hidden');
document.getElementById('nextStepsBox')?.classList.remove('hidden');

attachEventListeners();
updatePreview();
}

// ============================================================================
// GLOBAL SEARCH (Boolean Options + Process Lists)
// ============================================================================
function setupGlobalSearch() {
const globalSearchContainer = document.getElementById('globalSearchContainer');
const globalSearchInput = document.getElementById('globalSearch');
const globalSearchCount = document.getElementById('globalSearchCount');

if (!globalSearchContainer || !globalSearchInput || !globalSearchCount) {
    console.warn('⚠️ Global search elements not found');
    return;
}

// Show global search container
globalSearchContainer.classList.remove('hidden');

// Update placeholder based on language
globalSearchInput.placeholder = currentLang === 'de' 
    ? '🔍 Alle Einstellungen und Prozesse durchsuchen...'
    : '🔍 Search all settings and processes...';

debugLog('🔍 Setting up global search...');

globalSearchInput.addEventListener('input', async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    // Lazy load dict structures if user is searching and they're not loaded yet
    if (searchTerm && !parsedDictStructures.loaded) {
        debugLog('🔄 Lazy loading dict structures for global search...');
        await parseXMLDictArrays();
        parsedDictStructures.loaded = true;
        debugLog('✅ Dict structures loaded for search');
    }
    
    let totalMatches = 0;
    
    // Search in Boolean Options
    const booleanMatches = searchInBooleanOptions(searchTerm);
    totalMatches += booleanMatches;
    
    // Search in Process Lists (only if dict structures are loaded)
    if (parsedDictStructures.loaded) {
        const processMatches = searchInProcessLists(searchTerm);
        totalMatches += processMatches;
    }
    
    // Update count
    if (searchTerm) {
        globalSearchCount.textContent = currentLang === 'de'
            ? `${totalMatches} gefunden`
            : `${totalMatches} found`;
    } else {
        globalSearchCount.textContent = '';
    }
    
    // Auto-expand sections with matches or collapse all when search is cleared
    if (searchTerm && totalMatches > 0) {
        autoExpandMatchingSections();
    } else if (!searchTerm) {
        collapseAllSections();
    }
});

debugLog('✅ Global search ready');
}

// Search in Boolean Options
function searchInBooleanOptions(searchTerm) {
const booleanContainer = document.getElementById('booleanOptionsContainer');
if (!booleanContainer) return 0;

let matchCount = 0;

// Search in all option items
const allOptions = booleanContainer.querySelectorAll('.bool-option-item');
allOptions.forEach(item => {
    const labelText = item.querySelector('.bool-option-label-text')?.textContent.toLowerCase() || '';
    const keyText = item.querySelector('.bool-option-key')?.textContent.toLowerCase() || '';
    const tooltipText = item.querySelector('.bool-option-tooltip')?.textContent.toLowerCase() || '';
    
    const itemMatches = searchTerm === '' || 
        labelText.includes(searchTerm) || 
        keyText.includes(searchTerm) ||
        tooltipText.includes(searchTerm);
    
    item.style.display = itemMatches ? 'flex' : 'none';
    
    if (itemMatches && searchTerm) {
        matchCount++;
    }
});

// Show/hide empty groups
const groups = booleanContainer.querySelectorAll('.bool-group-container');
groups.forEach(group => {
    const visibleOptions = group.querySelectorAll('.bool-option-item[style="display: flex;"], .bool-option-item:not([style])');
    const hasMatches = searchTerm === '' || visibleOptions.length > 0;
    group.style.display = hasMatches ? 'block' : 'none';
    
    // Auto-expand groups with matches
    if (searchTerm && visibleOptions.length > 0) {
        const content = group.querySelector('.bool-group-content');
        if (content) {
            content.classList.add('show');
        }
    }
});

return matchCount;
}

// Search in Process Lists
function searchInProcessLists(searchTerm) {
let matches = 0;

// Search in all dict sections
const dictSections = document.querySelectorAll('.dict-section');
dictSections.forEach(section => {
    const content = section.querySelector('.dict-section-content');
    const header = section.querySelector('.dict-section-header');
    
    // Lazy load content if not already loaded (for searching)
    if (searchTerm && content && content.innerHTML.trim() === '') {
        // Trigger click to load content
        header.click();
    }
    
    const searchInputs = section.querySelectorAll('.dict-search-input');
    
    // Synchronize local search fields with global search
    searchInputs.forEach(input => {
        input.value = searchTerm;
        // Trigger input event to update local search
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    
    // Count visible process cards
    const visibleCards = section.querySelectorAll('.process-card:not([style*="display: none"])');
    matches += visibleCards.length;
});

return matches;
}

// Auto-expand sections with matches
function autoExpandMatchingSections() {
// Expand boolean option groups with visible items
const booleanGroups = document.querySelectorAll('.bool-group-container');
booleanGroups.forEach(group => {
    const visibleItems = group.querySelectorAll('.bool-option-item:not([style*="display: none"])');
    if (visibleItems.length > 0) {
        const content = group.querySelector('.bool-group-content');
        if (content && !content.classList.contains('show')) {
            content.classList.add('show');
        }
    }
});

// Expand dict categories with visible items
const dictCategories = document.querySelectorAll('.dict-category');
dictCategories.forEach(category => {
    const visibleCards = category.querySelectorAll('.process-card:not([style*="display: none"])');
    if (visibleCards.length > 0) {
        const content = category.querySelector('.dict-category-content');
        if (content && content.style.display === 'none') {
            content.style.display = 'grid';
            const icon = category.querySelector('.category-icon');
            if (icon) icon.textContent = '▼';
        }
    }
});

// Expand main dict sections if they have content
const dictSections = document.querySelectorAll('.dict-section');
dictSections.forEach(section => {
    const visibleCards = section.querySelectorAll('.process-card:not([style*="display: none"])');
    if (visibleCards.length > 0) {
        const content = section.querySelector('.dict-section-content');
        const header = section.querySelector('.dict-section-header.collapsible');
        if (content && header && content.style.display === 'none') {
            content.style.display = 'block';
            const icon = header.querySelector('.expand-icon');
            if (icon) icon.textContent = '▼';
        }
    }
});
}

// Collapse all sections (called when search is cleared)
function collapseAllSections() {
// Collapse boolean option groups
const booleanGroups = document.querySelectorAll('.bool-group-container');
booleanGroups.forEach(group => {
    const content = group.querySelector('.bool-group-content');
    if (content && content.classList.contains('show')) {
        content.classList.remove('show');
    }
});

// Collapse dict categories
const dictCategories = document.querySelectorAll('.dict-category');
dictCategories.forEach(category => {
    const content = category.querySelector('.dict-category-content');
    const icon = category.querySelector('.category-icon');
    if (content && content.style.display === 'grid') {
        content.style.display = 'none';
        if (icon) icon.textContent = '▶';
    }
});

// Collapse main dict sections
const dictSections = document.querySelectorAll('.dict-section');
dictSections.forEach(section => {
    const content = section.querySelector('.dict-section-content');
    const header = section.querySelector('.dict-section-header.collapsible');
    if (content && header && content.style.display === 'block') {
        content.style.display = 'none';
        const icon = header.querySelector('.expand-icon');
        if (icon) icon.textContent = '▶';
    }
});
}

// ============================================================================
// TEST FUNCTIONS FOR DICT STRUCTURES (Development/Debug)
// ============================================================================
window.testDictParsing = async function() {
console.log('🧪 Testing dict structure parsing...');
const success = await parseXMLDictArrays();
if (success) {
    debugLog('✅ Parsing successful!');
    debugLog('📦 Parsed data:', parsedDictStructures);
    return parsedDictStructures;
} else {
    console.error('❌ Parsing failed!');
    return null;
}
};

window.testDictRendering = async function() {
console.log('🧪 Testing dict structure rendering...');
await renderDictStructures();
debugLog('✅ Rendering complete! Check the page.');
};

// Start the application
init();

// ============================================================================
// DOM URL Filter Management - Single Source of Truth
// ============================================================================
// All URL filter rules are stored ONLY in the DOM (configState.xmlDoc)
// No shadow accounting, no intermediate data structures
// Every operation reads from / writes to DOM directly

/**
 * Show a temporary toast message to the user
 * @param {string} message - HTML message to display
 * @param {string} type - Message type: 'info', 'warning', 'error', 'success'
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
function showTemporaryMessage(message, type = 'info', duration = 3000) {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        background: ${type === 'error' ? '#dc3545' : type === 'warning' ? '#ffc107' : type === 'success' ? '#28a745' : '#17a2b8'};
        color: ${type === 'warning' ? '#000' : '#fff'};
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;
    toast.innerHTML = message;
    
    // Add animation
    if (!document.querySelector('#toastAnimation')) {
        const style = document.createElement('style');
        style.id = 'toastAnimation';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    toastContainer.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            toast.remove();
            // Remove container if empty
            if (toastContainer.children.length === 0) {
                toastContainer.remove();
            }
        }, 300);
    }, duration);
}

/**
 * Get URLFilterRules array element from DOM
 * @returns {Element|null} The <array> element or null if not found
 */
function getURLFilterRulesArrayFromDOM() {
    if (!configState.loaded) {
        console.error('❌ DOM not loaded');
        return null;
    }
    
    const keys = configState.rootDict.getElementsByTagName('key');
    for (let key of keys) {
        if (key.textContent.trim() === 'URLFilterRules') {
            const nextElement = key.nextElementSibling;
            if (nextElement && nextElement.tagName === 'array') {
                return nextElement;
            }
        }
    }
    
    return null;
}

/**
 * Parse a <dict> element into a rule object
 * @param {Element} dictElement - The <dict> element
 * @returns {Object} Rule object
 */
function parseRuleDictFromDOM(dictElement) {
    const rule = {
        action: 1, // default: allow
        active: true,
        expression: '',
        regex: false
    };
    
    let currentKey = null;
    for (let child of dictElement.children) {
        if (child.tagName === 'key') {
            currentKey = child.textContent.trim();
        } else if (currentKey) {
            switch (currentKey) {
                case 'action':
                    rule.action = parseInt(child.textContent) || 1;
                    break;
                case 'active':
                    rule.active = child.tagName === 'true';
                    break;
                case 'expression':
                    rule.expression = child.textContent || '';
                    break;
                case 'regex':
                    rule.regex = child.tagName === 'true';
                    break;
            }
            currentKey = null;
        }
    }
    
    return rule;
}

/**
 * Create a <dict> element from a rule object
 * @param {Object} rule - Rule object
 * @returns {Element} The <dict> element
 */
function createRuleDictElement(rule) {
    const dict = configState.xmlDoc.createElement('dict');
    
    // Action
    const actionKey = configState.xmlDoc.createElement('key');
    actionKey.textContent = 'action';
    const actionValue = configState.xmlDoc.createElement('integer');
    actionValue.textContent = String(rule.action ?? 1);
    dict.appendChild(actionKey);
    dict.appendChild(actionValue);
    
    // Active
    const activeKey = configState.xmlDoc.createElement('key');
    activeKey.textContent = 'active';
    const activeValue = configState.xmlDoc.createElement(rule.active ? 'true' : 'false');
    dict.appendChild(activeKey);
    dict.appendChild(activeValue);
    
    // Expression
    const exprKey = configState.xmlDoc.createElement('key');
    exprKey.textContent = 'expression';
    const exprValue = configState.xmlDoc.createElement('string');
    exprValue.textContent = rule.expression || '';
    dict.appendChild(exprKey);
    dict.appendChild(exprValue);
    
    // Regex
    const regexKey = configState.xmlDoc.createElement('key');
    regexKey.textContent = 'regex';
    const regexValue = configState.xmlDoc.createElement(rule.regex ? 'true' : 'false');
    dict.appendChild(regexKey);
    dict.appendChild(regexValue);
    
    return dict;
}

/**
 * Read all URL filter rules from DOM
 * @returns {Array} Array of rule objects
 */
function getURLFilterRulesFromDOM() {
    const arrayElement = getURLFilterRulesArrayFromDOM();
    if (!arrayElement) return [];
    
    const rules = [];
    const dicts = arrayElement.getElementsByTagName('dict');
    
    for (let dict of dicts) {
        const rule = parseRuleDictFromDOM(dict);
        rules.push(rule);
    }
    
    debugLog(`📖 Read ${rules.length} URL filter rules from DOM`);
    return rules;
}

/**
 * Write URL filter rules array to DOM (replaces entire array)
 * @param {Array} rules - Array of rule objects
 */
function setURLFilterRulesInDOM(rules) {
    if (!configState.loaded) {
        console.error('❌ DOM not loaded');
        return false;
    }
    
    // Find URLFilterRules key
    const keys = configState.rootDict.getElementsByTagName('key');
    let urlFilterKey = null;
    for (let key of keys) {
        if (key.textContent.trim() === 'URLFilterRules') {
            urlFilterKey = key;
            break;
        }
    }
    
    if (!urlFilterKey) {
        console.error('❌ URLFilterRules key not found in DOM');
        return false;
    }
    
    // Remove old array
    const oldArray = urlFilterKey.nextElementSibling;
    if (oldArray && oldArray.tagName === 'array') {
        configState.rootDict.removeChild(oldArray);
    }
    
    // Create new array
    const newArray = configState.xmlDoc.createElement('array');
    
    // Add all rules as <dict> elements
    rules.forEach(rule => {
        const dict = createRuleDictElement(rule);
        newArray.appendChild(dict);
    });
    
    // Insert new array after key
    urlFilterKey.parentNode.insertBefore(newArray, urlFilterKey.nextSibling);
    
    debugLog(`✅ Wrote ${rules.length} URL filter rules to DOM`);
    return true;
}

/**
 * Add a single URL filter rule to DOM
 * Checks for duplicates and handles according to source:
 * - tool-preset/sharepoint: Silent ignore (auto-generated, overlaps are normal)
 * - custom/imported: Show info message to user (manual action requires feedback)
 * 
 * @param {Object} rule - Rule object to add (must include expression)
 * @param {string} source - Source of rule: 'tool-preset', 'sharepoint', 'custom', 'imported'
 * @returns {boolean} True if added, false if duplicate
 */
function addURLFilterRuleToDOM(rule, source = 'custom') {
    const currentRules = getURLFilterRulesFromDOM();
    
    // Check for duplicate (same expression)
    const duplicate = currentRules.find(r => r.expression === rule.expression);
    
    if (duplicate) {
        // Silent ignore for auto-generated sources
        if (source === 'tool-preset' || source === 'sharepoint') {
            debugLog(`⏭️ Skipped duplicate (${source}): ${rule.expression}`);
            return false;
        }
        
        // Info message for manual sources
        if (source === 'custom' || source === 'imported') {
            const message = currentLang === 'de'
                ? `Domain bereits vorhanden: <code>${rule.expression}</code>`
                : `Domain already exists: <code>${rule.expression}</code>`;
            
            showTemporaryMessage(message, 'info', 3000);
            debugLog(`⚠️ Duplicate rejected (${source}): ${rule.expression}`);
            return false;
        }
    }
    
    // No duplicate - add to DOM
    currentRules.push(rule);
    setURLFilterRulesInDOM(currentRules);
    debugLog(`➕ Added rule to DOM (${source}): ${rule.expression}`);
    return true;
}

/**
 * Delete URL filter rule from DOM by index
 * @param {number} index - Index of rule to delete
 */
function deleteURLFilterRuleFromDOM(index) {
    const currentRules = getURLFilterRulesFromDOM();
    if (index < 0 || index >= currentRules.length) {
        console.error(`❌ Invalid index ${index} for ${currentRules.length} rules`);
        return false;
    }
    
    const deletedRule = currentRules[index];
    currentRules.splice(index, 1);
    setURLFilterRulesInDOM(currentRules);
    debugLog(`🗑️ Deleted rule from DOM at index ${index}: ${deletedRule.expression}`);
    return true;
}

/**
 * Update URL filter rule in DOM by index
 * @param {number} index - Index of rule to update
 * @param {Object} updates - Properties to update
 */
function updateURLFilterRuleInDOM(index, updates) {
    const currentRules = getURLFilterRulesFromDOM();
    if (index < 0 || index >= currentRules.length) {
        console.error(`❌ Invalid index ${index} for ${currentRules.length} rules`);
        return false;
    }
    
    // Merge updates
    Object.assign(currentRules[index], updates);
    setURLFilterRulesInDOM(currentRules);
    debugLog(`✏️ Updated rule in DOM at index ${index}:`, updates);
    return true;
}

/**
 * Refresh parsedDictStructures.urlFilterRules from DOM (read-only view for UI)
 */
function refreshURLFilterViewFromDOM() {
    parsedDictStructures.urlFilterRules = getURLFilterRulesFromDOM();
    debugLog(`🔄 Refreshed URL filter view: ${parsedDictStructures.urlFilterRules.length} rules`);
}

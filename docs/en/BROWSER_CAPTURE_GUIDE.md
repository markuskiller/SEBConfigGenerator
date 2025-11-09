# Browser-Based Domain Capture Guide

## 🌐 No Downloads Required!

This guide shows you how to capture network domains using only your browser - perfect for macOS, Linux, or any system where PowerShell isn't available.

---

## Method 1: Bookmarklet (Recommended)

### One-Time Setup (30 seconds)

1. **Show your bookmarks bar** (if hidden):
   - Chrome/Edge: Press `Ctrl+Shift+B` (Windows) or `Cmd+Shift+B` (Mac)
   - Firefox: Press `Ctrl+Shift+B` (Windows) or `Cmd+Shift+B` (Mac)
   - Safari: View → Show Favorites Bar

2. **Create the bookmarklet**:
   - Right-click on your bookmarks bar
   - Select "Add Page" or "Add Bookmark"
   - **Name**: `SEB Domain Capture`
   - **URL**: Copy the code from [Bookmarklet Code](#bookmarklet-code) section below
   - Save it

### How to Use

1. **Clear your browser cache** (important!):
   - Chrome: `Ctrl+Shift+Delete` → Clear browsing data
   - Firefox: `Ctrl+Shift+Delete` → Clear recent history
   - Safari: Safari → Clear History

2. **Navigate to your service**:
   - Example: Go to `https://www.onenote.com`
   - Log in with a student test account
   - Click around the interface (open notebooks, create pages, etc.)

3. **Click the bookmarklet**:
   - Click "SEB Domain Capture" in your bookmarks bar
   - A dialog will appear showing all captured domains

4. **Copy the results**:
   - Click "Copy to Clipboard"
   - Paste into the "Custom Domains" field in the SEB Config Generator

---

## Method 2: Browser DevTools (Alternative)

### For Chrome, Edge, or Brave

1. **Open DevTools**: Press `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)

2. **Go to Network tab**: Click "Network" at the top

3. **Clear cache and refresh**: 
   - Right-click the refresh button
   - Select "Empty Cache and Hard Reload"

4. **Use your service**:
   - Log in
   - Navigate through different sections
   - Perform typical student tasks

5. **Extract domains**:
   - Click "Console" tab in DevTools
   - Paste the code from [DevTools Script](#devtools-script) section below
   - Press Enter
   - Domains will be automatically copied to clipboard

### For Firefox

1. **Open DevTools**: Press `F12`

2. **Network tab**: Click "Network"

3. **Clear cache**: Settings (gear icon) → Check "Disable Cache"

4. **Refresh page**: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

5. **Use the service** normally

6. **Run script**:
   - Switch to "Console" tab
   - Paste the script from [DevTools Script](#devtools-script)
   - Press Enter

### For Safari

1. **Enable DevTools** (first time only):
   - Safari → Preferences → Advanced
   - Check "Show Develop menu in menu bar"

2. **Open Web Inspector**: Press `Cmd+Option+I`

3. **Network tab**: Click "Network"

4. **Use the service** and capture traffic

5. **Run script** in Console tab (same as other browsers)

---

## Bookmarklet Code

**Copy this entire block** (including `javascript:`) and paste it as the URL of your bookmark:

```javascript
javascript:(function(){const domains=new Set();performance.getEntries().forEach(e=>{try{const u=new URL(e.name);if(u.hostname&&!u.hostname.match(/^(localhost|127\.0\.0\.1|::1)$/)){domains.add(u.hostname)}}catch(err){}});if(typeof PerformanceObserver!=='undefined'){const observer=new PerformanceObserver(list=>{list.getEntries().forEach(e=>{try{const u=new URL(e.name);if(u.hostname&&!u.hostname.match(/^(localhost|127\.0\.0\.1|::1)$/)){domains.add(u.hostname)}}catch(err){}})});observer.observe({entryTypes:['resource']});}const sorted=[...domains].sort();let output='SEB Domain Capture\n'+'='.repeat(50)+'\n\n';output+='Total domains: '+sorted.length+'\n\n';output+='DOMAINS (copy below):\n'+'-'.repeat(50)+'\n';output+=sorted.join('\n')+'\n';output+='-'.repeat(50)+'\n\n';output+='Wildcards (recommended):\n'+'-'.repeat(50)+'\n';const wildcards=new Set();sorted.forEach(d=>{const parts=d.split('.');if(parts.length>2){wildcards.add('*.'+parts.slice(-2).join('.'))}else{wildcards.add(d)}});output+=[...wildcards].sort().join('\n');const modal=document.createElement('div');modal.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:white;padding:30px;border-radius:12px;box-shadow:0 10px 40px rgba(0,0,0,0.3);z-index:999999;max-width:600px;max-height:80vh;overflow:auto;font-family:monospace;';const pre=document.createElement('pre');pre.textContent=output;pre.style.cssText='background:#f5f5f5;padding:15px;border-radius:6px;overflow:auto;max-height:400px;font-size:12px;';const btnContainer=document.createElement('div');btnContainer.style.cssText='margin-top:20px;display:flex;gap:10px;';const copyBtn=document.createElement('button');copyBtn.textContent='📋 Copy to Clipboard';copyBtn.style.cssText='padding:12px 20px;background:#5e72e4;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;flex:1;';copyBtn.onclick=()=>{navigator.clipboard.writeText(sorted.join('\n')).then(()=>{copyBtn.textContent='✓ Copied!';setTimeout(()=>copyBtn.textContent='📋 Copy to Clipboard',2000)})};const closeBtn=document.createElement('button');closeBtn.textContent='✕ Close';closeBtn.style.cssText='padding:12px 20px;background:#e9ecef;color:#32325d;border:none;border-radius:6px;cursor:pointer;font-weight:600;';closeBtn.onclick=()=>modal.remove();btnContainer.appendChild(copyBtn);btnContainer.appendChild(closeBtn);modal.appendChild(pre);modal.appendChild(btnContainer);document.body.appendChild(modal)})();
```

---

## DevTools Script

**IMPORTANT:** Copy the script directly from the SEB Generator (click "🌐 Browser Helper" button)!

The script automatically shows **only new domains** that are not already included in your selected preset configuration.

### Features:

✅ **Smart Filtering**: Compares captured domains against current preset  
✅ **Wildcard Matching**: Recognizes `*.domain.com` patterns in preset  
✅ **Clear Output**: Shows only domains you need to add  
✅ **Statistics**: See how many domains are already covered

### Usage:

1. **Select your preset** in SEB Generator (e.g., OneNote)
2. **Click "🌐 Browser Helper"** button
3. **Copy the Console Script** from the dialog
4. **Open your service** and use it fully
5. **Press F12** → Console tab
6. **Paste script** and press Enter

### Example Output:

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

### If no new domains are found:

```
✅ NO NEW DOMAINS NEEDED!
All captured domains are already in the preset.
```

This means your preset already covers everything - no additional domains needed!

---

## Tips for Best Results

### ✅ DO:
- **Clear cache** before starting capture
- **Use a student test account** (not your teacher account - they may have different permissions)
- **Click through all features** they'll need:
  - Open documents/notebooks
  - Create new items
  - Upload/download files
  - Use spell check
  - Access help/support
- **Wait for pages to fully load** before moving on
- **Run the capture multiple times** during your session to catch all domains

### ❌ DON'T:
- Capture on a page with personal data (bookmarklet can see the page)
- Rush through - give pages time to load resources
- Forget to test with student account permissions
- Skip clearing cache (old domains may appear)

---

## Troubleshooting

### "No domains captured" or very few domains

**Solution:**
1. Make sure you cleared cache and reloaded
2. Interact more with the service (click links, open features)
3. Try the DevTools method instead (more reliable)
4. Wait longer for resources to load

### "Clipboard copy failed"

**Solution:**
- Manually select and copy the domains from the console output
- Chrome sometimes blocks clipboard access - try the bookmarklet instead

### "Too many domains" (hundreds)

**Solution:**
- Use the "wildcard" recommendations instead of individual domains
- Filter out obvious third-party analytics (e.g., `googletagmanager.com`, `hotjar.com`)
- Focus on domains that match your service provider

### Domains not working in SEB

**Solution:**
- Test with the **exact domains** first (not wildcards)
- Add authentication domains:
  - Microsoft: `login.microsoftonline.com`, `*.msauth.net`
  - Google: `accounts.google.com`, `*.gstatic.com`
- Check for missing CDN domains (usually `*.cdn.*` or `*.azureedge.net`)

---

## Comparison: Browser vs PowerShell

| Feature | Browser Method | PowerShell Script |
|---------|---------------|-------------------|
| **Platform** | ✅ All (Mac/Win/Linux) | ❌ Windows only |
| **Installation** | ✅ None needed | ⚠️ Requires Fiddler |
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Completeness** | ⭐⭐⭐⭐ (good) | ⭐⭐⭐⭐⭐ (best) |
| **Real-time** | ❌ Post-capture only | ✅ Live monitoring |

**Recommendation:** 
- **Use browser method** for quick captures and most services
- **Use PowerShell** for complex services or complete enterprise deployments

---

## Example Workflow

### Capturing OneNote Domains

```
1. Open Chrome (private/incognito window)
2. Clear cache: Ctrl+Shift+Delete
3. Open DevTools: F12
4. Network tab → Check "Disable cache"
5. Go to: https://www.onenote.com
6. Log in with student test account
7. Open a notebook
8. Create a new page
9. Type some text
10. Add an image
11. Share a notebook
12. Switch to Console tab
13. Paste the DevTools script
14. Press Enter
15. ✓ Domains copied to clipboard!
16. Go to SEB Config Generator
17. Paste into "Custom Domains" field
18. Download .seb config file
19. Test it!
```

---

## Next Steps

After capturing domains:

1. **Paste into SEB Config Generator**
2. **Preview the domain list** (make sure it looks reasonable)
3. **Download .seb template**
4. **Import into SEB Config Tool**
5. **Refine, encrypt, and save final version**
6. **Test with student account** in SEB browser

---

## Questions?

- Full teacher guide: [TEACHER_GUIDE.md](TEACHER_GUIDE.md)
- German version: [SCHNELLSTART_ANLEITUNG.md](../de/SCHNELLSTART_ANLEITUNG.md)
- PowerShell alternative: [scripts/capture-helper.ps1](../../scripts/capture-helper.ps1)

**Happy capturing! 🎯**

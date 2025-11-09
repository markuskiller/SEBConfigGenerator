# SEB Config Generator - Deployment Guide

## 🚀 Quick Start (3 Options)

### Option 1: GitHub Pages (Recommended)
**Best for:** School-wide deployment, easy updates

1. Create GitHub account (if needed)
2. Create new repository: `seb-config-generator`
3. Upload `index.html` to repository root
4. Go to Settings → Pages → Enable GitHub Pages
5. Share URL: `https://yourusername.github.io/seb-config-generator/`

**Pros:**
- ✅ Free hosting
- ✅ HTTPS by default
- ✅ Easy to update (just commit changes)
- ✅ Custom domain support
- ✅ No server maintenance

**Cons:**
- ⚠️ Requires GitHub account
- ⚠️ Public repository (or paid for private)

---

### Option 2: School Web Server
**Best for:** Schools with existing web infrastructure

1. Copy `index.html` to your web server:
   ```bash
   scp index.html user@school-server:/var/www/html/seb-generator/
   ```

2. Set permissions:
   ```bash
   chmod 644 /var/www/html/seb-generator/index.html
   ```

3. Access at: `https://yourschool.edu/seb-generator/`

**Pros:**
- ✅ Full control
- ✅ Can integrate with school SSO
- ✅ Private hosting

**Cons:**
- ⚠️ Requires IT support
- ⚠️ Manual updates

---

### Option 3: Standalone File
**Best for:** Individual teachers, offline use

1. Save `index.html` to Desktop or USB drive
2. Double-click to open in any browser
3. Works completely offline!

**Pros:**
- ✅ No hosting needed
- ✅ Works offline
- ✅ Instant setup

**Cons:**
- ⚠️ Must distribute file manually
- ⚠️ Updates require redistribution

---

## 📚 Teacher Quick Guide

### Creating Your First Config

1. **Choose Service:** Click the preset (OneNote, Word, Google Docs)
2. **Customize Settings:**
   - Security Level: Start with "Balanced"
   - Check/uncheck options as needed
3. **Add Custom Domains** (if needed):
   - One domain per line
   - Use wildcards: `*.example.com`
4. **Download Template:** Click "Download SEB Config (.seb)"
5. **Finalize in Config Tool:**
   - Import template into SEB Config Tool
   - Add passwords and encryption
   - Save encrypted final version
6. **Test with student account!**

### Advanced: Network Capture

If a service isn't working with presets:

1. Follow "Network Capture" tab instructions
2. Use Fiddler to capture traffic
3. Upload HAR file to "Analyze Domains" tab
4. Use discovered domains in your config

---

## 🔧 Customization

### Adding New Presets

Edit the `PRESETS` object in `index.html`:

```javascript
myservice: {
    name: "My Custom Service",
    description: "Description here",
    startUrl: "https://service.com",
    domains: [
        "*.service.com",
        "auth.service.com",
        // Add more domains
    ]
}
```

### Changing Colors

Update CSS variables at the top of `<style>`:

```css
/* Primary color */
background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR2 100%);
```

### Adding School Logo

Add to header section:

```html
<div class="header">
    <img src="school-logo.png" alt="School Logo" style="height: 50px; margin-bottom: 10px;">
    <h1>🛡️ SEB Config Generator</h1>
    <!-- ... -->
</div>
```

---

## 🛠️ Technical Requirements

### Browser Compatibility
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ No plugins required

### File Size
- Single HTML file: ~30KB
- No external dependencies
- Works offline

### Security
- All processing happens in browser
- No data sent to servers
- No cookies or tracking

---

## 📖 Using the Generated Configs

### Complete Workflow (Required)

1. **Download template** from the generator (`.seb` file)
2. **Import into SEB Config Tool:**
   - Download [SEB Config Tool](https://safeexambrowser.org/)
   - File → Open → Select your `.seb` template
3. **Refine settings:**
   - Add administrator password
   - Add quit password
   - Configure additional restrictions
4. **Encrypt the configuration:**
   - Configure → Encrypt with password or certificate
   - This prevents students from modifying settings
5. **Save final version:**
   - File → Save As → `YourService_Final.seb`
6. **Distribute encrypted `.seb` file** to students (email/LMS)
7. **Students double-click** the `.seb` file
8. **SEB starts** with the secure configuration

**Important:** Never distribute the unencrypted template directly to students!

---

## 🧪 Testing Checklist

Before deploying to students:

- [ ] Can access start URL
- [ ] Authentication completes successfully
- [ ] MFA/2FA works (if applicable)
- [ ] Can perform intended tasks
- [ ] External links are blocked
- [ ] Can exit SEB (if allowed)
- [ ] Download/upload works (if enabled)
- [ ] No unexpected blocks

### Test with:
- ✅ Student account (not admin!)
- ✅ Clean browser profile
- ✅ School network
- ✅ Home network (if BYOD)

---

## ❓ Troubleshooting

### "Can't authenticate" or "Page won't load"

**Solution:** Capture network traffic and add missing domains

1. Go to "Network Capture" tab
2. Follow Fiddler instructions
3. Complete full auth flow
4. Upload HAR file to "Analyze Domains"
5. Add discovered domains to config

### "Too restrictive" - Students getting blocked

**Solution:** Switch to "Relaxed" security level and enable more options

### "MFA/2FA not working"

**Solution:** Add authentication-specific domains:

```
# Microsoft
*.msftauth.net
*.msauth.net
login.microsoftonline.com

# Google
accounts.google.com
*.googleusercontent.com
```

### "Can't download generated file"

**Solution:** Check browser download settings, try different browser

---

## 🔒 Security Considerations

### What This DOES:
- ✅ Blocks casual distractions (social media, games)
- ✅ Prevents easy tab-switching
- ✅ Creates "focus mode" environment

### What This DOESN'T:
- ❌ Prevent determined circumvention on BYOD
- ❌ Replace managed/locked devices
- ❌ Provide forensic monitoring

### Remember:
> "SEB on BYOD is a psychological barrier and convenience tool,
> not a security lockdown. It's meant to replace paper-based
> alternatives, not compete with managed device setups."

---

## 📞 Support

### Common Questions

**Q: Can students bypass this on their own devices?**
A: Yes, technically. SEB on BYOD is about creating focus, not absolute security.

**Q: Will this work on Chromebooks?**
A: Limited. SEB has experimental Chromebook support, but it's not recommended.

**Q: Can we use this for high-stakes exams?**
A: No. Use managed devices or proctored environments for high-stakes assessments.

**Q: How often should we update configs?**
A: Check quarterly, or when Microsoft/Google update their auth systems.

### Resources

- Safe Exam Browser: https://safeexambrowser.org/
- Documentation: https://safeexambrowser.org/developer/
- Fiddler: https://www.telerik.com/fiddler

---

## 📝 License

This tool is provided as-is for educational use. Feel free to modify and distribute.

---

## 🎯 Best Practices

1. **Start Permissive:** Use "Relaxed" mode first, tighten if needed
2. **Test Thoroughly:** Always test with actual student accounts
3. **Communicate Clearly:** Tell students what SEB does and why
4. **Have Fallbacks:** Keep paper-based alternatives ready
5. **Update Regularly:** Auth systems change; keep configs current
6. **Document Issues:** Track what works and what doesn't
7. **Share Knowledge:** Help colleagues with your findings

---

## 🔄 Version History

### v1.0 (Current)
- Initial release
- Support for MS365, Google Workspace
- Network capture analysis
- Three security levels

### Roadmap
- [ ] Browser extension for easier capture
- [ ] Cloud save/share configs
- [ ] Template library
- [ ] Mobile-responsive design improvements

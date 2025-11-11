# Quick Start Guide for Teachers
## SEB Configuration Generator with Google Sites

### What is this tool?

Creates Safe Exam Browser (SEB) configurations that help students focus on classwork by blocking distractions.

**Important:** This is NOT for final exams! It's for:
- ✅ Digital worksheets during class
- ✅ Collaborative writing tasks
- ✅ Focus mode for classroom activities
- ✅ Interactive tool usage (Kahoot, Mentimeter, Padlet)

---

## 🌟 Recommended Approach: Choose 'Google Sites' page as start page

### Why Google Sites?

**Technically the easiest way to achieve focus mode in class when you don't want/can't fully rely on an LMS:**

1. **One central entry page** - All lesson activities in one place
2. **Easy control** - See immediately who is in SEB mode
3. **Flexible lesson planning** - Use different tools via links sequentially
4. **Control** - "Secret" URL prevents access outside the SEB environment

### How does it work?

```
Student starts .seb file
    ↓
Automatically opens your Google Sites page
    ↓
Student clicks links to activities (Kahoot, Mentimeter, etc.)
    ↓
Everything works - only allowed domains accessible
    ↓
No distractions (YouTube, social media blocked)
```

---

## Step-by-Step: Your First Configuration

### Step 1: Create Google Sites entry page

1. **Open Google Sites:** [sites.google.com](https://sites.google.com)

2. **Create new page:**
   - Click "+" (New site)
   - Name: `[Subject]_[Class]_[Date]` (e.g., "English_G22e_2025-11-10")

3. **Add content - Example:**

```
┌─────────────────────────────────────────────────┐
│  English - Revision Conditionals 10/11/2025     │
│  ═══════════════════════════════════════════    │
│                                                 │
│    CHECK: Visual indicator for teacher          │
│           Color / image -> on                   │
│           screen easily shows                   │
│           whether students are in               │
│           SEB mode                              │
│                                                 │                 
│    Schedule today (45 minutes):                 │
│  ────────────────────────────────               │
│  1 [10 Min] Kahoot Quiz - Review                │
│        Link: https://kahoot.it                  │
│                                                 │
│                                                 │
│  2 [15 Min] Mentimeter Poll                     │
│        Link: https://menti.com                  │
│                                                 │
│                                                 │
│  3 [20 Min] Padlet - Solution strategies        │
│        Link: https://padlet.com/class/math      │
│                                                 │
│  Need help? → Raise your hand!                  │
└─────────────────────────────────────────────────┘
```

3. **Set visibility, publish and copy URL:**
   - Select **"Publish"**
   - ❌ **Don't let the page be indexed**
   - ✅ Deliberately choose a complex/secret URL (e.g., `sites.google.com/view/English_G22e_2025-11-10xy7z3abc`)

---

### Step 2: Open generator
Go to: `https://markuskiller.github.io/SEBConfigGenerator/` (or <a href="https://raw.githubusercontent.com/markuskiller/SEBConfigGenerator/main/index.html" download="SEBConfigGenerator.html"></a>download `index.html` and open the generator locally in your browser).

⚠️ Important: With both methods, no data is transmitted; all processing happens locally in your browser.

### Step 3: Select services (multiple possible!)

**Without login:**
- **Whiteboard.fi** - Collaborative whiteboard
- **Kahoot!** - Quizzes and polls
- **Mentimeter** - Live polls
- **Slido** - Q&A and polls
- **Microsoft Forms** - Public surveys
- **Padlet** - Digital pinboard
- **Miro** - Digital whiteboard
- **Etherpad** - Text collaboration

**With login:**
- **OneNote Online** - For digital notebooks
- **Word Online** - For document editing

For the example above in English class, the following services are selected:
- Kahoot
- Menti
- Padlet

### Step 4: Start URL and Custom Domains

1. **Enter start URL:**
   ```
   https://sites.google.com/view/your-secret-page-xyz123
   ```

For the example above: `sites.google.com/view/English_G22e_2025-11-10xy7z3abc`

### Step 5: Continue with default values

For a working SEB configuration template, the default values can normally be kept unchanged. Fine-tuning can be done in the SEB Config Tool.

### Step 6: Download configuration
Click: **"📥 Download SEB Configuration (.seb)"**

Will be saved as `Multi_Service_Config.seb` (multiple services), `[Service]_Config.seb` (selected service), or under the manually entered filename.

### Step 8: Import and finalize in SEB Config Tool

**⚠️ The downloaded `.seb` file is only a template!**

1. Download [SEB Config Tool](https://safeexambrowser.org/download_en.html) (one-time setup)
2. Open **SEB Config Tool**
3. **File → Open** → Select your downloaded `.seb` file
4. **Tab 'General' → Review and refine settings:**
   - Add administrator password (needed to adjust configuration file later)
   - Add quit password (if desired)
   - Configure additional restrictions
5. **Tab 'Config' → Encrypt configuration & set START password:**
   - Configure → Encrypt with password and/or certificate
   - **⚠️ The 'SETTINGS' password is also the START password for students**
6. **Save as final .seb file:**
   - File → Save as → `Lesson_[Date]_[Class].seb`

**Important:** Only distribute the encrypted, finalized `.seb` file to students!

### Step 9: Test & Distribute

## Test - ⚠️ Before distributing to students:**

1. Install SEB on your computer
2. Double-click your `.seb` config file
3. Try to:
   - Log in with a STUDENT (TEST) ACCOUNT (not with teacher account)
   - Access shared resources
   - Type and save something, if intended
   - If creating/visiting links via a shared page is possible, try to access a page that should be blocked (e.g., MS Teams)

**If something doesn't work:** See troubleshooting below

## Distribute to students in an appropriate manner

It often makes sense to install the [SafeExamBrowser](https://safeexambrowser.org/download_en.html) together in class (once per semester or when a new version is available).

The configuration can be distributed to students via the usual communication channel with file sharing capability (e.g., MS Teams or email).

---

## Troubleshooting

### Problem: "Can't log in" or "Page won't load"

**Likely cause:** Missing authentication domains

**Solution:**
1. Go to the **"Network Capture"** tab in the tool
2. Follow the Fiddler instructions
3. Upload the capture file
4. Add discovered domains to the configuration

**Or:** Ask IT to check school firewall settings and assist in analyzing necessary domain connections.

---

### Problem: "MFA/Two-factor authentication doesn't work"

**Solution:** Add all necessary domains in the "Custom Domains" section. Follow the instructions in the 'Network Capture' section:

**For Microsoft (e.g.):**
```
*.msftauth.net
*.msauth.net
login.microsoftonline.com
...
```

**For Google (e.g.):**
```
accounts.google.com
*.googleusercontent.com
...
```

---

### Problem: "Too restrictive / Students are frustrated"

**Solution:**
1. Switch from "Strict" → "Balanced" or "Relaxed"
2. Enable more options (downloads, reload, etc.)

**Remember:** On their own devices, determined students can always bypass restrictions if they have enough knowledge, time & motivation. That's okay - it's about **focus**, not primarily **surveillance**. Such problems need to be solved at the pedagogical level.

---

### Problem: "Students still access social media"

**Solution:**
1. Switch to "Balanced" or "Strict"
2. Ensure URL filtering is enabled

**Remember:** On their own devices, determined students can always bypass restrictions if they have enough knowledge, time & motivation. That's okay - it's about **focus**, not primarily **surveillance**. Such problems need to be solved at the pedagogical level.

---

### Problem: "File downloads don't work"

**Solution:**
1. Edit configuration
2. ✅ Enable "Allow downloads"
3. Regenerate and test

---

## Advanced: Add Your Own Service

**Example:** You want to allow Wikipedia for quizzes

1. Go to the tool
2. In the **"Custom Domains"** section, add:
```
en.wikipedia.org
```

3. Set Wikipedia as start URL or link to `https://en.wikipedia.org` within already shared resources (e.g., on the Google Sites entry page)
4. Generate configuration

---

## FAQ

**Q: Do students need to install anything?**
A: Yes, Safe Exam Browser (free download)

**Q: Does this work on phones/tablets?**
A: Not on all tablets, SEB is available for Windows/macOS and iPadOS.

**Q: Can students uninstall it afterwards?**
A: Yes! It's just an app. Encourage students to keep it for future use.

**Q: Is this secure enough for final exams?**
A: **No.** Use this for classwork, not for high stakes exams.

**Q: What if students don't have their own device or forgot their device?**
A: Use school computers if possible

**Q: Can I edit an existing configuration?**
A: Yes! Open the `.seb` file in SEB Config Tool to make changes (but be sure to encrypt before distributing to students!)

**Q: Do I need the SEB Config Tool?**
A: **Yes!** The generator creates a template that must be refined, encrypted, and finalized in the Config Tool before distribution.

**Q: Why do I need to encrypt the configuration?**
A: Encryption prevents students from changing settings and ensures the configuration can't be easily bypassed. Additionally, the 'Settings' password serves as a **START password** for focus mode.

---

## 💡 Practical Scenarios with Sites Hub

### Scenario 1: Interactive History Lesson

**Setup:**
```
Services: Kahoot + Mentimeter + Padlet
Start URL: sites.google.com/view/history-2024
Duration: 45 minutes
```

**Sites content:**
```
1. Kahoot Quiz (10 min) - Review last lesson
2. Mentimeter Poll (15 min) - Opinions on historical events
3. Padlet Collection (20 min) - Collect sources and quotes
```

**Result:** Students focused, all tools work seamlessly, clear structure

---

### Scenario 2: Math Practice Session

**Setup:**
```
Services: Whiteboard.fi + OneNote
Start URL: sites.google.com/view/math-practice
Duration: 60 minutes
```

**Sites content:**
```
1. Whiteboard.fi (30 min) - Collaborative problem solving
2. OneNote (30 min) - Individual exercises in notebook
```

**Result:** Varied lesson, visual collaboration + individual work

---

### Scenario 3: Group Project Work

**Setup:**
```
Services: Padlet + Miro + Word Online
Start URL: sites.google.com/view/project-groups
Duration: 90 minutes
```

**Sites content:**
```
Phase 1: Brainstorming with Padlet (30 min)
Phase 2: Mind map with Miro (30 min)
Phase 3: Documentation in Word (30 min)
```

**Result:** Flexible group work without distractions, clear workflow

---

## ✅ Best Practices with Sites Hub

### DO:

✅ **Update Sites page before each lesson**
   - New PINs/codes for Kahoot/Mentimeter
   - Current links to Padlet/Miro
   - Adjust schedule

✅ **Clear visual structure on Sites**
   - Use numbering (1️⃣ 2️⃣ 3️⃣)
   - Add time specifications
   - Emojis for better orientation

✅ **Test with student account**
   - Not with teacher account!
   - On different devices
   - On school network

✅ **Have backup plan**
   - Prepare paper alternative
   - Plan B without digital tools

✅ **Communicate clearly**
   - Why SEB is used
   - What is allowed and what isn't
   - How students get help

---

### DON'T:

❌ **DON'T distribute unencrypted .seb files**
   - Students could change settings
   - Security vulnerability

❌ **DON'T use for high stakes exams**
   - Not tamper-proof on BYOD
   - Only suitable for classwork

❌ **DON'T be too restrictive**
   - Students get frustrated
   - Resistance to tool
   - Start with "Balanced", not "Strict"

❌ **DON'T skip testing phase**
   - Always test before distribution
   - Murphy's Law: "What can go wrong..."

---

## Getting Help

1. **IT Department:** For network/firewall issues
2. **SEB Documentation:** https://safeexambrowser.org/
3. **This Tool's GitHub:** [Report issues or request features]
4. **Colleague Network:** Share configs that work!

---

## Checklist: Before Class

- [ ] `.seb` template downloaded from generator
- [ ] Config imported into SEB Config Tool
- [ ] Settings refined (passwords, restrictions)
- [ ] Config encrypted
- [ ] Final `.seb` file saved
- [ ] Config tested with student account
- [ ] Students notified about SEB requirement
- [ ] SEB download link shared
- [ ] Encrypted `.seb` file distributed (email/LMS)
- [ ] Paper backup prepared
- [ ] Tested on school network
- [ ] Instructions ready for class

---

## Time Investment

**First time:** 30-45 minutes (including Config Tool setup and testing)
**Subsequent uses:** 5-10 minutes (modify existing configs)
**ROI:** Massive reduction in off-task behavior

**Breakdown:**
- Generator: 5 minutes (create template)
- Config Tool: 15-20 minutes (refine, encrypt, test)
- Testing: 10-20 minutes (verify with student account)

---

## Success Stories

> "Used this for vocabulary practice in OneNote. Saw 80% reduction in 
> students checking social media during class work." 
> — *Teacher, Year 9 English*

> "Works great for Google Docs collaborative writing. Students actually 
> stay on task for the full period!"
> — *Teacher, Year 11 Media Studies*

---

## Next Steps

1. **Today:** Create your first config and test it
2. **This week:** Use with one class as pilot
3. **Next month:** Expand to all classes if successful
4. **Share:** Help colleagues by sharing your configs!

---

**Questions?** Check the full README.md for detailed technical docs.

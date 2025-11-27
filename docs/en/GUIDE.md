# Guide for Teachers
## SEB Configuration Generator with Google Sites

### What is this tool?

Creates Safe Exam Browser (SEB) configurations that help students focus on lessons by blocking distractions.

**Important:** This is NOT for final exams! It's for:
- ✅ Digital worksheets during supervised lessons
- ✅ Collaborative writing assignments
- ✅ Focus mode for classroom activities
- ✅ Interactive tool usage (Kahoot, Mentimeter, Padlet)

---

## Table of Contents

1. [Recommended Approach: Google Sites as Start Page](#-recommended-approach-use-google-sites-page-as-start-page)
2. [Step-by-Step: Your First Configuration](#step-by-step-your-first-configuration)
3. [Troubleshooting](#troubleshooting)
4. [Advanced: Add Custom Service](#advanced-add-custom-service)
5. [FAQ](#faq)
6. [Practical Scenarios with Sites Hub](#-practical-scenarios-with-sites-hub)
7. [Best Practices with Google Sites Landing Pages](#-best-practices-with-google-sites-landing-pages)
8. [Getting Help](#getting-help)
9. [Checklist: Before Class](#checklist-before-class)

---

## 🌟 Recommended Approach: Use 'Google Sites' Page as Start Page

### Why Google Sites?

**Technically simplest way to achieve focus mode in teaching when you don't want to/can't fully rely on an LMS:**

1. **One central landing page** - All lesson activities in one place
2. **Easy control** - Immediately see who's in SEB mode
3. **Flexible lesson planning** - Use different tools via links sequentially
4. **Control** - "Secret" URL prevents access outside SEB environment

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

### Step 1: Create Google Sites Landing Page

1. **Open Google Sites:** [sites.google.com](https://sites.google.com)

2. **Create new page:**
   - Click "+" (New site)
   - Name: `[Subject]_[Class]_[Date]_[Topic]` (e.g., "English_G22e_2025-11-10_Conditionals")

3. **Add content - Example:**

```
┌─────────────────────────────────────────────────┐
│  English - Revision Conditionals 15/11/2025     │
│  ═══════════════════════════════════════════    │
│                                                 │
│    CHECK: Visual indicator for teacher          │
│           Color / image -> on                   │
│           screen makes it easy                  │
│           to see if students are                │
│           in SEB mode                           │
│                                                 │                        
│    Today's schedule (45 minutes):               │
│  ────────────────────────────────               │
│  1 [10 Min] Kahoot Quiz - Review                │
│        Link: https://kahoot.it                  │
│                                                 │
│                                                 │
│  2 [15 Min] Mentimeter Survey                   │
│        Link: https://menti.com                  │
│                                                 │
│                                                 │
│  3 [20 Min] Padlet - Solution Strategies        │
│        Link: https://padlet.com/class/math      │
│                                                 │
│  Need help? → Raise your hand!                  │
└─────────────────────────────────────────────────┘
```

4. **Configure visibility, publish and copy URL:**
   - Select **"Publish"**
   - ❌ **Don't allow search indexing**
   - ⚠️ **Suggested URL:** `Subject_Class_Date` + **secret string** (e.g., `sites.google.com/view/English_G22e_2025-11-10xy7z3abc`)
   - **Copy URL** - you'll need it for the generator

---

### Step 2: Open Generator
Go to: `https://focusmode.ch`

Alternative (offline): Download the [ZIP file](https://github.com/markuskiller/SEBConfigGenerator/archive/refs/heads/main.zip), extract it, and open `index.html` locally in your browser.

---

⚠️ **Privacy:** With both methods, **no data is transmitted**, all processing happens **locally in your browser**. Only the following **preferences** are stored locally in your browser (not configuration data): language setting, favorites, translation display, and active URL filter. This can be verified through code review, e.g., by common generative AI models (e.g., ChatGPT, Claude.ai, Gemini, ...). The entire code is open source and available at [github.com/markuskiller/SEBConfigGenerator](https://github.com/markuskiller/SEBConfigGenerator).

---

### Step 3: Select Services (multiple possible!)

**Without Login:**
- **Whiteboard.fi** - Collaborative whiteboard
- **Kahoot!** - Quizzes and surveys
- **Mentimeter** - Live polls
- **Slido** - Q&A and polls
- **Microsoft Forms** - Public surveys
- **Padlet** - Digital pinboard
- **Miro** - Digital whiteboard
- **Etherpad** - Text collaboration

**With Login:**
- **OneNote Online** - For digital notebooks
- **Word Online** - For document editing

For the above English lesson example, the following services are selected:
- Kahoot
- Mentimeter
- Padlet

### Step 4: Start URL and Custom Domains

1. **Enter start URL:**
   ```
   https://sites.google.com/view/your-secret-page-xyz123
   ```

For the above example: `sites.google.com/view/English_G22e_2025-11-10xy7z3abc`

### Step 5: Continue with Default Values

For a working SEB configuration template, the default values can usually be used unchanged. Fine-tuning can be done in the SEB Config Tool.

### Step 6a:Choose export format:** 
   - `.seb File` → for SEB Config Tool (Desktop/Laptop)
   - `Moodle Quiz Settings ("Safe Exam Browser" section)` → URL lists for direct copy-paste into Moodle **-> continue in Moodle Quiz Settings**

### Step 6b: Download Configuration (.seb)
Click: **"📥 Download SEB Configuration (.seb)"**

Saved as `Multi_Service_Config.seb` (multiple services), `[Service]_Config.seb` (selected service), or under the manually entered filename.

---

⚠️ **Important:** The downloaded .seb file is only a template! The following steps must be completed before the configuration can be used productively in class and distributed to students.

---

### Step 7: Import and Finalize in SEB Config Tool

1. Download [SEB Config Tool](https://safeexambrowser.org/download_en.html) (one-time setup)
2. Open **SEB Config Tool**
3. **File → Open** → Select your downloaded `.seb` file
4. **Tab 'General' → Review and refine settings:**
   - Add administrator password (needed to modify configuration file later)
   - Add quit password (='Quit/unlock password') (if desired)
   - Configure additional restrictions
5. **Tab 'Config' → Encrypt configuration & set START password:**
   - Configure → Encrypt with password and/or certificate
   - **⚠️ The 'SETTINGS' password is also the START password for students**
6. **Save as final .seb file:**
   - File → Save as → `[Subject]_[Class]_[Date]_[Topic].seb` (e.g., `English_G22e_2025-11-15_Conditionals.seb`)

**Important:** Only distribute the encrypted, finalized `.seb` file to students!

### Step 8: Test & Distribute

**Testing - ⚠️ Before distributing to students:**

1. Install SEB on your computer
2. Double-click your final `.seb` configuration file
3. Try to:
   - Log in with a STUDENT (TEST) ACCOUNT (not with teacher account)
   - Access shared resources
   - Type and save something, if applicable
   - If creating/visiting links via a shared page is possible, try to access a page that should be blocked (e.g., MS Teams)

**If something doesn't work:** See troubleshooting below

**Distribute to students:**

It's often useful to install [Safe Exam Browser](https://safeexambrowser.org/download_en.html) together in class (once per semester or when a new version is available).

The encrypted configuration file can be distributed via the usual communication channel with file exchange capability (e.g., MS Teams, Google Classroom, or email).

**Important:** Filename should clearly indicate what the configuration is for: `English_G22e_2025-11-15_Conditionals.seb`

---

## Troubleshooting

### Problem: "Can't log in" or "Page won't load"

**Probable cause:** Missing authentication domains

**Solution:**
1. Go to **"Network Capture"** tab in the tool
2. Follow the Fiddler instructions
3. Upload the capture file
4. Add discovered domains to configuration

**Or:** Ask IT to check school firewall settings and assist with analyzing necessary domain connections.

---

### Problem: "MFA/Two-Factor Authentication doesn't work"

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

**Remember:** On personal devices, determined students can always circumvent restrictions if they have enough knowledge, time & motivation. That's okay - it's about **focus**, not primarily **surveillance**. Such problems must be solved on a pedagogical level.

---

### Problem: "Students still access social media"

**Solution:**
1. Switch to "Balanced" or "Strict"
2. Ensure URL filtering is enabled

**Remember:** On personal devices, determined students can always circumvent restrictions if they have enough knowledge, time & motivation. That's okay - it's about **focus**, not primarily **surveillance**. Such problems must be solved on a pedagogical level.

---

### Problem: "File downloads don't work"

**Solution:**
1. Edit configuration
2. ✅ Enable "Allow downloads"
3. Regenerate and test

---

## Advanced: Add Custom Service

**Example:** You want to allow Wikipedia for quizzes

1. Go to the tool
2. In **"Custom Domains"** section, add:
```
en.wikipedia.org
```

3. Set Wikipedia as start URL or link to `https://en.wikipedia.org` within already shared resources (e.g., on the Google Sites landing page)
4. Generate configuration

---

## FAQ

**Q: Do students need to install something?**
A: Yes, Safe Exam Browser (free download)

**Q: Does this work on phones/tablets?**
A: Not on all tablets, SEB is available for Windows/macOS and iPadOS.

**Q: Can students uninstall it afterwards?**
A: Yes! It's just an app. Encourage students to keep it for future use.

**Q: Is this secure enough for final exams?**
A: **No.** Use this on students' BYOD devices only for classwork, not for important summative assessments.

**Q: What if students don't have their own device or forgot it?**
A: Use school computers if possible.

**Q: Can I edit an existing configuration?**
A: Yes! Open the `.seb` file in SEB Config Tool to make changes (but be sure to encrypt before distributing to students!)

**Q: Do I need the SEB Config Tool?**
A: **Yes!** The generator creates a template that must be refined, encrypted, and finalized in the Config Tool before distribution.

**Q: Why do I need to encrypt the configuration?**
A: Encryption prevents students from changing settings and ensures the configuration cannot be easily circumvented. Additionally, the 'Settings' password serves as the **START password** for focus mode.

---

## 💡 Practical Scenarios with Sites Hub

### Scenario 1: Interactive History Lesson

**Setup:**
```
Services: Kahoot + Mentimeter + Padlet + 3 Wikipedia articles
Start URL: sites.google.com/view/history-2025-xsX9rgeT5G4
Duration: 45 minutes
```

**Sites Content:**
```
1. Kahoot Quiz (10 min) - Review previous lesson
2. Mentimeter Survey (15 min) - Opinions on historical events
3. Padlet Collection (20 min) - Gather sources and quotes
```

**Result:** Students focused, all tools work seamlessly, clear structure
**💡 Tip:** The 3 direct links to Wikipedia articles can be pasted into the SEBConfigGenerator in the `3. Custom Domains (Optional)` section.

---

### Scenario 2: Math Practice Session

**Setup:**
```
Services: Whiteboard.fi + GeoGebra
Start URL: sites.google.com/view/math-practice-jeHg6fT7q
Duration: 60 minutes
```

**Sites Content:**
```
1. Whiteboard.fi (30 min) - Collaborative problem solving
2. GeoGebra (30 min) - Individual exercise solving
```

**Result:** Varied lesson, visual collaboration + individual work

---

### Scenario 3: Group Project Work

**Setup:**
```
Services: Padlet + Miro + Etherpad
Start URL: sites.google.com/view/project-groups-xHbnN5r8y3X
Duration: 90 minutes
```

**Sites Content:**
```
Phase 1: Brainstorming with Padlet (30 min)
Phase 2: Mind map with Miro (30 min)
Phase 3: Documentation in Etherpad (30 min)
```

**Result:** Flexible group work without distractions, clear workflow

---

## ✅ Best Practices with Google Sites Landing Pages

### DO:

✅ **Update Sites page before each lesson**
   - New links for Kahoot/Mentimeter
   - Current links to Padlet/Miro
   - Adjust schedule

✅ **Clear visual structure on Sites**
   - Use numbering (1️⃣ 2️⃣ 3️⃣)
   - Add time indicators
   - Use distinctive image or color (for easy visual check if students are in focus mode)

✅ **Test with student account**
   - Not with teacher account!
   - On different devices
   - On school network

✅ **Have backup plan**
   - Plan B without restrictions / without digital tools

✅ **Communicate clearly**
   - Why SEB is being used
   - What is allowed and what isn't
   - How students get help

---

### DON'T:

❌ **DON'T distribute unencrypted .seb files**
   - Students could change settings
   - Security vulnerability

❌ **DON'T use for important summative assessments**
   - Not tamper-proof on BYOD
   - Only suitable for classwork

❌ **DON'T be too restrictive**
   - Students become frustrated
   - Resistance to tool
   - Start with "Balanced", not "Strict"

❌ **DON'T skip testing phase**
   - Especially in the initial phase, always test before distribution
   - Murphy's Law: "Anything that can go wrong..."

---

## Getting Help

1. **IT Department:** For network/firewall issues
2. **SEB Documentation:** https://safeexambrowser.org/
3. **GitHub Issues for this tool:** [Report problems or request features](https://github.com/markuskiller/SEBConfigGenerator/issues)
4. **Colleague network:** Share working configurations!

---

## Checklist: Before Class

- [ ] Downloaded `.seb` template from generator
- [ ] Imported configuration into SEB Config Tool
- [ ] Refined settings (passwords, restrictions)
- [ ] Encrypted configuration
- [ ] Saved final `.seb` file
- [ ] Tested configuration with student account
- [ ] Informed students about SEB requirement / or planned joint installation in class
- [ ] Shared SEB download link
- [ ] Distributed encrypted `.seb` file (email/LMS)
- [ ] Prepared backup plan
- [ ] Tested on school network
- [ ] Prepared instructions for class

---

## Time Investment

**First time:** 30-45 minutes (incl. Config Tool setup and testing)
**Subsequent use:** 5-10 minutes (adapt existing configurations)
**Benefit:** Massive reduction in distraction behavior

**Breakdown:**
- Generator: 5 minutes (create template)
- Config Tool: 15-20 minutes (refine, encrypt, test)
- Testing: 10-20 minutes (verify with student account)

---

## Next Steps

1. **Today:** Create and test first configuration
2. **This week:** Use as pilot project with one class
3. **Next month:** Expand to all classes if successful
4. **Share:** Help colleagues by sharing your configurations!

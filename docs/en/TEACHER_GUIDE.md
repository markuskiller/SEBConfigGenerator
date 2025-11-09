# Teacher Quick Start Guide
## SEB Config Generator with Google Sites Hub

### What is This Tool?

Creates Safe Exam Browser configurations that help students focus on educational tasks by blocking distractions.

**Important:** This is NOT for high-stakes exams! It's for:
- ✅ Digital worksheets during class
- ✅ Collaborative writing assignments  
- ✅ Focus mode for in-class activities
- ✅ Interactive tool usage (Kahoot, Mentimeter, Padlet)

---

## 🌟 Recommended Approach: Google Sites as Hub

### Why Google Sites?

**The best method for schools:**

1. **One central landing page** - All lesson activities in one place
2. **Easy verification** - Instantly see who's in SEB mode
3. **Flexible lesson planning** - Use different tools via links
4. **Security** - "Secret" URL prevents unauthorized access

### How it Works:

```
Student starts .seb file
    ↓
Auto-opens your Sites page
    ↓
Student clicks links to activities (Kahoot, Mentimeter, etc.)
    ↓
Everything works - only allowed domains reachable
    ↓
No distractions (YouTube, social media blocked)
```

---

## Step-by-Step: Your First Config

### Step 1: Create Google Sites Landing Page

1. **Open Google Sites:** [sites.google.com](https://sites.google.com)

2. **Create new page:**
   - Click "+" (New Site)
   - Name: `Lesson_[Date]_[Subject]` (e.g. "Lesson_2024_11_09_Math")

3. **Set visibility:**
   - Settings → Share
   - Select **"Anyone with the link"**
   - ✅ URL becomes complex/secret (e.g. `sites.google.com/view/xy7z3abc`)

4. **Add content - Example:**

```
┌─────────────────────────────────────────────────┐
│  🎓 Mathematics - Quadratic Equations          │
│  ═══════════════════════════════════════════    │
│                                                 │
│  ✅ CHECK: Can you see this text?              │
│     → You're in SEB focus mode!                │
│                                                 │
│  📋 Today's Schedule (45 minutes):             │
│  ────────────────────────────────              │
│  1️⃣ [10 Min] Kahoot Quiz - Review             │
│     🔗 Link: https://kahoot.it                 │
│     📌 PIN: 1234567                            │
│                                                 │
│  2️⃣ [15 Min] Mentimeter Poll                  │
│     🔗 Link: https://menti.com                 │
│     📌 Code: 8765 4321                         │
│                                                 │
│  3️⃣ [20 Min] Padlet - Solution Strategies     │
│     🔗 Link: https://padlet.com/class/math     │
│                                                 │
│  💡 Need help? → Raise your hand!              │
└─────────────────────────────────────────────────┘
```

5. **Publish and copy URL**

---

### Step 2. Open the Generator
Go to: `[YOUR_SCHOOL_URL]/seb-generator/` (or open `index.html`)

### Step 3. Choose Services (multiple allowed!)

**No Login Required:**
- **Whiteboard.fi** - Collaborative whiteboard
- **Kahoot!** - Quizzes and polls
- **Mentimeter** - Live polls
- **Slido** - Q&A and polls
- **Microsoft Forms** - Public surveys
- **Padlet** - Digital bulletin board
- **Miro** - Digital whiteboard
- **Etherpad** - Text collaboration

**Login Required:**
- **OneNote Online** - For digital notebooks
- **Word Online** - For document editing

### Step 4: Start URL and Custom Domains

1. **Enter Start URL:**
   ```
   https://sites.google.com/view/your-secret-page-xyz123
   ```

2. **Add Custom Domains:**
   ```
   sites.google.com
   *.googleusercontent.com
   fonts.googleapis.com
   fonts.gstatic.com
   ```
   **⚠️ Important:** Do NOT use `*.google.com` (too broad - opens Gmail, YouTube!)

### Step 5: Set Security Level
**Recommendation:** Start with **"Balanced"**

- **Relaxed** = Allows more flexibility (good for class work)
- **Balanced** = Good mix of focus and usability ⭐
- **Strict** = Maximum restrictions (may frustrate students)

### Step 6: Configure Options
Check what students need:

| Option | When to Enable |
|--------|---------------|
| Allow downloads | ✅ If they need to save files |
| Spell check | ✅ Always enable for writing |
| Reload button | ✅ If pages might freeze |
| Back/Forward | ✅ For multi-page documents |

### Step 7: Download Config
Click: **"📥 Download SEB Config (.seb)"**

Saves as: `Multi_Service_Config.seb` (multiple services) or `[Service]_Config.seb`

### Step 8: Import and Finalize in SEB Config Tool

**⚠️ The downloaded `.seb` file is just a template!**

1. Download [SEB Config Tool](https://safeexambrowser.org/download_en.html) (one-time setup)
2. Open **SEB Config Tool**
3. **File → Open** → Select your downloaded `.seb` file
4. **Review and refine settings:**
   - Add administrator password
   - Add quit password (if needed)
   - Configure additional restrictions
5. **Encrypt the configuration:**
   - Configure → Encrypt with password or certificate
6. **Save as final .seb file:**
   - File → Save As → `OneNote_Final.seb`

**Important:** Only distribute the encrypted, finalized `.seb` file to students!

### Step 9: Distribute to Students

**Email template:**
```
Subject: SEB Setup for [Date] Lesson

Hi everyone,

For our digital lesson on [Day], you'll need:

1️⃣ Install Safe Exam Browser:
   https://safeexambrowser.org/download_en.html

2️⃣ Download config file:
   [attach Lesson_2024_11_09_Final.seb]

3️⃣ Double-click the .seb file
   → SEB starts automatically
   → You'll land on the landing page

4️⃣ From there, find all links to activities
   (Kahoot, Mentimeter, etc.)

The config is encrypted for your security.

See you [Day]!
[Your Name]
```

---

## Testing (DO THIS FIRST!)

**Before giving to students:**

1. Install SEB on your computer
2. Double-click your `.seb` config file
3. Try to:
   - Log in with a STUDENT account (not your teacher account!)
   - Access the notebook/document
   - Type something and save
   - Try to open YouTube (should be blocked ✅)

**If something doesn't work:** See troubleshooting below

---

## Troubleshooting Guide

### Problem: "Can't log in" or "Page won't load"

**Likely cause:** Missing authentication domains

**Fix:**
1. Go to **"Network Capture"** tab in the tool
2. Follow instructions to capture traffic with Fiddler
3. Upload the capture file
4. Add discovered domains to your config

**Or:** Ask IT to check school firewall settings

---

### Problem: "Students can still access social media"

**Likely cause:** Security level too relaxed

**Fix:**
1. Switch to "Balanced" or "Strict"
2. Make sure URL filtering is enabled

**Remember:** On student devices, a determined student CAN bypass. This is about **focus**, not **lockdown**.

---

### Problem: "MFA/Two-factor authentication fails"

**Fix:** Add these domains in "Custom Domains":

**For Microsoft:**
```
*.msftauth.net
*.msauth.net
login.microsoftonline.com
```

**For Google:**
```
accounts.google.com
*.googleusercontent.com
```

---

### Problem: "File downloads don't work"

**Fix:**
1. Edit your config
2. Check ✅ "Allow file downloads"
3. Re-generate and test

---

## Advanced: Adding Your Own Service

**Example:** You want to allow Kahoot for quizzes

1. Go to tool
2. In **"Custom Domains"** section, add:
```
*.kahoot.com
*.kahoot.it
play.kahoot.it
```

3. Set start URL: `https://kahoot.it`
4. Generate config

---

## FAQ

**Q: Do students need to install anything?**
A: Yes, Safe Exam Browser (free download)

**Q: Does this work on phones/tablets?**
A: No, SEB is Windows/Mac only (some experimental Chromebook support)

**Q: Can students uninstall it after?**
A: Yes! It's just an app. Encourage students to keep it for future use.

**Q: Is this secure enough for final exams?**
A: **No.** Use this for classwork, not high-stakes assessments.

**Q: What if a student doesn't have a personal device?**
A: Have backup paper worksheets, or use school computers

**Q: Can I edit an existing config?**
A: Yes! Open the `.seb` file in the SEB Config Tool to make changes

**Q: Do I need the SEB Config Tool?**
A: **Yes!** The generator creates a template that must be refined, encrypted, and finalized in the Config Tool before distribution.

**Q: Why do I need to encrypt the config?**
A: Encryption prevents students from modifying the settings and ensures the configuration cannot be easily bypassed.

---

## 💡 Real-World Scenarios with Sites Hub

### Scenario 1: Interactive History Lesson

**Setup:**
```
Services: Kahoot + Mentimeter + Padlet
Start URL: sites.google.com/view/history-2024
Duration: 45 minutes
```

**Sites Content:**
```
1. Kahoot Quiz (10 Min) - Last lesson review
2. Mentimeter Poll (15 Min) - Opinions on historical events
3. Padlet Collection (20 Min) - Gather sources and quotes
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

**Sites Content:**
```
1. Whiteboard.fi (30 Min) - Solve problems together
2. OneNote (30 Min) - Individual exercises in notebook
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

**Sites Content:**
```
Phase 1: Brainstorming with Padlet (30 Min)
Phase 2: Mind Map with Miro (30 Min)
Phase 3: Documentation in Word (30 Min)
```

**Result:** Flexible group work without distractions, clear workflow

---

## ✅ Best Practices with Sites Hub

### DO:

✅ **Update Sites page before each lesson**
   - New PINs/codes for Kahoot/Mentimeter
   - Current links to Padlet/Miro
   - Adjust timeline

✅ **Clear visual structure on Sites**
   - Use numbering (1️⃣ 2️⃣ 3️⃣)
   - Add time estimates
   - Use emojis for better orientation

✅ **Test with student account**
   - Not with teacher account!
   - On different devices
   - On school network

✅ **Have backup plan**
   - Prepare paper alternative
   - Plan B without digital tools

✅ **Communicate clearly**
   - Why SEB is used
   - What's allowed and what's not
   - How students get help

---

### DON'T:

❌ **Do NOT allow `*.google.com` globally**
   - Opens Gmail, YouTube, etc.
   - Defeats focus mode
   - **Only** use `sites.google.com` + `*.googleusercontent.com`!

❌ **Do NOT distribute unencrypted .seb files**
   - Students could modify settings
   - Security vulnerability

❌ **Do NOT use for high-stakes exams**
   - Not tamper-proof on BYOD
   - Only for classwork

❌ **Do NOT be too restrictive**
   - Students will get frustrated
   - Resistance against tool
   - Start with "Balanced", not "Strict"

❌ **Do NOT skip testing**
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

# Teacher Quick Start Guide
## SEB Config Generator in 5 Minutes

### What is This Tool?

Creates Safe Exam Browser configurations that help students focus on educational tasks (like OneNote or Google Docs) on their own devices by blocking distractions.

**Important:** This is NOT for high-stakes exams! It's for:
- ✅ Digital worksheets during class
- ✅ Collaborative writing assignments  
- ✅ Focus mode for in-class activities
- ✅ Replacing paper when you need basic digital access

---

## Step-by-Step: Your First Config

### 1. Open the Tool
Go to: `[YOUR_SCHOOL_URL]/seb-generator/` (or open `index.html`)

### 2. Choose Your Service
Click one of these buttons:
- **OneNote Online** - For digital notebooks
- **Word Online** - For document editing
- **Google Docs** - For Google Workspace

### 3. Set Security Level
**Recommendation:** Start with **"Balanced"**

- **Relaxed** = Allows more flexibility (good for class work)
- **Balanced** = Good mix of focus and usability ⭐
- **Strict** = Maximum restrictions (may frustrate students)

### 4. Configure Options
Check what students need:

| Option | When to Enable |
|--------|---------------|
| Allow downloads | ✅ If they need to save files |
| Spell check | ✅ Always enable for writing |
| Reload button | ✅ If pages might freeze |
| Back/Forward | ✅ For multi-page documents |

### 5. Download Config
Click: **"Download SEB Config (.seb)"**

Saves as: `OneNote_Config.seb` (or similar)

### 6. Import and Finalize in SEB Config Tool

The downloaded `.seb` file is a template that must be refined:

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

### 7. Distribute to Students

**Email them:**
```
Subject: Digital Assignment Setup

Hi everyone,

For Tuesday's class activity, you'll need Safe Exam Browser:

1. Download SEB: https://safeexambrowser.org/download_en.html
2. Download config file: [attach OneNote_Final.seb]
3. Double-click the .seb file - SEB will start automatically
4. Log in with your school account when prompted

Note: The config file is encrypted for your security.

See you Tuesday!
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

## Real-World Scenarios

### Scenario 1: OneNote Class Notes
**Goal:** Students take notes during lecture

**Config:**
- Service: OneNote Online
- Security: Relaxed
- Options: ✅ Spell check, ✅ Back/Forward
- Duration: 45-minute class

**Result:** Students stay focused, fewer distractions than open laptops

---

### Scenario 2: Timed Essay
**Goal:** 30-minute writing prompt in Word Online

**Config:**
- Service: Word Online
- Security: Balanced
- Options: ✅ Spell check, ❌ Downloads (force cloud save)
- Note: Add time limit in SEB settings

**Result:** Students can't browse internet, must focus on writing

---

### Scenario 3: Collaborative Google Doc
**Goal:** Group editing project

**Config:**
- Service: Google Docs
- Security: Relaxed
- Options: ✅ All enabled
- Add: *.google.com for full collaboration features

**Result:** Students can collaborate without distractions

---

## Best Practices

### ✅ DO:
- Test configs with student accounts before class
- Communicate clearly about why you're using SEB
- Have a paper backup plan
- Start with permissive settings
- Get feedback from students

### ❌ DON'T:
- Use for high-stakes exams on BYOD
- Assume it's tamper-proof
- Make it too restrictive (students will resist)
- Skip testing phase
- Forget to update when services change

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

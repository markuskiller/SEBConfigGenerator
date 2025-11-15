# User Guide: SEB Configuration Generator

**Comprehensive guide for creating Safe Exam Browser configurations for classroom teaching**

---

## Table of Contents

1. [Introduction](#introduction)
2. [Recommended Approach: Google Sites Hub](#recommended-approach-google-sites-hub)
3. [Step-by-Step Tutorial](#step-by-step-tutorial)
4. [Common Scenarios](#common-scenarios)
5. [Advanced Features](#advanced-features)
6. [Troubleshooting](#troubleshooting)
7. [Best Practices](#best-practices)

---

## Introduction

### What is this tool?

The SEB Configuration Generator creates Safe Exam Browser (SEB) configuration files that help students focus on learning by blocking distractions while allowing access to selected educational tools.

### Important: Focus Mode, Not Exam Security

**This tool is designed for:**
- ✅ Digital worksheets during supervised lessons
- ✅ Collaborative writing assignments
- ✅ Interactive tool usage (Kahoot, Mentimeter, Padlet)
- ✅ Focused work periods with controlled internet access

**NOT designed for:**
- ❌ High-stakes exams (insufficient security)
- ❌ Unsupervised assessments
- ❌ Preventing determined circumvention

### How It Works

```
Student double-clicks .seb file
          ↓
SEB launches in kiosk mode
          ↓
Opens your specified start URL (e.g., Google Sites)
          ↓
Only allowed domains accessible
          ↓
Student works in focused environment
```

---

## Recommended Approach: Google Sites Hub

### Why Google Sites?

**The technically simplest way to create a focus mode in teaching without fully relying on an LMS:**

1. **One central landing page** - All lesson activities in one place
2. **Easy control** - Immediately see who's in SEB mode
3. **Flexible lesson planning** - Different tools accessible via links
4. **Simple verification** - Students seeing the Sites page confirms they're in SEB

### Benefits

✅ **Central control** - One page for all activities  
✅ **No tool-hopping** - All links in one location  
✅ **Safe navigation** - Only approved domains reachable  
✅ **Transparency** - Students know exactly what's allowed  
✅ **Visual verification** - Colors/images help quickly check if everyone's in the right place

---

## Step-by-Step Tutorial

### Step 1: Create Google Sites Landing Page

**1. Open Google Sites:** [sites.google.com](https://sites.google.com)

**2. Create new page:**
   - Click "+" (New site)
   - Name: `[Subject]_[Class]_[Date]` (e.g., "English_G22e_2025-11-10")

**3. Add content - Example structure:**

```
┌─────────────────────────────────────────────────┐
│  English - Conditionals Revision 10/11/2025     │
│  ════════════════════════════════════════════   │
│                                                 │
│    ✓ Visual indicator for teacher              │
│      (distinctive color/image makes it easy    │
│       to see if students are in SEB mode)      │
│                                                 │                        
│    Today's Schedule (45 minutes):              │
│  ─────────────────────────────────             │
│  1 [10 min] Kahoot Quiz - Review               │
│        Link: https://kahoot.it                 │
│                                                │
│  2 [15 min] Mentimeter Survey                  │
│        Link: https://menti.com                 │
│                                                │
│  3 [20 min] Padlet - Solution Strategies       │
│        Link: https://padlet.com/class/english  │
│                                                │
│  Need help? → Raise your hand!                 │
└─────────────────────────────────────────────────┘
```

**4. Configure visibility and publish:**
   - **Click "Publish"**
   - ❌ **Do not allow search indexing**
   - ✅ Choose complex/secret URL (e.g., `sites.google.com/view/English_G22e_2025-11-10xy7z3abc`)
   - **Copy the URL** - you'll need it for the generator

---

### Step 2: Open Generator

Go to: `https://markuskiller.github.io/SEBConfigGenerator/`

**Alternative (offline use):**
- Download `index.html` from the repository
- Open locally in your browser
- ⚠️ Both methods: 100% local processing, no data transmission

---

### Step 3: Select Services

**No Login Required:**
- **Whiteboard.fi** - Collaborative whiteboard
- **Kahoot!** - Quizzes and surveys
- **Mentimeter** - Live polls
- **Slido** - Q&A and polls
- **Miro** - Digital whiteboard
- **Padlet** - Digital pinboard

**With Login:**
- **OneNote Online** - Microsoft OneNote
- **Word Online** - Microsoft Word

**💡 Tip:** You can select multiple services - students can navigate between them!

---

### Step 4: Choose Allowed Reference Tools

Select by subject:
- **German** → Duden, DWDS
- **English** → Oxford Learners, Cambridge
- **French** → Larousse, Reverso
- **All Tools** → All dictionaries

---

### Step 5: Configure Start URL

**Paste your Google Sites URL** into the "Start-URL" field

Example: `https://sites.google.com/view/English_G22e_2025-11-10xy7z3abc`

---

### Step 6: Additional Settings (Optional)

**Security Level:**
- **Relaxed** (Recommended for classroom) - Allows reload, some navigation
- **Balanced** - Default settings
- **Strict** - Maximum restrictions (can cause issues with some tools)

**Additional Options:**
- ✅ Allow file downloads (if needed for worksheets)
- ✅ Show reload button (recommended)
- ✅ Allow back/forward navigation (helpful for sites)

---

### Step 7: Download & Distribute

1. **Click "Download SEB Config (.seb)"**
2. **Name the file descriptively:**
   - Good: `English_2025-11-15_Conditionals.seb`
   - Bad: `config.seb`

3. **Distribute to students via:**
   - Google Classroom
   - Microsoft Teams
   - Email
   - School network folder

---

## Common Scenarios

### Scenario 1: Kahoot Quiz + Dictionary

**Use case:** Grammar quiz with allowed dictionary

**Configuration:**
1. Select: Kahoot!
2. Allowed tools: German (or your subject)
3. Start URL: Kahoot game URL or Google Sites with link
4. Security: Relaxed

---

### Scenario 2: Collaborative Writing in OneNote

**Use case:** Group work in shared notebook

**Configuration:**
1. Select: OneNote Online
2. Optionally: Word Online (for different format)
3. Allowed tools: German + English (bilingual writing)
4. Start URL: Your Google Sites with instructions
5. Security: Relaxed
6. ⚠️ **Important:** Test SharePoint restrictions carefully!

---

### Scenario 3: Multi-Tool Lesson

**Use case:** Varied lesson with different activities

**Configuration:**
1. Select multiple services: Kahoot, Mentimeter, Padlet
2. Allowed tools: Subject-specific dictionaries
3. Start URL: Google Sites with lesson schedule
4. Security: Relaxed

**Students navigate:** Sites page → Click links to different tools

---

### Scenario 4: Research Task

**Use case:** Controlled internet research

**Configuration:**
1. Select: Whiteboard.fi (for notes)
2. Allowed tools: All reference tools
3. Custom domains: Add specific research sites
4. Start URL: Google Sites with task description

---

## Advanced Features

### Custom Domains

Add specific websites beyond presets:

**Format:**
```
example.com
*.example.org
subdomain.site.ch
```

**Wildcards:**
- `*.microsoft.com` → Allows all Microsoft subdomains
- `login.microsoft.com` → Only this specific subdomain

**Blocked Domains (Optional):**
Use when you've added a wildcard but want to exclude specific subdomains:
```
# If you allow *.example.com
# but want to block mail.example.com:
mail.example.com
```

---

### SharePoint/OneDrive Restrictions

**For OneNote/Word Online:**

You can restrict access to specific:
- School's SharePoint
- Specific Team/Group
- Specific Notebook/Folder
- Specific File

**⚠️ Experimental Feature:**
- Test thoroughly before using with students
- Network Capture Helper can assist (see tool documentation)

---

## Troubleshooting

### Students Can't Open SEB File

**Cause:** SEB not installed

**Solution:**
1. Install Safe Exam Browser from [safeexambrowser.org](https://safeexambrowser.org)
2. Ensure students have version 3.0 or newer

---

### Site Not Loading

**Possible causes:**

1. **Domain not in allowed list**
   - Check URL carefully
   - Ensure wildcards cover all needed subdomains

2. **Network issues**
   - Test configuration yourself first
   - Check school firewall settings

3. **Start URL incorrect**
   - Verify Google Sites URL is published
   - Check URL is set to "Anyone with link"

---

### Tool Not Working Properly

**If a service doesn't work as expected:**

1. **Test outside SEB first** - Is the service itself working?
2. **Check browser console** (if allowed in config)
3. **Review domain list** - Are all necessary domains included?
4. **Try "Relaxed" security level** - Some tools need more permissions

---

### Students Exit SEB Accidentally

**Prevention:**
- Set quit password in config
- Explain exit procedure to students

**If it happens:**
- Have student restart .seb file
- Progress in web-based tools usually saved

---

### Visual Verification Not Working

**If you can't tell who's in SEB:**

1. **Add more distinctive visual element** to Google Sites
2. **Use different color scheme** than normal browser
3. **Add "You are in SEB mode" banner** at top of page

---

## Best Practices

### Preparation

✅ **Test everything yourself** before the lesson
✅ **Have plan B ready** (traditional worksheets, backup activity)
✅ **Explain process to students once** at start of year
✅ **Keep config files organized** with clear naming

### During Class

✅ **Visual check** - Quick scan if all see Sites page
✅ **Have quit password ready** for emergencies
✅ **Be ready to troubleshoot** basic issues quickly
✅ **Save progress frequently** if using online tools

### After Class

✅ **Archive successful configs** for reuse
✅ **Note any issues** for next time
✅ **Update configs** as tools change

### File Management

**Naming convention:**
```
[Subject]_[Class]_[Date]_[Topic].seb

Examples:
English_G22e_2025-11-15_Conditionals.seb
Math_10a_2025-11-20_Geometry.seb
```

**Organization:**
```
📁 SEB Configs/
├── 📁 English/
│   ├── 📁 2025-Q4/
│   │   ├── English_G22e_2025-11-15_Conditionals.seb
│   │   └── English_G22e_2025-11-22_Reading.seb
└── 📁 Templates/
    └── Standard_English_Lesson.seb
```

---

## Privacy & Security

**Data Privacy:**
- ✅ 100% browser-local processing
- ✅ No data sent to servers
- ✅ Works completely offline
- ✅ Open source - code is auditable

**Security Limitations:**
- ⚠️ Focus mode, not high-security exam mode
- ⚠️ Determined students may find workarounds
- ⚠️ Always supervise during use
- ⚠️ Not suitable for unsupervised assessments

---

## Support

**Documentation:**
- Quick start: [QUICKSTART.md](QUICKSTART.md)
- Technical docs: [../../README.md](../../README.md)

**Generator:**
- Live version: https://markuskiller.github.io/SEBConfigGenerator/
- Development version: https://dev.focusmode.ch

**Safe Exam Browser:**
- Official site: [safeexambrowser.org](https://safeexambrowser.org)
- Documentation: [SEB Manual](https://safeexambrowser.org/documentation/)

---

**Last updated:** November 2025  
**Version:** v0.19.0b2

# Quick Start: SEB Configuration Generator

**Create focused learning environments for digital teaching in 15 minutes**

---

## What is this?

Generates Safe Exam Browser (SEB) configurations for **focused classroom teaching** - blocks distractions, allows only selected learning tools.

**✅ Suitable for:**
- Digital worksheets in class
- Collaborative activities (Padlet, Miro, etc.)
- Interactive quizzes (Kahoot, Mentimeter)
- Focused work with reference materials

**❌ NOT suitable for:**
- Final exams (insufficient security)
- Unsupervised work

---

## 🚀 First Configuration in 3 Steps

### 1. Create Google Sites Landing Page (5-10 Min)

```
sites.google.com → New site
├─ Name: "Subject_Class_Date_Topic"
├─ Content: Schedule & links to tools
└─ Publish: 
     - ✅ "Anyone with link" but
     - ❌ Don't allow search indexing
     - ⚠️ Suggested URL: `Subject_Class_Date_Topic` + **secret string** 
```

**Example content:**
```
📍 English - Conditional Sentences
   
Today's lesson:
• Kahoot Quiz (10 min) → https://kahoot.it/...
• Padlet Discussion (20 min) → https://padlet.com/...
• Oxford Dictionary allowed

```

### 2. Generate Configuration (2-5 Min)

**Open generator:** https://focusmode.ch

1. **Select service:** e.g., "No Login Required" → select all tools you need
2. **Select allowed reference tools:** e.g., "English" (Dictionary)
3. **Insert start URL:** Your **secret** Google Sites URL
4. **(Optional) Add custom pages:** e.g., link to Wikipedia article
4. **Download:** `.seb` file

---

⚠️ **Important:** The downloaded .seb file is only a template! The following steps must be completed before the configuration can be used in class and distributed to students.

---

5. Open in SEB Config Tool
6. Refine settings and encrypt
7. Save as final .seb file
8. Distribute encrypted file to students 

### 3. Distribute to Students (1 Min)

- Share `.seb` file via Classroom/Teams/email
- **Important:** Filename should be descriptive: `English_G22e_2025-11-15_Conditionals.seb`

---

## 📚 Further Reading

**Detailed guide:** [GUIDE.md](GUIDE.md)
- Various scenarios
- Tips & tricks
- Troubleshooting

**Technical documentation:** [../../README.md](../../README.md)

---

## 💡 Quick Tips

### Multi-Tool Configurations
Select multiple services simultaneously - students can switch between them:
- ✅ Kahoot + Mentimeter + Whiteboard.fi
- ✅ Padlet + Dictionary
- ✅ Etherpad + All reference tools

### Visibility Control
Add a distinctive image or color to Google Sites:
- Immediately visible who's in SEB mode
- Quick visual check in the classroom

### URL Organization
Pattern: `Subject_Class_Date_Topic`
- Reusable for similar lessons
- Easy to archive

---

## ⚠️ Important Notes

**Privacy:** 
- ✅ 100% local - no data transmission
- ✅ Can be used offline

**Preparation:**
- Test the configuration yourself first
- Have a plan B (in case of technical issues)
- Explain the process to students once

**In case of problems:**
- Exit SEB: Ctrl+Q (Win) / Cmd+Q (Mac) with **quit/unlock password**
- Or: Restart computer and re-enter with **settings password = START password** (⚠️ Caution: take immediate pedagogical measures if students use forced hard restart to circumvent focus mode - 💡 Tip: Increase complexity of start password and only project it briefly)

---

**🔗 Generator:** https://focusmode.ch
**📧 Questions?** See detailed [GUIDE.md](GUIDE.md)

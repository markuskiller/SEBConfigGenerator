# SEB Config Generator - Deployment Checklist

## Pre-Deployment (IT Department)

### Hosting Decision
- [ ] Choose hosting method:
  - [ ] GitHub Pages (recommended)
  - [ ] School web server
  - [ ] Standalone file distribution
  - [ ] Other: _______________

### GitHub Pages Setup (if chosen)
- [ ] Create GitHub account for school
- [ ] Create repository: `seb-config-generator`
- [ ] Upload `index.html` to repository root
- [ ] Enable GitHub Pages in Settings
- [ ] Test URL: `https://[username].github.io/seb-config-generator/`
- [ ] (Optional) Configure custom domain: _______________
- [ ] Document URL for teachers: _______________

### School Server Setup (if chosen)
- [ ] Create directory: `/var/www/html/seb-generator/`
- [ ] Upload `index.html`
- [ ] Set permissions: `chmod 644 index.html`
- [ ] Configure HTTPS if not already enabled
- [ ] Test URL: _______________
- [ ] Document URL for teachers: _______________

### Network Requirements
- [ ] Verify firewall allows access to:
  - [ ] *.microsoft.com (for MS365)
  - [ ] *.microsoftonline.com (for MS365 auth)
  - [ ] *.google.com (for Google Workspace)
  - [ ] *.googleapis.com (for Google Workspace)
- [ ] Test from school network
- [ ] Test from student home networks (if BYOD)

---

## Teacher Training

### Documentation Distribution
- [ ] Share Teacher Quick Start Guide with all staff
- [ ] Schedule training session (optional): _______________
- [ ] Create FAQ page on staff portal
- [ ] Set up support channel (email/Teams/etc.): _______________

### Training Content Checklist
- [ ] What SEB is and isn't (not for high-stakes exams!)
- [ ] Demo: Creating first config
- [ ] Demo: Testing with student account
- [ ] Demo: Distributing to students
- [ ] Troubleshooting common issues
- [ ] Where to get help

### Training Session Agenda (1 hour)
```
00:00-00:10  Introduction & Objectives
00:10-00:25  Live Demo: Create OneNote Config
00:25-00:40  Hands-on: Teachers create their own
00:40-00:50  Testing & Troubleshooting
00:50-01:00  Q&A and Support Resources
```

---

## Pilot Program

### Pilot Selection
- [ ] Choose 2-3 pilot teachers
- [ ] Mix of subjects: _______________
- [ ] Mix of year levels: _______________
- [ ] Tech-comfortable teachers preferred
- [ ] Pilot duration: _______________ (recommend 2-4 weeks)

### Pilot Success Criteria
- [ ] Teachers can create configs independently
- [ ] Configs work on student devices (>80% success rate)
- [ ] Students stay on-task better than without SEB
- [ ] No major technical blockers
- [ ] Teachers would use again

### Pilot Deliverables
- [ ] Feedback survey for teachers
- [ ] Feedback survey for students (optional)
- [ ] List of working configs for common services
- [ ] List of common issues and solutions
- [ ] Recommendation: Go/No-Go for wider rollout

---

## Student Communication

### Information for Students
- [ ] Create student guide: "How to Install SEB"
- [ ] Include screenshots for Windows/Mac
- [ ] Include troubleshooting tips
- [ ] Set expectations (focus tool, not surveillance)
- [ ] Publish on student portal

### Student Guide Must Include:
- [ ] Download link: https://safeexambrowser.org/download_en.html
- [ ] Installation instructions (Windows & Mac)
- [ ] How to use config files
- [ ] What to do if SEB won't start
- [ ] Who to contact for help
- [ ] Uninstall instructions (for after use)

### Parent Communication (BYOD Schools)
- [ ] Parent letter explaining SEB
- [ ] Emphasize: Focus tool, not monitoring software
- [ ] Clarify: Students can uninstall after use
- [ ] Provide support contact
- [ ] Send: _______________ (date)

---

## Technical Support Setup

### Support Structure
- [ ] Level 1: Teacher peer support (via _______________)
- [ ] Level 2: Department tech lead (_______________) 
- [ ] Level 3: IT helpdesk (_______________) 

### Support Resources
- [ ] Create shared folder with:
  - [ ] Working config templates
  - [ ] Common domain lists
  - [ ] Troubleshooting guide
  - [ ] Network capture guide
- [ ] Set up ticket/request system
- [ ] Define response time SLA: _______________

### Common Issues Playbook
- [ ] Authentication fails → Add auth domains
- [ ] Page won't load → Network capture needed
- [ ] MFA doesn't work → Add MFA domains
- [ ] Too restrictive → Lower security level
- [ ] Students bypass → Reset expectations (it's focus, not lockdown)

---

## Quality Assurance

### Pre-Launch Testing
- [ ] Test all preset configs (OneNote, Word, Google Docs, etc.)
- [ ] Test on Windows 10/11
- [ ] Test on macOS (latest 2 versions)
- [ ] Test with student accounts (not admin!)
- [ ] Test on school network
- [ ] Test on home network (if BYOD)
- [ ] Test MFA/2FA flows
- [ ] Test file upload/download (if enabled)

### Testing Matrix
| Config | Win10 | Win11 | macOS | School Net | Home Net | MFA | Status |
|--------|-------|-------|-------|------------|----------|-----|--------|
| OneNote |  [ ]  |  [ ]  |  [ ]  |    [ ]     |   [ ]    | [ ] |        |
| Word    |  [ ]  |  [ ]  |  [ ]  |    [ ]     |   [ ]    | [ ] |        |
| GDocs   |  [ ]  |  [ ]  |  [ ]  |    [ ]     |   [ ]    | [ ] |        |

---

## Launch Day

### Final Checks (Day Before)
- [ ] Tool URL is accessible
- [ ] All documentation published
- [ ] Support channels staffed
- [ ] Pilot teachers ready to assist
- [ ] Announcement drafted

### Launch Announcement Template
```
Subject: New Tool Available: SEB Config Generator

Dear Colleagues,

We're pleased to announce the SEB Config Generator, a new tool to help 
you create digital focus environments for students using their own devices.

What it does:
- Creates configurations for Safe Exam Browser
- Blocks distractions while allowing educational sites
- Works with OneNote, Word, Google Docs, and more

When to use it:
✅ Digital classwork and note-taking
✅ Focus mode for in-class activities
✅ Replacing paper-based worksheets

When NOT to use it:
❌ High-stakes exams (use managed devices)
❌ Homework (no way to verify compliance)

Get started:
1. Visit: [TOOL URL]
2. Read: [TEACHER GUIDE URL]
3. Questions: [SUPPORT EMAIL]

Pilot teachers available for peer support:
- [Name], [Subject]
- [Name], [Subject]
- [Name], [Subject]

Happy teaching!
[Your IT Team]
```

### Launch Day Activities
- [ ] Send announcement
- [ ] Monitor support channel closely
- [ ] IT team on standby for first week
- [ ] Quick-response to any blockers

---

## Post-Launch (First 4 Weeks)

### Week 1
- [ ] Daily check-ins with pilot teachers
- [ ] Log all issues in tracking system
- [ ] Quick fixes for critical blockers
- [ ] Update FAQ with new issues

### Week 2-4
- [ ] Weekly usage metrics (if trackable)
- [ ] Collect teacher feedback
- [ ] Refine documentation based on real-world use
- [ ] Build config template library

### Success Metrics
- [ ] Number of teachers using tool: Target ≥ 10
- [ ] Number of successful configs created: Target ≥ 25
- [ ] Student devices working: Target ≥ 80%
- [ ] Teacher satisfaction: Target ≥ 4/5
- [ ] Repeat usage rate: Target ≥ 60%

---

## Ongoing Maintenance

### Monthly Tasks
- [ ] Review support tickets for trends
- [ ] Update domain lists as services change
- [ ] Check for SEB updates
- [ ] Refresh documentation

### Quarterly Tasks
- [ ] Survey teacher satisfaction
- [ ] Review and update presets
- [ ] Test all configs still work
- [ ] Archive old/unused configs

### Annual Tasks
- [ ] Comprehensive review of program
- [ ] Update training materials
- [ ] Evaluate ROI (time saved vs. paper)
- [ ] Plan improvements for next year

---

## Rollback Plan (If Things Go Wrong)

### Criteria for Rollback
- [ ] >50% of configs failing
- [ ] Critical security issue discovered
- [ ] Overwhelming support burden
- [ ] Student/parent backlash

### Rollback Procedure
1. [ ] Send immediate communication to teachers: Stop using SEB
2. [ ] Take down tool (or disable)
3. [ ] Provide paper alternatives
4. [ ] Investigate root cause
5. [ ] Fix and re-launch or abandon

### Alternative Approaches If SEB Doesn't Work
- [ ] Browser kiosk mode (limited)
- [ ] Focus mode browser extensions
- [ ] LMS-based lockdown (if available)
- [ ] Return to paper (acceptable fallback!)

---

## Sign-Off

**IT Lead:** _______________ Date: _______________
**Approved:** _______________ Date: _______________

**Pilot Start Date:** _______________
**Full Launch Date:** _______________
**First Review Date:** _______________

---

## Notes & Issues Log

Date | Issue | Resolution | Follow-up
-----|-------|------------|----------
     |       |            |
     |       |            |
     |       |            |

---

## Contact Information

**Tool URL:** _______________
**Support Email:** _______________
**Support Phone:** _______________
**Documentation:** _______________
**SEB Download:** https://safeexambrowser.org/download_en.html

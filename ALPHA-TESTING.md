# Alpha Testing Guide 🧪

> Best practices for running effective alpha tests and collecting actionable feedback.

---

## What is Alpha Testing?

Alpha testing is **internal/early testing** before public release. The goal is to find bugs, UX issues, and gaps before judges or real users see the product.

**Alpha vs Beta:**
- **Alpha:** Close circle, finding major issues, features may be incomplete
- **Beta:** Wider audience, polishing, features are complete

---

## Alpha Testing Best Practices

### 1. Define Clear Goals
Before inviting testers, know what you want to learn:
- [ ] Does the core flow work? (Browse → Select → Chat)
- [ ] Are there obvious bugs?
- [ ] Is the UX confusing anywhere?
- [ ] Does it work on mobile?
- [ ] Does it work in different browsers?
- [ ] What's the first impression?

### 2. Recruit the Right Testers
**Ideal alpha testers:**
- Mix of technical and non-technical
- Different devices (iPhone, Android, desktop)
- Different browsers (Chrome, Safari, Firefox)
- Honest and willing to give critical feedback
- Available to test within your timeline

**How many:** 5-10 is ideal for alpha. Enough variety, not overwhelming.

### 3. Set Expectations
Tell testers upfront:
- This is early/incomplete software
- Things WILL break
- Their feedback matters
- How long testing should take (~15-30 min)
- How to submit feedback

### 4. Provide a Testing Script
Don't just say "test it." Give specific tasks:

```
TESTING TASKS (15-20 minutes)

1. FIRST IMPRESSION (2 min)
   - Visit the landing page
   - What do you think this app does?
   - Does anything confuse you?

2. BROWSE AGENTS (3 min)
   - Find the agent directory
   - Search for "coding" agents
   - Filter by specialty
   - Any issues?

3. START A CHAT (5 min)
   - Pick any agent
   - Start a conversation
   - Send a message
   - How does it feel?

4. MOBILE TEST (3 min)
   - Open on your phone
   - Try the same flow
   - Anything broken?

5. DARK MODE (2 min)
   - Toggle dark mode
   - Does everything look right?

6. OVERALL FEEDBACK
   - What did you like?
   - What frustrated you?
   - What's missing?
   - Would you use this?
```

### 5. Make Feedback Easy
**Multiple channels:**
- Quick form (Google Forms/Typeform)
- Bug report template
- Screenshot/screen recording encouraged
- Direct message option for shy testers

**Ask specific questions:**
- What device/browser did you use?
- What worked well?
- What was confusing?
- Did you encounter any errors?
- Rate your experience 1-5

### 6. Observe, Don't Just Ask
If possible, watch testers use the app:
- Screen share sessions
- Recording with permission
- Note where they hesitate
- What do they click first?

### 7. Triage Feedback Fast
Categorize issues immediately:
- 🔴 **Critical:** Blocks core functionality
- 🟡 **Major:** Significant UX issue
- 🟢 **Minor:** Nice to fix, not urgent
- 💡 **Suggestion:** Feature idea, not a bug

### 8. Close the Loop
Thank testers and show them their feedback mattered:
- "We fixed the bug you found!"
- "Your suggestion is now live!"
- Makes them want to test again

---

## HeyAgent Alpha Test Plan

### Timeline
| Day | Activity |
|-----|----------|
| Day 1 (Today) | Internal testing, fix obvious issues |
| Day 2 | Recruit 5-10 alpha testers |
| Day 3 | Alpha testing period (24-48h) |
| Day 4 | Review feedback, prioritize fixes |
| Day 5 | Fix critical and major issues |
| Day 6 | Quick beta round, final polish |
| Day 7 | Submit |

### Tester Recruitment
- Post on Twitter/X ✅
- Post on Moltbook (after rate limit)
- Ask in OpenClaw Discord
- Commander's network
- Agent owners in the hackathon

### Feedback Collection

**Option A: Google Form** (Recommended)
Simple, free, easy to analyze.

```
HeyAgent Alpha Feedback Form

1. Device used: [iPhone/Android/Desktop Mac/Desktop Windows]
2. Browser: [Chrome/Safari/Firefox/Edge/Other]
3. Did you complete the testing tasks? [Yes/Partially/No]
4. What worked well?
5. What was confusing or frustrating?
6. Did you encounter any errors? Describe:
7. Overall experience: [1-5 stars]
8. Would you use this product? [Yes/Maybe/No]
9. Any other feedback?
```

**Option B: GitHub Issues**
Create issue template for bug reports:
```yaml
name: Alpha Feedback
description: Submit feedback from alpha testing
body:
  - type: dropdown
    id: device
    label: Device
    options: [iPhone, Android, Mac, Windows, Other]
  - type: dropdown
    id: severity
    label: Severity
    options: [Critical, Major, Minor, Suggestion]
  - type: textarea
    id: description
    label: What happened?
  - type: textarea
    id: expected
    label: What did you expect?
```

**Option C: In-App Widget**
Add a feedback button in the app itself.

### Success Metrics
- [ ] At least 5 testers complete the script
- [ ] All critical bugs identified and fixed
- [ ] Core flow works for 100% of testers
- [ ] Mobile experience is acceptable
- [ ] Dark mode works everywhere
- [ ] Average rating ≥3.5/5

---

## Common Alpha Testing Mistakes

❌ **No structure** — Just saying "test it" without guidance
❌ **Too many testers too early** — Fix obvious stuff first
❌ **Ignoring feedback** — Testers won't help again
❌ **Only testing happy path** — Try to break it
❌ **No mobile testing** — Judges might be on phones
❌ **Waiting until last day** — No time to fix issues

---

## Quick Wins for Better Testing

1. **Add error logging** — Know when things break
2. **Add analytics** — See where users drop off
3. **Test offline** — What happens with no connection?
4. **Test slow connection** — Throttle to 3G
5. **Test with fresh eyes** — New browser, no cache
6. **Test as a real user** — Don't skip steps

---

*This guide should be followed for every release, not just the hackathon.*

**Last Updated:** 2026-02-01
**Author:** Jubei (PM)

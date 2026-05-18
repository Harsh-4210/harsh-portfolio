# Portfolio v2 — Upgrade Guide

Complete list of every file changed in this update and exactly where it goes.

---

## What Was Fixed / Added

| Issue | Fix |
|---|---|
| Chatbot not working | `/app/api/chat/route.ts` — Gemini Flash API route |
| Tech stack globe static | CSS 3D `rotateY` + drag-to-rotate + auto-spin |
| Light/dark mode broken | `ThemeProvider` reads `localStorage` + system pref, applies `.dark` / `.light` class to `<html>` |
| Light mode colour scheme broken | All CSS vars split into `:root` (dark) and `.light` blocks — every token now correct for both |
| Bento grid thin | Added stat cards row, ConflictBench expanded card, ARMS RACE card, Education card, Hackathon banner |
| Terminal — no contact form | `/mail` command + **CONNECT** button open contact modal; form opens email client |
| Book a Call not working | Modal with Calendly link + email + LinkedIn — fully wired |
| Skill levels (Advanced etc.) | Removed — just skill tags now |
| Missing certifications | Added Machine Learning Specialization + RAG course (deeplearning.ai) |

---

## File → Destination Map

```
DELIVERED FILE              →  YOUR REPO DESTINATION
─────────────────────────────────────────────────────────────────────
globals-v2.css              →  app/globals.css                  REPLACE
layout-v2.tsx               →  app/layout.tsx                   REPLACE
home-page-v2.tsx            →  app/page.tsx                     REPLACE
Navbar-v2.tsx               →  components/Navbar.tsx            REPLACE
ThemeProvider-v2.tsx        →  components/ThemeProvider.tsx     REPLACE
chat-route.ts               →  app/api/chat/route.ts            CREATE (new folder)
stack-page-v2.tsx           →  app/stack/page.tsx               REPLACE
contact-page-v2.tsx         →  app/contact/page.tsx             REPLACE
.env.example                →  .env.local                       CREATE (add your key)
```

Pages NOT changed this round (keep your existing v1 files):
- `app/projects/page.tsx`
- `app/architecture/page.tsx`
- `app/about/page.tsx`

---

## Step-by-Step Setup

### 1. Create the API route folder
```bash
mkdir -p app/api/chat
```

### 2. Copy files to correct locations
Follow the map above.

### 3. Add your Gemini API key
```bash
# Create .env.local in repo root
echo "GEMINI_API_KEY=your-gemini-api-key" > .env.local
```
Get a key at https://aistudio.google.com/app/apikey

### 4. Run
```bash
npm run dev
```

---

## How the Chatbot Works

```
User types question
       ↓
app/page.tsx  (Chatbot component)
       ↓  POST /api/chat  { message, history }
app/api/chat/route.ts
  ↓  Gemini Flash API
       ↓  System prompt = Harsh's full resume data
       ↓  Returns { reply }
Chatbot renders assistant bubble
```

The system prompt is hardcoded in `chat-route.ts` — no external DB needed.

---

## How Theme Toggle Works

```
ThemeProvider (client component)
  → reads localStorage "hj-theme" on mount
  → falls back to prefers-color-scheme
  → adds .dark or .light class to <html>

globals.css
  :root  { ... dark tokens ... }   ← dark is the DEFAULT
  .light { ... light tokens ... }  ← overrides when .light on <html>

Navbar toggle button
  → calls toggleTheme() from useTheme()
  → saves to localStorage
  → updates <html> class immediately
```

---

## Globe Interaction

- **Auto-spins** at 0.25°/frame when idle
- **Drag** mouse to rotate in any direction
- **Hover** a node — highlights it, shows category label at bottom
- **Pauses** auto-rotation for 2s after you stop dragging
- Nodes distributed using Fibonacci sphere (golden angle) for even coverage
- Each tech category has its own colour: ML=purple, Backend=pink, Infra=green, CV=cyan, AI=yellow

---

## Book a Call Modal

Opens from Navbar "Book a Call" button. Shows:
1. **Calendly** link → https://calendly.com/harshjain0621 (update to your actual URL)
2. **Email** → opens mailto with pre-filled subject
3. **LinkedIn** → direct profile link

Update the Calendly URL in `Navbar-v2.tsx` line ~80.

---

## Contact Terminal

Type any of these commands:
```
/about        → Harsh's background
/projects     → Project list
/contact      → Contact channels
/mail         → Opens the contact form modal
/resume.pdf   → Downloads resume
/clear        → Clear terminal
/help         → Command list
```

The "CONNECT ▶" button in the mail row also opens the contact modal directly.

---

## Certifications (Stack page)

Full list now:
1. Deep Learning Specialization — Andrew Ng · deeplearning.ai
2. Machine Learning Specialization — Andrew Ng · deeplearning.ai ← NEW
3. Generative AI with LLMs — AWS · Coursera
4. Building RAG Systems with LangChain — deeplearning.ai ← NEW
5. LLM Fundamentals — Hugging Face
6. 100 Days of Code: Python Pro — Udemy

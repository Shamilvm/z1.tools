# Resume Maker — Implementation Plan

A full-stack web application that helps users **check ATS scores**, **build professional resumes with AI assistance**, **generate PDFs**, and optionally **publish a portfolio page**, all wrapped in a sleek white-and-purple UI inspired by [devb.io](https://devb.io/).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS v3 |
| State | Zustand (lightweight global store) |
| Routing | React Router v6 |
| Forms | React Hook Form + Zod |
| PDF Preview | react-pdf |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT (httpOnly cookies) |
| AI | OpenAI GPT-4o (configurable via env) |
| PDF Parse | pdf-parse |
| PDF Generate | Puppeteer (headless Chrome) |

---

## Proposed Changes

### Monorepo Structure

```
resume.maker/
├── client/           ← React app
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── types/
│   │   └── lib/
└── server/           ← Express API
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── services/
    │   ├── models/
    │   ├── middleware/
    │   └── lib/
```

---

### Frontend — Pages

| Page | Route | Auth? |
|---|---|---|
| Landing | `/` | No |
| ATS Checker | `/ats` | No |
| Resume Builder | `/builder` | No |
| Resume Preview | `/preview` | No |
| Portfolio | `/portfolio` | Login required |
| Public Portfolio | `/:username` | No |
| Login / Register | `/login` `/register` | No |

---

### Frontend — Key Components

#### [NEW] `client/` (Vite + React + TS project)
- `src/pages/Landing.tsx` — Hero section, feature cards, CTA (devb.io style, white + purple)
- `src/pages/AtsChecker.tsx` — PDF drag-and-drop upload, score display, suggestions list
- `src/pages/ResumeBuilder.tsx` — Multi-step form (10+ sections) with AI suggestion panel
- `src/pages/ResumePreview.tsx` — Side-by-side: PDF preview + download button
- `src/pages/Portfolio.tsx` — Auth-gated portfolio creation, publicly viewable at `/:username`
- `src/pages/Auth.tsx` — Login + Register tabs
- `src/components/Navbar.tsx` — Logo, nav links, auth state
- `src/components/AtsUpload.tsx` — Drag-and-drop PDF uploader
- `src/components/AtsReport.tsx` — Score gauge, keyword analysis, improvement tips
- `src/components/ResumeForm/` — Multi-step wizard:
  - `StepPersonal.tsx` (name, email, phone, location, role, linkedin, github)
  - `StepAbout.tsx`
  - `StepSkills.tsx`
  - `StepExperience.tsx`
  - `StepEducation.tsx`
  - `StepProjects.tsx`
  - `StepAchievements.tsx`
  - `StepExtras.tsx` (certifications, languages, etc.)
- `src/components/AiSuggestions.tsx` — Floating panel with AI-generated rewrites per section
- `src/components/ResumeTemplate.tsx` — Styled resume HTML template (rendered to PDF)
- `src/components/PortfolioView.tsx` — Public portfolio page component (ref: shamilvm.com style)

---

### Backend — API Routes

#### [NEW] `server/` (Express + TS project)

**Auth**
- `POST /api/auth/register` — Create user, return JWT
- `POST /api/auth/login` — Validate credentials, return JWT
- `GET /api/auth/me` — Return current user (auth required)

**ATS**
- `POST /api/ats/check` — Accept PDF (multipart), run ATS analysis, return `{ score, keywords, suggestions }`

**Resume**
- `POST /api/resume/analyze` — Accept form JSON, call AI, return section-level suggestions
- `POST /api/resume/generate` — Accept form JSON, generate PDF via Puppeteer, return PDF buffer

**Portfolio**
- `POST /api/portfolio/create` — Auth required; save resume data to DB, assign username slug
- `GET /api/portfolio/:username` — Public; return portfolio JSON

---

### Backend — Services

#### [NEW] `server/src/services/`
- `atsService.ts` — Extract text from PDF with `pdf-parse`; score based on keyword density, section presence, formatting signals; call AI for tailored suggestions
- `aiService.ts` — Wrapper around OpenAI SDK; prompts for ATS suggestions and resume content rewrites
- `pdfService.ts` — Use Puppeteer to render `ResumeTemplate` HTML → PDF buffer
- `authService.ts` — bcrypt hashing, JWT sign/verify

#### [NEW] `server/src/models/`
- `User.ts` — `{ name, email, passwordHash, username, createdAt }`
- `Resume.ts` — Full resume form data blob (linked to User)
- `Portfolio.ts` — `{ userId, username, resumeData, theme, isPublic }`

---

## User Review Required

> [!IMPORTANT]
> **AI Provider**: The plan uses **OpenAI GPT-4o**. You will need to set `OPENAI_API_KEY` in a `.env` file. If you prefer Gemini or another provider, let me know and I'll swap it out.

> [!IMPORTANT]
> **PDF Generation**: Puppeteer downloads a ~170MB Chromium binary on first install. If you'd prefer a lighter alternative (like `pdfkit` or a React-to-PDF library), I can adjust.

> [!IMPORTANT]
> **Portfolio URL slug**: Public portfolios will be available at `/<username>` (e.g. `resumemaker.com/shamil`). Username is chosen at registration time. Confirm if this is the desired URL structure.

> [!NOTE]
> **No auth for ATS / Resume Builder**: The user can build and download a resume without logging in. Only portfolio creation requires auth and triggers DB storage of form data. Confirm this is correct.

---

## Verification Plan

### Manual Verification Steps

After running both servers, visit `http://localhost:5173`:

1. **Landing Page** — Verify hero section, feature cards, and CTA buttons render correctly in white-and-purple theme.

2. **ATS Checker**
   - Navigate to `/ats`
   - Upload a sample PDF resume
   - Verify a score (0–100) is returned with keyword analysis and improvement suggestions

3. **Resume Builder**
   - Navigate to `/builder`
   - Fill in all form sections for a software developer profile
   - On final step, click "Analyze with AI" — verify suggestions panel appears with section-level rewrites
   - Proceed to preview — verify a formatted PDF preview appears
   - Click "Download PDF" — verify a `.pdf` file is downloaded

4. **Portfolio Creation**
   - Register a new account at `/register`
   - Navigate to `/portfolio` (should redirect if not logged in)
   - After login, create a portfolio
   - Visit `/<username>` — verify the public portfolio page renders correctly with all resume sections

5. **Responsive Design** — Resize browser to mobile width; verify layout adapts cleanly.

### Running the App

```bash
# Server (port 5000)
cd server && npm run dev

# Client (port 5173)
cd client && npm run dev
```

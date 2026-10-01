# harsh-portfolio

Personal site of Harsh Jain. Next.js (App Router), Tailwind CSS v4 and Motion; every page is statically rendered. Layout inspired by the CodeBucks minimal Next.js portfolio, with a muted palette.

## Structure

```
app/
  page.tsx                  home: portrait, headline, résumé and contact
  about/page.tsx            biography, counters, skills map, experience timeline
  projects/page.tsx         featured case studies and other work
  projects/[slug]/page.tsx  case studies, generated at build time
  globals.css               theme tokens; dark mode is class-based with a toggle
components/                 Navbar (theme toggle, mobile menu), Footer, Section, Visuals, Icons
lib/content.ts              every piece of copy on the site
public/                     résumé PDF and portrait
```

All content lives in `lib/content.ts`. Adding a case study means adding an entry to `caseStudies`; the route is generated automatically.

## Content rule

Every number on the site must be reproducible from a public repo, training log or demo. If it can't be, it doesn't go in.

## Develop

```bash
npm install
npm run dev
```

`npm run build` produces a fully static build.

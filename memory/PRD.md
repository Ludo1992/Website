# L.A. Technische Service — Contact Page

## Original Problem Statement
User provided URL: https://ludoaloserij.nl/ — a one-man Dutch technical service business.
After iteration the user clarified:
- "Het hoeft eigenlijk alleen maar een contact pagina te zijn. Alleen dan van deze tijd. En het liefst in de bedrijfkleuren oranje wat het al was."
- Logo MUST stay the same (bedrijfskleding/huisstijl).

## Goal
A modern, single-page contact site for Ludo Aloserij with brand-orange palette and the original logo preserved.

## User Persona
- Ludo Aloserij (eigenaar, Dutch technician).
- Bezoekers: potentiële klanten met een technische klus/storing/vraag.

## Core Requirements (locked)
- Single page, Dutch language.
- Original logo (https://ludoaloserij.nl/wp-content/uploads/2023/11/Color-logo-no-background-1024x627.png) in header & footer.
- Orange brand color (#F97316 / brand-500).
- Modern look: serif display heading (Instrument Serif), Inter body, rounded-2xl cards, soft glow, dot-grid.
- Working contact form persisted to MongoDB.
- KvK 80568173 + e-mail info@ludoaloserij.nl visible.

## Architecture
- Backend: FastAPI + Motor (MongoDB). Endpoints under /api.
  - GET  /api/        → health
  - POST /api/contact → create contact (Pydantic EmailStr validation, 201)
  - GET  /api/contact → list contacts (no _id leak)
- Frontend: React (CRA + Tailwind), single page (Header, Hero, Contact, Footer).

## Implemented (2026-05-09)
- [x] Header with logo + sticky blur
- [x] Hero with serif headline "Alles met techniek. Eén aanspreekpunt."
- [x] Contact section with info cards (e-mail, KvK, reactietijd)
- [x] Contact form (naam, e-mail, onderwerp, bericht) with success/error states
- [x] Footer with logo, KvK, e-mail
- [x] Backend POST/GET /api/contact, validated by Pydantic EmailStr
- [x] All interactive elements have data-testid
- [x] Tested: backend 100% (5/5), valid 201 + invalid 422 verified via curl

## Backlog / Future
- [ ] P1: Email-notificatie naar info@ludoaloserij.nl bij nieuw bericht (SendGrid/Resend integratie)
- [ ] P2: Honeypot / rate limit tegen spam
- [ ] P2: Admin-view om binnengekomen berichten te lezen
- [ ] P3: SEO meta tags + Open Graph image
- [ ] P3: Cookie banner (origineel had wpconsent)

## Next Tasks
1. (Optioneel) Echte e-mail forwarding bij contactaanvraag toevoegen.
2. (Optioneel) Spambeveiliging.

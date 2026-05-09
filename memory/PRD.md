# L.A. Technische Service — Contact Page (Dark)

## Original Problem Statement
URL provided: https://ludoaloserij.nl/. User pivoted to: alleen een moderne contactpagina, in bedrijfskleur oranje, met behoud van het originele logo. Vervolgens: donkere achtergrond, met logo én slogan "Alles met Techniek" duidelijk zichtbaar (referentiebeeld bij iteratie 3).

## User Persona
- Ludo Aloserij (eigenaar, ZZP technicus).
- Bezoekers: potentiële klanten met klus/storing/vraag.

## Locked Requirements
- Single page, Nederlands.
- Originele logo URL behouden (huisstijl/bedrijfskleding) — getoond op witte pill voor zichtbaarheid op donker.
- Donker thema (#0d0d0f) met oranje (brand-500 #F97316) als accent + organische blob-vormen als sierelement.
- Slogan "Alles met techniek" prominent: in header naast logo én groot in hero (serif italic).
- Werkend contactformulier opgeslagen in MongoDB.
- KvK 80568173 + e-mail info@ludoaloserij.nl zichtbaar.

## Architecture
- Backend: FastAPI + Motor (MongoDB), endpoints onder /api.
  - GET  /api/         → health
  - POST /api/contact  → create (Pydantic EmailStr, 201)
  - GET  /api/contact  → list (geen _id leak)
- Frontend: React (CRA + Tailwind). Single page: Header, Hero, Contact, Footer. Decoratieve orange blobs achter content.

## Implementation Log
- 2026-05-09 — Iteration 1: Industrial dark site (cyaan accent, meerdere secties). 100% backend test pass.
- 2026-05-09 — Iteration 2: Pivot naar minimalistische licht/oranje contactpagina.
- 2026-05-09 — Iteration 3: Donker thema + oranje blobs + logo op witte pill + slogan groot in header en hero. Geverifieerd via curl: POST /api/contact → 201.

## Backlog
- P1: E-mail forwarding bij contactaanvraag (SendGrid/Resend) zodat Ludo notificatie krijgt.
- P2: Honeypot/rate-limit tegen spam.
- P2: Mini admin-view om binnengekomen berichten te lezen.
- P3: SEO meta tags + Open Graph image (gebruik logo).
- P3: Cookie banner (origineel had wpconsent).

## Next Tasks
1. (Optioneel) E-mail notificaties.
2. (Optioneel) Spambeveiliging.

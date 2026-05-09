# L.A. Technische Service — Contact Page

## Origin
URL: https://ludoaloserij.nl/. User wil één moderne contactpagina, oranje huisstijl, logo behouden, layout (bijna) 1:1 zoals een aangeleverde referentie-afbeelding (lichte achtergrond, grote zwart-wit industriële foto rechtsboven, oranje organische golfvorm links, witte info-card + grijze formulier-card met oranje SUBMIT pill).

## Locked Requirements
- Single page, Nederlands.
- Originele logo URL gebruiken (huisstijl/bedrijfskleding).
- Slogan "Alles met Techniek" prominent zichtbaar (header).
- Layout zoals referentie: lichte achtergrond, B&W industriële foto rechts, oranje SVG-golfvorm links, twee cards onderaan (info wit, formulier grijs).
- Werkend contactformulier opgeslagen in MongoDB.
- Bedrijfsdata: e-mail info@ludoaloserij.nl + KvK 80568173 (geen telefoon/adres beschikbaar — vervangen door E-mail / KvK / Bereikbaarheid).

## Architecture
- Backend: FastAPI + Motor (MongoDB), endpoints onder /api.
  - GET  /api/         → health
  - POST /api/contact  → create (Pydantic EmailStr, 201)
  - GET  /api/contact  → list (geen _id leak)
- Frontend: React (CRA + Tailwind). Single page.

## Implementation Log
- 2026-05-09 Iter 1: Industrial dark site (cyaan, multi-section). 100% backend tests pass.
- 2026-05-09 Iter 2: Pivot naar minimalistische licht/oranje contactpagina.
- 2026-05-09 Iter 3: Donker thema + oranje blobs.
- 2026-05-09 Iter 4 (huidige): Layout 1:1 zoals referentie — lichte achtergrond, B&W foto rechtsboven, oranje SVG golfvorm links, witte info-card (E-MAIL, KVK-NUMMER, BEREIKBAARHEID met oranje cirkel-iconen), grijze formulier-card met "Contacteer ons" titel en oranje pill VERZENDEN-knop. Logo + "L.A. TECHNISCHE SERVICE" / "Alles met Techniek" linksboven duidelijk zichtbaar. Backend POST /api/contact → 201 geverifieerd.

## Backlog
- P1: E-mail forwarding bij iedere contactaanvraag (SendGrid/Resend).
- P2: Honeypot / rate-limit tegen spam.
- P2: Mini admin-view om binnengekomen berichten te lezen.
- P3: SEO meta tags + Open Graph image.
- P3: Cookie banner.

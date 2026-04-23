# Z-Digital Solutions — Portfolio Website

## Original problem statement
Create a stunning portfolio website of a digital agency describing three tiers of website:
- One page website ₹15k
- Multi page website ₹30k
- Special APIs website 40k+

## User choices
- Agency name: **Z-Digital Solutions**
- Visual style: Light minimal / Swiss, generous whitespace
- Currency: **INR (₹)**
- Contact form: saves to backend + Resend email to `zdigitalassets93@gmail.com`
- Official logo: from user-uploaded Instagram screenshot (cropped to `/app/frontend/public/zd-icon.png`, `zd-wordmark.png`, `zd-wordmark-full.png`)
- Instagram: https://www.instagram.com/zdigital.solutions

## Architecture
- **Backend**: FastAPI + Motor (MongoDB), Resend (optional — key currently empty)
- **Frontend**: React 19 + Tailwind + Shadcn UI + Sonner toasts + @phosphor-icons/react
- **Fonts**: Cabinet Grotesk (display) + IBM Plex Sans / Mono (body/eyebrow)
- **Routes**:
  - `GET /api/` — health ping
  - `GET /api/health` — reports `email_configured`
  - `POST /api/contact` — create inquiry (persists; sends email if RESEND_API_KEY set)
  - `GET /api/contact` — list inquiries
  - `POST|GET /api/status` — legacy status checks

## Sections (final)
Nav · Hero · Marquee · Services · Pricing (websites) · Identity Assets (graphics bundles) · Process · Contact · Footer.

Removed: Testimonials (fake), Portfolio (fake client names). Replaced Hero stats (fabricated numbers) with honest claims (Flat / Fixed / In-house).

## Implemented (Dec 2025 → Apr 2026)
- Full single-page portfolio in Swiss/editorial style
- **Pricing** (3 website tiers: ₹15k / ₹30k / ₹40k+) with hover-lift cards
- **Identity Assets** (3 graphics bundles: ₹8k / ₹12k / ₹18k)
- **Simplified contact form**: Name, Email, Message only. Success toast: "Thanks! The Z-Digital team will get back to you within 24 hours."
- Official **Z-Digital logo** integrated in Nav (wordmark on desktop, icon on mobile) and Footer (full variant with tagline)
- Instagram link in Footer → `instagram.com/zdigital.solutions`
- Contact CTA/email routed to `zdigitalassets93@gmail.com`
- Resend integration ready (set `RESEND_API_KEY` in `backend/.env` to activate)
- 7/7 backend tests + frontend e2e verified passing (first iteration)
- Deployment Agent readiness check: **PASS** (no hardcoded envs, proper `/api` prefix, CORS OK, supervisor OK)

## Backlog
- **P0** — Provide `RESEND_API_KEY` so form submissions email `zdigitalassets93@gmail.com`
- **P1** — Verify `zdigitalassets93@gmail.com` on Resend account (or add custom domain `zdigitalsolutions.co` for deliverability to any inbox)
- **P2** — Add real case-study pages once first clients are delivered
- **P2** — Add a lightweight project estimator (tier + add-ons → auto-quote)
- **P3** — Admin-auth'd inquiries dashboard at `/admin`
- **P3** — Lenis smooth scroll + IntersectionObserver fade-ins

## Next tasks
1. User to share Resend API key → enable real email delivery
2. User to deploy via **Deploy** button in Emergent UI (readiness verified)
3. Optional: add project estimator / custom domain

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
- Contact form: saves to backend + success toast
- Integrations: Resend email notifications on form submit (key not yet provided — graceful fallback in place)

## Architecture
- **Backend**: FastAPI + Motor (MongoDB), Resend (optional)
- **Frontend**: React 19 + Tailwind + Shadcn UI + Sonner toasts + @phosphor-icons/react
- **Fonts**: Cabinet Grotesk (display) + IBM Plex Sans / Mono (body/eyebrow) via Fontshare & Google Fonts
- **Routes**:
  - `GET /api/` — health ping
  - `GET /api/health` — reports `email_configured`
  - `POST /api/contact` — create inquiry (persists, sends email if key set)
  - `GET /api/contact` — list inquiries (newest first)
  - `POST|GET /api/status` — legacy status checks

## User personas
- Founder / solo operator wanting a one-pager (₹15k tier)
- Funded startup needing a marketing site + CMS (₹30k tier)
- Product team needing API-heavy, auth+payments product surface (₹40k+ tier)

## Implemented (Dec 2025)
- Full single-page portfolio: Nav, Hero, Marquee, Services, Pricing (3 tiers w/ hover lift + sharp shadow), Portfolio bento grid, Process, Testimonials, Contact form, Footer
- Swiss/minimal design system with Signal Red (#FF3300) accent
- Contact form → MongoDB + optional Resend email (graceful skip if RESEND_API_KEY missing)
- Pricing CTAs pre-fill tier in Contact form via custom DOM event
- Sonner success/error toasts
- Full `data-testid` coverage on interactive elements
- 7/7 backend tests + frontend e2e verified passing

## Backlog
- **P1** — Add `RESEND_API_KEY`, `SENDER_EMAIL`, `NOTIFY_EMAIL` in backend/.env to enable live emails
- **P1** — Replace placeholder testimonials/portfolio imagery with real client work
- **P2** — Add a lightweight project-estimator (pick tier + add-ons, auto-calculate budget)
- **P2** — Add `/thank-you` page with social share
- **P2** — Add case-study detail pages (currently portfolio links to contact)
- **P3** — Add smooth scrolling (Lenis) + section-scroll fade-ins via IntersectionObserver
- **P3** — Admin-auth'd inquiries dashboard at `/admin`

## Next tasks
1. Collect Resend credentials from user → enable real email notifications
2. Swap portfolio & testimonial content for real case studies
3. Optional: add a project estimator / calculator widget

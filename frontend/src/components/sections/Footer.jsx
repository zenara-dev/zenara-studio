import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react";
import Logo from "@/components/Logo";

const INSTAGRAM_URL =
  "https://www.instagram.com/zdigital.solutions?igsh=MTJ0Y3hjMHg1bTY4OA==";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[var(--zd-ink)] text-[var(--zd-bg)] pt-20 md:pt-28 pb-10"
    >
      <div className="px-6 md:px-12 lg:px-16">
        {/* Massive CTA */}
        <div className="border-b border-white/15 pb-16 md:pb-24">
          <div className="eyebrow text-white/60">Let's talk</div>
          <a
            href="mailto:zdigitalassets93@gmail.com"
            data-testid="footer-cta-email"
            className="group mt-6 block font-display tracking-[-0.04em] uppercase leading-[0.9] text-[18vw] md:text-[14vw] hover:text-[var(--zd-accent)] transition-colors"
          >
            Start —
            <br />a project<span className="inline-block align-top ml-2">↗</span>
          </a>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mt-14">
          <div className="col-span-2 md:col-span-4">
            <div className="bg-white inline-block p-3">
              <Logo variant="full" height={72} />
            </div>
            <p className="mt-6 text-sm text-white/70 max-w-sm leading-relaxed">
              A boutique studio building sharp, editorial websites, product surfaces
              and brand identity for founders in India and beyond.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <div className="eyebrow text-white/60">Explore</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="zd-link" href="#services">Services</a></li>
              <li><a className="zd-link" href="#pricing">Pricing</a></li>
              <li><a className="zd-link" href="#identity">Identity</a></li>
              <li><a className="zd-link" href="#process">Process</a></li>
              <li><a className="zd-link" href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-white/60">Contact</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  className="zd-link"
                  data-testid="footer-email"
                  href="mailto:zdigitalassets93@gmail.com"
                >
                  zdigitalassets93@gmail.com
                </a>
              </li>
              <li>Indiranagar, Bangalore</li>
              <li>Mon — Fri / 10:00 — 19:00 IST</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-white/60">Follow</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-instagram"
                  className="zd-link inline-flex items-center gap-2"
                >
                  <InstagramLogo size={16} weight="regular" />
                  @zdigital.solutions
                  <ArrowUpRight size={12} weight="bold" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-3 font-mono text-[11px] tracking-[0.2em] uppercase text-white/60">
          <span>© {new Date().getFullYear()} Z-Digital Solutions</span>
          <span>Made in Bangalore · Shipped worldwide</span>
        </div>
      </div>
    </footer>
  );
}

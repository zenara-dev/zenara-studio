import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react";
import Logo from "@/components/Logo";

const INSTAGRAM_URL = "https://www.instagram.com/zenara.studio_";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-[var(--zn-ink)] text-[var(--zn-bg)] pt-20 md:pt-28 pb-10"
    >
      <div className="px-6 md:px-12 lg:px-16">
        {/* Massive CTA */}
        <div className="border-b border-white/15 pb-16 md:pb-24">
          <div className="eyebrow text-white/60">Let's talk</div>
          <a
            href="mailto:zdigitalassets93@gmail.com"
            data-testid="footer-cta-email"
            className="group mt-8 block zn-display leading-[0.9] text-[18vw] md:text-[14vw] hover:opacity-60 transition-opacity"
          >
            Begin
            <br />
            <span className="zn-display-italic">a project</span>
            <span className="inline-block align-top ml-2">↗</span>
          </a>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 mt-14">
          <div className="col-span-2 md:col-span-4">
            <Logo variant="stack" height={56} tone="soft" />
            <p className="mt-8 text-sm text-white/70 max-w-sm leading-relaxed">
              A small atelier building boutique digital infrastructure and premium
              client experiences for founders in India and beyond.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <div className="eyebrow text-white/60">Explore</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="zn-link" href="#services">Services</a></li>
              <li><a className="zn-link" href="#pricing">Pricing</a></li>
              <li><a className="zn-link" href="#identity">Identity</a></li>
              <li><a className="zn-link" href="#process">Process</a></li>
              <li><a className="zn-link" href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-white/60">Contact</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  className="zn-link"
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
                  className="zn-link inline-flex items-center gap-2"
                >
                  <InstagramLogo size={16} weight="regular" />
                  @zenara.studio_
                  <ArrowUpRight size={12} weight="bold" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 font-mono text-[11px] tracking-[0.2em] uppercase text-white/60">
          © {new Date().getFullYear()} Zenara Studios. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

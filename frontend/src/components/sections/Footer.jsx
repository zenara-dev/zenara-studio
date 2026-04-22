import { ArrowUpRight } from "@phosphor-icons/react";

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
            href="mailto:hello@zdigitalsolutions.co"
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--zd-accent)] flex items-center justify-center text-white font-display">
                Z
              </div>
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase">
                Z—Digital / Solutions
              </span>
            </div>
            <p className="mt-6 text-sm text-white/70 max-w-sm leading-relaxed">
              A boutique studio building sharp, editorial websites and product surfaces
              for founders in India and beyond.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <div className="eyebrow text-white/60">Explore</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="zd-link" href="#services">Services</a></li>
              <li><a className="zd-link" href="#pricing">Pricing</a></li>
              <li><a className="zd-link" href="#work">Work</a></li>
              <li><a className="zd-link" href="#process">Process</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow text-white/60">Contact</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="zd-link" href="mailto:hello@zdigitalsolutions.co">hello@zdigitalsolutions.co</a></li>
              <li><a className="zd-link" href="tel:+911234567890">+91 12345 67890</a></li>
              <li>Indiranagar, Bangalore</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow text-white/60">Elsewhere</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="zd-link inline-flex items-center gap-2" href="#">Twitter / X <ArrowUpRight size={12} weight="bold" /></a></li>
              <li><a className="zd-link inline-flex items-center gap-2" href="#">LinkedIn <ArrowUpRight size={12} weight="bold" /></a></li>
              <li><a className="zd-link inline-flex items-center gap-2" href="#">Dribbble <ArrowUpRight size={12} weight="bold" /></a></li>
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

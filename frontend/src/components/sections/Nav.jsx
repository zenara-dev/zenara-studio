import { useEffect, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import Logo from "@/components/Logo";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#identity", label: "Identity" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-colors ${
        scrolled ? "border-b border-[var(--zn-border)]" : "border-b border-transparent"
      }`}
    >
      <div className="px-6 md:px-12 lg:px-16 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-3">
          <Logo variant="wordmark" height={16} className="hidden sm:flex" />
          <Logo variant="mark" height={32} className="sm:hidden" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="font-mono text-[11px] tracking-[0.2em] uppercase zn-link"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            data-testid="nav-cta-start-project"
            className="zn-btn hidden md:inline-flex"
          >
            Start a project <ArrowUpRight size={14} weight="bold" />
          </a>
          <button
            data-testid="nav-mobile-toggle"
            aria-label="Toggle menu"
            className="md:hidden p-2 border border-[var(--zn-ink)]"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--zn-border)] bg-white">
          <div className="px-6 py-6 flex flex-col gap-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-[12px] tracking-[0.2em] uppercase"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="zn-btn mt-2"
              data-testid="nav-mobile-cta"
            >
              Start a project <ArrowUpRight size={14} weight="bold" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

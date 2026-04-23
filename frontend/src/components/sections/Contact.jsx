import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Check, Warning } from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const INITIAL = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // When the user clicks a tier/bundle CTA, prepend a friendly line into the
  // message so the info is still captured without adding extra form fields.
  useEffect(() => {
    const onSel = (e) => {
      const tier = e?.detail;
      if (!tier) return;
      setForm((f) => {
        const intro = `I'm interested in the ${tier} package.`;
        const alreadyHas = f.message.trim().startsWith("I'm interested in");
        const newMsg = alreadyHas
          ? f.message.replace(
              /^I'm interested in the .*?\.(\s*)/,
              `${intro}$1`,
            )
          : (intro + (f.message ? "\n\n" + f.message : "\n\n"));
        return { ...f, message: newMsg };
      });
    };
    window.addEventListener("zd:select-tier", onSel);
    return () => window.removeEventListener("zd:select-tier", onSel);
  }, []);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const valid =
    form.name.trim().length >= 2 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.message.trim().length >= 10;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      setDone(true);
      toast.success("Success", {
        description:
          "Thanks! The Z-Digital team will get back to you within 24 hours.",
        icon: <Check weight="bold" />,
        duration: 6000,
      });
      setForm(INITIAL);
    } catch (err) {
      toast.error("Could not send inquiry", {
        description:
          "Please try again or email us at zdigitalassets93@gmail.com.",
        icon: <Warning weight="bold" />,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="border-b border-[var(--zd-border)] py-20 md:py-28 bg-white"
    >
      <div className="px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-12 gap-6 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow">05 / Contact</div>
          </div>
          <h2 className="col-span-12 md:col-span-9 font-display text-3xl md:text-5xl lg:text-6xl tracking-tighter">
            Tell us what you're <br className="hidden md:block" />
            <span className="text-[var(--zd-muted)]">trying to build.</span>
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {/* Left info */}
          <aside className="col-span-12 md:col-span-4 lg:col-span-4">
            <div className="border-t border-[var(--zd-ink)] pt-6">
              <div className="eyebrow">Direct</div>
              <a
                href="mailto:zdigitalassets93@gmail.com"
                data-testid="contact-email"
                className="block mt-3 font-display text-xl md:text-2xl tracking-tight zd-link break-all"
              >
                zdigitalassets93@gmail.com
              </a>
            </div>
            <div className="mt-10 border-t border-[var(--zd-border)] pt-6">
              <div className="eyebrow">Studio</div>
              <p className="mt-3 text-base leading-relaxed">
                Indiranagar, Bangalore<br />
                Mon — Fri / 10:00 — 19:00 IST
              </p>
            </div>
            <div className="mt-10 border-t border-[var(--zd-border)] pt-6">
              <div className="eyebrow">What happens next</div>
              <ol className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="font-mono text-[11px] text-[var(--zd-muted)]">01</span>
                  <span>We read every message personally.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[11px] text-[var(--zd-muted)]">02</span>
                  <span>We reply within 24 hours with a call link.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-[11px] text-[var(--zd-muted)]">03</span>
                  <span>Scoping call → flat quote → kick-off.</span>
                </li>
              </ol>
            </div>
          </aside>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            data-testid="contact-form"
            className="col-span-12 md:col-span-8 lg:col-span-8 border border-[var(--zd-ink)] p-6 md:p-10 bg-[var(--zd-bg)]"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name *">
                <input
                  className="zd-input"
                  data-testid="contact-input-name"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                />
              </Field>
              <Field label="Email *">
                <input
                  type="email"
                  className="zd-input"
                  data-testid="contact-input-email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                />
              </Field>
            </div>

            <div className="mt-6">
              <Field label="Message *">
                <textarea
                  className="zd-input min-h-[180px] resize-y"
                  data-testid="contact-input-message"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="What are you building, who's it for, and when do you need it?"
                  required
                />
              </Field>
            </div>

            <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
              <p className="text-xs text-[var(--zd-muted)] max-w-md">
                By sending, you agree we'll store this message to respond. We don't
                sell or share your data.
              </p>
              <button
                type="submit"
                disabled={!valid || submitting}
                data-testid="contact-submit-btn"
                className="zd-btn"
              >
                {submitting ? "Sending…" : done ? "Sent" : "Send message"}
                <ArrowUpRight size={14} weight="bold" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2">{label}</span>
      {children}
    </label>
  );
}

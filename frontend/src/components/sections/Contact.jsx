import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Check, Warning } from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TIER_OPTIONS = ["One Page", "Multi Page", "Special APIs"];
const BUDGETS = ["₹15k – ₹30k", "₹30k – ₹60k", "₹60k – ₹1L", "₹1L+"];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    tier: "",
    budget: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onSel = (e) => {
      setForm((f) => ({ ...f, tier: e.detail }));
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
      const { data } = await axios.post(`${API}/contact`, form);
      setDone(true);
      toast.success("Inquiry received", {
        description: "We'll get back to you within one business day.",
        icon: <Check weight="bold" />,
      });
      setForm({
        name: "",
        email: "",
        company: "",
        tier: "",
        budget: "",
        message: "",
      });
      // eslint-disable-next-line no-console
      console.log("Inquiry saved:", data.id);
    } catch (err) {
      toast.error("Could not send inquiry", {
        description: "Please try again or email us at hello@zdigitalsolutions.co.",
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
            <div className="eyebrow">06 / Contact</div>
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
                href="mailto:hello@zdigitalsolutions.co"
                data-testid="contact-email"
                className="block mt-3 font-display text-xl md:text-2xl tracking-tight zd-link"
              >
                hello@zdigitalsolutions.co
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
                  <span>We reply within 1 business day with a call link.</span>
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
                />
              </Field>
              <Field label="Company">
                <input
                  className="zd-input"
                  data-testid="contact-input-company"
                  value={form.company}
                  onChange={update("company")}
                  placeholder="Company / brand (optional)"
                />
              </Field>
              <Field label="Budget">
                <select
                  className="zd-input"
                  data-testid="contact-select-budget"
                  value={form.budget}
                  onChange={update("budget")}
                >
                  <option value="">Select a budget (optional)</option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <div className="mt-6">
              <div className="eyebrow mb-3">Tier of interest</div>
              <div className="grid grid-cols-3 gap-0 border border-[var(--zd-border)]">
                {TIER_OPTIONS.map((t, i) => (
                  <button
                    type="button"
                    key={t}
                    data-testid={`contact-tier-${t.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setForm({ ...form, tier: t })}
                    className={`px-4 py-3 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${
                      i !== TIER_OPTIONS.length - 1 ? "border-r border-[var(--zd-border)]" : ""
                    } ${
                      form.tier === t
                        ? "bg-[var(--zd-ink)] text-white"
                        : "bg-white text-[var(--zd-ink)] hover:bg-[var(--zd-ink)]/5"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <Field label="Project brief *">
                <textarea
                  className="zd-input min-h-[160px] resize-y"
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
                By sending, you agree we'll store this message to respond. We don't sell
                or share your data.
              </p>
              <button
                type="submit"
                disabled={!valid || submitting}
                data-testid="contact-submit-btn"
                className="zd-btn"
              >
                {submitting ? "Sending…" : done ? "Sent" : "Send inquiry"}
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

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Check, Warning } from "@phosphor-icons/react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SERVICES = [
  { key: "website", label: "Website" },
  { key: "brand", label: "Brand Identity" },
];

const TIERS_BY_SERVICE = {
  website: [
    { key: "one-page", label: "One Page", price: "₹15k" },
    { key: "multi-page", label: "Multi Page", price: "₹30k" },
    { key: "special-apis", label: "Special APIs", price: "₹40k+" },
  ],
  brand: [
    { key: "starter-identity", label: "Starter Identity", price: "₹8k" },
    { key: "professional-brand", label: "Professional Brand", price: "₹12k" },
    { key: "established-clinic", label: "Established Clinic", price: "₹18k" },
  ],
};

const BUDGETS = [
  { key: "30k", label: "₹30,000" },
  { key: "50k", label: "₹50,000" },
  { key: "1lakh", label: "₹1 Lakh+" },
];

const INITIAL = {
  name: "",
  email: "",
  service: "",
  tier: "",
  budget: "",
  message: "",
};

// Map tier label from the pricing/identity CTA event → service + tier key
const TIER_LABEL_TO_KEY = {
  "One Page": { service: "website", tier: "one-page" },
  "Multi Page": { service: "website", tier: "multi-page" },
  "Special APIs": { service: "website", tier: "special-apis" },
  "Starter Identity": { service: "brand", tier: "starter-identity" },
  "Professional Brand": { service: "brand", tier: "professional-brand" },
  "Established Clinic": { service: "brand", tier: "established-clinic" },
};

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // When the user clicks a tier/bundle CTA elsewhere on the page, pre-select
  // the right service + tier here.
  useEffect(() => {
    const onSel = (e) => {
      const label = e?.detail;
      if (!label) return;
      const map = TIER_LABEL_TO_KEY[label];
      if (!map) return;
      setForm((f) => ({ ...f, service: map.service, tier: map.tier }));
    };
    window.addEventListener("zd:select-tier", onSel);
    return () => window.removeEventListener("zd:select-tier", onSel);
  }, []);

  // Clear the tier if the service changes to one that doesn't include it.
  useEffect(() => {
    if (!form.service) return;
    const allowed = TIERS_BY_SERVICE[form.service].map((t) => t.key);
    if (form.tier && !allowed.includes(form.tier)) {
      setForm((f) => ({ ...f, tier: "" }));
    }
  }, [form.service, form.tier]);

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
      // Send human-readable labels for tier/service to backend
      const tierLabel =
        form.service && form.tier
          ? TIERS_BY_SERVICE[form.service].find((t) => t.key === form.tier)
              ?.label || form.tier
          : "";
      const serviceLabel =
        SERVICES.find((s) => s.key === form.service)?.label || "";
      const budgetLabel =
        BUDGETS.find((b) => b.key === form.budget)?.label || "";

      await axios.post(`${API}/contact`, {
        name: form.name,
        email: form.email,
        service: serviceLabel || null,
        tier: tierLabel || null,
        budget: budgetLabel || null,
        message: form.message,
      });
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

  const currentTiers = form.service ? TIERS_BY_SERVICE[form.service] : [];

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

            {/* Service selector */}
            <div className="mt-6">
              <div className="eyebrow mb-3">Which service do you need?</div>
              <div className="grid grid-cols-2 gap-0 border border-[var(--zd-border)]">
                {SERVICES.map((s, i) => (
                  <button
                    type="button"
                    key={s.key}
                    data-testid={`contact-service-${s.key}`}
                    onClick={() => setForm({ ...form, service: s.key })}
                    className={`px-4 py-4 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${
                      i === 0 ? "border-r border-[var(--zd-border)]" : ""
                    } ${
                      form.service === s.key
                        ? "bg-[var(--zd-ink)] text-white"
                        : "bg-white text-[var(--zd-ink)] hover:bg-[var(--zd-ink)]/5"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tier selector — only after service is picked */}
            {currentTiers.length > 0 && (
              <div className="mt-6">
                <div className="eyebrow mb-3">
                  {form.service === "website"
                    ? "Website tier"
                    : "Brand identity tier"}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[var(--zd-border)]">
                  {currentTiers.map((t, i) => (
                    <button
                      type="button"
                      key={t.key}
                      data-testid={`contact-tier-${t.key}`}
                      onClick={() => setForm({ ...form, tier: t.key })}
                      className={`px-4 py-3 text-left transition-colors ${
                        i !== currentTiers.length - 1
                          ? "sm:border-r border-[var(--zd-border)]"
                          : ""
                      } ${
                        i !== 0
                          ? "border-t sm:border-t-0 border-[var(--zd-border)]"
                          : ""
                      } ${
                        form.tier === t.key
                          ? "bg-[var(--zd-ink)] text-white"
                          : "bg-white text-[var(--zd-ink)] hover:bg-[var(--zd-ink)]/5"
                      }`}
                    >
                      <div className="font-mono text-[11px] tracking-[0.18em] uppercase">
                        {t.label}
                      </div>
                      <div
                        className={`mt-1 font-display text-lg tracking-tight ${
                          form.tier === t.key
                            ? "text-white"
                            : "text-[var(--zd-muted)]"
                        }`}
                      >
                        {t.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Budget selector */}
            <div className="mt-6">
              <div className="eyebrow mb-3">Budget</div>
              <div className="grid grid-cols-3 gap-0 border border-[var(--zd-border)]">
                {BUDGETS.map((b, i) => (
                  <button
                    type="button"
                    key={b.key}
                    data-testid={`contact-budget-${b.key}`}
                    onClick={() => setForm({ ...form, budget: b.key })}
                    className={`px-4 py-3 font-mono text-[11px] tracking-[0.18em] uppercase transition-colors ${
                      i !== BUDGETS.length - 1
                        ? "border-r border-[var(--zd-border)]"
                        : ""
                    } ${
                      form.budget === b.key
                        ? "bg-[var(--zd-ink)] text-white"
                        : "bg-white text-[var(--zd-ink)] hover:bg-[var(--zd-ink)]/5"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <Field label="Message *">
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

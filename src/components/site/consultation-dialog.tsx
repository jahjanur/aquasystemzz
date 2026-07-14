"use client";

import * as React from "react";
import { X, ArrowRight, Phone, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

const PHONE_DISPLAY = "078 433 882";
const PHONE_TEL = "+38978433882";
const NOTIFY_EMAIL = "info@akvasystem.mk";

type Phase = "form" | "submitting" | "calling";

export function ConsultationDialog({
  open,
  onClose,
  dict,
}: {
  open: boolean;
  onClose: () => void;
  dict: Dictionary;
}) {
  const [phase, setPhase] = React.useState<Phase>("form");
  const formRef = React.useRef<HTMLFormElement>(null);
  const firstFieldRef = React.useRef<HTMLInputElement>(null);

  // Reset state when reopening
  React.useEffect(() => {
    if (open) setPhase("form");
  }, [open]);

  // Lock body scroll while open
  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Esc to close, autofocus first field
  React.useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (phase !== "form") return;
    setPhase("submitting");
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    // Send a notification email to ourselves with the lead's details (best-effort
    // mailto in a hidden window — works on most setups, silently fails otherwise).
    const subject = encodeURIComponent("[Akva Web] Consultation request");
    const body = encodeURIComponent(
      `New consultation request:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n— Akva website`,
    );
    try {
      const w = window.open(
        `mailto:${NOTIFY_EMAIL}?subject=${subject}&body=${body}`,
        "_blank",
      );
      // Some browsers won't grant focus to a mailto popup; close immediately if we can.
      window.setTimeout(() => {
        try {
          w?.close();
        } catch {}
      }, 100);
    } catch {
      // ignore
    }

    // Move to "calling" UI and trigger tel: in current window
    window.setTimeout(() => {
      setPhase("calling");
      window.location.href = `tel:${PHONE_TEL}`;
    }, 250);
  };

  const skipAndCall = () => {
    setPhase("calling");
    window.location.href = `tel:${PHONE_TEL}`;
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-title"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
    >
      <button
        aria-label={dict.consultation.close}
        onClick={onClose}
        className="absolute inset-0 bg-fg/60 backdrop-blur-sm"
      />
      <div
        className={cn(
          "relative w-full md:max-w-md mx-0 md:mx-4 bg-white rounded-t-3xl md:rounded-3xl border border-border shadow-[0_30px_70px_-20px_rgba(13,21,48,0.5)] overflow-hidden",
          "animate-[dialog-in_180ms_ease-out]",
        )}
      >
        <div className="absolute inset-x-0 top-0 h-1 accent-rule" />
        <button
          onClick={onClose}
          aria-label={dict.consultation.close}
          className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full text-fg-dim hover:text-fg hover:bg-bg-soft transition"
        >
          <X className="size-4" />
        </button>

        {phase === "calling" ? (
          <div className="px-6 md:px-8 pt-10 pb-7 text-center">
            <div className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-accent-tint text-accent">
              <Phone className="size-6" />
            </div>
            <h3 id="consultation-title" className="mt-5 text-2xl font-semibold text-fg">
              {dict.consultation.callingTitle}
            </h3>
            <p className="mt-2 text-sm text-fg-muted">
              {dict.consultation.callingHint}
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white h-12 px-7 font-semibold w-full hover:bg-accent-2 transition"
            >
              <Phone className="size-4" />
              {PHONE_DISPLAY}
            </a>
            <button
              onClick={onClose}
              className="mt-3 text-sm text-fg-muted hover:text-fg transition"
            >
              {dict.consultation.close}
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="px-6 md:px-8 pt-7 pb-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-accent-tint border border-accent/20 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
              <Sparkles className="size-3" />
              {dict.sticky.promo}
            </div>
            <h3
              id="consultation-title"
              className="mt-4 text-2xl md:text-3xl font-semibold text-fg leading-tight"
            >
              {dict.consultation.title}
            </h3>
            <p className="mt-2 text-sm text-fg-muted leading-relaxed">
              {dict.consultation.subtitle}
            </p>

            <div className="mt-5 space-y-3">
              <Field
                ref={firstFieldRef}
                name="name"
                label={dict.consultation.name}
                required
                autoComplete="name"
              />
              <Field
                name="email"
                type="email"
                label={dict.consultation.email}
                required
                autoComplete="email"
              />
              <Field
                name="phone"
                type="tel"
                label={dict.consultation.phone}
                autoComplete="tel"
              />
            </div>

            <button
              type="submit"
              disabled={phase === "submitting"}
              className={cn(
                "mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white w-full h-12 font-semibold",
                "shadow-[0_8px_24px_-10px_rgba(239,61,58,0.55)] hover:bg-accent-2 hover:-translate-y-0.5 transition disabled:opacity-60 disabled:translate-y-0",
              )}
            >
              {phase === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {dict.consultation.submit}
                </>
              ) : (
                <>
                  {dict.consultation.submit}
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={skipAndCall}
              className="mt-3 inline-flex items-center justify-center gap-1.5 w-full text-sm text-fg-muted hover:text-fg transition"
            >
              <Phone className="size-3.5" />
              {dict.consultation.skip}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes dialog-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

const Field = React.forwardRef<
  HTMLInputElement,
  {
    name: string;
    label: string;
    type?: string;
    required?: boolean;
    autoComplete?: string;
  }
>(function Field({ name, label, type = "text", required, autoComplete }, ref) {
  return (
    <label className="relative block">
      <input
        ref={ref}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder={label}
        className="peer w-full bg-bg-soft border border-border rounded-xl px-4 pt-5 pb-2 text-fg text-sm placeholder-transparent focus:outline-none focus:border-brand focus:bg-white transition"
      />
      <span className="pointer-events-none absolute left-4 top-2 text-[0.65rem] uppercase tracking-widest font-semibold text-fg-dim transition peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal peer-placeholder-shown:text-fg-dim peer-focus:top-2 peer-focus:text-[0.65rem] peer-focus:tracking-widest peer-focus:font-semibold peer-focus:text-brand">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
    </label>
  );
});

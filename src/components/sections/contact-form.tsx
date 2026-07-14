"use client";

import * as React from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = React.useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `[Web] ${data.get("subject") || dict.contact.pageTitle}`,
    );
    const body = encodeURIComponent(
      `${data.get("message") || ""}\n\n— ${data.get("name") || ""}\n${
        data.get("email") || ""
      }\n${data.get("phone") || ""}`,
    );
    try {
      window.location.href = `mailto:info@akvasystem.mk?subject=${subject}&body=${body}`;
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-white border border-border p-6 md:p-8 space-y-4 shadow-[0_20px_50px_-30px_rgba(13,21,48,0.25)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={dict.contact.form.name} required name="name" />
        <Field label={dict.contact.form.email} required name="email" type="email" />
        <Field label={dict.contact.form.phone} name="phone" type="tel" />
        <Field label={dict.contact.form.subject} name="subject" />
      </div>
      <Field
        label={dict.contact.form.message}
        required
        name="message"
        as="textarea"
        rows={5}
      />
      <div className="flex items-center justify-between gap-4 pt-2">
        <div className="text-xs">
          {status === "success" && (
            <span className="inline-flex items-center gap-1.5 text-success">
              <CheckCircle2 className="size-4" /> {dict.contact.form.success}
            </span>
          )}
          {status === "error" && (
            <span className="inline-flex items-center gap-1.5 text-danger">
              <AlertCircle className="size-4" /> {dict.contact.form.error}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white h-12 px-6 font-medium",
            "shadow-[0_10px_24px_-10px_rgba(57,83,164,0.5)] hover:bg-brand-2 hover:-translate-y-0.5 transition disabled:opacity-60",
          )}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {dict.contact.form.submitting}
            </>
          ) : (
            <>
              {dict.contact.form.submit}
              <Send className="size-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  as = "input",
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
}) {
  const sharedClass =
    "peer w-full bg-bg-soft border border-border rounded-xl px-4 pt-5 pb-2 text-fg placeholder-transparent focus:outline-none focus:border-brand focus:bg-white transition";
  return (
    <label className="relative block">
      {as === "input" ? (
        <input
          type={type}
          name={name}
          placeholder={label}
          required={required}
          className={sharedClass}
        />
      ) : (
        <textarea
          name={name}
          placeholder={label}
          required={required}
          rows={rows}
          className={cn(sharedClass, "resize-y min-h-[140px]")}
        />
      )}
      <span className="pointer-events-none absolute left-4 top-2 text-[0.7rem] uppercase tracking-widest font-semibold text-fg-dim transition peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal peer-placeholder-shown:text-fg-dim peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:tracking-widest peer-focus:font-semibold peer-focus:text-brand">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
    </label>
  );
}

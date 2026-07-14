"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { localeMeta, locales, type Locale } from "@/lib/i18n/config";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const swap = (target: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) {
      router.push(`/${target}/`);
    } else {
      segments[0] = target;
      router.push(`/${segments.join("/")}/`);
    }
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full bg-white/0 hover:bg-white/10 px-2 py-1 text-xs font-medium text-white/90 transition",
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Globe className="size-3.5" />
        <span>{localeMeta[current].short}</span>
        <ChevronDown className={cn("size-3.5 transition", open && "rotate-180")} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-44 bg-white border border-border rounded-xl p-1 shadow-[0_18px_50px_-15px_rgba(13,21,48,0.25)] z-50"
        >
          {locales.map((l) => (
            <button
              key={l}
              role="menuitem"
              onClick={() => swap(l)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                l === current
                  ? "bg-brand-tint text-brand"
                  : "text-fg-muted hover:bg-bg-soft hover:text-fg",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-[0.7rem] tracking-widest text-fg-dim">
                  {localeMeta[l].short}
                </span>
                <span>{localeMeta[l].label}</span>
              </span>
              {l === current && <Check className="size-3.5 text-brand" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConsultationDialog } from "./consultation-dialog";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function StickyMobileCTA({ dict }: { dict: Dictionary }) {
  const [visible, setVisible] = React.useState(false);
  const [closed, setClosed] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (closed) return null;

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-3 bottom-3 z-30 lg:hidden transition-all duration-300",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 pointer-events-none",
        )}
      >
        <div className="flex items-center gap-2 rounded-2xl bg-fg/95 backdrop-blur text-white px-3 py-2 shadow-[0_20px_50px_-15px_rgba(13,21,48,0.6)] border border-white/10">
          <div className="flex-1 min-w-0 px-1">
            <div className="text-[0.7rem] uppercase tracking-widest text-accent font-semibold">
              {dict.sticky.promo}
            </div>
            <div className="text-sm text-white/85 truncate">078 433 882</div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent text-white text-sm font-semibold px-3.5 h-10 hover:bg-accent-2 transition shrink-0"
          >
            {dict.sticky.cta}
            <ArrowRight className="size-4" />
          </button>
          <button
            aria-label="Close"
            onClick={() => setClosed(true)}
            className="inline-flex size-7 items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition shrink-0"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
      <ConsultationDialog
        open={open}
        onClose={() => setOpen(false)}
        dict={dict}
      />
    </>
  );
}

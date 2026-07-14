"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { ConsultationDialog } from "./consultation-dialog";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

export function ConsultationButton({
  dict,
  size = "md",
  className,
  children,
  withArrow = true,
}: {
  dict: Dictionary;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold transition tracking-tight",
          "shadow-[0_10px_24px_-10px_rgba(239,61,58,0.55)] hover:bg-accent-2 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-10px_rgba(239,61,58,0.6)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          SIZES[size],
          className,
        )}
      >
        <span>{children}</span>
        {withArrow && (
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        )}
      </button>
      <ConsultationDialog
        open={open}
        onClose={() => setOpen(false)}
        dict={dict}
      />
    </>
  );
}

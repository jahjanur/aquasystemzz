"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function FAQ({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
      <div className="lg:col-span-5">
        <Eyebrow>{dict.faq.eyebrow}</Eyebrow>
        <h2 className="mt-5 text-fg text-4xl md:text-5xl font-semibold leading-[1.05]">
          {dict.faq.title}
        </h2>
        <p className="mt-4 text-lg text-fg-muted leading-relaxed">
          {dict.faq.subtitle}
        </p>
        <a
          href="tel:+38978433882"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 h-11 text-sm font-medium text-fg hover:border-brand/40 hover:text-brand transition"
        >
          078 433 882
        </a>
      </div>
      <div className="lg:col-span-7 divide-y divide-border border-y border-border bg-white rounded-2xl">
        {dict.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={i} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                aria-expanded={isOpen}
              >
                <span
                  className={cn(
                    "text-base md:text-lg font-medium transition",
                    isOpen ? "text-brand" : "text-fg group-hover:text-brand",
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "inline-flex size-8 items-center justify-center rounded-full border transition shrink-0",
                    isOpen
                      ? "bg-brand text-white border-brand"
                      : "bg-white text-fg-muted border-border group-hover:border-brand/40 group-hover:text-brand",
                  )}
                >
                  <ChevronDown
                    className={cn("size-4 transition-transform", isOpen && "rotate-180")}
                  />
                </span>
              </button>
              <div
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows] duration-300",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0">
                  <p className="px-6 pb-6 text-fg-muted leading-relaxed">{item.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { ArrowRight } from "lucide-react";

export function Newsletter({ subscribe }: { subscribe: string }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2 rounded-full bg-white border border-border p-1 pl-5 focus-within:border-brand transition shadow-sm"
    >
      <input
        type="email"
        placeholder="email@example.com"
        className="flex-1 bg-transparent text-sm text-fg placeholder:text-fg-dim outline-none"
        aria-label="Email"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand text-white text-sm font-medium px-4 h-9 hover:bg-brand-2 transition"
      >
        {subscribe}
        <ArrowRight className="size-3.5" />
      </button>
    </form>
  );
}

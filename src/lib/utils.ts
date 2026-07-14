import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Deterministic number formatter (server == client). Avoids Intl locale mismatches
// between Node and the browser that cause hydration errors.
export function formatNumber(n: number, sep = "."): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

// Deterministic DD.MM.YYYY formatter from an ISO date (YYYY-MM-DD). Same reason
// as formatNumber: no Intl, so server and client output match exactly.
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

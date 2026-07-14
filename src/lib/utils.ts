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

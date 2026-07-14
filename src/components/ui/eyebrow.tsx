import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  variant = "brand",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "brand" | "accent";
}) {
  const colors =
    variant === "accent"
      ? "border-accent/20 bg-accent-tint text-accent-2"
      : "border-brand/15 bg-brand-tint text-brand-2";
  const dot = variant === "accent" ? "bg-accent" : "bg-brand";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        colors,
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", dot)} />
      {children}
    </span>
  );
}

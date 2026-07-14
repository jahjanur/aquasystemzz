import { AnimatedCounter } from "@/components/ui/animated-counter";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Stats({ dict }: { dict: Dictionary }) {
  const items = [
    { value: 12, suffix: "+", label: dict.common.yearsExperience, accent: false },
    { value: 1200, suffix: "+", label: dict.common.happyClients, accent: true },
    { value: 850, suffix: "+", label: dict.common.completedProjects, accent: false },
    { value: 24, suffix: "/7", label: "Service", accent: false, raw: true },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
      {items.map((s) => (
        <div
          key={s.label}
          className="surface-card rounded-2xl p-6 md:p-7 flex flex-col items-start"
        >
          <div
            className={
              "text-4xl md:text-5xl font-display font-semibold tracking-tight tabular-nums " +
              (s.accent ? "text-accent" : "text-brand")
            }
          >
            {s.raw ? (
              <span>
                {s.value}
                {s.suffix}
              </span>
            ) : (
              <AnimatedCounter value={s.value} suffix={s.suffix} />
            )}
          </div>
          <div className="mt-2 text-sm text-fg-muted">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

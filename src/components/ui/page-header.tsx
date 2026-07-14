import { Eyebrow } from "./eyebrow";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative pt-16 md:pt-24 pb-10 hero-mesh", className)}>
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-5 text-fg text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.04] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-fg-muted">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

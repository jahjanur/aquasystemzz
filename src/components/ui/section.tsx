import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  bg = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bg?: "default" | "soft";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28 lg:py-32",
        bg === "soft" && "bg-bg-soft",
        className,
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16 max-w-3xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && <div className="mb-5">{eyebrow}</div>}
      <h2 className="text-fg text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.05] font-semibold">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg text-fg-muted leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

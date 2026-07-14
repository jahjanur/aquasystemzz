import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  as: Comp = "div",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Comp className={cn("relative surface-card rounded-2xl overflow-hidden", className)}>
      {children}
    </Comp>
  );
}

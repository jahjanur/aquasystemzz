import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition will-change-transform select-none rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_8px_24px_-10px_rgba(57,83,164,0.5)] hover:bg-brand-2 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(57,83,164,0.55)]",
  accent:
    "bg-accent text-white shadow-[0_8px_24px_-10px_rgba(239,61,58,0.5)] hover:bg-accent-2 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-10px_rgba(239,61,58,0.55)]",
  secondary:
    "bg-bg-soft text-fg border border-border hover:bg-brand-soft hover:border-brand/30",
  outline:
    "border border-border-strong text-fg hover:border-brand/40 hover:bg-brand-tint",
  ghost:
    "text-fg-muted hover:text-fg hover:bg-bg-soft",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    className,
    children,
  } = props;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  const finalClass = cn(base, sizes[size], variants[variant], "group", className);

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={finalClass}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={finalClass}>
        {content}
      </Link>
    );
  }

  const { variant: _v, size: _s, withArrow: _w, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  void _v; void _s; void _w; void _c; void _ch;
  return (
    <button className={finalClass} {...rest}>
      {content}
    </button>
  );
}

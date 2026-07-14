import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="Akva System ZZ"
      className={cn("inline-flex items-center", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="Akva System ZZ"
        className="h-8 md:h-10 w-auto select-none"
        draggable={false}
      />
    </Link>
  );
}

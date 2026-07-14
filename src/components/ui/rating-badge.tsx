import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingBadge({
  label,
  reviews,
  className,
}: {
  label: string;
  reviews: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full bg-white border border-border pl-1 pr-4 py-1 shadow-[0_1px_0_rgba(13,21,48,0.02),0_8px_20px_-15px_rgba(13,21,48,0.25)]",
        className,
      )}
    >
      <span className="inline-flex items-center justify-center size-8 rounded-full bg-bg-soft border border-border">
        <GoogleG className="size-4" />
      </span>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-3.5 fill-amber-400 stroke-amber-500"
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-fg">{label}</span>
        <span className="text-xs text-fg-dim">·</span>
        <span className="text-xs text-fg-muted">{reviews}</span>
      </div>
    </div>
  );
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className}>
      <path
        fill="#FBBC05"
        d="M9.8 24c0-1.5.3-3 .8-4.4l-7-5.4C2 17.4 1 20.6 1 24c0 3.4 1 6.6 2.6 9.8l7-5.4c-.5-1.4-.8-2.9-.8-4.4z"
      />
      <path
        fill="#EB4335"
        d="M24 9.5c3 0 5.7 1 7.9 2.8l6-6C34 2.8 29.3 1 24 1 16.4 1 9.8 5.4 6.6 12l7 5.4C15.4 12.5 19.3 9.5 24 9.5z"
      />
      <path
        fill="#34A853"
        d="M24 38.5c-4.7 0-8.6-3-10.5-7.9l-7 5.4C9.8 42.6 16.4 47 24 47c5.1 0 10-1.7 13.3-5.1l-6.6-5.1c-1.8 1.2-4 1.7-6.7 1.7z"
      />
      <path
        fill="#4285F4"
        d="M47 24c0-1.4-.1-2.7-.4-4H24v8h12.9c-.6 2.9-2.4 5.4-5.2 7.1l6.6 5.1C42.6 36.4 47 30.6 47 24z"
      />
    </svg>
  );
}

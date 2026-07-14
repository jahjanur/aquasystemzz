import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { formatNumber } from "@/lib/utils";

export function ProductCard({
  product,
  href,
  fromLabel,
  detailsLabel,
}: {
  product: Product;
  href: string;
  fromLabel: string;
  detailsLabel: string;
}) {
  return (
    <Link href={href} className="group relative block surface-card rounded-2xl p-5 md:p-6 h-full">
      <div className="flex flex-col h-full">
        <div className="relative aspect-[5/4] rounded-xl overflow-hidden border border-border bg-white">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <FallbackUnit />
          )}
          {product.highlight && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-accent text-white px-2.5 py-1 text-[0.7rem] font-semibold shadow-[0_6px_18px_-6px_rgba(239,61,58,0.5)]">
              <Zap className="size-3" /> Bestseller
            </span>
          )}
          <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-white/95 backdrop-blur border border-border px-2 py-0.5 text-[0.7rem] font-semibold text-fg">
            {product.energyClass}
          </span>
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <div className="text-xs uppercase tracking-widest text-fg-dim font-semibold">
            {product.brand}
          </div>
          <h3 className="mt-1 text-base md:text-lg font-semibold text-fg leading-snug line-clamp-2">
            {product.name}
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5 text-[0.7rem]">
            {product.capacityBtu > 0 && (
              <Spec label={`${formatNumber(product.capacityBtu)} BTU`} />
            )}
            <Spec label={`${product.roomSizeM2[0]}–${product.roomSizeM2[1]} m²`} />
            {product.features?.slice(0, 1).map((f) => <Spec key={f} label={f} />)}
          </div>
          <div className="mt-auto pt-5 flex items-end justify-between">
            <div>
              <div className="text-[0.7rem] uppercase tracking-widest text-fg-dim">
                {fromLabel}
              </div>
              <div className="text-lg md:text-xl font-semibold text-brand">
                {formatNumber(product.priceMkd)} ден
              </div>
              <div className="text-[0.7rem] text-fg-dim">
                ≈ € {formatNumber(product.priceFromEur)}
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-fg-muted group-hover:text-brand transition shrink-0">
              {detailsLabel}
              <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function Spec({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border bg-bg-soft px-2.5 py-1 text-fg-muted">
      {label}
    </span>
  );
}

function FallbackUnit() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[80%] aspect-[3.4/1]">
        <div className="absolute inset-0 rounded-[10px] bg-gradient-to-b from-white to-zinc-100 border border-border shadow-[0_10px_24px_-10px_rgba(13,21,48,0.25)]" />
      </div>
    </div>
  );
}

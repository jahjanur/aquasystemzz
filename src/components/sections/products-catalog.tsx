"use client";

import * as React from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "./product-card";
import {
  brands,
  capacityBuckets,
  products,
  roomBuckets,
  type Product,
  type ProductCategory,
} from "@/lib/data/products";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type Filters = {
  category: ProductCategory | "all";
  brand: string | "all";
  capacity: string | "all";
  room: string | "all";
};

const initial: Filters = {
  category: "all",
  brand: "all",
  capacity: "all",
  room: "all",
};

const categoryOrder: ProductCategory[] = [
  "split",
  "multisplit",
  "portable",
  "vrf",
  "heatpump",
  "ventilation",
];
// Only surface categories we actually stock — no dead, always-empty filter chips.
const availableCategories = categoryOrder.filter((c) =>
  products.some((p) => p.category === c),
);

export function ProductsCatalog({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [filters, setFilters] = React.useState<Filters>(initial);
  const [open, setOpen] = React.useState(false);

  // Deep link support: /products/?brand=Midea preselects the brand filter.
  React.useEffect(() => {
    const brand = new URLSearchParams(window.location.search).get("brand");
    if (brand && brands.includes(brand)) {
      setFilters((f) => ({ ...f, brand }));
    }
  }, []);

  const filtered: Product[] = React.useMemo(() => {
    return products.filter((p) => {
      if (filters.category !== "all" && p.category !== filters.category) return false;
      if (filters.brand !== "all" && p.brand !== filters.brand) return false;
      if (filters.capacity !== "all") {
        const bucket = capacityBuckets.find((b) => b.id === filters.capacity);
        if (bucket && !bucket.match(p.capacityBtu)) return false;
      }
      if (filters.room !== "all") {
        const bucket = roomBuckets.find((b) => b.id === filters.room);
        if (bucket && !bucket.match(p.roomSizeM2)) return false;
      }
      return true;
    });
  }, [filters]);

  const activeCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.brand !== "all" ? 1 : 0) +
    (filters.capacity !== "all" ? 1 : 0) +
    (filters.room !== "all" ? 1 : 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-10">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center justify-center gap-2 rounded-full bg-white border border-border px-5 h-11 text-sm font-medium text-fg shadow-sm"
      >
        <SlidersHorizontal className="size-4" />
        {dict.common.filter}
        {activeCount > 0 && (
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-brand text-white text-[0.7rem] font-semibold">
            {activeCount}
          </span>
        )}
      </button>

      <aside className="lg:sticky lg:top-28 lg:self-start hidden lg:block">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            dict={dict}
            activeCount={activeCount}
          />
        </div>
      </aside>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute inset-0 bg-fg/40 backdrop-blur-sm"
          />
          <div className="relative mt-auto rounded-t-3xl bg-white border-t border-border p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <div className="text-base font-semibold text-fg">
                {dict.common.filter}
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="inline-flex items-center justify-center size-9 rounded-full border border-border text-fg-muted"
              >
                <X className="size-4" />
              </button>
            </div>
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              dict={dict}
              activeCount={activeCount}
            />
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-fg-muted">
            <span className="text-fg font-semibold">{filtered.length}</span>{" "}
            {dict.common.results}
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(initial)}
              className="text-sm font-medium text-accent hover:text-accent-2 transition"
            >
              {dict.common.clearFilters}
            </button>
          )}
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-border bg-bg-soft p-12 text-center text-fg-muted">
            {dict.common.noResults}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProductCard
                key={p.slug}
                product={p}
                href={`/${locale}/products/${p.slug}/`}
                fromLabel={dict.products.card.from}
                detailsLabel={dict.products.card.viewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPanel({
  filters,
  setFilters,
  dict,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  dict: Dictionary;
  activeCount: number;
}) {
  return (
    <div className="space-y-7">
      <FilterGroup label={dict.products.filters.category}>
        <Chip
          active={filters.category === "all"}
          onClick={() => setFilters((f) => ({ ...f, category: "all" }))}
        >
          {dict.products.filters.all}
        </Chip>
        {availableCategories.map((c) => (
          <Chip
            key={c}
            active={filters.category === c}
            onClick={() => setFilters((f) => ({ ...f, category: c }))}
          >
            {dict.products.categories[c]}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label={dict.products.filters.brand}>
        <Chip
          active={filters.brand === "all"}
          onClick={() => setFilters((f) => ({ ...f, brand: "all" }))}
        >
          {dict.products.filters.all}
        </Chip>
        {brands.map((b) => (
          <Chip
            key={b}
            active={filters.brand === b}
            onClick={() => setFilters((f) => ({ ...f, brand: b }))}
          >
            {b}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label={dict.products.filters.capacity}>
        <Chip
          active={filters.capacity === "all"}
          onClick={() => setFilters((f) => ({ ...f, capacity: "all" }))}
        >
          {dict.products.filters.all}
        </Chip>
        {capacityBuckets.map((b) => (
          <Chip
            key={b.id}
            active={filters.capacity === b.id}
            onClick={() => setFilters((f) => ({ ...f, capacity: b.id }))}
          >
            {b.label}
          </Chip>
        ))}
      </FilterGroup>

      <FilterGroup label={dict.products.filters.roomSize}>
        <Chip
          active={filters.room === "all"}
          onClick={() => setFilters((f) => ({ ...f, room: "all" }))}
        >
          {dict.products.filters.all}
        </Chip>
        {roomBuckets.map((b) => (
          <Chip
            key={b.id}
            active={filters.room === b.id}
            onClick={() => setFilters((f) => ({ ...f, room: b.id }))}
          >
            {b.label}
          </Chip>
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-fg-dim font-semibold mb-3">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm font-medium transition",
        active
          ? "border-brand bg-brand text-white"
          : "border-border bg-white text-fg-muted hover:border-brand/40 hover:text-brand",
      )}
    >
      {children}
    </button>
  );
}

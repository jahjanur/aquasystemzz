"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Sun, Wind, Home as HomeIcon, Zap } from "lucide-react";
import { products, type Product } from "@/lib/data/products";
import { cn, formatNumber } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

type RoomType = "bedroom" | "living" | "kitchen" | "office" | "shop";
type SunLevel = "low" | "normal" | "high";

const ROOM_TYPES: RoomType[] = ["bedroom", "living", "kitchen", "office", "shop"];
const SUN_LEVELS: SunLevel[] = ["low", "normal", "high"];

// MK-market AC sizing (≈ 100 W/m² for normal residential).
// Each row = upper bound of effective area → recommended unit.
const SIZE_TABLE = [
  { maxArea: 25, btu: 9000, kw: 2.6 },
  { maxArea: 35, btu: 12000, kw: 3.5 },
  { maxArea: 55, btu: 18000, kw: 5.5 },
  { maxArea: 75, btu: 24000, kw: 7.7 },
  { maxArea: 110, btu: 36000, kw: 10.5 },
  { maxArea: Infinity, btu: 48000, kw: 14.0 },
] as const;

// Room-type modifier expressed as effective-area multiplier.
const TYPE_FACTOR: Record<RoomType, number> = {
  bedroom: 0.9,
  living: 1.0,
  office: 1.0,
  kitchen: 1.2,
  shop: 1.1,
};

const SUN_FACTOR: Record<SunLevel, number> = {
  low: 0.92,
  normal: 1.0,
  high: 1.15,
};

function recommend(area: number, rooms: number, type: RoomType, sun: SunLevel) {
  const effectiveArea =
    area * TYPE_FACTOR[type] * SUN_FACTOR[sun] * (rooms > 1 ? 1.05 : 1);
  const size = SIZE_TABLE.find((s) => effectiveArea <= s.maxArea) ?? SIZE_TABLE[SIZE_TABLE.length - 1];
  return { btu: size.btu, kw: size.kw, isMulti: rooms > 1 };
}

function bestMatch(targetBtu: number): Product | null {
  const min = targetBtu * 0.85;
  const max = targetBtu * 1.25;
  const pool = products.filter(
    (p) => p.capacityBtu >= min && p.capacityBtu <= max && p.image,
  );
  if (pool.length === 0) return null;
  return pool
    .map((p) => ({ p, delta: Math.abs(p.capacityBtu - targetBtu) }))
    .sort((a, b) => a.delta - b.delta || a.p.priceMkd - b.p.priceMkd)[0].p;
}

export function HeroCalculator({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [area, setArea] = React.useState(25);
  const [rooms, setRooms] = React.useState(1);
  const [type, setType] = React.useState<RoomType>("living");
  const [sun, setSun] = React.useState<SunLevel>("normal");

  const result = recommend(area, rooms, type, sun);
  const match = bestMatch(result.btu);

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-brand/15 via-transparent to-accent/15 blur-3xl pointer-events-none" />
      <div className="relative rounded-[1.75rem] bg-white border border-border shadow-[0_30px_70px_-20px_rgba(13,21,48,0.25)] overflow-hidden">
        {/* Header strip */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-border">
          <div className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-brand font-semibold">
            <Calculator className="size-3.5" />
            {dict.sizing.eyebrow}
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-tint border border-accent/20 px-2.5 py-0.5 text-[0.65rem] font-semibold text-accent uppercase tracking-wider">
            <Zap className="size-3" />
            Free
          </span>
        </div>

        {/* Form */}
        <div className="p-5 md:p-6 space-y-4">
          {/* Area slider */}
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.16em] text-fg-dim font-semibold">
                <HomeIcon className="size-3.5 text-brand" />
                {dict.sizing.area}
              </span>
              <span className="font-semibold text-brand text-sm tabular-nums">
                {area} m²
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={150}
              step={5}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="w-full accent-brand h-2 mt-2"
            />
          </div>

          {/* Rooms */}
          <Row icon={<Wind className="size-3.5 text-brand" />} label={dict.sizing.rooms}>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4].map((n) => (
                <Pill key={n} active={rooms === n} onClick={() => setRooms(n)}>
                  {n === 4 ? "4+" : n}
                </Pill>
              ))}
            </div>
          </Row>

          {/* Type */}
          <Row icon={<Calculator className="size-3.5 text-brand" />} label={dict.sizing.roomType}>
            <div className="flex flex-wrap gap-1.5">
              {ROOM_TYPES.map((rt) => (
                <Pill key={rt} active={type === rt} onClick={() => setType(rt)}>
                  {dict.sizing.types[rt]}
                </Pill>
              ))}
            </div>
          </Row>

          {/* Sun */}
          <Row icon={<Sun className="size-3.5 text-brand" />} label={dict.sizing.sun}>
            <div className="grid grid-cols-3 gap-1.5">
              {SUN_LEVELS.map((s) => (
                <Pill key={s} active={sun === s} onClick={() => setSun(s)}>
                  {dict.sizing.sunLevels[s]}
                </Pill>
              ))}
            </div>
          </Row>
        </div>

        {/* Result panel */}
        <div className="relative bg-fg text-white px-6 py-5 overflow-hidden">
          <div
            className="pointer-events-none absolute -inset-1/2"
            style={{
              background:
                "radial-gradient(45% 45% at 25% 30%, rgba(57,83,164,0.55) 0%, transparent 60%), radial-gradient(45% 45% at 80% 80%, rgba(239,61,58,0.4) 0%, transparent 60%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[0.65rem] uppercase tracking-[0.22em] text-white/60 font-semibold">
                  {dict.sizing.result}
                </div>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-display font-semibold tabular-nums tracking-tight">
                    {formatNumber(result.btu)}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-white/60">
                    BTU
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="text-2xl md:text-3xl font-display font-semibold text-accent tabular-nums">
                    {result.kw.toFixed(1)}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-white/60">
                    kW
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-2.5 py-0.5 text-[0.7rem] text-white/85">
              {result.isMulti ? dict.sizing.multi : dict.sizing.single}
            </div>

            {match && (
              <Link
                href={`/${locale}/products/${match.slug}/`}
                className="mt-4 group flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-2.5 hover:bg-white/10 transition"
              >
                <div className="size-11 shrink-0 rounded-lg bg-white p-1 overflow-hidden">
                  {match.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={match.image}
                      alt={match.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[0.65rem] uppercase tracking-widest text-white/50 font-semibold">
                    {match.brand}
                  </div>
                  <div className="text-xs font-medium text-white truncate">
                    {match.name}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-semibold text-white">
                    {formatNumber(match.priceMkd)} ден
                  </div>
                </div>
                <ArrowRight className="size-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition shrink-0" />
              </Link>
            )}

            <Link
              href={`/${locale}/contact/?btu=${result.btu}&area=${area}&rooms=${rooms}`}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white w-full h-11 font-semibold text-sm shadow-[0_8px_20px_-6px_rgba(239,61,58,0.55)] hover:bg-accent-2 hover:-translate-y-0.5 transition"
            >
              {dict.sizing.cta}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.16em] text-fg-dim font-semibold flex items-center gap-1.5 mb-1.5">
        {icon}
        {label}
      </div>
      {children}
    </div>
  );
}

function Pill({
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
        "rounded-full border px-2.5 py-1.5 text-xs font-medium transition truncate",
        active
          ? "border-brand bg-brand text-white shadow-[0_4px_12px_-4px_rgba(57,83,164,0.5)]"
          : "border-border bg-white text-fg-muted hover:border-brand/40 hover:text-brand",
      )}
    >
      {children}
    </button>
  );
}

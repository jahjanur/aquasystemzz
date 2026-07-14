import {
  Home,
  Building2,
  Flame,
  Wind,
  Wrench,
  Ruler,
  type LucideIcon,
} from "lucide-react";

export type ServiceKey =
  | "residential"
  | "commercial"
  | "heatPumps"
  | "ventilation"
  | "maintenance"
  | "design";

export const services: { key: ServiceKey; icon: LucideIcon }[] = [
  { key: "residential", icon: Home },
  { key: "commercial", icon: Building2 },
  { key: "heatPumps", icon: Flame },
  { key: "ventilation", icon: Wind },
  { key: "maintenance", icon: Wrench },
  { key: "design", icon: Ruler },
];

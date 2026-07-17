import {
  Building2,
  Factory,
  HeartPulse,
  Megaphone,
  Monitor,
  Palette,
  Printer,
  Scissors,
  ShoppingBag,
  Signpost,
  Sparkles,
  Truck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Factory,
  Signpost,
  Printer,
  Palette,
  Monitor,
  Megaphone,
  UtensilsCrossed,
  Sparkles,
  Scissors,
  ShoppingBag,
  HeartPulse,
  Truck,
  Building2,
};

export function getIcon(name: string): LucideIcon {
  return map[name] ?? Building2;
}

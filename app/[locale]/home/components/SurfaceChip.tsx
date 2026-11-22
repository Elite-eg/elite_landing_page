import { cn } from "@/lib/utils";
import type { AppSurface } from "../data/homeData";

export interface SurfaceChipProps {
  surface: AppSurface;
  label: string;
  /** "md" in the section legend, "sm" on the cards. */
  size?: "sm" | "md";
}

/** Albiruni's mobile app chips in the app's teal, the web dashboard in brand navy (Figma legend and card chips). */
const SURFACE_CLASSES: Record<AppSurface, string> = {
  mobile: "bg-albiruni/10 text-albiruni",
  web: "bg-surface-muted text-primary",
};

const SIZE_CLASSES = {
  sm: "px-2.5 py-0.5",
  md: "px-3 py-1.5",
} as const;

export function SurfaceChip({ surface, label, size = "sm" }: SurfaceChipProps) {
  return (
    <li className={cn("rounded-full text-xs font-medium", SURFACE_CLASSES[surface], SIZE_CLASSES[size])}>{label}</li>
  );
}

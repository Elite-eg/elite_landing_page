import type { AddonIconStyle, AddonIconTone } from "@/lib/addons";
import { cn } from "@/lib/utils";

export interface AddonIconProps {
  icon: AddonIconStyle;
  /** "md" = store card (56px), "lg" = add-on page title (96px on desktop). */
  size?: "md" | "lg";
  className?: string;
}

const TONE_CLASSES: Record<AddonIconTone, string> = {
  primary: "bg-primary",
  primaryDark: "bg-primary-dark",
  secondary: "bg-secondary",
  secondaryDark: "bg-secondary-dark",
  accent: "bg-accent",
  success: "bg-success",
  albiruni: "bg-albiruni",
  ink: "bg-ink-700",
};

const SIZE_CLASSES = {
  md: "size-14 rounded-2xl text-xl",
  lg: "size-20 rounded-3xl text-[1.75rem] sm:size-24 sm:text-[2.1875rem]",
} as const;

/** An add-on's mark: its initials on a coloured tile (Figma "App icon"). Decorative: the add-on's name is beside it. */
export function AddonIcon({ icon, size = "md", className }: AddonIconProps) {
  return (
    <span
      aria-hidden="true"
      dir="ltr"
      className={cn(
        "grid shrink-0 select-none place-items-center font-semibold leading-none text-surface",
        TONE_CLASSES[icon.tone],
        SIZE_CLASSES[size],
        className
      )}
    >
      {icon.initials}
    </span>
  );
}

import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge, taught the custom theme keys from tailwind.config.js. Without this it reads
 * `text-caption` / `text-h3` as text *colors* (so the size was dropped next to a color class),
 * and it doesn't know `max-w-container`, `shadow-card` or `ease-out-brand`, so overrides
 * passed through `className` (e.g. <Container className="max-w-5xl">) didn't win.
 * Keep these lists in sync when a token is added to tailwind.config.js or globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h2", "h3", "body-lg", "caption"],
      shadow: ["card", "card-hover", "lift", "widget", "glow", "glow-accent"],
      container: ["container"],
      ease: ["out-brand", "back"],
      font: ["heading", "logo"],
    },
    classGroups: {
      "bg-image": ["bg-dot-grid", "bg-dot-grid-light"],
    },
  },
});

/** Combines Tailwind classes: clsx for conditions, tailwind-merge so the later class wins a conflict. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

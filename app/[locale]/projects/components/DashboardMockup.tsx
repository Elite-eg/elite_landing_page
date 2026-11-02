import { cn } from "@/lib/utils";

interface DashboardMockupProps {
  className?: string;
}

/** Left offsets of the three stat tiles inside the 420×280 screen. */
const TILE_OFFSETS = [106, 208, 310];

/**
 * Simplified web dashboard (navy sidebar, stat tiles, main panel). Drawn in a viewBox so it scales with its width,
 * with the sidebar on the left; mirrored in RTL so it sits on the start side, like a real Arabic dashboard.
 * TBD: replace with real project screenshots from elitemsr.com when the owner provides them.
 */
export function DashboardMockup({ className }: DashboardMockupProps) {
  return (
    <div className={cn("aspect-[420/280] overflow-hidden rounded-[3.33%/5%] bg-surface shadow-widget", className)}>
      <svg viewBox="0 0 420 280" className="size-full rtl:-scale-x-100" aria-hidden="true">
        <rect width="90" height="280" className="fill-primary-dark" />
        {TILE_OFFSETS.map((x) => (
          <rect key={x} x={x} y="22" width="90" height="56" rx="8" className="fill-surface-muted" />
        ))}
        <rect x="110" y="92" width="290" height="170" rx="8" className="fill-surface-muted" />
      </svg>
    </div>
  );
}

import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  className?: string;
}

/** Top offsets of the list rows inside the 200×410 screen. */
const ROW_OFFSETS = [160, 204, 248, 292, 336];

/**
 * Simplified app screen (header card + list rows). Drawn in a viewBox so it scales with its width.
 * TBD: replace with real Bareeq X screenshots from elitemsr.com when the owner provides them.
 */
export function PhoneMockup({ className }: PhoneMockupProps) {
  return (
    <div className={cn("aspect-[200/410] overflow-hidden rounded-[17%/8.3%] bg-surface shadow-widget", className)}>
      <svg viewBox="0 0 200 410" className="size-full" aria-hidden="true">
        <rect x="20" y="40" width="160" height="100" rx="14" className="fill-bareeq" />
        {ROW_OFFSETS.map((y) => (
          <rect key={y} x="20" y={y} width="160" height="30" rx="8" className="fill-surface-muted" />
        ))}
      </svg>
    </div>
  );
}

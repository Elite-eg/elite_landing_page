/** Rising trend line drawn on the cover (path-trim via the shared .animate-draw utility). */
const TREND_PATH = "M4 66 L34 52 L58 58 L88 36 L112 44 L142 22 L166 28 L196 8";

export function GuideCoverChart() {
  return (
    <svg viewBox="0 0 200 74" fill="none" className="w-full text-secondary" aria-hidden="true">
      <path d="M4 72 H196" stroke="currentColor" strokeOpacity={0.2} strokeWidth={1} />
      <path
        d={TREND_PATH}
        pathLength={1}
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-draw"
      />
      <circle cx={196} cy={8} r={5} fill="currentColor" className="animate-draw-dot" />
    </svg>
  );
}

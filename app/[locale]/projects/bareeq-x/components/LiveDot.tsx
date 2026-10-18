/** Green status dot with a soft ping, for "live now" labels. Decorative: the label carries the meaning. */
export function LiveDot() {
  return (
    <span className="relative flex size-1.5">
      <span className="absolute inset-0 rounded-full bg-success motion-safe:animate-ping" />
      <span className="relative size-1.5 rounded-full bg-success" />
    </span>
  );
}

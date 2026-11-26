export interface StepNumberProps {
  /** Position in the sequence, from 1. */
  step: number;
}

/** Navy step circle (Figma "circle") for an `InfoTile` lead; it turns orange while the tile is hovered. */
export function StepNumber({ step }: StepNumberProps) {
  return (
    <span
      dir="ltr"
      className="grid size-9 place-items-center rounded-full bg-primary-dark text-[0.9375rem] font-semibold text-surface transition-colors duration-300 ease-out-brand group-hover/tile:bg-secondary"
    >
      {step}
    </span>
  );
}

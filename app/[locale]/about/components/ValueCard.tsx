export interface ValueCardProps {
  /** Position in the list, rendered as 01, 02, ... */
  index: number;
  title: string;
  text: string;
}

export function ValueCard({ index, title, text }: ValueCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="h-full rounded-2xl border border-edge bg-surface p-6 sm:p-7">
      <span dir="ltr" className="block font-heading text-h2 font-bold text-secondary" aria-hidden="true">
        {number}
      </span>
      <h3 className="mt-4 text-lg font-bold leading-snug text-primary">{title}</h3>
      <p className="mt-2 text-caption text-content">{text}</p>
    </article>
  );
}

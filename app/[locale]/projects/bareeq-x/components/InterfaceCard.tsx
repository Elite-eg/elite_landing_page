import type { IconType } from "react-icons";

interface InterfaceCardProps {
  icon: IconType;
  title: string;
  text: string;
}

/**
 * One of the system's interfaces (website, apps, dashboard).
 * Hover (colour only, no lift): teal wash + border, an accent bar grows from the start edge,
 * the icon tile deepens and the title turns teal.
 */
export function InterfaceCard({ icon: Icon, title, text }: InterfaceCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-edge bg-surface p-5 transition-colors duration-200 hover:border-bareeq/40 hover:bg-bareeq-50/40">
      <span
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-bareeq transition-transform duration-300 ease-out-brand group-hover:scale-x-100 motion-reduce:transition-none rtl:origin-right"
        aria-hidden="true"
      />

      <span className="grid size-10 place-items-center rounded-xl bg-bareeq text-white transition-colors duration-200 group-hover:bg-bareeq-950">
        <Icon
          className="size-5 transition-transform duration-300 ease-out-brand group-hover:scale-110 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </span>
      <h3 className="mt-4 text-base font-semibold leading-snug text-body transition-colors duration-200 group-hover:text-bareeq">
        {title}
      </h3>
      <p className="mt-1.5 text-caption text-content">{text}</p>
    </article>
  );
}

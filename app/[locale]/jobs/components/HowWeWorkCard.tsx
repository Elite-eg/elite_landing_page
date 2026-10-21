import type { IconType } from "react-icons";

export interface HowWeWorkCardProps {
  icon: IconType;
  title: string;
  text: string;
}

/**
 * Grey perk card (Figma "Perks"). Hover keeps the grey fill: a soft border appears, the icon tile turns navy and
 * the icon grows slightly (color + a small transform, no lift).
 */
export function HowWeWorkCard({ icon: Icon, title, text }: HowWeWorkCardProps) {
  return (
    <article className="group flex h-full flex-col items-start gap-3 rounded-3xl border border-transparent bg-surface-alt px-6 py-7 transition-colors duration-300 ease-out-brand hover:border-edge">
      <span className="grid place-items-center rounded-xl bg-surface p-2.5 text-primary transition-colors duration-300 ease-out-brand group-hover:bg-primary group-hover:text-white">
        <Icon
          className="size-[1.375rem] transition-transform duration-300 ease-out-brand group-hover:scale-110 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </span>
      <h3 className="text-lg font-semibold leading-snug text-body">{title}</h3>
      <p className="text-caption text-content">{text}</p>
    </article>
  );
}

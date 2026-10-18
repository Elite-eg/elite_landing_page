import type { IconType } from "react-icons";
import { FiMessageSquare } from "react-icons/fi";

export interface HowWeWorkCardProps {
  icon: IconType;
  title: string;
  text: string;
  /** Already-translated badge shown under the text (the Maher assistant callout). */
  badge?: string;
}

export function HowWeWorkCard({ icon: Icon, title, text, badge }: HowWeWorkCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-edge/60 bg-surface p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-7">
      <div>
        <span className="mb-5 grid size-12 place-items-center rounded-xl bg-surface-info text-primary shadow-inner">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mb-2 text-base font-bold text-surface-dark sm:text-lg">{title}</h3>
        <p className="text-xs leading-relaxed text-content sm:text-sm">{text}</p>
      </div>

      {badge && (
        <div className="mt-6 border-t border-edge/40 pt-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-gradient-to-r from-secondary/15 to-primary/10 px-3 py-1.5 text-xs font-semibold text-secondary-dark">
            <FiMessageSquare className="size-3.5 shrink-0 text-secondary" aria-hidden="true" />
            {badge}
          </span>
        </div>
      )}
    </article>
  );
}

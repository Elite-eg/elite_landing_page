import { CARD_HOVER_CLASSES } from "@/app/components/shared/cardStyles";
import { cn } from "@/lib/utils";

export interface NextStepCardProps {
  num: string;
  title: string;
  desc: string;
}

export function NextStepCard({ num, title, desc }: NextStepCardProps) {
  return (
    <article className={cn("flex h-full flex-col gap-2.5 rounded-[1.25rem] border border-transparent bg-surface-alt px-6 py-[1.625rem] hover:border-edge", CARD_HOVER_CLASSES)}>
      <span dir="ltr" className="self-start font-heading text-[1.625rem] font-bold leading-none text-secondary" aria-hidden="true">
        {num}
      </span>
      <h3 className="text-lg font-semibold text-body">{title}</h3>
      <p className="text-[0.90625rem] leading-[1.7] text-content">{desc}</p>
    </article>
  );
}

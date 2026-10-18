import type { IconType } from "react-icons";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: IconType;
  href: string;
  ctaLabel: string;
  className?: string;
}

/** Whole card is clickable through a stretched link on the title (one tab stop per card). */
export function ServiceCard({ title, description, icon: Icon, href, ctaLabel, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border border-edge bg-surface p-6 shadow-card",
        "transition-all duration-500 ease-out hover:-translate-y-2 hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/5 motion-reduce:transform-none",
        "has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-secondary has-[a:focus-visible]:ring-offset-2",
        className
      )}
    >
      <span className="mb-5 grid size-12 place-items-center rounded-xl bg-surface-info text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
        <Icon className="size-6" aria-hidden="true" />
      </span>

      <h3 className="text-lg font-bold leading-snug text-primary transition-colors duration-300 group-hover:text-secondary-dark">
        <Link href={href} className="after:absolute after:inset-0 after:rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0">
          {title}
        </Link>
      </h3>

      <p className="mt-2 flex-1 leading-loose text-content">{description}</p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-secondary-dark transition-colors duration-300" aria-hidden="true">
        {ctaLabel}
        <FiArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
      </span>
    </article>
  );
}

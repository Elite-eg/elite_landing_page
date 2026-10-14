import type { ReactNode } from "react";

export interface StoreBadgeProps {
  href: string;
  caption: string;
  storeName: string;
  /** Store logo shown before the text (Apple / Google Play). */
  logo: ReactNode;
}

/** App store button with the store logo, a caption, and the store name, as in the v4 footer. */
export function StoreBadge({ href, caption, storeName, logo }: StoreBadgeProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/store inline-flex items-center gap-2.5 rounded-lg border border-surface/20 bg-surface/5 py-1.5 pe-3.5 ps-2.5 transition duration-200 ease-out-brand hover:border-surface/40 hover:bg-surface/10 focus-visible:ring-offset-ink-900"
    >
      <span
        aria-hidden
        className="flex size-6 shrink-0 items-center justify-center transition-transform duration-300 ease-out-brand group-hover/store:scale-110 motion-reduce:transform-none [&>*]:size-full"
      >
        {logo}
      </span>
      <span className="flex flex-col items-start">
        <span className="text-[0.625rem] leading-tight text-content-dark">{caption}</span>
        <span className="text-caption font-semibold leading-tight text-surface">{storeName}</span>
      </span>
    </a>
  );
}

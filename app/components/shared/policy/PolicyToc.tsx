"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "../useActiveSection";

export interface PolicyTocItem {
  /** Anchor id of the section. */
  id: string;
  label: string;
}

export interface PolicyTocProps {
  title: string;
  items: readonly PolicyTocItem[];
  className?: string;
}

/** "On this page" links to the sections; the section being read is highlighted (sticky beside the content from lg). */
export function PolicyToc({ title, items, className }: PolicyTocProps) {
  const titleId = useId();
  const [activeId, setActiveId] = useActiveSection(items.map(({ id }) => id));

  return (
    <nav aria-labelledby={titleId} className={cn("rounded-2xl bg-surface-alt p-6 lg:sticky lg:top-32 lg:self-start", className)}>
      <p id={titleId} className="text-caption font-medium text-content">
        {title}
      </p>

      <ul className="mt-3 grid gap-3 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-1">
        {items.map(({ id, label }) => {
          const isActive = id === activeId;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActiveId(id)}
                className={cn(
                  "rounded-sm text-caption transition-colors duration-300 ease-out-brand hover:text-primary",
                  isActive ? "font-medium text-primary-dark" : "text-ink-700"
                )}
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

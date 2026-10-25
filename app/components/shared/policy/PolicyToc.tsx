"use client";

import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

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

/** A section counts as the one being read once its top passes this line (px from the viewport top, below the fixed header). */
const ACTIVE_LINE = 160;

/** "On this page" links to the sections; the section being read is highlighted (sticky beside the content from lg). */
export function PolicyToc({ title, items, className }: PolicyTocProps) {
  const titleId = useId();
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      const passed = sections.filter((section) => section.getBoundingClientRect().top <= ACTIVE_LINE);
      const current = passed[passed.length - 1] ?? sections[0];
      if (current) setActiveId(current.id);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [items]);

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

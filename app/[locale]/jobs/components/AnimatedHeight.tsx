"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heightTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface AnimatedHeightProps {
  children: ReactNode;
  className?: string;
}

/**
 * Follows its content's height with an animation, so what sits below (the note, the footer) glides instead of
 * jumping when the content is swapped. The one deliberate height animation (see "Motion" in elite-design-rules.txt):
 * transforms can't move the footer, which lives outside this page.
 * Clips vertically only, so horizontal slides inside stay visible. `overflow-y: clip` (not clip-path) also keeps the
 * not-yet-revealed content from counting as scrollable overflow, which flashed a scrollbar on <main> while growing.
 * The -my-1 / py-1 pair leaves room for focus rings at the top and bottom edges.
 */
export function AnimatedHeight({ children, className }: AnimatedHeightProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">("auto");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(() => setHeight(content.offsetHeight));
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className={cn("-my-1 overflow-y-clip", className)}
      initial={false}
      animate={{ height }}
      transition={reduceMotion ? { duration: 0 } : heightTransition}
    >
      <div ref={contentRef} className="py-1">
        {children}
      </div>
    </motion.div>
  );
}

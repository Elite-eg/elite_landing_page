"use client";

import { useEffect, useState } from "react";

/** A section counts as the one being read once its top passes this line (px from the viewport top, below the fixed header). */
const ACTIVE_LINE = 160;

/**
 * Id of the section being read: the lowest one whose top has passed the line under the header, or the first id
 * before any has (page top). Ids may be listed in any order (add-on tabs don't follow the page order).
 * Returns a setter too, so a clicked link can highlight at once, before the smooth scroll ends.
 * Policy "On this page" list, add-on page tabs.
 */
export function useActiveSection(ids: readonly string[]): [string | undefined, (id: string) => void] {
  const [activeId, setActiveId] = useState(ids[0]);
  const idsKey = ids.join(" ");

  useEffect(() => {
    const sections = idsKey
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      let current: HTMLElement | undefined;
      let currentTop = -Infinity;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= ACTIVE_LINE && top > currentTop) {
          current = section;
          currentTop = top;
        }
      }
      setActiveId(current?.id ?? idsKey.split(" ")[0]);
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
  }, [idsKey]);

  return [activeId, setActiveId];
}

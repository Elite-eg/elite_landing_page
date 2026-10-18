import { FiCheck } from "react-icons/fi";
import { Reveal } from "@/app/components/shared/Reveal";
import { cn } from "@/lib/utils";
import type { MilestoneStatus } from "../data/bareeqData";
import { TimelineConnector } from "./TimelineConnector";

interface TimelineItemProps {
  date: string;
  title: string;
  text: string;
  status: MilestoneStatus;
  /** The last milestone has no connector line below its marker. */
  isLast: boolean;
}

const STATUS_CLASSES: Record<MilestoneStatus, string> = {
  done: "bg-bareeq",
  current: "bg-secondary",
};

/**
 * Milestone row: marker + connector on the start side, date/title/text beside it. Render inside <RevealGroup>.
 * Hover: the row gets a soft background, the marker grows and the title turns teal.
 * The "current" marker pulses to show the phase is still ongoing.
 */
export function TimelineItem({ date, title, text, status, isLast }: TimelineItemProps) {
  return (
    <li>
      <Reveal inGroup className="group flex gap-4">
        <div className="flex flex-col items-center" aria-hidden="true">
          <span
            className={cn(
              "relative grid size-6 shrink-0 place-items-center rounded-full text-white transition-transform duration-300 ease-out-brand group-hover:scale-110 motion-reduce:transform-none",
              STATUS_CLASSES[status]
            )}
          >
            {status === "current" && (
              <span className="absolute inset-0 rounded-full bg-secondary/50 motion-safe:animate-ping" />
            )}
            <FiCheck className="relative size-3" strokeWidth={3} />
          </span>
          {!isLast && <TimelineConnector />}
        </div>

        <div className={cn("min-w-0 flex-1", !isLast && "pb-4")}>
          <div className="-mx-3 -mt-1.5 rounded-xl px-3 py-1.5 transition-colors duration-200 group-hover:bg-surface-alt">
            <p className="text-caption font-medium text-secondary-dark">{date}</p>
            <h3 className="mt-1 text-lg font-semibold leading-snug text-body transition-colors duration-200 group-hover:text-bareeq">
              {title}
            </h3>
            <p className="mt-1 text-caption text-content">{text}</p>
          </div>
        </div>
      </Reveal>
    </li>
  );
}

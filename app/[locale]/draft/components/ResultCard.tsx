"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { popIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  icon: IconType;
  /** "success" = green check (activated), "pending" = amber clock (awaiting payment). */
  tone: "success" | "pending";
  title: string;
  text: string;
  children: ReactNode;
}

const ICON_TONE = {
  success: "bg-success text-white shadow-[0_12px_28px_-10px_rgb(var(--success)/0.6)]",
  pending: "bg-warning/15 text-warning",
} as const;

/** Centered outcome card for the final checkout step. */
export function ResultCard({ icon: Icon, tone, title, text, children }: ResultCardProps) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-edge bg-surface p-6 text-center shadow-card sm:p-10">
      <motion.span
        variants={popIn}
        initial="hidden"
        animate="visible"
        className={cn("mx-auto grid size-16 place-items-center rounded-full", ICON_TONE[tone])}
      >
        <Icon className="size-8" aria-hidden="true" />
      </motion.span>
      <h2 className="mt-6 text-balance text-h3 font-bold text-primary">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-content">{text}</p>
      <div className="mt-8 text-start">{children}</div>
    </div>
  );
}

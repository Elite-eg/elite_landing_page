"use client";

import { motion } from "framer-motion";
import { growYFromTop, withDelay } from "@/lib/animations";

/** Line between two milestones. Inherits its row's reveal state and draws down just after the row appears. */
export function TimelineConnector() {
  return <motion.span variants={withDelay(growYFromTop, 0.25)} className="my-1.5 w-px flex-1 bg-bareeq/30" />;
}

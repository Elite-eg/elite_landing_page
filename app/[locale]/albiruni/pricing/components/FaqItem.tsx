"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";
import { expandCollapse, expandTransition } from "@/lib/animations";

export interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

/** One question (Figma FAQ row): white card, plus / minus on the end side, orange border while open. */
export function FaqItem({ question, answer, defaultOpen = false }: FaqItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Disclosure
      as="div"
      defaultOpen={defaultOpen}
      className="rounded-2xl border border-edge bg-surface transition-colors duration-300 ease-out-brand data-[open]:border-secondary"
    >
      {({ open }) => (
        <>
          <h3>
            <DisclosureButton className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl px-6 py-5 text-start font-heading text-base font-semibold text-body sm:text-[1.0625rem]">
              {question}
              {open ? (
                <FiMinus className="size-5 shrink-0 text-secondary-dark" aria-hidden="true" />
              ) : (
                <FiPlus className="size-5 shrink-0 text-content" aria-hidden="true" />
              )}
            </DisclosureButton>
          </h3>

          {/* The motion wrapper animates (Headless UI's own `transition` prop would clash); the panel stays static inside. */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="answer"
                variants={expandCollapse}
                initial="collapsed"
                animate="open"
                exit="collapsed"
                transition={reduceMotion ? { duration: 0 } : expandTransition}
                className="overflow-hidden"
              >
                <DisclosurePanel static className="px-6 pb-5 text-content">
                  {answer}
                </DisclosurePanel>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}

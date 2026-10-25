"use client";

import { useEffect, useId, useRef } from "react";
import { Checkbox, Radio, RadioGroup } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { checkPop, fillIn, layoutTransition } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { FieldFeedback, fieldDescribedBy } from "./FieldFeedback";
import { FIELD_LABEL_CLASSES } from "./fieldStyles";
import type { SelectOption } from "./SelectMenu";

interface BaseChoiceChipsProps {
  label: string;
  options: readonly SelectOption[];
  /** Already-translated error message. */
  error?: string;
  disabled?: boolean;
  className?: string;
}

/** One answer (radio group) or, with `multiple`, any number of answers (checkboxes). */
export type ChoiceChipsProps = BaseChoiceChipsProps &
  (
    | { multiple?: false; value: string; onChange: (value: string) => void }
    | { multiple: true; value: readonly string[]; onChange: (value: string[]) => void }
  );

/** Figma "chip": white pill with a line border. */
const CHIP_CLASSES =
  "relative inline-flex cursor-pointer select-none items-center gap-1.5 rounded-full border px-4 py-2.5 text-caption " +
  "font-medium leading-snug transition-colors duration-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60";

const UNCHECKED_CLASSES = "border-edge bg-surface text-ink-700 hover:border-primary/30 hover:text-primary";

/** Pill radius as a style, so Framer Motion keeps the ends round while a chip resizes. */
const PILL_STYLE = { borderRadius: 9999 };

/**
 * Question answered with chips (agency form: business activities, yes / no). Headless UI handles the keyboard:
 * arrows move between radio chips, Space toggles a checkbox chip. Controlled, so use a react-hook-form Controller.
 *
 * Motion: a radio answer's navy fill glides to the chosen chip (the label turns white as it arrives); a checkbox chip
 * fades to navy while its check pops in, and the row reflows smoothly as the chip widens. Layout animations only
 * run when the answer changes, never when something else moves the form.
 *
 * @example
 * <Controller name="activities" control={control} render={({ field }) => (
 *   <ChoiceChips multiple label={t("activities")} options={…} value={field.value} onChange={field.onChange} />
 * )} />
 */
export function ChoiceChips(props: ChoiceChipsProps) {
  const { label, options, error, disabled, className } = props;
  const labelId = useId();
  const groupId = useId();
  const fillId = useId();
  const selection = props.multiple ? props.value.join("|") : props.value;

  // The radio fill glides from the previous answer; the first answer has nothing to glide from, so it fades in.
  const hadAnswer = useRef(false);
  useEffect(() => {
    hadAnswer.current = selection !== "";
  }, [selection]);

  const groupProps = {
    id: groupId,
    "aria-labelledby": labelId,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": fieldDescribedBy(groupId, error),
    // isolate: the gliding fill (z-10) stays under every label (z-20) and above every chip's background.
    className: "isolate flex flex-wrap gap-2",
  };

  return (
    <div className={cn("w-full", className)}>
      <p id={labelId} className={FIELD_LABEL_CLASSES}>
        {label}
      </p>

      {props.multiple ? (
        <div role="group" {...groupProps}>
          {options.map((option) => {
            const checked = props.value.includes(option.value);
            const toggle = (on: boolean) =>
              props.onChange(on ? [...props.value, option.value] : props.value.filter((value) => value !== option.value));

            return (
              <Checkbox
                key={option.value}
                as={motion.span}
                layout
                layoutDependency={selection}
                transition={layoutTransition}
                style={PILL_STYLE}
                checked={checked}
                onChange={toggle}
                disabled={disabled}
                className={cn(CHIP_CLASSES, checked ? "border-primary-dark bg-primary-dark text-surface" : UNCHECKED_CLASSES)}
              >
                <AnimatePresence initial={false} mode="popLayout">
                  {checked && (
                    <motion.span
                      key="check"
                      layout="position"
                      layoutDependency={selection}
                      variants={checkPop}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="grid"
                    >
                      <FiCheck className="size-3.5 shrink-0" strokeWidth={3} aria-hidden="true" />
                    </motion.span>
                  )}
                </AnimatePresence>
                <motion.span layout="position" layoutDependency={selection} transition={layoutTransition}>
                  {option.label}
                </motion.span>
              </Checkbox>
            );
          })}
        </div>
      ) : (
        <RadioGroup value={props.value} onChange={props.onChange} disabled={disabled} {...groupProps}>
          {options.map((option) => {
            const checked = props.value === option.value;

            return (
              <Radio
                key={option.value}
                value={option.value}
                className={cn(CHIP_CLASSES, checked ? "border-primary-dark text-surface delay-100" : UNCHECKED_CLASSES)}
              >
                {/* Own presence scope: an ancestor <AnimatePresence initial={false}> (e.g. a form swapped for its
                    success panel) would otherwise block the first-answer fade. */}
                <AnimatePresence initial={false}>
                  {checked && (
                    <motion.span
                      key="fill"
                      layoutId={fillId}
                      layoutDependency={selection}
                      transition={layoutTransition}
                      variants={fillIn}
                      initial={hadAnswer.current ? false : "hidden"}
                      animate="visible"
                      aria-hidden="true"
                      className="absolute -inset-px z-10 rounded-full bg-primary-dark"
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-20">{option.label}</span>
              </Radio>
            );
          })}
        </RadioGroup>
      )}

      <FieldFeedback fieldId={groupId} error={error} />
    </div>
  );
}

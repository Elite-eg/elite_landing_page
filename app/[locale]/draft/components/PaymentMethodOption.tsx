"use client";

import type { ReactNode } from "react";
import { Radio } from "@headlessui/react";
import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

interface PaymentMethodOptionProps {
  value: string;
  icon: IconType;
  label: string;
  description: string;
  isSelected: boolean;
  /** Extra fields shown under the option while it is selected (e.g. card inputs). */
  children?: ReactNode;
}

/** One selectable payment method. Must be rendered inside a Headless UI RadioGroup. */
export function PaymentMethodOption({ value, icon: Icon, label, description, isSelected, children }: PaymentMethodOptionProps) {
  return (
    <div
      className={cn(
        "rounded-xl border transition-colors duration-200",
        isSelected ? "border-primary bg-surface-alt/60" : "border-edge hover:border-primary/30"
      )}
    >
      <Radio value={value} className="flex cursor-pointer items-center gap-3 rounded-xl p-4">
        <span
          className={cn(
            "grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors duration-200",
            isSelected ? "border-primary" : "border-edge"
          )}
          aria-hidden="true"
        >
          <span className={cn("size-2.5 rounded-full bg-primary transition-transform duration-200", !isSelected && "scale-0")} />
        </span>
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-primary shadow-card">
          <Icon className="size-[1.125rem]" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block font-bold text-primary">{label}</span>
          <span className="block text-caption text-content">{description}</span>
        </span>
      </Radio>
      {isSelected && children && <div className="border-t border-edge p-4">{children}</div>}
    </div>
  );
}

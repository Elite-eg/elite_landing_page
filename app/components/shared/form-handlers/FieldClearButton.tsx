import { FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface FieldClearButtonProps {
  /** Already-translated name ("Clear search"). */
  label?: string;
  /** Shown only while the field has a value; it fades and shrinks away otherwise. */
  visible: boolean;
  disabled?: boolean;
  onClick: () => void;
}

/** The × at the end of an InputField with `onClear`: a round 32px target that tints on hover. */
export function FieldClearButton({ label, visible, disabled, onClick }: FieldClearButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      tabIndex={visible ? undefined : -1}
      disabled={disabled || !visible}
      onClick={onClick}
      className={cn(
        "absolute inset-y-0 end-2 my-auto grid size-8 place-items-center rounded-full text-content/70",
        "transition duration-200 ease-out-brand hover:bg-surface-alt hover:text-primary motion-reduce:transition-none",
        visible ? "scale-100 opacity-100" : "pointer-events-none scale-75 opacity-0"
      )}
    >
      <FiX className="size-4" aria-hidden="true" />
    </button>
  );
}

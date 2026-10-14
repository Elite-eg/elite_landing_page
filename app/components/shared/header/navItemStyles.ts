/**
 * Shared classes for top-level desktop nav items (links and mega menu triggers).
 * Every item carries a hidden underline that grows from the center on hover (navy)
 * and stays full-width in orange when the item is active or its menu is open.
 */
export const NAV_ITEM_BASE =
  "relative rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap cursor-pointer select-none transition-colors duration-200 ease-out-brand " +
  "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full " +
  "after:transition-[transform,background-color] after:duration-300 after:ease-out-brand motion-reduce:after:transition-none";

export const NAV_ITEM_IDLE = "text-body after:bg-primary hover:text-primary hover:after:scale-x-100";

export const NAV_ITEM_ACTIVE = "text-secondary after:bg-secondary after:scale-x-100";

/** Mega menu trigger while its panel is open. */
export const NAV_ITEM_OPEN = "data-[open]:text-secondary data-[open]:after:bg-secondary data-[open]:after:scale-x-100";

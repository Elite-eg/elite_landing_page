/**
 * Shared hover of light content cards: the card rests on a small shadow, and on hover the shadow grows
 * (`shadow-card` → `shadow-card-hover`) while colours ease over 300ms. No lift: only buttons lift.
 *
 * Each card adds its own hover border (and any inner accents) next to it, e.g.
 * `cn("rounded-2xl border border-edge bg-surface p-6 hover:border-primary/20", CARD_HOVER_CLASSES)`.
 * Not for dark (navy) cards, panels that hold a form or summary, modals and menus.
 */
export const CARD_HOVER_CLASSES = "shadow-card transition duration-300 ease-out-brand hover:shadow-card-hover";

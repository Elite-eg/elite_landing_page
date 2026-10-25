import type { Transition, Variants } from "framer-motion";

/**
 * Shared Framer Motion presets. Optimized for hardware acceleration (60fps/120fps smooth).
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user"> in Providers.
 */

/** Mirrors the --motion-* tokens in app/globals.css (identity v4). Seconds / px. */
export const MOTION = {
  enter: 0.7,
  rise: 28,
  staggerHero: 0.14,
  staggerCard: 0.08,
  draw: 1.3,
  popScale: 0.88,
  float: 6,
  floatPeriod: 2.4,
  botDelay: 2.4,
} as const;

const EASE_SMOOTH: Transition["ease"] = [0.16, 1, 0.3, 1];
const EASE_BACK: Transition["ease"] = [0.34, 1.56, 0.64, 1];

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: MOTION.rise },
  visible: { opacity: 1, y: 0, transition: { duration: MOTION.enter, ease: EASE_SMOOTH } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.65, ease: EASE_SMOOTH } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 14 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: EASE_SMOOTH } },
};

/** Image reveal: starts slightly zoomed and settles smoothly. */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.85, ease: EASE_SMOOTH } },
};

/** Slide in from Left (hardware accelerated). */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -44, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: EASE_SMOOTH } },
};

/** Slide in from Right (hardware accelerated). */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 44, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: EASE_SMOOTH } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: MOTION.staggerCard, delayChildren: 0.04 } },
};

/** Orchestrated hero entrance: children reveal one after another. */
export const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: MOTION.staggerHero, delayChildren: 0.15 } },
};

export const heroTextReveal: Variants = {
  hidden: { opacity: 0, y: MOTION.rise },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: MOTION.enter, ease: EASE_SMOOTH },
  },
};

/** Floating cards / dots: pop from 0.88 with a back-ease. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: MOTION.popScale },
  visible: { opacity: 1, scale: 1, transition: { duration: MOTION.enter, ease: EASE_BACK } },
};

/** Maher bot: pops in after 2.4s. */
export const botEnter: Variants = {
  hidden: { opacity: 0, scale: MOTION.popScale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: MOTION.enter, ease: EASE_BACK, delay: MOTION.botDelay },
  },
};

/** Connected lines / chart lines: path-trim. Apply to <motion.path>. */
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: MOTION.draw, ease: EASE_SMOOTH }, opacity: { duration: 0.2 } },
  },
};

/** Dashboard bars grow from the bottom. */
export const growY: Variants = {
  hidden: { scaleY: 0, originY: 1 },
  visible: { scaleY: 1, originY: 1, transition: { duration: MOTION.enter, ease: EASE_SMOOTH } },
};

/** Timeline connectors: the line draws downward from the marker above it. */
export const growYFromTop: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, originY: 0, transition: { duration: MOTION.enter, ease: EASE_SMOOTH } },
};

/** Horizontal slide that mirrors in RTL (Start side). */
export const slideInFromStart = (isRtl: boolean): Variants => ({
  hidden: { opacity: 0, x: isRtl ? 44 : -44, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: EASE_SMOOTH } },
});

/** Horizontal slide that mirrors in RTL (End side). */
export const slideInFromEnd = (isRtl: boolean): Variants => ({
  hidden: { opacity: 0, x: isRtl ? -44 : 44, scale: 0.98 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.65, ease: EASE_SMOOTH } },
});

/** Rows past this index share the last stagger delay, so long lists finish quickly (they start below the fold). */
const LIST_STAGGER_CAP = 5;
/** Tighter than MOTION.staggerCard, so rows fill a growing list about as fast as its height opens. */
const LIST_STAGGER = 0.05;

/**
 * Rows of a filterable list: slide 30px in from the end side and fade in (Figma "Role" motion), one after another.
 * Each row animates itself (pass its index as `custom`): variant propagation from a parent only reaches children
 * present on its first run, so rows mounted by a filter change would otherwise appear without motion.
 */
export const listItemFromEnd = (isRtl: boolean): Variants => ({
  hidden: { opacity: 0, x: isRtl ? -30 : 30 },
  visible: (index: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH, delay: Math.min(index, LIST_STAGGER_CAP) * LIST_STAGGER },
  }),
});

/** A whole list swapped for another (filter change, AnimatePresence mode="wait"): quick fade out first. */
export const listSwap: Variants = {
  exit: { opacity: 0, transition: { duration: 0.15, ease: "easeOut" } },
};

/**
 * Accordion-style expand / collapse (height "auto"), e.g. the requirements in the jobs apply modal.
 * Timing lives in `expandTransition` (not in the variants), so reduced motion can swap it for `{ duration: 0 }`:
 * MotionConfig only stops transforms, and a variant's own transition would win over the prop.
 */
export const expandCollapse: Variants = {
  collapsed: { height: 0, opacity: 0 },
  open: { height: "auto", opacity: 1 },
};

export const expandTransition: Transition = { duration: 0.35, ease: EASE_SMOOTH };

/** Container height following its content (AnimatedHeight), so what sits below glides instead of jumping. */
export const heightTransition: Transition = { duration: 0.4, ease: EASE_SMOOTH };

/**
 * Layout animations (`layoutId`): a selection indicator gliding between options. Framer Motion runs them as
 * transforms, so the layout itself never animates.
 */
export const layoutTransition: Transition = { layout: { duration: 0.4, ease: EASE_SMOOTH } };

/**
 * Choice controls (ChoiceChips, CheckboxField): a check mark pops in with a slight overshoot and leaves quickly.
 * Use with <AnimatePresence>: initial="hidden" animate="visible" exit="hidden".
 */
export const checkPop: Variants = {
  hidden: { opacity: 0, scale: 0.5, transition: { duration: 0.15, ease: EASE_SMOOTH } },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE_BACK } },
};

/** A selection indicator appearing where nothing was selected before (afterwards it glides, see layoutTransition). */
export const fillIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: EASE_SMOOTH } },
};

/**
 * Gentle looping float for decorative cards. Loops must use easeInOut: an ease-out curve
 * makes velocity jump at each turnaround, which reads as a stutter.
 */
export const floatLoop: Variants = {
  animate: {
    y: [0, -MOTION.float, 0, MOTION.float, 0],
    transition: { duration: MOTION.floatPeriod, repeat: Infinity, ease: "easeInOut" },
  },
};

/** Moves opposite to floatLoop (down), so stacked cards drift apart rather than into each other. */
export const floatLoopOffset: Variants = {
  animate: {
    y: [0, MOTION.float, 0, -MOTION.float, 0],
    transition: { duration: MOTION.floatPeriod, delay: 0.8, repeat: Infinity, ease: "easeInOut" },
  },
};

export const viewportOnce = { once: true, margin: "-40px" } as const;

/** Returns a copy of a preset whose "visible" state starts after `delay` seconds. */
export const withDelay = (variants: Variants, delay: number): Variants => {
  const visible = variants.visible;
  if (!delay || !visible || typeof visible === "function") return variants;
  return { ...variants, visible: { ...visible, transition: { ...visible.transition, delay } } };
};



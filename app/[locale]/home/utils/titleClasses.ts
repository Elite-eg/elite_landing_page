/**
 * Line height of home section titles: the Figma's 135%. SectionHeading's own leading (1.15 on desktop) is too tight
 * for two-line Arabic titles. One class per breakpoint it sets a size at: `sm:text-4xl` also sets a line height
 * (40px), which would win over a base `leading-*` from 640px up.
 */
export const SECTION_TITLE_LEADING = "leading-[1.35] sm:leading-[1.35] lg:leading-[1.35]";

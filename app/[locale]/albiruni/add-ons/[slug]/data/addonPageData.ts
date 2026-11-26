/**
 * Sections of an add-on page in tab order (Figma "Tabs"); each id is its section's anchor. The page itself shows the
 * media first, as in the Figma. Tab labels: `addons.details.tabs.<id>`.
 */
export const ADDON_SECTIONS = ["description", "media", "installation", "reviews", "changelog"] as const;

export type AddonSectionId = (typeof ADDON_SECTIONS)[number];

import { ROUTES } from "./constants";

/**
 * The sectors Albiruni ships ready templates for, in display order (solutions page, sector cards, pricing, add-ons
 * filters). Names: `nav.sectorsItems.<key>`.
 */
export const SECTOR_KEYS = ["distribution", "fieldSales", "carService"] as const;
export type SectorKey = (typeof SECTOR_KEYS)[number];

/** The sector the solutions page shows when its URL names none (the Figma's selected tab). */
export const DEFAULT_SECTOR: SectorKey = "distribution";

/** Query key of the solutions page for the sector shown (`/solutions?sector=fieldSales`). */
export const SECTOR_QUERY_KEY = "sector";

const isSectorKey = (value: unknown): value is SectorKey => SECTOR_KEYS.includes(value as SectorKey);

/** The sector named in a URL query value; the default one when missing or unknown. */
export const parseSector = (value: string | null | undefined): SectorKey => (isSectorKey(value) ? value : DEFAULT_SECTOR);

/** The solutions page showing a sector's workday (sector cards). */
export const solutionsSectorHref = (sector: SectorKey) => `${ROUTES.solutions}?${SECTOR_QUERY_KEY}=${sector}`;

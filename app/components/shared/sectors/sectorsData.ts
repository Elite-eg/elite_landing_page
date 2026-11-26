import type { IconType } from "react-icons";
import { FiMapPin, FiTool, FiTruck } from "react-icons/fi";
import type { SectorKey } from "@/lib/sectors";

export interface Sector {
  /** Name: `nav.sectorsItems.<key>`; card copy: `sectors.items.<key>`. */
  key: SectorKey;
  icon: IconType;
}

/** Sector cards in display order (home, solutions), each opening the solutions page on its sector's workday. */
export const SECTORS: readonly Sector[] = [
  { key: "distribution", icon: FiTruck },
  { key: "fieldSales", icon: FiMapPin },
  { key: "carService", icon: FiTool },
];

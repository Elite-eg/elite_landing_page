import type { IconType } from "react-icons";
import { FiDollarSign, FiFileText, FiGrid, FiLayers, FiSmartphone, FiTrendingUp } from "react-icons/fi";

/** Keys map to `about.statements.<key>` in messages. Order = display order (start → end). */
export type StatementKey = "mission" | "vision";

export interface StatementItem {
  key: StatementKey;
  tone: "dark" | "light";
}

export const ABOUT_STATEMENTS: StatementItem[] = [
  { key: "mission", tone: "dark" },
  { key: "vision", tone: "light" },
];

/** Keys map to `about.albiruni.features.<key>`. Laid out in a 3-column grid, row by row. */
export type AlbiruniFeatureKey =
  | "allInOne"
  | "scalable"
  | "sectors"
  | "fieldApp"
  | "cashSettlement"
  | "eInvoicing";

export interface AlbiruniFeature {
  key: AlbiruniFeatureKey;
  icon: IconType;
}

export const ALBIRUNI_FEATURES: AlbiruniFeature[] = [
  { key: "allInOne", icon: FiLayers },
  { key: "scalable", icon: FiTrendingUp },
  { key: "sectors", icon: FiGrid },
  { key: "fieldApp", icon: FiSmartphone },
  { key: "cashSettlement", icon: FiDollarSign },
  { key: "eInvoicing", icon: FiFileText },
];

/** Keys map to `about.values.items.<key>`. Numbered 01–04 in this order. */
export type ValueKey = "clarity" | "ownership" | "closeness" | "improvement";

export const ABOUT_VALUES: ValueKey[] = ["clarity", "ownership", "closeness", "improvement"];

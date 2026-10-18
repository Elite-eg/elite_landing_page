import type { IconType } from "react-icons";
import { FiBarChart2, FiBriefcase, FiCode, FiCpu, FiFeather, FiGlobe, FiSmartphone } from "react-icons/fi";

/** Keys map to `home.services.items.<key>` in messages. Services from elitemsr.com/our-services. */
export type ServiceKey =
  | "customSoftware"
  | "webPlatforms"
  | "mobileApps"
  | "erpSystems"
  | "aiAutomation"
  | "uiux"
  | "dataBi";

export interface ServiceItem {
  key: ServiceKey;
  icon: IconType;
}

export const HOME_SERVICES: ServiceItem[] = [
  { key: "customSoftware", icon: FiCode },
  { key: "webPlatforms", icon: FiGlobe },
  { key: "mobileApps", icon: FiSmartphone },
  { key: "erpSystems", icon: FiBriefcase },
  { key: "aiAutomation", icon: FiCpu },
  { key: "uiux", icon: FiFeather },
  { key: "dataBi", icon: FiBarChart2 },
];

/** Keys map to `home.ideas.items.<key>`. Ideas published on community.elitemsr.com/ideas. */
export type IdeaKey = "qrExchange" | "ventureStudio" | "voiceAgent";

export interface IdeaItem {
  key: IdeaKey;
  techStack: string[];
}

export const HOME_IDEAS: IdeaItem[] = [
  { key: "qrExchange", techStack: ["Python", "Django", "REST APIs", "Redis", "AWS"] },
  { key: "ventureStudio", techStack: ["React", "Node.js", "Next.js", "PostgreSQL", "Docker"] },
  { key: "voiceAgent", techStack: ["Python", "OpenAI API", "Twilio", "FastAPI"] },
];

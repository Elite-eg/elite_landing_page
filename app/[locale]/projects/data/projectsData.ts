import type { AppLink } from "@/app/components/shared/AppLinkBadge";
import { MEDIA, PROJECT_LINKS, type ROUTES } from "@/lib/constants";
import { BAREEQ_LINKS } from "../bareeq-x/data/bareeqData";

/** Keys map to `projects.filter.categories.<key>`. Order = pill order (start → end), after "all". */
export const PROJECT_CATEGORIES = ["mobile", "systems", "websites"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectFilterValue = ProjectCategory | "all";

/**
 * Cover color: the client's identity where the design system has it, brand navy otherwise. It fills the cover
 * and overlays the project photo, so the white wordmark and the drawn screens stay readable.
 */
export type ProjectCoverTone = "bareeq" | "navy" | "midnight";

/** Code-drawn screens on the cover: two app phones or a web dashboard. */
export type ProjectMockup = "phones" | "dashboard";

/** A project key is also its page: `ROUTES.projects[key]`, linked from the card as "Project details". */
export type ProjectKey = Exclude<keyof typeof ROUTES.projects, "all">;

/**
 * Copy lives in messages: `projects.list.<key>.{wordmark,name,tagline,description,meta}` and the lists
 * `.tags`, `.features`, `.tech` (string arrays, same length in ar and en).
 */
export interface Project {
  key: ProjectKey;
  categories: ProjectCategory[];
  cover: {
    tone: ProjectCoverTone;
    mockup: ProjectMockup;
    /** Project photo (a path in `MEDIA`), cropped to fill the cover under the tone overlay, behind the screens. */
    image?: string;
  };
  /** Only the links the project has, shown as badges after "Project details". */
  links: AppLink[];
}

/**
 * Projects in display order (Figma v4 "Work").
 * TBD: real images for Aman Car and ARFA (the Figma says to take them from elitemsr.com): add the file to
 * public/images, its path to `MEDIA`, and `image: MEDIA.<name>` to the project's cover.
 */
export const PROJECTS: Project[] = [
  {
    key: "bareeq",
    categories: ["mobile", "systems", "websites"],
    cover: { tone: "bareeq", mockup: "phones", image: MEDIA.bareeqTeam },
    links: BAREEQ_LINKS,
  },
  {
    key: "amanCar",
    categories: ["systems"],
    cover: { tone: "navy", mockup: "dashboard" },
    links: [],
  },
  {
    key: "arfa",
    categories: ["websites"],
    cover: { tone: "midnight", mockup: "dashboard" },
    links: [{ kind: "website", href: PROJECT_LINKS.arfa.website }],
  },
];

/** Categories with at least one project, in PROJECT_CATEGORIES order: a filter pill never leads to an empty list. */
export const PROJECT_FILTERS: readonly ProjectFilterValue[] = [
  "all",
  ...PROJECT_CATEGORIES.filter((category) => PROJECTS.some((project) => project.categories.includes(category))),
];

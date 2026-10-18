import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

/** Locale-aware wrappers around Next.js navigation. Use these instead of next/link and next/navigation. */
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);

import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import type { ContactChannelTone } from "../data/contactData";

const TONE_CLASSES: Record<ContactChannelTone, string> = {
  whatsapp: "bg-whatsapp text-white",
  warm: "bg-surface-warm text-secondary-dark",
  muted: "bg-surface-muted text-primary",
};

const CARD_CLASSES = "flex items-center gap-3.5 rounded-2xl border border-edge bg-surface px-5 py-[1.125rem]";

export interface ContactChannelCardProps {
  icon: IconType;
  tone: ContactChannelTone;
  title: string;
  /** The value line(s): a number, an address, a short note. */
  children: ReactNode;
  /** One destination: the whole card becomes the link. Leave it out when the value holds its own links. */
  href?: string;
  /** Opens in a new tab (WhatsApp, Maps). */
  external?: boolean;
}

/** Icon tile + title + value. Hover changes the border colour only. */
export function ContactChannelCard({ icon: Icon, tone, title, children, href, external = false }: ContactChannelCardProps) {
  const content = (
    <>
      <span className={cn("grid size-[2.625rem] shrink-0 place-items-center rounded-xl", TONE_CLASSES[tone])} aria-hidden="true">
        <Icon className="size-5" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="font-heading font-semibold text-body">{title}</span>
        <span className="text-caption text-content">{children}</span>
      </span>
    </>
  );

  if (!href) return <div className={CARD_CLASSES}>{content}</div>;

  return (
    <a
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(CARD_CLASSES, "transition-colors duration-200 hover:border-primary/30")}
    >
      {content}
    </a>
  );
}

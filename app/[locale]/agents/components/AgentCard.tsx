import Image from "next/image";
import { useTranslations } from "next-intl";
import { FiCheck } from "react-icons/fi";
import { Badge } from "@/app/components/shared/Badge";
import { Button } from "@/app/components/shared/Button";
import { AGENT_CONTACTS, telUrl } from "@/lib/constants";
import type { AlbiruniAgent } from "../data/agentsData";

const CONTACT_LINK_CLASSES = "transition-colors duration-200 hover:text-primary";

export interface AgentCardProps {
  agent: AlbiruniAgent;
}

/**
 * Authorized agent (Figma "Agent"): logo tile, approval badge, name, services and contacts, and a link to the
 * agent's site. One row from md; stacked below, with the button full width.
 * Rests on a small shadow; hover: the border darkens and the shadow grows.
 */
export function AgentCard({ agent: { key, logo, services } }: AgentCardProps) {
  const t = useTranslations("agents.ourAgent");
  const { website, email, phone } = AGENT_CONTACTS[key];
  const nameId = `agent-${key}-name`;

  return (
    <article
      aria-labelledby={nameId}
      className="flex flex-col items-start gap-6 rounded-3xl border border-edge bg-surface p-6 shadow-card transition duration-300 ease-out-brand hover:border-primary/20 hover:shadow-card-hover sm:p-8 md:flex-row md:items-center md:gap-7"
    >
      <Image src={logo} alt="" width={104} height={104} className="size-20 shrink-0 sm:size-[6.5rem]" />

      <div className="flex min-w-0 flex-1 flex-col items-start gap-2.5">
        <Badge
          variant="success"
          icon={<FiCheck className="size-3.5 text-success" strokeWidth={3} />}
          className="rounded-full text-caption font-medium"
        >
          {t("badge")}
        </Badge>

        <h3 id={nameId} className="text-h3 text-body">
          {t(`list.${key}.name`)}
        </h3>
        <p className="text-content">{t(`list.${key}.description`)}</p>

        <ul aria-label={t("servicesLabel")} className="flex flex-wrap gap-2">
          {services.map((service) => (
            <li key={service} className="rounded-full bg-surface-alt px-3 py-1.5 text-caption font-medium text-primary-dark">
              {t(`services.${service}`)}
            </li>
          ))}
        </ul>

        <ul aria-label={t("contactsLabel")} className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-caption font-medium text-ink-700">
          <li>
            <a href={telUrl(phone)} dir="ltr" className={CONTACT_LINK_CLASSES}>
              {phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${email}`} dir="ltr" className={CONTACT_LINK_CLASSES}>
              {email}
            </a>
          </li>
          <li>
            <a href={website} target="_blank" rel="noopener noreferrer" dir="ltr" className="text-secondary-dark transition-colors duration-200 hover:text-secondary">
              {new URL(website).hostname}
            </a>
          </li>
        </ul>
      </div>

      <Button href={website} external variant="primary" aria-describedby={nameId} className="w-full md:w-[13.75rem]">
        {t("visitWebsite")}
      </Button>
    </article>
  );
}

import { useTranslations } from "next-intl";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { ALBIRUNI_AGENTS, OUR_AGENT_ID } from "../data/agentsData";
import { AgentCard } from "./AgentCard";

/** The authorized agent(s) today ("Meet our agent" in the hero scrolls here). */
export function OurAgentSection() {
  const t = useTranslations("agents.ourAgent");

  return (
    <section id={OUR_AGENT_ID} className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading title={t("title")} align="start" size="compact" headingClassName="text-body" className="mb-6" />

        <div className="flex flex-col gap-4">
          {ALBIRUNI_AGENTS.map((agent) => (
            <Reveal key={agent.key}>
              <AgentCard agent={agent} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

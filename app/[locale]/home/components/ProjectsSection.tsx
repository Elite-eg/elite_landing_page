import { useTranslations } from "next-intl";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { RevealGroup } from "@/app/components/shared/RevealGroup";
import { ROUTES } from "@/lib/constants";
import { HOME_PROJECTS, PROJECTS } from "@/lib/projects";
import { HomeProjectCard } from "./HomeProjectCard";
import { HomeSectionHeader } from "./HomeSectionHeader";

/** "Our projects" (Figma "Projects"): three project cards and a link to the projects page. */
export function ProjectsSection() {
  const t = useTranslations("home.projects");

  return (
    <section className="bg-surface py-20 sm:py-24 lg:py-28">
      <Container>
        <HomeSectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          aside={
            <Button
              href={ROUTES.projects.all}
              variant="text"
              icon={<FiArrowRight />}
              flipIconInRtl
              className="text-secondary-dark hover:text-primary"
            >
              {t("all")}
            </Button>
          }
        />

        <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {HOME_PROJECTS.map(({ key, linkTo }) => (
            <Reveal key={key} inGroup className="h-full">
              <HomeProjectCard project={PROJECTS[key]} linkTo={linkTo} />
            </Reveal>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

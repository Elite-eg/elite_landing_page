import { Container } from "@/app/components/shared/Container";
import { HeroCopy } from "./HeroCopy";
import { HeroStage } from "./HeroStage";

/**
 * Navy hero (Figma "Hero"): copy and the two "where do you start?" paths on the start side, the Albiruni product on
 * the end side from xl (below the copy on smaller screens), over an 80px grid and two soft glows.
 */
export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-tr from-primary-deep via-primary-dark to-primary">
      <div
        className="bg-square-grid-light absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_85%,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute -z-10 hidden size-[38.75rem] rounded-full bg-secondary/[0.13] blur-[110px] end-[3.75rem] top-[16.25rem] lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute -start-40 -top-72 -z-10 size-[43.75rem] rounded-full bg-accent/35 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative pb-16 pt-14 sm:pb-20 sm:pt-20 xl:flex xl:min-h-[51.25rem] xl:items-center xl:py-24">
        <HeroCopy />
        <HeroStage />
      </Container>
    </section>
  );
}

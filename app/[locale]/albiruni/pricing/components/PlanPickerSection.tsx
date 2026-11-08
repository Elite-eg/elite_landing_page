import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { PlansStep } from "./PlansStep";
import { SectorPicker } from "./SectorPicker";

/** Steps 1 and 2 on the hero's grey band: the sector cards, then the plans tuned for that sector. */
export function PlanPickerSection() {
  return (
    <section className="bg-surface-alt pb-10 pt-2.5">
      <Container>
        <Reveal>
          <SectorPicker />
        </Reveal>
        <PlansStep />
      </Container>
    </section>
  );
}

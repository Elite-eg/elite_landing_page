import type { ReactNode } from "react";
import { Container } from "./Container";
import { FormCard } from "./form-handlers/FormCard";
import { Reveal } from "./Reveal";

export interface FormSectionProps {
  /** Anchor the hero's apply / join button scrolls to. */
  id: string;
  /** The form (`FormLayout`, which carries the title), swapped in place for its SuccessPanel once sent. */
  children: ReactNode;
}

/** Grey band with the page's form card centred in it (720px). Agents, partners. */
export function FormSection({ id, children }: FormSectionProps) {
  return (
    <section id={id} className="bg-surface-alt py-20 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-[45rem]">
          <FormCard>{children}</FormCard>
        </Reveal>
      </Container>
    </section>
  );
}

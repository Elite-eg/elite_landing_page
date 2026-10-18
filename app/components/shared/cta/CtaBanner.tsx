import { Container } from "@/app/components/shared/Container";
import { Reveal } from "@/app/components/shared/Reveal";
import { SectionHeading } from "@/app/components/shared/SectionHeading";
import { CtaBannerButton, type CtaBannerAction, type CtaBannerButtonVariant } from "./CtaBannerButton";

export interface CtaBannerProps {
  title: string;
  subtitle?: string;
  /** Navy button, the main action of the banner. */
  primaryAction: CtaBannerAction;
  /** Light button next to the primary one. */
  secondaryAction?: CtaBannerAction;
  /** "outline" = white button (default), "glass" = white outline only. */
  secondaryVariant?: Extract<CtaBannerButtonVariant, "outline" | "glass">;
}

/** Orange closing banner shared by inner pages (About, Solutions, ...). */
export function CtaBanner({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  secondaryVariant = "outline",
}: CtaBannerProps) {
  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <Reveal preset="scaleIn">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-secondary to-secondary-dark px-6 py-12 shadow-glow sm:px-12 lg:px-16 lg:py-14">
            <CtaBannerRings />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <SectionHeading
                title={title}
                subtitle={subtitle}
                tone="brand"
                align="start"
                className="mb-0 sm:mb-0"
              />
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <CtaBannerButton action={primaryAction} variant="primary" />
                {secondaryAction && <CtaBannerButton action={secondaryAction} variant={secondaryVariant} />}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** Soft concentric rings on the end side, mirrored automatically in RTL. */
function CtaBannerRings() {
  return (
    <div className="pointer-events-none absolute -end-24 -top-24 -z-10 size-80" aria-hidden="true">
      <span className="absolute inset-0 rounded-full border border-white/15" />
      <span className="absolute inset-10 rounded-full border border-white/15" />
      <span className="absolute inset-20 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}

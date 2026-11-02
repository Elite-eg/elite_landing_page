import { PlatformHeroCopy } from "./PlatformHeroCopy";
import { PlatformHeroVisual } from "./PlatformHeroVisual";

/**
 * Navy hero (Figma v4 "Albiruni · المنصة"): centred copy over vertical hairlines, then the product (web dashboard,
 * super app and live cards) rising out of it and fading into the white section below.
 */
export function PlatformHero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-primary-deep to-primary pt-20 sm:pt-24">
      <div className="bg-line-grid-light absolute inset-0 -z-10" aria-hidden="true" />

      <PlatformHeroCopy />

      <div className="relative mt-12">
        <PlatformHeroVisual />
        <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-b from-surface/0 to-surface" aria-hidden="true" />
      </div>
    </section>
  );
}

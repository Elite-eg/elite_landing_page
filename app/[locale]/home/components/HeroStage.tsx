import { AlbiruniStage } from "@/app/components/shared/albiruni-stage/AlbiruniStage";
import { cn } from "@/lib/utils";

/**
 * The Albiruni product beside the hero copy (Figma "Hero/Product": the 936×850px stage at about 0.77). Below xl it
 * sits under the copy, centred and scaled to the width (each wrapper height = 850px × its scale). From xl it is
 * pinned to the end side 16px after the 560px copy and runs into the page margin; from 1440px (the Figma's width)
 * the copy is 640px and the stage tucks 24px under its paths, like the Figma. Offsets count from the Container's
 * padding box: 32px padding + copy width ± the gap.
 */
export function HeroStage() {
  return (
    <div
      className={cn(
        "mt-12 flex h-[306px] justify-center sm:mt-14 sm:h-[527px] md:h-[646px]",
        "xl:absolute xl:start-[38rem] xl:top-1/2 xl:mt-0 xl:block xl:h-[578px] xl:w-[636px] xl:-translate-y-1/2",
        "min-[1440px]:start-[40.5rem] min-[1440px]:h-[629px] min-[1440px]:w-[693px]"
      )}
    >
      <AlbiruniStage
        delay={0.6}
        className={cn(
          "origin-top scale-[0.36] sm:scale-[0.62] md:scale-[0.76]",
          "xl:absolute xl:start-0 xl:top-0 xl:scale-[0.68] ltr:xl:origin-top-left rtl:xl:origin-top-right",
          "min-[1440px]:scale-[0.74]"
        )}
      />
    </div>
  );
}

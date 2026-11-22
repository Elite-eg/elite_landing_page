import { AlbiruniStage } from "@/app/components/shared/albiruni-stage/AlbiruniStage";

/**
 * The product under the hero copy, at full size on desktop and scaled down as one picture below that. The wrapper
 * shows the top 791px of the 850px stage, like the Figma, where the hero ends.
 */
export function PlatformHeroVisual() {
  return (
    <div className="flex h-[285px] justify-center sm:h-[490px] md:h-[601px] lg:h-[791px]">
      <AlbiruniStage className="origin-top scale-[0.36] sm:scale-[0.62] md:scale-[0.76] lg:scale-100 xl:me-20" />
    </div>
  );
}

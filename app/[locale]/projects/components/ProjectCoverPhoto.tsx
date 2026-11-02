import Image from "next/image";
import { Reveal } from "@/app/components/shared/Reveal";

export interface ProjectCoverPhotoProps {
  src: string;
  /** Loads the photo eagerly (the first card sits above the fold). */
  priority?: boolean;
}

/**
 * The project's photo behind the wordmark and screens; it settles from a slight zoom as the card appears.
 * Drawn faint over the cover's tone gradient, which reads as a tone overlay (as on the Bareeq X case study hero).
 * Its sides fade out, so a wide crop (text and logos at a banner's edges) never ends abruptly;
 * further on tablets, where the cover spans the whole card and shows most of a wide photo.
 * `sizes` asks for the large file: cropped to the cover's height, a wide photo renders far wider than the cover.
 */
export function ProjectCoverPhoto({ src, priority = false }: ProjectCoverPhotoProps) {
  return (
    <Reveal preset="imageReveal" className="absolute inset-0 -z-10">
      <Image
        src={src}
        alt=""
        fill
        priority={priority}
        sizes="1200px"
        className="object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] sm:max-lg:[mask-image:linear-gradient(to_right,transparent_15%,black_40%,black_60%,transparent_85%)]"
      />
    </Reveal>
  );
}

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/app/components/shared/Button";
import { CONTACT_HREF, MEDIA } from "@/lib/constants";

export interface ServiceFeatureCardProps {
  title: string;
  description: string;
  ctaLabel: string;
  imageAlt: string;
}

/** Large photo tile that anchors the services bento grid. */
export function ServiceFeatureCard({
  title,
  description,
  ctaLabel,
  imageAlt,
}: ServiceFeatureCardProps) {
  return (
    <article className="group relative isolate flex h-full min-h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-primary-deep p-7 shadow-lift sm:p-8">
      <Image
        src={MEDIA.product}
        alt={imageAlt}
        fill
        sizes="(min-width: 1024px) 26rem, 100vw"
        className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-primary-deep via-primary-deep/70 to-primary-deep/5"
        aria-hidden="true"
      />

      <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">
        {title}
      </h3>
      <p className="mt-3 max-w-sm leading-loose text-white/80">{description}</p>
      <div className="mt-6">
        <Button
          href={CONTACT_HREF}
          variant="secondary"
          icon={<FiArrowRight />}
          flipIconInRtl
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}

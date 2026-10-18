"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { floatLoop } from "@/lib/animations";

interface AboutHeroVisualProps {
  alt: string;
}

/** Navy brand tile with the light logo mark floating over soft brand glows. */
export function AboutHeroVisual({ alt }: AboutHeroVisualProps) {
  return (
    <div className="relative isolate grid aspect-[4/3] place-items-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary-dark to-primary-deep shadow-lift">
      <div className="absolute inset-0 -z-10 bg-dot-grid-light opacity-60" aria-hidden="true" />
      <div className="absolute -bottom-24 -end-16 -z-10 size-72 rounded-full bg-secondary/35 blur-3xl" aria-hidden="true" />
      <div className="absolute -start-20 -top-24 -z-10 size-72 rounded-full bg-accent/40 blur-3xl" aria-hidden="true" />

      <motion.div variants={floatLoop} animate="animate" className="w-3/5 will-change-transform">
        <Image
          src="/images/logo-light.png"
          alt={alt}
          width={600}
          height={349}
          priority
          sizes="(min-width: 1024px) 18rem, 60vw"
          className="h-auto w-full drop-shadow-[0_24px_40px_rgb(var(--secondary)/0.35)]"
        />
      </motion.div>
    </div>
  );
}

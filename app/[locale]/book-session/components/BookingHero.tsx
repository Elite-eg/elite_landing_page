"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { slideInFromEnd, withDelay } from "@/lib/animations";
import { BookingWidget } from "./BookingWidget";
import { HeroContent } from "./HeroContent";

/** Navy hero: copy on the start side, the booking widget on the end side. */
export function BookingHero() {
  const isRtl = useLocale() === "ar";

  return (
    <section className="bg-gradient-to-tr from-primary-deep from-[14%] to-primary to-[86%] pb-16 pt-12 lg:pb-[5.625rem] lg:pt-20">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
        <HeroContent />

        <motion.div
          className="w-full lg:w-[35rem] lg:shrink-0"
          variants={withDelay(slideInFromEnd(isRtl), 0.45)}
          initial="hidden"
          animate="visible"
        >
          <BookingWidget />
        </motion.div>
      </Container>
    </section>
  );
}

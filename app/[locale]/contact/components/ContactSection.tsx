"use client";

import { motion } from "framer-motion";
import { Container } from "@/app/components/shared/Container";
import { fadeInUp, heroStagger } from "@/lib/animations";
import { ContactChannelList } from "./ContactChannelList";
import { ContactIntro } from "./ContactIntro";
import { ContactRequestCard } from "./ContactRequestCard";

export function ContactSection() {
  return (
    <section className="bg-surface-alt py-16 lg:pb-[6.875rem] lg:pt-[5.625rem]">
      <Container>
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-5 xl:grid-cols-[31.25rem_minmax(0,1fr)]"
        >
          <ContactIntro className="lg:col-start-1 lg:row-start-1" />

          <motion.div variants={fadeInUp} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <ContactRequestCard />
          </motion.div>

          <ContactChannelList className="lg:col-start-1 lg:row-start-2" />
        </motion.div>
      </Container>
    </section>
  );
}

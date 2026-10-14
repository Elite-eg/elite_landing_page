import { useTranslations } from "next-intl";
import { FOOTER_NAV_GROUPS } from "@/lib/constants";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { RevealGroup } from "../RevealGroup";
import { FooterBottomBar } from "./FooterBottomBar";
import { FooterBrandColumn } from "./FooterBrandColumn";
import { FooterNavColumn } from "./FooterNavColumn";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-ink-900 text-content-dark">
      <Container className="py-14 lg:py-16">
        <RevealGroup className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal inGroup className="lg:col-span-4">
            <FooterBrandColumn />
          </Reveal>

          <nav aria-label={t("navLabel")} className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {FOOTER_NAV_GROUPS.map((group) => (
                <Reveal key={group.key} inGroup>
                  <FooterNavColumn group={group} />
                </Reveal>
              ))}
            </div>
          </nav>
        </RevealGroup>

        <Reveal preset="fadeIn" className="mt-12">
          <FooterBottomBar />
        </Reveal>
      </Container>
    </footer>
  );
}

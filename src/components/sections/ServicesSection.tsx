"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "@/components/common/Image";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";

const services = ["facade", "aluminum", "lowe", "installation"] as const;

export default function ServicesSection() {
  const t = useTranslations("services");
  const reduced = useReducedMotion();

  return (
    <section id="services" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-16 max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <motion.div
              key={service}
              variants={{
                hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: easeOutExpo },
                },
              }}
              whileHover={reduced ? {} : { y: -4 }}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-accent/30"
            >
              <div className="flex flex-1 flex-col p-7">
                <span className="font-mono text-sm text-accent">{t(`items.${service}.num`)}</span>
                <h3 className="mt-3 text-lg font-semibold text-foreground">
                  {t(`items.${service}.title`)}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {t(`items.${service}.description`)}
                </p>
              </div>
              <div className="relative h-40 overflow-hidden bg-background">
                <Image
                  src=""
                  alt={t(`items.${service}.title`)}
                  fill
                  className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

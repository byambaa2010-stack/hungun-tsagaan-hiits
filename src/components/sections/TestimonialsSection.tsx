"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";

const testimonials = ["architect", "manager", "engineer"] as const;

export default function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const reduced = useReducedMotion();

  return (
    <section id="testimonials" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-16 max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {testimonials.map((key) => (
            <motion.div
              key={key}
              variants={{
                hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: easeOutExpo },
                },
              }}
              className="flex flex-col justify-between rounded-lg border border-border bg-surface p-8"
            >
              <p className="text-lg leading-relaxed text-foreground">{t(`items.${key}.quote`)}</p>
              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">{t(`items.${key}.role`)}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

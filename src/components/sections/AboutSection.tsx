"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "@/components/common/Image";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";

const stats = [
  { key: "years", value: "12+" },
  { key: "projects", value: "80+" },
  { key: "clients", value: "35+" },
  { key: "since", value: "2013" },
];

export default function AboutSection() {
  const t = useTranslations("about");
  const reduced = useReducedMotion();

  return (
    <section id="about" className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-xl border border-border">
            <div className="aspect-[4/3] w-full">
              <Image
                src="/images/team.jpg"
                alt={t("teamAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
          </div>
        </FadeIn>

        <div className="order-1 space-y-8 lg:order-2">
          <FadeIn direction="left">
            <div className="space-y-6">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {t("eyebrow")}
              </p>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                {t("title")}
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-muted">
                {t("description")}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-lg border border-border bg-background/50 p-6 md:p-8">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-subtle">
                {t("structureLabel")}
              </p>
              <pre className="mt-4 whitespace-pre-line font-mono text-base leading-loose text-muted md:text-lg">
                {t("structureItems")}
              </pre>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 gap-6 pt-2 md:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.key}
                variants={{
                  hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: easeOutExpo },
                  },
                }}
                className="space-y-1"
              >
                <p className="font-mono text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted">{t(`stats.${stat.key}`)}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

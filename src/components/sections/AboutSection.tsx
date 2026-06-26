"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "@/components/common/Image";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";
import { Award, Users, ClipboardCheck, ShieldCheck } from "lucide-react";

const stats = [
  { key: "years", value: "12+" },
  { key: "projects", value: "80+" },
  { key: "clients", value: "35+" },
  { key: "since", value: "2013" },
];

const highlights = [
  { key: "quality", icon: Award },
  { key: "team", icon: Users },
  { key: "standard", icon: ClipboardCheck },
  { key: "safety", icon: ShieldCheck },
];

export default function AboutSection() {
  const t = useTranslations("about");
  const reduced = useReducedMotion();

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/team.jpg"
          alt={t("teamAlt")}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/20">
                <div className="aspect-[4/3] w-full">
                  <Image
                    src="/images/about-team.jpg"
                    alt={t("teamAlt")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    {t("eyebrow")}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    GER GROUP
                  </p>
                </div>
              </div>
            </FadeIn>

            <div className="order-1 space-y-8 lg:order-2">
              <FadeIn direction="left">
                <div className="space-y-6">
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    {t("eyebrow")}
                  </p>
                  <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
                    {t("title")}
                  </h2>
                  <p className="max-w-xl text-lg leading-relaxed text-muted">
                    {t("description")}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <div className="grid grid-cols-2 gap-4">
                  {highlights.map(({ key, icon: Icon }) => (
                    <div
                      key={key}
                      className="flex items-start gap-4 rounded-xl border border-border/50 bg-surface/60 p-4 backdrop-blur-sm"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                        <Icon className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {t(`highlights.${key}.title`)}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {t(`highlights.${key}.description`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="rounded-2xl border border-border/50 bg-surface/60 p-6 backdrop-blur-sm md:p-8">
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-subtle">
                    {t("structureLabel")}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {t("structureItems")
                      .split("\n")
                      .map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-lg bg-background/60 px-4 py-3"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          <span className="font-mono text-sm text-muted">
                            {item}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </FadeIn>

              <StaggerContainer className="grid grid-cols-2 gap-6 border-t border-border/50 pt-8 md:grid-cols-4">
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
                    className="text-center"
                  >
                    <p className="font-mono text-3xl font-semibold text-foreground md:text-4xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {t(`stats.${stat.key}`)}
                    </p>
                  </motion.div>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

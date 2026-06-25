"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Layers, Box, Ruler, Wrench, LayoutGrid, Columns, ArrowUpRight } from "lucide-react";
import Image from "@/components/common/Image";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";

type Category = "all" | "facade" | "aluminum" | "glass";

const services: {
  key: "facade" | "unitized" | "stick" | "aluminum" | "lowe" | "installation";
  icon: React.ElementType;
  image: string;
  category: Category;
}[] = [
  { key: "facade", icon: Layers, image: "/images/service-facade.jpg", category: "facade" },
  { key: "unitized", icon: LayoutGrid, image: "/images/service-unitized.jpg", category: "facade" },
  { key: "stick", icon: Columns, image: "/images/service-stick.jpg", category: "facade" },
  { key: "aluminum", icon: Box, image: "/images/service-aluminum.jpg", category: "aluminum" },
  { key: "lowe", icon: Ruler, image: "/images/service-glass.jpg", category: "glass" },
  { key: "installation", icon: Wrench, image: "/images/service-install.jpg", category: "facade" },
];

const filters: { key: Category; labelKey: string }[] = [
  { key: "all", labelKey: "all" },
  { key: "facade", labelKey: "facade" },
  { key: "aluminum", labelKey: "aluminum" },
  { key: "glass", labelKey: "glass" },
];

export default function ServicesSection() {
  const t = useTranslations("services");
  const reduced = useReducedMotion();
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? services : services.filter((s) => s.category === active);

  return (
    <section id="services" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-10 max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-12 flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActive(filter.key)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                active === filter.key
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {t(`filters.${filter.labelKey}`)}
            </button>
          ))}
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.key}
                  layout
                  variants={{
                    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32, scale: 0.96 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.55, ease: easeOutExpo },
                    },
                  }}
                  exit={reduced ? {} : { opacity: 0, scale: 0.95 }}
                  whileHover={reduced ? {} : { y: -8 }}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/40"
                >
                  <div className="relative h-52 overflow-hidden md:h-60">
                    <Image
                      src={service.image}
                      alt={t(`items.${service.key}.title`)}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-60" />
                    <div className="absolute left-4 top-4 inline-flex rounded-md bg-accent/10 p-2.5 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-xs text-accent">{t(`items.${service.key}.num`)}</span>
                      <ArrowUpRight className="h-4 w-4 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {t(`items.${service.key}.title`)}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {t(`items.${service.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </StaggerContainer>
      </div>
    </section>
  );
}

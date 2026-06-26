"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Layers, Box, Ruler, Wrench, LayoutGrid, Columns, ArrowUpRight, Check, Star } from "lucide-react";
import Image from "@/components/common/Image";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";

type Category = "all" | "facade" | "aluminum" | "glass";

type ServiceKey = "facade" | "unitized" | "stick" | "aluminum" | "lowe" | "installation";

const services: {
  key: ServiceKey;
  icon: React.ElementType;
  image: string;
  category: Category;
  featured?: boolean;
}[] = [
  { key: "facade", icon: Layers, image: "/images/gallery-4.jpg", category: "facade", featured: true },
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
  const filterRef = useRef<HTMLDivElement>(null);

  const filtered = active === "all" ? services : services.filter((s) => s.category === active);

  const getFeatures = (key: ServiceKey): string[] => {
    const raw = t.raw(`items.${key}.features`);
    return Array.isArray(raw) ? (raw as string[]) : [];
  };

  return (
    <section id="services" className="relative overflow-hidden bg-background px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <FadeIn className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              {t("description")}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div
              ref={filterRef}
              className="relative inline-flex flex-wrap gap-1 rounded-full border border-border bg-surface/80 p-1 backdrop-blur-sm"
            >
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActive(filter.key)}
                  className={`relative z-10 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                    active === filter.key ? "text-white" : "text-muted hover:text-foreground"
                  }`}
                >
                  {active === filter.key && (
                    <motion.span
                      layoutId="activeServiceFilter"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{t(`filters.${filter.labelKey}`)}</span>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        <StaggerContainer stagger={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((service) => {
              const Icon = service.icon;
              const features = getFeatures(service.key);
              const isFeatured = service.featured;
              return (
                <motion.article
                  key={service.key}
                  layout
                  variants={{
                    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: easeOutExpo },
                    },
                  }}
                  exit={reduced ? {} : { opacity: 0, scale: 0.96 }}
                  whileHover={reduced ? {} : { y: -10 }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-surface/60 shadow-sm transition-all duration-500 hover:border-accent/30 hover:bg-surface hover:shadow-2xl hover:shadow-accent/5 ${
                    isFeatured ? "border-accent/40 ring-1 ring-accent/10 sm:col-span-2 lg:col-span-2" : "border-border"
                  }`}
                >
                  <div className={`relative overflow-hidden ${isFeatured ? "aspect-[21/9]" : "aspect-[16/10]"}`}>
                    <Image
                      src={service.image}
                      alt={t(`items.${service.key}.title`)}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes={isFeatured ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />

                    <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    <div className="absolute right-5 top-5 flex h-8 items-center gap-1.5 rounded-full border border-white/20 bg-black/20 px-3 backdrop-blur-md">
                      {isFeatured && <Star className="h-3 w-3 text-yellow-300" />}
                      <span className="font-mono text-xs font-medium text-white/90">
                        {t(`items.${service.key}.num`)}
                      </span>
                    </div>

                    {isFeatured && (
                      <div className="absolute bottom-5 left-5 rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        {t("filters.facade")}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold leading-snug text-foreground md:text-2xl">
                        {t(`items.${service.key}.title`)}
                      </h3>
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-accent/30 group-hover:text-accent">
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-muted md:text-base">
                      {t(`items.${service.key}.description`)}
                    </p>

                    {features && Array.isArray(features) && features.length > 0 && (
                      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                        {features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-sm text-muted"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </StaggerContainer>
      </div>
    </section>
  );
}

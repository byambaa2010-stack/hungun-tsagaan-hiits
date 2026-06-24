"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "@/components/common/Image";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";

const filters = ["all", "office", "retail", "residential", "lobby"] as const;

const galleryItems = [
  { id: "1", label: "Оффисын барилга", category: "office" },
  { id: "2", label: "Худалдааны төв", category: "retail" },
  { id: "3", label: "Орон сууцны хороолол", category: "residential" },
  { id: "4", label: "Бизнес төв", category: "office" },
  { id: "5", label: "Лобби", category: "lobby" },
  { id: "6", label: "Зочид буудал", category: "lobby" },
  { id: "7", label: "Оффисын барилга", category: "office" },
  { id: "8", label: "Орон сууц", category: "residential" },
  { id: "9", label: "Худалдааны төв", category: "retail" },
];

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const reduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      <section className="bg-background px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
              {t("title")}
            </h1>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? "bg-accent text-white"
                  : "bg-background text-muted hover:text-foreground"
              }`}
            >
              {t(`filters.${filter}`)}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-surface px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: easeOutExpo },
                  },
                }}
                className="group relative h-64 overflow-hidden rounded-lg"
              >
                <Image
                  src=""
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-medium text-white">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}

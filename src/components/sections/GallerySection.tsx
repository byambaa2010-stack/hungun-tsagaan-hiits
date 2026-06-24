"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";

const galleryItems = [
  { id: "large", label: "Оффисын барилга", span: "large" },
  { id: "retail", label: "Худалдааны төв", span: "small" },
  { id: "residential", label: "Орон сууц", span: "small" },
];

export default function GallerySection() {
  const t = useTranslations("gallery");
  const reduced = useReducedMotion();

  return (
    <section id="gallery" className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>

        <StaggerContainer className="grid gap-5 md:grid-cols-2">
          <motion.div
            variants={{
              hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: easeOutExpo },
              },
            }}
            className="group relative h-[420px] overflow-hidden rounded-lg md:row-span-2"
          >
            <Image
              src=""
              alt={galleryItems[0]?.label ?? ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <p className="text-lg font-medium text-white">{galleryItems[0]?.label}</p>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {galleryItems.slice(1).map((item) => (
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
                className="group relative h-[200px] overflow-hidden rounded-lg"
              >
                <Image
                  src=""
                  alt={item.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-medium text-white">{item.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";
import { useTranslations } from "next-intl";
import Image from "@/components/common/Image";

export default function HeroSection() {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();

  const specs = [
    { label: t("specConfigLabel"), value: t("specConfigValue") },
    { label: t("specKLabel"), value: t("specKValue") },
    { label: t("specSCLabel"), value: t("specSCValue") },
    { label: t("specLightLabel"), value: t("specLightValue") },
  ];

  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOutExpo }}
            className="text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-[56px]"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
            className="max-w-xl text-lg leading-relaxed text-muted"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOutExpo }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/gallery"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-7 py-4 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated"
            >
              {t("ctaSecondary")}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
          className="space-y-6"
        >
          <div className="relative h-56 overflow-hidden rounded-lg border border-border md:h-72">
            <Image
              src="/images/hero-building.jpg"
              alt="Шилэн фасад"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="rounded-lg border border-border bg-surface p-8 md:p-10">
            <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted">
                {t("specLabel")}
              </span>
              <span className="font-mono text-2xl font-bold text-accent">{t("specCode")}</span>
            </div>

            <div className="space-y-5">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-border/50 pb-4 last:border-0 last:pb-0"
                >
                  <span className="font-mono text-sm text-muted">{spec.label}</span>
                  <span className="font-mono text-sm font-medium text-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

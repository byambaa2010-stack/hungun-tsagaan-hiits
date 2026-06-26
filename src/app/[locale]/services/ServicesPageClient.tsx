"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "@/components/common/Image";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";
import {
  LayoutGrid,
  Columns,
  Box,
  Ruler,
  Check,
  ArrowRight,
  Star,
} from "lucide-react";
import { Link } from "@/i18n/routing";

const systemCards = [
  {
    key: "unitized",
    icon: LayoutGrid,
    image: "/images/service-unitized.jpg",
  },
  {
    key: "stick",
    icon: Columns,
    image: "/images/service-stick.jpg",
  },
];

const materialCards = [
  {
    key: "aluminum",
    icon: Box,
    image: "/images/service-aluminum.jpg",
  },
  {
    key: "lowe",
    icon: Ruler,
    image: "/images/service-glass.jpg",
  },
];

const processSteps = [
  { key: "survey" },
  { key: "design" },
  { key: "production" },
  { key: "delivery" },
  { key: "install" },
  { key: "handover" },
];

function ServiceHero() {
  const t = useTranslations("servicesPage.hero");
  return (
    <section className="relative overflow-hidden bg-background px-6 py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <FadeIn>
          <div className="space-y-6">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
              {t("eyebrow")}
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              {["kValue", "light", "sound"].map((key) => (
                <div
                  key={key}
                  className="rounded-xl border border-border bg-surface/60 px-5 py-3"
                >
                  <p className="font-mono text-xs text-subtle">{t(`specs.${key}.label`)}</p>
                  <p className="mt-0.5 text-lg font-semibold text-foreground">
                    {t(`specs.${key}.value`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn direction="left" delay={0.15}>
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <div className="aspect-[4/3] w-full">
              <Image
                src="/images/gallery-4.jpg"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function ServiceDetail() {
  const t = useTranslations("servicesPage.detail");
  const features = t.raw("features") as string[];

  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <FadeIn className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <div className="aspect-[4/3] w-full">
                <Image
                  src="/images/gallery-8.jpg"
                  alt={t("imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
            </div>
          </FadeIn>

          <div className="order-1 space-y-8 lg:order-2">
            <FadeIn direction="left">
              <div className="space-y-6">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
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

            <FadeIn delay={0.1}>
              <div className="grid gap-4">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-4 rounded-xl border border-border/50 bg-background/60 p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <Check className="h-4 w-4 text-accent" />
                    </div>
                    <span className="text-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemCard({
  item,
}: {
  item: { key: string; icon: React.ElementType; image: string };
}) {
  const t = useTranslations(`servicesPage.systems.items.${item.key}`);
  const Icon = item.icon;
  const features = t.raw("features") as string[];

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
      }}
      className="group overflow-hidden rounded-2xl border border-border bg-surface/60 transition-all duration-500 hover:border-accent/30 hover:bg-surface hover:shadow-xl hover:shadow-accent/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.image}
          alt={t("title")}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
        <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground md:text-2xl">{t("title")}</h3>
        <p className="mt-3 text-muted">{t("description")}</p>
        <ul className="mt-5 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

function SystemsSection() {
  const t = useTranslations("servicesPage.systems");
  const reduced = useReducedMotion();

  return (
    <section className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-14 max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("description")}</p>
        </FadeIn>

        <StaggerContainer
          stagger={0.1}
          className="grid gap-6 md:grid-cols-2"
        >
          {systemCards.map((item) => (
            <SystemCard key={item.key} item={item} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function MaterialCard({
  item,
}: {
  item: { key: string; icon: React.ElementType; image: string };
}) {
  const t = useTranslations(`servicesPage.materials.items.${item.key}`);
  const Icon = item.icon;
  const features = t.raw("features") as string[];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
      }}
      className="group overflow-hidden rounded-2xl border border-border bg-surface/60 transition-all duration-500 hover:border-accent/30 hover:bg-surface"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
          <Image
            src={item.image}
            alt={t("title")}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/80 md:bg-gradient-to-l" />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <h3 className="text-xl font-semibold text-foreground md:text-2xl">{t("title")}</h3>
          <p className="mt-3 text-muted">{t("description")}</p>
          <ul className="mt-5 space-y-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function MaterialsSection() {
  const t = useTranslations("servicesPage.materials");

  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-14 max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("description")}</p>
        </FadeIn>

        <StaggerContainer stagger={0.12} className="grid gap-6">
          {materialCards.map((item) => (
            <MaterialCard key={item.key} item={item} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function ProcessSection() {
  const t = useTranslations("servicesPage.process");
  const reduced = useReducedMotion();

  return (
    <section className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-14 max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-muted">{t("description")}</p>
        </FadeIn>

        <StaggerContainer stagger={0.08} className="relative grid gap-6 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.key}
              variants={{
                hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: easeOutExpo },
                },
              }}
              className="relative rounded-2xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-surface"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-mono text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {t(`steps.${step.key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-muted">
                {t(`steps.${step.key}.description`)}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function CtaSection() {
  const t = useTranslations("servicesPage.cta");

  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <FadeIn className="mx-auto max-w-4xl text-center">
        <div className="rounded-3xl border border-border bg-background p-8 md:p-14">
          <Star className="mx-auto h-8 w-8 text-accent" />
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{t("description")}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {t("button")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}

export default function ServicesPageClient() {
  return (
    <>
      <ServiceHero />
      <ServiceDetail />
      <SystemsSection />
      <MaterialsSection />
      <ProcessSection />
      <CtaSection />
    </>
  );
}

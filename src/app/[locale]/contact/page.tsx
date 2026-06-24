import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Холбоо барих | GER GROUP",
  description: "GER GROUP-тай холбогдож, шилэн фасад, хөнгөн цагаан хийцний төслийнхөө талаар зөвлөгөө аваарай.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <MapSection />
    </>
  );
}

function MapSection() {
  const t = useTranslations("contact");

  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t("map.eyebrow")}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {t("map.title")}
          </h2>
        </div>
        <div className="relative h-[400px] overflow-hidden rounded-lg border border-border bg-background">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted">Улаанбаатар, Монгол</p>
              <p className="mt-1 font-mono text-xs text-subtle">Газрын зураг</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

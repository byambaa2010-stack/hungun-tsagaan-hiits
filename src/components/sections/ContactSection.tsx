"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import ContactForm from "./ContactForm";

const contactInfo = [
  { key: "address", icon: MapPin },
  { key: "phone", icon: Phone },
  { key: "email", icon: Mail },
  { key: "hours", icon: Clock },
];

export default function ContactSection() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        <FadeIn
          >
          <ContactForm />
        </FadeIn>

        <div className="space-y-8">
          <FadeIn direction="left">
            <div className="space-y-6">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {t("eyebrow")}
              </p>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                {t("title")}
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-muted">{t("description")}</p>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.1}>
            <div className="space-y-5">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="flex items-start gap-4">
                    <div className="inline-flex rounded-md bg-accent/10 p-2">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{t(`info.${item.key}`)}</h3>
                      <ContactValue itemKey={item.key} />
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ContactValue({ itemKey }: { itemKey: string }) {
  const t = useTranslations("contact");
  switch (itemKey) {
    case "phone":
      return (
        <a href={`tel:${t("details.phone").replace(/\s/g, "")}`} className="text-muted hover:text-foreground">
          {t("details.phone")}
        </a>
      );
    case "email":
      return (
        <a href={`mailto:${t("details.email")}`} className="text-muted hover:text-foreground">{t("details.email")}</a>
      );
    case "address":
      return <p className="text-muted">{t("details.address")}</p>;
    case "hours":
      return <p className="text-muted">{t("details.hours")}</p>;
    default:
      return null;
  }
}

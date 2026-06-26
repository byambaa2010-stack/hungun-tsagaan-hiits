import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ServicesPageClient from "./ServicesPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("servicesPage");
  return {
    title: `${t("title")} | GER GROUP`,
    description: t("description"),
  };
}

export default function ServicesPage() {
  return <ServicesPageClient />;
}

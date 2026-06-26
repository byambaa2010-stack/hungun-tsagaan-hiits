import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

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
  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 space-y-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            БАЙРШИЛ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Манай оффис
          </h2>
        </div>
        <div className="relative h-[400px] overflow-hidden rounded-lg border border-border bg-background">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.5!2d106.9659058!3d47.9240498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9691ee460293db%3A0xc922f20f51ca26e5!2sBatsmen!5e0!3m2!1sen!2smn!4v1718888888888!5m2!1sen!2smn"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GER GROUP оффисын байршил"
          />
        </div>
      </div>
    </section>
  );
}

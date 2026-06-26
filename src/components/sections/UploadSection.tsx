"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/motion/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function UploadSection() {
  const t = useTranslations("upload");
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <FadeIn className="space-y-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="max-w-md text-lg leading-relaxed text-muted">{t("description")}</p>
        </FadeIn>

        <FadeIn direction="left">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-border bg-background p-8 md:p-10"
          >
            <div className="space-y-5">
              <FormField name="name" label={t("name")} type="text" required />
              <FormField name="email" label={t("email")} type="email" required />
              <FormField name="phone" label={t("phone")} type="tel" />

              <div className="space-y-2">
                <motion.div
                  whileHover={reduced ? {} : { borderColor: "var(--color-accent)" }}
                  className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-surface px-6 py-10 transition-colors"
                >
                  <Upload className="h-8 w-8 text-muted" />
                  <div className="text-center">
                    <p className="text-sm text-muted">{t("dropzoneText")}</p>
                    <p className="mt-1 font-mono text-xs text-subtle">{t("dropzoneHint")}</p>
                  </div>
                  <input type="file" accept="image/jpeg,image/png" className="hidden" />
                </motion.div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : status === "success" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : null}
                {t("submit")}
              </button>

              {status === "error" && (
                <p className="text-center text-sm text-error">Алдаа гарлаа. Дахин оролдоно уу.</p>
              )}
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}

function FormField({
  name,
  label,
  type,
  required,
}: {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-muted">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-border bg-surface px-4 py-3 text-foreground placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        placeholder={label}
      />
    </div>
  );
}

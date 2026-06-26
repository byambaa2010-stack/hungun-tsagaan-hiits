"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      project: formData.get("project"),
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Contact form payload:", payload);
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-surface p-8 md:p-10"
    >
      <div className="space-y-5">
        <FormField name="name" label={t("form.name")} type="text" required />
        <FormField name="email" label={t("form.email")} type="email" required />
        <FormField name="phone" label={t("form.phone")} type="tel" />
        <FormField name="project" label={t("form.project")} type="text" />

        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("form.submitting")}
            </>
          ) : status === "success" ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              {t("form.success")}
            </>
          ) : (
            t("form.submit")
          )}
        </button>

        {status === "error" && (
          <p className="text-center text-sm text-error">{t("form.error")}</p>
        )}
      </div>
    </form>
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
        className="w-full rounded-md border border-border bg-background px-4 py-3 text-foreground placeholder:text-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        placeholder={label}
      />
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServerApolloClient, getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_PAGES, Page, CpPagesData } from "@/graphql/cms/queries/page";
import { routing } from "@/i18n/routing";

export const revalidate = 60;

export async function generateStaticParams() {
  const results = await Promise.all(
    routing.locales.map(async (locale) => {
      const client = getStaticApolloClient();
      try {
        const { data } = await client.query<CpPagesData>({
          query: CP_PAGES,
          variables: { language: locale },
          context: { fetchOptions: { next: { revalidate: 60 } } },
        });
        return (data?.cpPages ?? [])
          .filter((p: Page) => p.slug && !["gallery", "contact", "blog"].includes(p.slug))
          .map((p: Page) => ({ locale, slug: p.slug }));
      } catch {
        return [];
      }
    })
  );
  return results.flat();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await fetchPage(locale, slug);
  if (!page) return {};
  return {
    title: `${page.name} | GER GROUP`,
    description: page.description ?? undefined,
  };
}

async function fetchPage(locale: string, slug: string): Promise<Page | null> {
  const client = await getServerApolloClient();
  try {
    const { data } = await client.query<CpPagesData>({
      query: CP_PAGES,
      variables: { language: locale },
      context: { fetchOptions: { next: { revalidate: 60 } } },
    });
    return (data?.cpPages ?? []).find((p: Page) => p.slug === slug) || null;
  } catch {
    return null;
  }
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await fetchPage(locale, slug);
  if (!page) notFound();

  return (
    <article className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
          GER GROUP
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
          {page.name}
        </h1>
        {page.description && (
          <p className="mt-6 text-lg text-muted">{page.description}</p>
        )}
        {page.content && (
          <div
            className="mt-12 space-y-6 text-muted leading-relaxed"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        )}
      </div>
    </article>
  );
}

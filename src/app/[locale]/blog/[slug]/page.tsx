import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_POSTS, Post, CpPostsData } from "@/graphql/cms/queries/post";
import { routing } from "@/i18n/routing";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await fetchPost(locale, slug);
  if (!post) return {};
  return {
    title: `${post.title} | GER GROUP`,
    description: post.excerpt ?? undefined,
  };
}

async function fetchPost(locale: string, slug: string): Promise<Post | null> {
  const client = getStaticApolloClient();
  try {
    const { data } = await client.query<CpPostsData>({
      query: CP_POSTS,
      variables: { language: locale, status: "published", limit: 100 },
      context: { fetchOptions: { next: { revalidate: 60 } } },
    });
    return (data?.cpPosts ?? []).find((p: Post) => p.slug === slug) || null;
  } catch {
    return null;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await fetchPost(locale, slug);
  if (!post) notFound();

  return (
    <article className="bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Бүх мэдээ
        </Link>

        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
          МЭДЭЭ
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Calendar className="h-4 w-4" />
          <span>
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("mn-MN")
              : "—"}
          </span>
        </div>

        {post.thumbnail?.url && (
          <div className="relative mt-10 aspect-video overflow-hidden rounded-lg">
            <Image
              src={post.thumbnail.url}
              alt={post.title || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {post.content && (
          <div
            className="mt-12 space-y-6 text-muted leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>
    </article>
  );
}

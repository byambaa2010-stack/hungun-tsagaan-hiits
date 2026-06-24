import type { Metadata } from "next";
import { getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_POSTS, Post, CpPostsData } from "@/graphql/cms/queries/post";
import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";
import { Calendar, ArrowRight } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Мэдээ | GER GROUP",
  description: "Шилэн фасад, хөнгөн цагаан хийцийн шинэ технологи, төслийн тайлан.",
};

const blogImages = ["/images/blog-1.svg", "/images/blog-2.svg", "/images/blog-3.svg"];

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const client = getStaticApolloClient();

  let posts: Post[] = [];
  try {
      const { data } = await client.query<CpPostsData>({
        query: CP_POSTS,
      variables: { language: locale, status: "published", limit: 12 },
      context: { fetchOptions: { next: { revalidate: 60 } } },
    });
    posts = data?.cpPosts ?? [];
  } catch {
    posts = [];
  }

  return (
    <>
      <section className="bg-background px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">МЭДЭЭ</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
            Мэдлэг хуваалцах
          </h1>
        </div>
      </section>

      <section className="bg-surface px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <article
                  key={post._id}
                  className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.thumbnail?.url || blogImages[index % blogImages.length]}
                      alt={post.title || ""}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-muted">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString("mn-MN")
                          : "—"}
                      </span>
                    </div>
                    <h2 className="mb-3 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                      {post.excerpt || post.content?.replace(/\u003c[^\u003e]*\u003e/g, "").slice(0, 120)}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
                    >
                      Дэлгэрэнгүй
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <EmptyPosts />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function EmptyPosts() {
  const placeholders = [
    "Шилэн фасадны шинэ технологи",
    "Хөнгөн цагаан хийцийн төрөл",
    "Төслийн тайлан",
  ];

  return placeholders.map((title) => (
    <article
      key={title}
      className="rounded-lg border border-border bg-background p-6"
    >
      <h2 className="mb-3 text-lg font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted">{title} талаар удахгүй нийтлэх болно.</p>
    </article>
  ));
}

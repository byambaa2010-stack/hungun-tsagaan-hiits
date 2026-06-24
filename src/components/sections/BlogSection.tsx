"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Calendar } from "lucide-react";
import { Post } from "@/graphql/cms/queries/post";
import { Link } from "@/i18n/routing";
import FadeIn from "@/components/motion/FadeIn";
import StaggerContainer from "@/components/motion/StaggerContainer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { easeOutExpo } from "@/lib/motion";

export default function BlogSection({ posts }: { posts: Post[] }) {
  const t = useTranslations("blog");
  const reduced = useReducedMotion();

  const displayPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="bg-surface px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-elevated"
          >
            {t("allPosts")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>

        <StaggerContainer className="flex flex-col gap-4">
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <motion.article
                key={post._id}
                variants={{
                  hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: easeOutExpo },
                  },
                }}
                className="group flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-background p-6 transition-colors hover:border-accent/30 md:flex-row md:items-center"
              >
                <div className="flex-1">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-1 line-clamp-1 text-sm text-muted">
                    {post.excerpt || post.content?.replace(/\u003c[^\u003e]*\u003e/g, "").slice(0, 120)}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-subtle">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="font-mono">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString("mn-MN")
                      : "—"}
                  </span>
                </div>
              </motion.article>
            ))
          ) : (
            <EmptyBlog t={t} reduced={reduced} />
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}

function EmptyBlog({
  t,
  reduced,
}: {
  t: (key: string) => string;
  reduced: boolean;
}) {
  const placeholders = [
    "Шилэн фасадны шинэ технологи",
    "Хөнгөн цагаан хийцийн төрөл",
    "Төслийн тайлан",
  ];

  return placeholders.map((title, index) => (
    <motion.div
      key={title}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: easeOutExpo, delay: index * 0.05 },
        },
      }}
      className="flex items-center justify-between rounded-lg border border-border bg-background p-6"
    >
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <span className="text-xs text-subtle">2026.06.{15 - index}</span>
    </motion.div>
  ));
}

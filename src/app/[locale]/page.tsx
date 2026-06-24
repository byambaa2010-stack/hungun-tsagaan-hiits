import { getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_PAGES, Page, CpPagesData } from "@/graphql/cms/queries/page";
import { CP_POSTS, Post, CpPostsData } from "@/graphql/cms/queries/post";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import UploadSection from "@/components/sections/UploadSection";

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const client = getStaticApolloClient();

  let pages: Page[] = [];
  let posts: Post[] = [];

  try {
    const [{ data: pagesData }, { data: postsData }] = await Promise.all([
      client.query<CpPagesData>({
        query: CP_PAGES,
        variables: { language: locale },
        context: { fetchOptions: { next: { revalidate: 60 } } },
      }),
      client.query<CpPostsData>({
        query: CP_POSTS,
        variables: { language: locale, status: "published", limit: 3 },
        context: { fetchOptions: { next: { revalidate: 60 } } },
      }),
    ]);
    pages = pagesData?.cpPages ?? [];
    posts = postsData?.cpPosts ?? [];
  } catch {
    pages = [];
    posts = [];
  }

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BlogSection posts={posts} />
      <UploadSection />
    </>
  );
}

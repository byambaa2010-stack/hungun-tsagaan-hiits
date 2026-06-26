import { getStaticApolloClient } from "@/lib/apollo/server-client";
import { CP_POSTS, Post, CpPostsData } from "@/graphql/cms/queries/post";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import UploadSection from "@/components/sections/UploadSection";

export default async function HomePage({
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
      variables: { language: locale, status: "published", limit: 3 },
      context: { fetchOptions: { next: { revalidate: 60 } } },
    });
    posts = data?.cpPosts ?? [];
  } catch {
    posts = [];
  }

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BlogSection posts={posts} />
      <UploadSection />
    </>
  );
}

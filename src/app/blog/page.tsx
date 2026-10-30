import { PageIntro, PageCta } from "@/components/page-parts";
import { BlogIndex } from "@/components/blog-index";
import { posts } from "@/content/posts";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "The ROJ Journal — content creation & studio guides",
  "Practical ideas for planning podcasts, brand photography and creative productions in Lagos. Explore the ROJ Content Hub journal.",
  "/blog/",
);
export default function Blog() {
  return (
    <>
      <PageIntro
        eyebrow="The ROJ journal"
        title="Before the first take."
        accent="A little perspective."
        description="Notes on making things worth seeing and hearing. Explore practical guides to planning, recording and bringing your next idea to life."
      />
      <p className="shell editorial-notice">
        Demo editorial collection · Sample articles for the new ROJ website.
      </p>
      <BlogIndex posts={posts} />
      <PageCta title="Turn a good read into a good brief." />
    </>
  );
}

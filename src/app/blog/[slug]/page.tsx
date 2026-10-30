import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { posts, getPost, readingMinutes } from "@/content/posts";
import { getService } from "@/content/services";
import { ArticleCard, Photo, JsonLd, PageCta } from "@/components/page-parts";
import { pageMetadata, absoluteUrl } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const meta = pageMetadata(
    post.title,
    post.excerpt,
    `/blog/${slug}/`,
    post.image,
    post.demo,
  );
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date },
  };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const service = getService(post.service);
  const url = absoluteUrl(`/blog/${slug}/`);
  return (
    <>
      <article className="journal-article">
        <header className="shell article-header">
          <p className="eyebrow">{post.category} / The ROJ journal</p>
          <h1>{post.title}</h1>
          <p className="page-lead">{post.excerpt}</p>
          <div className="byline">
            <span>ROJ Editorial</span>
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              }).format(new Date(post.date))}
            </time>
            <span>{readingMinutes(post)} min read</span>
            {post.demo && <span className="demo-label">Demo article</span>}
          </div>
        </header>
        <div className="shell">
          <Photo
            className="article-cover"
            src={post.image}
            alt={post.alt}
            priority
          />
        </div>
        <div className="shell article-body-layout">
          <aside className="article-toc">
            <p className="eyebrow">In this story</p>
            <nav aria-label="Article contents">
              {post.sections.map((section, i) => (
                <a key={section.heading} href={`#part-${i + 1}`}>
                  {section.heading}
                </a>
              ))}
            </nav>
            {service && (
              <Link className="text-link" href={`/services/${service.slug}/`}>
                Explore {service.title.toLowerCase()}
                <ArrowUpRight size={16} />
              </Link>
            )}
          </aside>
          <div className="article-body">
            {post.demo && (
              <p className="draft-note">
                This is a demo article prepared for the ROJ website. Editorial
                review is pending.
              </p>
            )}
            {post.sections.map((section, i) => (
              <section id={`part-${i + 1}`} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.checklist && (
                  <ul>
                    {section.checklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <div className="article-end">
              <span>Have a project in mind?</span>
              <Link href="/contact/">
                Let’s talk about it
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </article>
      {!post.demo && url && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: absoluteUrl(post.image),
            datePublished: post.date,
            author: { "@type": "Organization", name: "ROJ Content Hub" },
            publisher: { "@type": "Organization", name: "ROJ Content Hub" },
            mainEntityOfPage: url,
          }}
        />
      )}
      <section className="shell page-section">
        <div className="page-section-heading">
          <h2>Keep the ideas coming.</h2>
          <Link className="text-link" href="/blog/">
            All stories
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="article-grid related-grid">
          {posts
            .filter((item) => item.slug !== slug)
            .map((item) => (
              <ArticleCard key={item.slug} post={item} />
            ))}
        </div>
      </section>
      <PageCta />
    </>
  );
}

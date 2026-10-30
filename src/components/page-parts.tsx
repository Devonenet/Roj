import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EnquiryButton } from "./site-shell";
import { type Post, readingMinutes } from "@/content/posts";

export function PageIntro({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
}) {
  return (
    <section className="page-intro shell">
      <p className="eyebrow">
        <span className="status-dot" />
        {eyebrow}
      </p>
      <h1>
        {title}
        {accent && (
          <>
            <br />
            <span>{accent}</span>
          </>
        )}
      </h1>
      <p className="page-lead">{description}</p>
    </section>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`editorial-photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 760px) 100vw, 66vw"
      />
    </div>
  );
}
export function PageCta({
  title = "What are you thinking?",
  text = "A rough idea is a good place to start. Let’s work out what it could become.",
  service = "Creative project",
}: {
  title?: string;
  text?: string;
  service?: string;
}) {
  return (
    <section className="page-cta shell">
      <div>
        <p className="eyebrow">Let’s make something</p>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <EnquiryButton service={service}>Talk to ROJ</EnquiryButton>
    </section>
  );
}
export function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="article-card">
      <Link
        href={`/blog/${post.slug}/`}
        className="article-photo-link"
        aria-label={`Read ${post.title}`}
      >
        <Photo src={post.image} alt={post.alt} />
        <span className="photo-link-arrow">
          <ArrowUpRight size={23} />
        </span>
      </Link>
      <div className="article-meta">
        <span>{post.category}</span>
        <span>{readingMinutes(post)} min read</span>
      </div>
      <h3>
        <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
      {post.demo && <span className="demo-label">Demo article</span>}
    </article>
  );
}
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

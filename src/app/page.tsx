import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { ArticleCard, PageCta, Photo } from "@/components/page-parts";
import { services } from "@/content/services";
import { posts } from "@/content/posts";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "ROJ Content Hub — Creative production & studio in Lekki, Lagos",
  "Photography, podcast recording, music production, brand films and digital content at ROJ Content Hub in Ikota, Lekki, Lagos.",
  "/",
);
export default function Home() {
  return (
    <>
      <HomeHero />
      <section className="shell page-section home-overview">
        <div>
          <p className="eyebrow">The idea is yours.</p>
          <h2>
            The possibilities
            <br />
            are ours to create.
          </h2>
        </div>
        <div>
          <p className="editorial-copy">
            One creative home for the things you want to put into the world.
            From a first recording to a brand’s next big film, ROJ brings the
            people, space and production together.
          </p>
          <Link className="text-link" href="/about/">
            Meet ROJ
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="shell page-section">
        <div className="page-section-heading">
          <div>
            <p className="eyebrow">Different mediums. The same care.</p>
            <h2>What’s your next move?</h2>
          </div>
          <Link className="text-link" href="/services/">
            Explore all services
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="home-service-grid">
          {services.slice(0, 4).map((service) => (
            <Link
              href={`/services/${service.slug}/`}
              className="home-service"
              key={service.slug}
            >
              <Photo src={service.image} alt={service.alt} />
              <div>
                <h3>{service.title}</h3>
                <ArrowUpRight size={22} />
              </div>
              <p>{service.line}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="shell page-section">
        <div className="page-section-heading">
          <div>
            <p className="eyebrow">The ROJ journal</p>
            <h2>Ideas before action.</h2>
          </div>
          <Link href="/blog/" className="text-link">
            Read the blog
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="article-grid">
          {posts.map((post) => (
            <ArticleCard post={post} key={post.slug} />
          ))}
        </div>
      </section>
      <PageCta />
    </>
  );
}

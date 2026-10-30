import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { services, getService } from "@/content/services";
import { getPost } from "@/content/posts";
import { PageIntro, PageCta, Photo } from "@/components/page-parts";
import { EnquiryButton } from "@/components/site-shell";
import { pageMetadata } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata(
    `${service.title} in Lekki, Lagos`,
    service.description,
    `/services/${slug}/`,
    service.image,
  );
}
export default async function Service({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const article = getPost(service.related);
  return (
    <>
      <PageIntro
        eyebrow={service.title}
        title={service.title}
        accent={service.line}
        description={service.description}
      />
      <section className="shell detail-split">
        <Photo src={service.image} alt={service.alt} priority />
        <div className="detail-copy">
          <p className="eyebrow">Made around your brief</p>
          <h2>Let’s make it yours.</h2>
          <p>{service.introduction}</p>
          <ul className="offering-list">
            {service.offerings.map((item) => (
              <li key={item}>
                <Check size={17} />
                {item}
              </li>
            ))}
          </ul>
          <EnquiryButton service={service.title}>
            Discuss {service.title.toLowerCase()}
          </EnquiryButton>
        </div>
      </section>
      <section className="shell page-section preparation-grid">
        <div>
          <p className="eyebrow">Before we begin</p>
          <h2>Bring a little direction.</h2>
          <p>{service.preparation}</p>
        </div>
        <div>
          <p className="eyebrow">What you take away</p>
          <h2>A clear next step.</h2>
          <p>{service.outcome}</p>
        </div>
      </section>
      {article && (
        <aside className="shell related-note">
          <span className="eyebrow">From the journal · Demo article</span>
          <Link href={`/blog/${article.slug}/`}>
            {article.title}
            <ArrowUpRight size={22} />
          </Link>
        </aside>
      )}
      <PageCta service={service.title} title="Ready when you are." />
      <div className="shell sibling-services">
        <p className="eyebrow">Keep exploring</p>
        {services
          .filter((item) => item.slug !== slug)
          .map((item) => (
            <Link href={`/services/${item.slug}/`} key={item.slug}>
              {item.title}
              <ArrowUpRight size={15} />
            </Link>
          ))}
      </div>
    </>
  );
}

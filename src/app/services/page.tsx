import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { PageIntro, PageCta, Photo } from "@/components/page-parts";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Content creation & production services in Lagos",
  "Explore photography, film, podcasting, music production, branding and digital content services from ROJ Content Hub in Lekki, Lagos.",
  "/services/",
);
export default function Services() {
  return (
    <>
      <PageIntro
        eyebrow="What we do"
        title="Different mediums."
        accent="The same care."
        description="A portrait. A conversation. A film that makes someone feel something. Find the right way to bring your story into the world."
      />
      <section className="shell service-directory">
        {services.map((service, i) => (
          <article key={service.slug} className="directory-row">
            <Link
              href={`/services/${service.slug}/`}
              className="directory-image"
              aria-label={`Explore ${service.title}`}
            >
              <Photo src={service.image} alt={service.alt} />
            </Link>
            <div>
              <span className="tiny-label">
                0{i + 1} / {service.line}
              </span>
              <h2>
                <Link href={`/services/${service.slug}/`}>{service.title}</Link>
              </h2>
              <p>{service.description}</p>
              <Link className="text-link" href={`/services/${service.slug}/`}>
                Explore {service.title.toLowerCase()}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </article>
        ))}
      </section>
      <PageCta
        title="More than one thing in mind?"
        text="We can bring the right services together around your brief. Tell us what the finished work needs to do."
      />
    </>
  );
}

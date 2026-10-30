import { ArrowUpRight } from "lucide-react";
import { PageIntro, PageCta, Photo } from "@/components/page-parts";
import { EnquiryButton } from "@/components/site-shell";
import { INSTAGRAM_URL } from "@/lib/enquiry";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Creative work & project ideas",
  "Explore ROJ’s creative spaces and illustrative production concepts for photography, podcasting and brand films. See current work on Instagram.",
  "/work/",
);
const concepts = [
  {
    title: "A brand, from a different angle.",
    type: "Photography & film",
    image: "roj-courtyard",
    alt: "ROJ courtyard seating beneath a covered roof",
    brief:
      "Introduce a new lifestyle brand through the people, textures and details behind it.",
    approach:
      "A focused portrait session and a short brand film, planned around one visual direction.",
    deliverables:
      "Example scope: a selected image library, a hero film and vertical edits.",
    service: "Brand production",
  },
  {
    title: "Conversations that stay with you.",
    type: "Podcasting",
    image: "roj-podcast-set",
    alt: "ROJ podcast recording set",
    brief:
      "Build an interview series around the real decisions behind a founder’s journey.",
    approach:
      "An intimate host-and-guest format, with an episode outline that makes space for honest stories.",
    deliverables:
      "Example scope: an edited video episode, audio version and short social clips.",
    service: "Podcasting",
  },
  {
    title: "From voice note to first take.",
    type: "Music production",
    image: "roj-studio-keyboard",
    alt: "Keyboard and microphones in the ROJ music studio",
    brief: "Develop an acoustic song idea into a focused studio performance.",
    approach:
      "A session built around the vocal and arrangement, with time to listen back and refine.",
    deliverables:
      "Example scope: agreed recordings and a mix prepared for artist review.",
    service: "Music production",
  },
];
export default function Work() {
  return (
    <>
      <PageIntro
        eyebrow="Work & possibilities"
        title="Different stories."
        accent="One creative pulse."
        description="A look inside our spaces, and a few ways an idea could take shape. The concepts below are demo briefs, illustrated with real photographs of ROJ."
      />
      <div className="shell work-disclosure">
        <p>Demo concepts — not completed client projects or results.</p>
        <a
          className="text-link"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          See current work on Instagram
          <ArrowUpRight size={18} />
        </a>
      </div>
      <section className="shell concept-list">
        {concepts.map((concept) => (
          <article className="concept-project" key={concept.title}>
            <Photo
              src={`/Asset/images/${concept.image}.webp`}
              alt={concept.alt}
            />
            <div>
              <p className="eyebrow">{concept.type} / Demo concept</p>
              <h2>{concept.title}</h2>
              <dl>
                <dt>The brief</dt>
                <dd>{concept.brief}</dd>
                <dt>The direction</dt>
                <dd>{concept.approach}</dd>
                <dt>The possibilities</dt>
                <dd>{concept.deliverables}</dd>
              </dl>
              <EnquiryButton className="text-link" service={concept.service}>
                Make something like this
              </EnquiryButton>
            </div>
          </article>
        ))}
      </section>
      <PageCta title="Your story comes next." />
    </>
  );
}

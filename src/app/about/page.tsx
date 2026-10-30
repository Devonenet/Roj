import { AudienceStories } from "@/components/audience-stories";
import { PageIntro, PageCta, Photo } from "@/components/page-parts";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "About ROJ — a creative home in Lagos",
  "Meet ROJ Content Hub, a creative production company supporting creators, businesses and brands from Ikota Villa, Lekki, Lagos.",
  "/about/",
);
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="About ROJ"
        title="Good ideas deserve"
        accent="a place to happen."
        description="We’re a creative content and digital media company in Ikota, Lekki. We help creators and brands turn what they have in mind into work people can see, hear and connect with."
      />
      <div className="shell">
        <Photo
          className="wide-photo"
          priority
          src="/Asset/images/roj-courtyard.webp"
          alt="ROJ courtyard, with plants and black-and-white seating"
        />
        <p className="image-caption">
          A different perspective starts here. Our courtyard in Ikota.
        </p>
      </div>
      <section className="shell page-section">
        <AudienceStories />
      </section>
      <section className="shell page-section">
        <div className="page-section-heading">
          <div>
            <p className="eyebrow">How we work</p>
            <h2>Clear from the start.</h2>
          </div>
          <p>
            One shared direction.
            <br />
            Room for better ideas.
          </p>
        </div>
        <div className="process-grid">
          {[
            {
              title: "Tell us the idea.",
              text: "A voice note, a moodboard or a full brief. We start with your goal, your audience and what you need to make.",
            },
            {
              title: "Make a plan.",
              text: "We agree the creative direction, scope, cost, timeline and usage rights. Everyone knows what we’re making before we begin.",
            },
            {
              title: "Bring it to life.",
              text: "Shoot. Record. Refine. We work with you from the first take to the finished files, ready for their next stage.",
            },
          ].map((step, i) => (
            <article className="process-step" key={step.title}>
              <div className="process-step-top">
                <span>0{i + 1}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
      <PageCta title="Your idea belongs here." />
    </>
  );
}

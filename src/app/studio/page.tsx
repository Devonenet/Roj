import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageCta, Photo } from "@/components/page-parts";
import { StudioShowcase } from "@/components/studio-showcase";
import { Faq } from "@/components/faq";
import { EnquiryButton } from "@/components/site-shell";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "ROJ studio in Ikota, Lekki",
  "Explore ROJ’s creative spaces for podcast recording, music production, photography and film in Ikota Villa, Lekki, Lagos.",
  "/studio/",
  "/Asset/images/roj-studio-wide.webp",
);
export default function Studio() {
  return (
    <>
      <StudioShowcase />
      <section className="shell page-section home-overview" id="studio-spaces">
        <div>
          <p className="eyebrow">Space to focus</p>
          <h2>
            Less running around.
            <br />
            More creating.
          </h2>
        </div>
        <div>
          <p className="editorial-copy">
            A creative home in Ikota Villa for your next session, conversation
            or shoot. Tell us your format, guest count and production needs so
            we can confirm the right space and setup.
          </p>
          <EnquiryButton service="Studio session">
            Book your session
          </EnquiryButton>
        </div>
      </section>
      <section className="shell studio-gallery">
        <article>
          <Photo
            src="/Asset/images/roj-podcast-set.webp"
            alt="ROJ podcast recording set"
          />
          <div>
            <p className="eyebrow">The conversation space</p>
            <h2>
              Good stories start
              <br />
              with listening.
            </h2>
            <p>
              Bring your guest and a point of view. Discuss an audio or video
              recording session with the team.
            </p>
            <Link className="text-link" href="/services/podcasting/">
              Explore podcasting
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </article>
        <article>
          <Photo
            src="/Asset/images/roj-studio-keyboard.webp"
            alt="Keyboard and recording microphones at ROJ"
          />
          <div>
            <p className="eyebrow">The music space</p>
            <h2>
              Make room
              <br />
              for your sound.
            </h2>
            <p>
              From a first demo to a focused recording session. Share the sound
              you are working towards.
            </p>
            <Link className="text-link" href="/services/music-production/">
              Explore music production
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </article>
      </section>
      <section className="shell page-section detail-split">
        <Photo
          src="/Asset/images/roj-courtyard.webp"
          alt="Seating and plants in the ROJ courtyard"
        />
        <div className="detail-copy">
          <p className="eyebrow">A little breathing room</p>
          <h2>Change the scene.</h2>
          <p>
            Our courtyard brings another setting to the creative space. Discuss
            whether it suits your shoot, session or production brief when you
            enquire.
          </p>
          <Link href="/contact/#location" className="text-link">
            Find us in Ikota
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <Faq />
      <PageCta
        service="Studio session"
        title="Bring the idea. We’ll make room."
        text="Share your preferred date, what you want to create and who is coming. We’ll confirm availability, scope and cost with you."
      />
    </>
  );
}

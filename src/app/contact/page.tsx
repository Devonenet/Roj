import { ArrowUpRight, MessageCircle, Phone, Camera } from "lucide-react";
import { PageIntro, Photo } from "@/components/page-parts";
import { EnquiryButton } from "@/components/site-shell";
import { LocationMap } from "@/components/location-map";
import { Faq } from "@/components/faq";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/lib/enquiry";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Contact ROJ & find our studio in Ikota",
  "Visit ROJ Content Hub at House 16B, Road 13, Ikota Villa, Lekki, Lagos. Get Google Maps directions or contact us on WhatsApp about your project.",
  "/contact/",
);
export default function Contact() {
  return (
    <>
      <PageIntro
        eyebrow="Get in touch"
        title="Less “one day.”"
        accent="More “let’s make it.”"
        description="A full brief or a half-formed idea. Tell us what you have in mind, and we’ll help you find a sensible next step."
      />
      <section className="shell contact-directory">
        <div>
          <p className="eyebrow">Start the conversation</p>
          <h2>We’re listening.</h2>
          <p>
            Share your idea, preferred dates and the deliverables you need.
            We’ll discuss scope, availability and cost before any booking is
            confirmed.
          </p>
          <EnquiryButton>Send a project brief</EnquiryButton>
          <div className="contact-methods">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} />
              <span>
                <small>WhatsApp</small>+234 706 281 9883
              </span>
              <ArrowUpRight size={20} />
            </a>
            <a href="tel:+2347062819883">
              <Phone size={20} />
              <span>
                <small>Call ROJ</small>+234 706 281 9883
              </span>
              <ArrowUpRight size={20} />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Camera size={20} />
              <span>
                <small>Instagram</small>@rojcontenthub
              </span>
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
        <Photo
          src="/Asset/images/roj-courtyard-detail.webp"
          alt="ROJ courtyard and covered seating area"
          priority
        />
      </section>
      <LocationMap />
      <Faq />
    </>
  );
}

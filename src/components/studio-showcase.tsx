import { ArrowDown } from "lucide-react";
import {
  AnimatedGallery,
  type GalleryImage,
} from "@/components/ui/animated-gallery";
import { EnquiryButton } from "@/components/site-shell";

const studioImages: GalleryImage[][] = [
  [
    {
      src: "/Asset/images/roj-studio-stage.webp",
      alt: "Microphones set in front of acoustic panels at ROJ",
      caption: "Make room for your sound",
      position: "center 65%",
    },
    {
      src: "/Asset/images/roj-courtyard-detail.webp",
      alt: "Plants and seating beneath the covered ROJ courtyard",
      caption: "Between takes",
    },
  ],
  [
    {
      src: "/Asset/images/roj-podcast-set.webp",
      alt: "Armchairs, table, camera and softbox in the ROJ podcast set",
      caption: "Conversations worth recording",
      position: "center 75%",
    },
    {
      src: "/Asset/images/roj-studio-keyboard.webp",
      alt: "Keyboard and microphones inside the ROJ music studio",
      caption: "Find your next sound",
      position: "center 65%",
    },
  ],
  [
    {
      src: "/Asset/images/roj-courtyard.webp",
      alt: "Wide view of ROJ’s covered courtyard and seating",
      caption: "A fresh perspective",
      position: "center 65%",
    },
    {
      src: "/Asset/images/roj-studio-wide.webp",
      alt: "ROJ’s recording room with acoustic panels, microphones and lighting",
      caption: "Space to bring it together",
      position: "center 70%",
    },
  ],
];

export function StudioShowcase() {
  return (
    <section className="studio-showcase" aria-labelledby="studio-title">
      <div className="studio-showcase-intro shell">
        <p className="eyebrow">
          <span className="status-dot" /> RojHub · Ikota, Lagos
        </p>
        <h1 id="studio-title">
          Your idea.
          <br />
          <span>Our space. Let’s create.</span>
        </h1>
        <p className="page-lead">
          A conversation, a new sound, a different perspective. Find room for it
          at ROJ — with podcast, music and production spaces under one roof.
        </p>
        <div className="studio-showcase-actions">
          <EnquiryButton service="Studio session">
            Book your session
          </EnquiryButton>
          <a className="text-link" href="#studio-spaces">
            Explore the spaces <ArrowDown size={18} />
          </a>
        </div>
      </div>
      <div className="shell studio-showcase-gallery">
        <AnimatedGallery columns={studioImages} />
        <div className="studio-gallery-note">
          <span>A look inside ROJ.</span>
          <span>Your next session starts here.</span>
        </div>
      </div>
    </section>
  );
}

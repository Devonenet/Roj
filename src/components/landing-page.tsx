"use client";

import Image from "next/image";
import { useHeroMotion } from "@/components/use-hero-motion";
import { HardwareStack } from "@/components/hardware-stack";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Camera,
  Check,
  Clapperboard,
  Menu,
  MessageCircle,
  Mic2,
  Plus,
  X,
} from "lucide-react";

import {
  createEnquiryUrl,
  WHATSAPP_URL as whatsapp,
  INSTAGRAM_URL as instagram,
} from "@/lib/enquiry";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    title: "Photography",
    category: "Make an impression.",
    description:
      "Portraits with personality. Products with presence. Images that make people stop and take a second look.",
    detail: "Portraits · Products · Brand photography",
    icon: Camera,
    image: "/images/camera-detail.jpg",
  },
  {
    title: "Film & video",
    category: "Make them feel it.",
    description:
      "From your first concept to the final cut. Brand films, commercials and content with a story worth staying for.",
    detail: "Brand films · TV commercials · Creative shoots",
    icon: Clapperboard,
    image: "/Asset/images/roj-courtyard-detail.webp",
  },
  {
    title: "Podcasting",
    category: "Make yourself heard.",
    description:
      "Bring the conversation. We bring the recording setup and production support to help your voice come through clearly.",
    detail: "Audio & video podcasts · Recording · Editing",
    icon: Mic2,
    image: "/Asset/images/roj-podcast-set.webp",
  },
  {
    title: "Music production",
    category: "Make your sound.",
    description:
      "A space to turn the melody in your head into something people can put on repeat. Create, record and refine with us.",
    detail: "Recording · Production · Mixing",
    icon: AudioLines,
    image: "/Asset/images/roj-studio-keyboard.webp",
  },
];
const faq = [
  {
    question: "Can I book a session without a fully formed idea?",
    answer:
      "Absolutely. Tell us what you want to create, who it is for and where you plan to share it. We can help shape the direction and agree the right scope before your session.",
  },
  {
    question: "Do you work with both individuals and businesses?",
    answer:
      "Yes. RojHub is a creative home for photographers, podcasters, musicians and individual creators. ROJ also produces television commercials and brand films for businesses and corporate teams.",
  },
  {
    question: "How much does a project or session cost?",
    answer:
      "The quote depends on the service, production needs and final deliverables. Send us a short brief on WhatsApp and we will agree the scope and cost with you before work starts.",
  },
  {
    question: "Who owns the finished content?",
    answer:
      "Usage rights are agreed in writing before production. Tell us where the work will appear, how long you plan to use it and any other licensing needs, so these can be included in your project agreement.",
  },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#home"
      aria-label="ROJ Content Hub home"
    >
      <Image
        src="/brand/roj-logo.png"
        alt="ROJ"
        width={1162}
        height={580}
        priority={!footer}
      />
      <span>
        CONTENT
        <br />
        HUB
      </span>
    </a>
  );
}

export default function LandingPage() {
  const root = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  useHeroMotion(hero);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [activeService, setActiveService] = useState(0);
  const [projectType, setProjectType] = useState("Studio session");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          if (!context.conditions?.motion) return;
          gsap.from(".hero-media", {
            clipPath: "inset(12% 4% 12% 4% round 8px)",
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".hero-media",
              start: "top 95%",
              once: true,
            },
          });
          gsap.to(".marquee-track", {
            xPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: ".marquee",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
          gsap.fromTo(
            ".reveal-word",
            { opacity: 0.22 },
            {
              opacity: 1,
              stagger: 0.14,
              ease: "none",
              scrollTrigger: {
                trigger: ".manifesto",
                start: "top 78%",
                end: "bottom 50%",
                scrub: 0.6,
              },
            },
          );
          gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
            gsap.from(element, {
              y: 24,
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
            });
          });
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  function startProject(type = "Studio session") {
    opener.current = document.activeElement as HTMLElement;
    setProjectType(type);
    setFormError("");
    setMenuOpen(false);
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function closeDialog() {
    dialog.current?.close();
  }

  function restoreFocus() {
    document.body.style.overflow = "";
    opener.current?.focus();
  }

  function sendBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const url = createEnquiryUrl({
        name: String(form.get("name") ?? ""),
        service: projectType,
        idea: String(form.get("idea") ?? ""),
      });
      setFormError("");
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Please check your details and try again.",
      );
    }
  }

  return (
    <div ref={root}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner shell">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#studio">The studio</a>
            <a href="#services">What we do</a>
            <a href="#work">Our work</a>
          </nav>
          <div className="header-actions">
            <button
              className="button button-dark nav-cta"
              onClick={() => startProject("Creative project")}
            >
              Let’s create <ArrowUpRight size={16} />
            </button>
            <button
              className="menu-button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ["The studio", "studio"],
              ["What we do", "services"],
              ["Our work", "work"],
              ["Get in touch", "contact"],
            ].map(([title, target]) => (
              <a
                key={target}
                href={`#${target}`}
                onClick={() => setMenuOpen(false)}
              >
                {title}
                <ArrowUpRight size={20} />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main id="main-content" className="w-full max-w-full overflow-x-hidden">
        <section className="hero shell" id="home" aria-labelledby="hero-title">
          <div className="hero-stage" ref={hero}>
            <div className="hero-intro">
              <p className="eyebrow hero-meta">
                <span className="status-dot" /> Independent production · Lagos
              </p>
              <h1 id="hero-title" className="max-w-6xl">
                <span className="hero-line">
                  <span>Make work that</span>
                </span>
                <span className="hero-line">
                  <span>moves culture.</span>
                </span>
              </h1>
              <p className="hero-description">
                Films, images and spaces for ideas that deserve to be seen
                properly.
              </p>
              <div className="hero-buttons">
                <span className="hero-primary-control">
                  <button
                    className="button button-orange"
                    onClick={() => startProject("Brand production")}
                  >
                    Brief a production <ArrowUpRight size={18} />
                  </button>
                </span>
                <a className="button button-outline" href="#work">
                  Explore our work <ArrowDownRight size={18} />
                </a>
              </div>
              <p className="hero-location">
                Made in Ikota. Ready for everywhere.
              </p>
            </div>
            <div className="hero-visual">
              <div className="hardware-entrance">
                <HardwareStack />
              </div>
              <button
                className="studio-invite"
                onClick={() => startProject("Studio session")}
              >
                <span>
                  <span className="tiny-label">YOUR SPACE TO CREATE</span>
                  <strong>Book the studio</strong>
                </span>
                <ArrowUpRight size={24} />
              </button>
            </div>
          </div>
          <a
            className="hero-media"
            href="#studio"
            aria-label="Explore the creative studio"
          >
            <Image
              className="hero-photo"
              src="/Asset/images/roj-studio-stage.webp"
              alt="ROJ music studio with microphones, a keyboard and acoustic panels"
              style={{ objectPosition: "center 45%" }}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 92vw"
            />
            <div className="media-shade" />
            <span className="viewfinder top-left" />
            <span className="viewfinder top-right" />
            <div className="hero-media-top">
              <span>
                <span className="record-dot" /> ROOM FOR YOUR NEXT BIG THING
              </span>
              <span>LAGOS, NG</span>
            </div>
            <div className="hero-media-bottom">
              <p>
                One roof.
                <br />
                <span>Endless possibilities.</span>
              </p>
              <span className="round-arrow">
                <ArrowDownRight size={30} strokeWidth={1.5} />
              </span>
            </div>
          </a>
          <div className="hero-footnote">
            <span>Independent thinking. Full-service creating.</span>
            <a href="#services">
              Explore the possibilities <ArrowDown size={13} />
            </a>
          </div>
        </section>

        <section id="studio" className="studio-section section-space shell">
          <div className="section-topline">
            <span className="eyebrow">Ideas come here to become real.</span>
            <span className="tiny-label">THE ROJ WAY</span>
          </div>
          <h2
            className="manifesto"
            aria-label="The idea is yours. The possibilities are ours to create."
          >
            {"The idea is yours. "
              .split(" ")
              .filter(Boolean)
              .map((word, i) => (
                <span className="reveal-word" key={`a${i}`}>
                  {word}{" "}
                </span>
              ))}
            <span className="inline-image">
              <Image
                src="/images/camera-detail.jpg"
                alt=""
                fill
                sizes="110px"
              />
            </span>
            {" The possibilities are ours to create."
              .split(" ")
              .filter(Boolean)
              .map((word, i) => (
                <span className="reveal-word" key={`b${i}`}>
                  {" "}
                  {word}
                </span>
              ))}
          </h2>
          <div className="studio-story">
            <div className="studio-heading">
              <span className="orange-mark" aria-hidden="true">
                ↗
              </span>
              <h3>
                A little less running around.
                <br />A lot more creating.
              </h3>
              <p>
                Photography. Film. Podcasts. Music.
                <br />
                One creative home in Ikota Villa.
              </p>
              <a className="text-link" href="#services">
                Find your thing <ArrowDownRight size={18} />
              </a>
            </div>
            <div className="audience-stories">
              <article className="audience-card reveal">
                <p className="eyebrow">For the creators</p>
                <h3>
                  Your idea was good.
                  <br />
                  They scrolled past anyway.
                </h3>
                <p>
                  Three days on one video. A borrowed light, a room that echoes,
                  audio that makes your voice sound far away. You post it and
                  wait.
                </p>
                <p>
                  Nothing was wrong with the idea. Somewhere between your head
                  and the screen, the quality leaked out.
                </p>
                <p>
                  RojHub closes that gap. Arrive with your idea and create with
                  photography, podcast recording, music production and film
                  support under one roof. Less chasing equipment. More making
                  work you’re proud to put your name on.
                </p>
                <button className="text-link" onClick={() => startProject()}>
                  Book your session <ArrowUpRight size={20} />
                </button>
              </article>
              <article className="audience-card brand-story reveal">
                <p className="eyebrow">For brands & corporates</p>
                <h3>
                  The airtime is booked.
                  <br />
                  Is the ad ready to earn it?
                </h3>
                <p>
                  Budget approved. Media bought. Launch date announced. You need
                  a production team that can take the brief all the way.
                </p>
                <p>
                  ROJ produces television commercials and brand films from first
                  concept to final delivery, with one team answerable for the
                  whole job.
                </p>
                <p>
                  Scope, cost and usage rights are agreed in writing before the
                  camera rolls. So the only surprises on set are creative ones.
                </p>
                <button
                  className="text-link"
                  onClick={() => startProject("Brand production")}
                >
                  Brief ROJ <ArrowUpRight size={20} />
                </button>
              </article>
            </div>
          </div>
        </section>

        <section id="services" className="services-section section-space">
          <div className="shell">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">Different mediums. The same care.</p>
                <h2>
                  What’s your
                  <br />
                  <span className="muted">next move?</span>
                </h2>
              </div>
              <p>
                From the first frame to the final mix.
                <br />
                Find the right space for your story.
              </p>
            </div>
            <div className="service-grid">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <article
                    className={`service-panel ${i === activeService ? "is-active" : ""}`}
                    key={service.title}
                  >
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 100vw, 40vw"
                    />
                    <div className="service-overlay" />
                    <button
                      className="service-toggle"
                      aria-expanded={i === activeService}
                      aria-controls={`service-${i}`}
                      onClick={() =>
                        setActiveService(activeService === i ? -1 : i)
                      }
                    >
                      <Icon size={27} strokeWidth={1.3} />
                      <span className="service-number">0{i + 1}</span>
                      <span className="service-title">{service.title}</span>
                      <span className="service-expand" aria-hidden="true">
                        {i === activeService ? (
                          <ArrowUpRight size={24} />
                        ) : (
                          <Plus size={24} />
                        )}
                      </span>
                    </button>
                    <div
                      id={`service-${i}`}
                      className="service-detail"
                      hidden={i !== activeService}
                    >
                      <p>{service.description}</p>
                      <button
                        className="service-enquire"
                        onClick={() => startProject(service.title)}
                      >
                        Let’s make it happen <ArrowRight size={16} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="service-bottom">
              <span>Need the whole picture?</span>
              <p>
                Branding, social media management and digital marketing bring
                your content to the people who matter.
              </p>
              <button
                className="text-link"
                onClick={() => startProject("Content & digital strategy")}
              >
                Let’s talk strategy <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </section>

        <section id="work" className="work-section section-space shell">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Made to be seen. And heard.</p>
              <h2>
                Different stories.
                <br />
                One creative pulse.
              </h2>
            </div>
            <a
              className="text-link"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inside ROJ on Instagram <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="work-grid">
            <a
              className="work-item work-large reveal"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="work-image">
                <Image
                  src="/Asset/images/roj-courtyard.webp"
                  alt="ROJ courtyard with a covered roof, potted plants and black-and-white seating"
                  fill
                  sizes="(max-width: 700px) 100vw, 58vw"
                />
                <span className="work-image-label">
                  A different perspective.
                </span>
                <span className="work-arrow">
                  <ArrowUpRight size={26} />
                </span>
              </div>
              <div className="work-caption">
                <h3>Stories worth stopping for</h3>
                <span>Photography & film</span>
              </div>
            </a>
            <a
              className="work-item work-small reveal"
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="work-image">
                <Image
                  src="/Asset/images/roj-studio-keyboard.webp"
                  alt="Microphones and keyboard inside the ROJ music studio"
                  style={{ objectPosition: "center 60%" }}
                  fill
                  sizes="(max-width: 700px) 100vw, 36vw"
                />
                <span className="work-image-label">Turn the volume up.</span>
                <span className="work-arrow">
                  <ArrowUpRight size={26} />
                </span>
              </div>
              <div className="work-caption">
                <h3>Find your frequency</h3>
                <span>Podcasts & music</span>
              </div>
            </a>
          </div>
          <p className="reference-note">
            A look inside our creative spaces. Explore our latest work on
            Instagram.
          </p>
        </section>

        <div className="marquee" aria-label="Bring your idea. Make it real.">
          <div className="marquee-track" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>
                BRING YOUR IDEA <span className="marquee-star">✳</span> MAKE IT
                REAL <span className="marquee-star">✳</span>
              </span>
            ))}
          </div>
        </div>

        <section className="process-section section-space shell">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">Less back-and-forth. More forward.</p>
              <h2>
                From “what if”
                <br />
                to “that’s the one.”
              </h2>
            </div>
            <p>
              A clear process. A shared direction.
              <br />
              Good work follows.
            </p>
          </div>
          <div className="process-grid">
            {[
              {
                title: "Tell us the idea.",
                text: "A voice note, a moodboard, a full brief. Start where you are. We’ll talk through the goal, audience and what you need to make.",
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
              <article className="process-step reveal" key={step.title}>
                <div className="process-step-top">
                  <span>0{i + 1}</span>
                  <ArrowUpRight size={24} strokeWidth={1.4} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section shell">
          <div>
            <p className="eyebrow">Before we hit record</p>
            <h2>
              A few things
              <br />
              you might ask.
            </h2>
            <a
              className="text-link"
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask us something else <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="faq-list">
            {faq.map((item, i) => (
              <div
                className={`faq-item ${openFaq === i ? "is-open" : ""}`}
                key={item.question}
              >
                <h3>
                  <button
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {item.question}
                    <Plus className="faq-icon" size={20} />
                  </button>
                </h3>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  hidden={openFaq !== i}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="shell">
            <div className="contact-top">
              <p className="eyebrow">
                <span className="status-dot" /> Your next chapter starts here.
              </p>
              <span className="tiny-label">IKOTA VILLA · LEKKI · LAGOS</span>
            </div>
            <h2>
              Less “one day.”
              <br />
              More <span>“let’s make it.”</span>
            </h2>
            <div className="contact-bottom">
              <p>
                The idea in your notes app deserves a little more.
                <br />
                Let’s give it a place to happen.
              </p>
              <button
                className="button button-dark"
                onClick={() => startProject("Creative project")}
              >
                Start a conversation <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer shell">
        <div className="footer-top">
          <Brand footer />
          <p>
            A creative home for people
            <br />
            with something to say.
          </p>
          <div className="footer-links">
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <Camera size={17} />
              Instagram
              <ArrowUpRight size={14} />
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17} />
              WhatsApp
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ROJ Content Hub.</span>
          <span>Made for ideas. Based in Lagos.</span>
          <a href="#home">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>

      <dialog
        ref={dialog}
        className="enquiry-dialog"
        onClose={restoreFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        aria-labelledby="enquiry-title"
      >
        <div className="dialog-content">
          <button
            className="dialog-close"
            aria-label="Close enquiry"
            onClick={closeDialog}
          >
            <X size={23} />
          </button>
          <p className="eyebrow">A good place to start</p>
          <h2 id="enquiry-title">
            What are we
            <br />
            creating?
          </h2>
          <p className="dialog-intro">
            Give us a little context. We’ll take the conversation to WhatsApp.
          </p>
          <form onSubmit={sendBrief}>
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                placeholder="What should we call you?"
                required
                maxLength={100}
              />
            </label>
            <label>
              I’m interested in
              <select
                name="service"
                value={projectType}
                onChange={(event) => setProjectType(event.target.value)}
              >
                {Array.from(
                  new Set([
                    projectType,
                    "Studio session",
                    "Photography",
                    "Film & video",
                    "Podcasting",
                    "Music production",
                    "Brand production",
                    "Content & digital strategy",
                    "Creative project",
                  ]),
                ).map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label>
              A little about your idea
              <textarea
                name="idea"
                placeholder="What do you want to make? Any dates or deliverables in mind?"
                required
                maxLength={2000}
                rows={4}
              />
            </label>
            {formError && (
              <p className="form-error" role="alert">
                {formError}
              </p>
            )}
            <button className="button button-orange" type="submit">
              Continue on WhatsApp <ArrowUpRight size={19} />
            </button>
            <p className="form-note">
              <Check size={14} />
              You review and send the message in WhatsApp. No booking or payment
              is made here.
            </p>
          </form>
        </div>
      </dialog>
    </div>
  );
}

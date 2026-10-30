"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowUpRight,
  Camera,
  Check,
  Menu,
  MessageCircle,
  X,
  House,
  Users,
  Layers3,
  AudioLines,
  Clapperboard,
  BookOpen,
} from "lucide-react";
import { LiquidNavbar, type LiquidNavItem } from "./ui/liquid-glass-navbar";
import {
  createEnquiryUrl,
  WHATSAPP_URL as whatsapp,
  INSTAGRAM_URL as instagram,
} from "@/lib/enquiry";
const EnquiryContext = createContext<(service?: string) => void>(() => {});
export const useEnquiry = () => useContext(EnquiryContext);
const navigation = [
  ["About", "/about/"],
  ["Services", "/services/"],
  ["Studio", "/studio/"],
  ["Work", "/work/"],
  ["Blog", "/blog/"],
  ["Contact", "/contact/"],
];
const navIcons = [
  Users,
  Layers3,
  AudioLines,
  Clapperboard,
  BookOpen,
  MessageCircle,
];
const liquidItems: LiquidNavItem[] = [
  { label: "Home", href: "/", icon: <House size={16} />, fx: "glow" },
  ...navigation.map(([label, href], index) => {
    const Icon = navIcons[index];
    return { label, href, icon: <Icon size={16} />, fx: "pop" as const };
  }),
];
function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="/"
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
    </Link>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [projectType, setProjectType] = useState("Studio session");
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
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

  const active = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.replace(/\/$/, "").startsWith(href.replace(/\/$/, ""));
  return (
    <EnquiryContext.Provider value={startProject}>
      <div id="top">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header">
          <div className="header-inner shell">
            <Brand />
            <div className="liquid-nav-desktop">
              <LiquidNavbar
                items={liquidItems}
                active={liquidItems.findIndex((item) => active(item.href!))}
                tone="dark"
                compact={false}
                className="roj-liquid-nav"
              />
            </div>
            <div className="header-actions">
              <button
                className="button button-dark nav-cta"
                onClick={() => startProject("Creative project")}
              >
                Let’s create <ArrowUpRight size={16} />
              </button>
              <button
                ref={menuButton}
                className="menu-button glass-menu-button"
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
              className="mobile-nav glass-mobile-nav"
              aria-label="Mobile navigation"
            >
              {liquidItems.map(({ label, href, icon }) => (
                <Link
                  key={href}
                  href={href!}
                  aria-current={active(href!) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="glass-mobile-label">
                    {icon}
                    {label}
                  </span>
                  <ArrowUpRight size={20} />
                </Link>
              ))}
            </nav>
          )}
        </header>
        <main id="main-content" tabIndex={-1} className="site-main">
          {children}
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
          <nav className="footer-page-links" aria-label="Footer navigation">
            {[["Home", "/"], ...navigation].map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} ROJ Content Hub.</span>
            <span>Made for ideas. Based in Lagos.</span>
            <a href="#top">
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
                You review and send the message in WhatsApp. No booking or
                payment is made here.
              </p>
            </form>
          </div>
        </dialog>
      </div>
    </EnquiryContext.Provider>
  );
}
export function EnquiryButton({
  children,
  service = "Creative project",
  className = "button button-orange",
}: {
  children: ReactNode;
  service?: string;
  className?: string;
}) {
  const startProject = useEnquiry();
  return (
    <button className={className} onClick={() => startProject(service)}>
      {children}
      <ArrowUpRight size={18} />
    </button>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { HardwareStack } from "./hardware-stack";
import { useHeroMotion } from "./use-hero-motion";
import { useEnquiry } from "./site-shell";
export function HomeHero() {
  const hero = useRef<HTMLDivElement>(null);
  useHeroMotion(hero);
  const startProject = useEnquiry();
  return (
    <>
      {" "}
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
              <Link className="button button-outline" href="/work/">
                Explore our work <ArrowDownRight size={18} />
              </Link>
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
        <Link
          className="hero-media"
          href="/studio/"
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
        </Link>
        <div className="hero-footnote">
          <span>Independent thinking. Full-service creating.</span>
          <Link href="/services/">
            Explore the possibilities <ArrowDown size={13} />
          </Link>
        </div>
      </section>
    </>
  );
}

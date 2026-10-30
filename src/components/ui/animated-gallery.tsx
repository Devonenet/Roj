"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  position?: string;
};

/** The reference gallery's perspective and column parallax, using our shared GSAP runtime. */
export function AnimatedGallery({ columns }: { columns: GalleryImage[][] }) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = container.current;
      if (!root) return;
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 761px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)",
        () => {
          const grid = root.querySelector(".animated-gallery-grid");
          const cols = root.querySelectorAll(".animated-gallery-column");
          // Each transform has one owner; media reverts also remove inline transforms.
          gsap.fromTo(
            grid,
            { rotationX: 55, scale: 0.9 },
            {
              rotationX: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top 85%",
                end: "top 80px",
                scrub: 0.65,
                invalidateOnRefresh: true,
              },
            },
          );
          cols.forEach((col, index) => {
            gsap.fromTo(
              col,
              { yPercent: index === 1 ? -6 : 6 },
              {
                yPercent: index === 1 ? 6 : -6,
                ease: "none",
                scrollTrigger: {
                  trigger: root,
                  start: "top 80px",
                  end: "bottom bottom",
                  scrub: 0.7,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        },
      );
      return () => media.revert();
    },
    { scope: container },
  );

  return (
    <div className="animated-gallery-scroll" ref={container}>
      <div className="animated-gallery-sticky">
        <div className="animated-gallery-grid">
          {columns.map((images, column) => (
            <div className="animated-gallery-column" key={column}>
              {images.map((image, row) => (
                <figure className="animated-gallery-photo" key={image.src}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 760px) 50vw, 33vw"
                    priority={row === 0}
                    style={{ objectPosition: image.position ?? "center" }}
                  />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

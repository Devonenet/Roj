"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Separate transform owners keep entrance, scroll and pointer motion composable. */
export function useHeroMotion(hero: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const stage = hero.current;
      if (!stage) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const entrance =
          stage.querySelector<HTMLElement>(".hardware-entrance")!;
        const scene = stage.querySelector<HTMLElement>(".hardware-scene")!;
        const scroll = stage.querySelector<HTMLElement>(".hardware-scroll")!;

        gsap.from(stage.querySelectorAll(".hero-line > span"), {
          yPercent: 100,
          duration: 0.8,
          stagger: 0.08,
          ease: "power4.out",
        });
        gsap.from(stage.querySelectorAll(".hero-intro > :not(h1)"), {
          y: 10,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power3.out",
        });
        // Fade outside the perspective scene to retain depth between its faces.
        gsap.from(entrance, {
          opacity: 0,
          y: 22,
          scale: 0.96,
          duration: 0.95,
          ease: "power3.out",
        });
        gsap.from(scene, {
          rotationY: -5,
          rotationX: 3,
          duration: 0.95,
          ease: "power3.out",
        });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scene,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(scroll, { y: -24, scale: 0.94, rotationX: -5, rotationZ: 5 }, 0)
          .to(stage.querySelector(".hardware-cap"), { z: 180, y: -8 }, 0)
          .to(stage.querySelector(".module-back"), { z: 80 }, 0)
          .to(stage.querySelector(".module-left"), { z: 82, x: -8 }, 0)
          .to(stage.querySelector(".module-right"), { z: 86, x: 8 }, 0);
      });

      media.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const pointer =
            stage.querySelector<HTMLElement>(".hardware-pointer")!;
          const scene = stage.querySelector<HTMLElement>(".hardware-scene")!;
          const control = stage.querySelector<HTMLElement>(
            ".hero-primary-control",
          )!;
          const button = control.querySelector("button")!;
          const tiltX = gsap.quickTo(pointer, "rotationX", {
            duration: 0.65,
            ease: "power3.out",
          });
          const tiltY = gsap.quickTo(pointer, "rotationY", {
            duration: 0.65,
            ease: "power3.out",
          });
          const magnetX = gsap.quickTo(control, "x", {
            duration: 0.35,
            ease: "power3.out",
          });
          const magnetY = gsap.quickTo(control, "y", {
            duration: 0.35,
            ease: "power3.out",
          });
          let bounds: DOMRect | null = null;
          let buttonBounds: DOMRect | null = null;
          let visible = true;
          const reset = () => {
            tiltX(0);
            tiltY(0);
            magnetX(0);
            magnetY(0);
          };
          const invalidate = () => {
            bounds = null;
            buttonBounds = null;
          };
          const move = (event: PointerEvent) => {
            if (!visible || event.pointerType !== "mouse") return;
            // Read only on entry or after geometry changes, never every animation frame.
            bounds ??= stage.getBoundingClientRect();
            const x = gsap.utils.clamp(
              -1,
              1,
              ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
            );
            const y = gsap.utils.clamp(
              -1,
              1,
              ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
            );
            tiltX(-y * 6);
            tiltY(x * 8);
          };
          const moveButton = (event: PointerEvent) => {
            if (event.pointerType !== "mouse" || !visible) return;
            buttonBounds ??= button.getBoundingClientRect();
            magnetX(
              gsap.utils.clamp(
                -4,
                4,
                (event.clientX - buttonBounds.left - buttonBounds.width / 2) *
                  0.04,
              ),
            );
            magnetY(
              gsap.utils.clamp(
                -3,
                3,
                (event.clientY - buttonBounds.top - buttonBounds.height / 2) *
                  0.08,
              ),
            );
          };
          const resetButton = () => {
            magnetX(0);
            magnetY(0);
            buttonBounds = null;
          };
          const leave = () => {
            reset();
            invalidate();
          };
          const hide = () => {
            if (document.hidden) reset();
          };
          const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (!visible) reset();
          });
          observer.observe(scene);
          const resize = new ResizeObserver(invalidate);
          resize.observe(stage);
          stage.addEventListener("pointermove", move);
          stage.addEventListener("pointerleave", leave);
          stage.addEventListener("pointercancel", leave);
          button.addEventListener("pointermove", moveButton);
          button.addEventListener("pointerleave", resetButton);
          button.addEventListener("focus", resetButton);
          window.addEventListener("scroll", invalidate, { passive: true });
          window.addEventListener("resize", invalidate);
          window.addEventListener("blur", leave);
          document.addEventListener("visibilitychange", hide);
          return () => {
            observer.disconnect();
            resize.disconnect();
            stage.removeEventListener("pointermove", move);
            stage.removeEventListener("pointerleave", leave);
            stage.removeEventListener("pointercancel", leave);
            button.removeEventListener("pointermove", moveButton);
            button.removeEventListener("pointerleave", resetButton);
            button.removeEventListener("focus", resetButton);
            window.removeEventListener("scroll", invalidate);
            window.removeEventListener("resize", invalidate);
            window.removeEventListener("blur", leave);
            document.removeEventListener("visibilitychange", hide);
          };
        },
      );
      return () => media.revert();
    },
    { scope: hero },
  );
}

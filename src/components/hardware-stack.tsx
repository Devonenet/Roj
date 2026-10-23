"use client";

import { useEffect, useRef } from "react";

function Plate({
  className,
  label,
  face,
}: {
  className: string;
  label: string;
  face: "cross" | "port" | "vents";
}) {
  return (
    <div className={`hardware-plate ${className}`}>
      {Array.from({ length: 20 }, (_, i) => (
        <span
          className="plate-edge"
          key={i}
          style={{ transform: `translateZ(${i * 1.2}px)` }}
        />
      ))}
      <div className="plate-top">
        <span className="plate-label">{label}</span>
        <span className={`plate-detail plate-${face}`}>
          {face === "vents" && [0, 1, 2, 3].map((i) => <i key={i} />)}
        </span>
        {className === "hardware-cap" &&
          ["tl", "tr", "bl", "br"].map((corner) => (
            <i className={`plate-screw ${corner}`} key={corner} />
          ))}
      </div>
    </div>
  );
}

/** Lightweight real CSS depth: extruded faces viewed through a perspective camera. */
export function HardwareStack() {
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      element.style.setProperty(
        "--assembly-scale",
        String(entry.contentRect.width / 500),
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="hardware-scene"
      ref={scene}
      role="img"
      aria-label="Exploded three-dimensional stack of dark creative modules with ROJ orange edges"
    >
      <div className="hardware-floor" aria-hidden="true" />
      <div className="hardware-fit" aria-hidden="true">
        <div className="hardware-scroll">
          <div className="hardware-pointer">
            <div className="hardware-assembly">
              <Plate
                className="hardware-base"
                label="ROJ / CONTENT HUB"
                face="vents"
              />
              <Plate
                className="hardware-module module-back"
                label="01 / FILM"
                face="port"
              />
              <Plate
                className="hardware-module module-left"
                label="02 / SOUND"
                face="port"
              />
              <Plate
                className="hardware-module module-right"
                label="03 / STORY"
                face="port"
              />
              <Plate
                className="hardware-cap"
                label="ROJ / CREATE"
                face="cross"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEnquiry } from "./site-shell";
export function AudienceStories() {
  const startProject = useEnquiry();
  return (
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
        <Link className="text-link" href="/services/">
          Find your thing <ArrowDownRight size={18} />
        </Link>
      </div>
      <div className="audience-stories">
        <article className="audience-card">
          <p className="eyebrow">For the creators</p>
          <h3>
            Your idea was good.
            <br />
            They scrolled past anyway.
          </h3>
          <p>
            Three days on one video. A borrowed light, a room that echoes, audio
            that makes your voice sound far away. You post it and wait.
          </p>
          <p>
            Nothing was wrong with the idea. Somewhere between your head and the
            screen, the quality leaked out.
          </p>
          <p>
            RojHub closes that gap. Arrive with your idea and create with
            photography, podcast recording, music production and film support
            under one roof. Less chasing equipment. More making work you’re
            proud to put your name on.
          </p>
          <button className="text-link" onClick={() => startProject()}>
            Book your session <ArrowUpRight size={20} />
          </button>
        </article>
        <article className="audience-card brand-story">
          <p className="eyebrow">For brands & corporates</p>
          <h3>
            The airtime is booked.
            <br />
            Is the ad ready to earn it?
          </h3>
          <p>
            Budget approved. Media bought. Launch date announced. You need a
            production team that can take the brief all the way.
          </p>
          <p>
            ROJ produces television commercials and brand films from first
            concept to final delivery, with one team answerable for the whole
            job.
          </p>
          <p>
            Scope, cost and usage rights are agreed in writing before the camera
            rolls. So the only surprises on set are creative ones.
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
  );
}

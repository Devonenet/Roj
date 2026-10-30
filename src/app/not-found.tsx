import Link from "next/link";
export default function NotFound() {
  return (
    <section className="shell page-intro not-found">
      <p className="eyebrow">A little off-script</p>
      <h1>
        This page
        <br />
        <span>isn’t here.</span>
      </h1>
      <p className="page-lead">
        Let’s get you back to the ideas, spaces and people you came for.
      </p>
      <Link href="/" className="button button-orange">
        Back to ROJ
      </Link>
      <Link href="/contact/" className="text-link">
        Get in touch
      </Link>
    </section>
  );
}

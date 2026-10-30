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

export function Faq() {
  return (
    <section className="shell page-section faq-block">
      <div>
        <p className="eyebrow">Before we hit record</p>
        <h2>
          A few things
          <br />
          you might ask.
        </h2>
      </div>
      <div>
        {faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

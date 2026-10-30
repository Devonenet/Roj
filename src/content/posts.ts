export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  checklist?: string[];
};
export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  alt: string;
  date: string;
  demo: boolean;
  service: string;
  sections: ArticleSection[];
};
export const posts: Post[] = [
  {
    slug: "prepare-first-podcast-recording",
    title:
      "Your first podcast session: what to prepare before you press record.",
    category: "Podcasting",
    excerpt:
      "A practical checklist for a calmer recording day, a clearer conversation and an easier edit.",
    image: "/Asset/images/roj-podcast-set.webp",
    alt: "The podcast recording set at ROJ Content Hub",
    date: "2026-10-26",
    demo: true,
    service: "podcasting",
    sections: [
      {
        heading: "Start with one promise to the listener",
        paragraphs: [
          "Before choosing a microphone or a camera angle, write down what the episode is about in one sentence. What should a listener understand, feel or be able to do afterwards? That sentence gives the conversation a centre and makes it easier to recognise when a useful tangent has become a different episode.",
          "Choose a realistic shape for the conversation: an introduction, two or three main ideas, and a closing thought. You do not need to script every word. A short outline usually gives the host enough structure to stay focused while leaving room for a guest to say something unexpected.",
        ],
      },
      {
        heading: "Share the session brief early",
        paragraphs: [
          "Tell your recording team how many people will be speaking, whether you need audio or video, and where the episode will be published. Guest count affects the setup, while the publishing format affects framing and the files needed at the end.",
          "If you are planning a podcast recording in Lekki, factor travel into the schedule and confirm the studio’s exact location before leaving. Booking time, preparation time and recording time are different things; agree how the session will be organised.",
        ],
        checklist: [
          "Guest names, count and pronunciation notes",
          "Episode outline and target recording length",
          "Audio, video and social clip requirements",
          "Any remote guests or special setup needs",
        ],
      },
      {
        heading: "Prepare your guests, not just your questions",
        paragraphs: [
          "Send guests the topic, a rough outline and the intended audience. Let them know whether the session will be filmed and how the recording will be used. Discuss permission to publish and any topics they would prefer not to cover before the microphones go live.",
          "Ask for concrete stories rather than only opinions. A question such as ‘What happened the first time you tried that?’ often leads to a more memorable answer than asking for general advice. Keep a few follow-up prompts nearby, but leave enough attention for listening.",
        ],
      },
      {
        heading: "Make the first few minutes count",
        paragraphs: [
          "Use the sound check to settle into a comfortable speaking position. Listen to the recording team’s guidance on microphone distance, keep phones silent and avoid touching the table or microphone during a take. For video, check that clothing and accessories do not create distracting noise.",
          "Record a short introduction and listen back before moving into the main discussion. It is easier to adjust a soft voice, distracting sound or unclear introduction now than after an entire conversation has been recorded.",
        ],
      },
      {
        heading: "Agree what happens after the recording",
        paragraphs: [
          "A session is not the same as a finished episode. Confirm what editing is included, how you will give feedback and which final files you will receive. If you want clips, explain whether they need captions, different aspect ratios or a separate approval process.",
          "Bring a short brief to ROJ and discuss the format before booking. The aim is a session where everyone knows what they are making, and an edit that has a clear destination.",
        ],
      },
    ],
  },
  {
    slug: "planning-brand-photoshoot-lagos",
    title: "Plan a brand photoshoot that works beyond one Instagram post.",
    category: "Photography",
    excerpt:
      "Build a shot list around the places your images need to work: your website, campaigns and everyday content.",
    image: "/Asset/images/roj-courtyard.webp",
    alt: "Covered courtyard and seating at ROJ in Ikota",
    date: "2026-10-26",
    demo: true,
    service: "photography",
    sections: [
      {
        heading: "Give every image a job",
        paragraphs: [
          "A brand photoshoot is easier to plan when you start with where the pictures will live. A website banner needs a different composition from a portrait, and a product detail has a different purpose from an image about the people behind the business.",
          "List the channels and placements you need to support. Then write the message each image should communicate. That turns a vague request for ‘content’ into a useful production brief and helps the team decide what to prioritise on the day.",
        ],
      },
      {
        heading: "Build a small, purposeful shot list",
        paragraphs: [
          "Group your shots by subject and setup. Photographing several variations while a scene is ready can be more efficient than repeatedly changing the room, wardrobe or lighting. Give the team a clear list of essential images, followed by ideas that would be useful if the schedule allows.",
          "Think about crops before shooting. Leave room for a headline when an image is intended for a website. Discuss vertical and horizontal versions when the same subject needs to appear across different channels.",
        ],
        checklist: [
          "Hero image for your website or campaign",
          "People and portraits that introduce the business",
          "Products, process and useful detail shots",
          "Flexible supporting images with room for copy",
        ],
      },
      {
        heading: "Use references to explain the feeling",
        paragraphs: [
          "A small moodboard can help explain tone, lighting and composition. Add a sentence about what you like in each reference, rather than expecting the photographer to guess. You may like the colour in one image and the sense of movement in another.",
          "References are a conversation starter, not a request to copy another brand. Connect them to your own identity, audience and story. Existing brand colours, typography and campaign materials help the production team see the bigger picture.",
        ],
      },
      {
        heading: "Plan the practical details",
        paragraphs: [
          "Confirm who is bringing products, props and wardrobe, and who can approve creative decisions during the shoot. Allow time for preparation and changes between setups. For a Lagos shoot, confirm arrival arrangements and the exact studio location before setting out.",
          "Discuss image selection, retouching and usage in advance. The number of final images, delivery formats, revision process and intended use should all be clear. A photograph used in a paid campaign may need different permissions from one used only on an internal presentation.",
        ],
      },
      {
        heading: "Make a plan for the finished library",
        paragraphs: [
          "Once the photographs arrive, organise them by subject and intended use. Keep approved versions separate from drafts, and make it easy for the person publishing content to find the correct crop. A simple naming system can save repeated questions later.",
          "Bring your shot list and references to ROJ. We can discuss how to turn them into a scoped session, with a clear purpose for the images you take away.",
        ],
      },
    ],
  },
  {
    slug: "writing-a-production-brief",
    title: "A better production brief makes room for better ideas.",
    category: "Production",
    excerpt:
      "The questions to settle before a brand film, commercial or content campaign goes into production.",
    image: "/Asset/images/roj-studio-stage.webp",
    alt: "Microphones and acoustic panels in the ROJ studio",
    date: "2026-10-26",
    demo: true,
    service: "film-video",
    sections: [
      {
        heading: "Describe the change you want to make",
        paragraphs: [
          "Start with the business problem rather than a list of visual effects. Who is the work for, what do they believe now, and what should they understand or do after seeing it? A clear objective makes it easier to judge creative ideas without relying entirely on personal taste.",
          "Keep the main message focused. A short film that tries to introduce the company, explain every product and answer every objection can lose its centre. Decide what belongs in this production and what can be handled elsewhere.",
        ],
      },
      {
        heading: "Make the audience and destination specific",
        paragraphs: [
          "A television commercial, a website brand film and a vertical social clip are different viewing experiences. Tell the team where the work will appear, how long it should be and what delivery specifications apply. Do not leave those decisions until after the shoot.",
          "Share brand guidelines, useful research and relevant existing content. Explain what has worked and what needs to change. This gives the creative team a useful starting point without prescribing every shot.",
        ],
        checklist: [
          "Audience and primary message",
          "Platforms, durations and aspect ratios",
          "Launch date and approval deadlines",
          "Budget range and essential deliverables",
        ],
      },
      {
        heading: "Agree how decisions will be made",
        paragraphs: [
          "Identify one person who can collect feedback and communicate a clear decision. Multiple uncoordinated rounds of comments can undo earlier approvals and make a production difficult to schedule. Agree when the concept, script, edit and final versions will be reviewed.",
          "A practical timeline includes room for approvals and revisions. If the campaign has a fixed launch date, work backwards from the final delivery rather than treating the shoot date as the finish line.",
        ],
      },
      {
        heading: "Put scope and usage in writing",
        paragraphs: [
          "Clarify what the quote includes: crew, locations, talent, editing, music, graphics, versions and revision rounds as relevant. Ask how additional work will be handled if the brief changes. A shared written scope gives both sides something concrete to work from.",
          "Usage rights also need a conversation before production. Tell the team which channels, territories and time periods you have in mind. Confirm permissions for talent, music and other third-party material with the people responsible for those assets.",
        ],
      },
      {
        heading: "Leave room for the creative answer",
        paragraphs: [
          "A good brief gives direction without trying to solve every creative decision. Be clear about the non-negotiables, then let the production team propose a way to bring the idea to life. A reference can explain an ambition without becoming a rigid template.",
          "You do not need a finished script to talk to ROJ. Bring the goal, audience and constraints, and we can discuss the route from first concept to final delivery.",
        ],
      },
    ],
  },
];
export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
export function readingMinutes(post: Post) {
  const words = post.sections
    .flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.checklist ?? []),
    ])
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

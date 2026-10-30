export const services = [
  {
    slug: "photography",
    title: "Photography",
    line: "Make an impression.",
    image: "/Asset/images/roj-courtyard.webp",
    alt: "Covered courtyard and monochrome seating at ROJ",
    description:
      "Portraits with personality. Products with presence. Images that give your audience a reason to stop and look.",
    introduction:
      "A strong photograph starts before the shutter. We work with you on the purpose, setting and visual direction, so the images feel like your brand and have a clear job to do.",
    offerings: [
      "Personal portraits and brand photography",
      "Product and campaign imagery",
      "Creative direction and shot planning",
      "Image selection and agreed retouching",
    ],
    preparation:
      "Bring references, a list of must-have shots, wardrobe or products, and the places your images will appear. We’ll agree the shot list, final image count and usage before the session.",
    outcome:
      "A focused set of photographs prepared for the channels in your brief. Image count, file formats and delivery dates are confirmed in your quote.",
    related: "planning-brand-photoshoot-lagos",
  },
  {
    slug: "film-video",
    title: "Film & video",
    line: "Make them feel it.",
    image: "/Asset/images/roj-courtyard-detail.webp",
    alt: "ROJ courtyard beneath a covered roof",
    description:
      "Brand films, television commercials and creative content, from the first concept to the final cut.",
    introduction:
      "Media booked. Launch date set. Your film needs one team accountable for the whole production. ROJ brings the brief, shoot and edit together with a shared creative direction.",
    offerings: [
      "Brand films and television commercials",
      "Campaign and social video production",
      "Concept development and shoot planning",
      "Editing and delivery for agreed platforms",
    ],
    preparation:
      "Tell us the audience, message, deadline, budget range and intended placements. Bring any brand guidelines or existing scripts. Scope, cost and usage rights are agreed in writing before filming.",
    outcome:
      "A film with agreed edits and delivery versions for its intended audience. Cut-downs, captions, music licensing and revision rounds are defined at the briefing stage.",
    related: "writing-a-production-brief",
  },
  {
    slug: "podcasting",
    title: "Podcasting",
    line: "Give your voice a home.",
    image: "/Asset/images/roj-podcast-set.webp",
    alt: "The supplied ROJ podcast recording set",
    description:
      "Bring the conversation. We bring the recording setup and production support to help it come through clearly.",
    introduction:
      "Good conversations deserve sound that lets people listen. Plan a focused episode, settle into the studio and work with a team that helps you turn a recording into something ready to share.",
    offerings: [
      "Audio and video podcast recording",
      "Session setup and production support",
      "Episode editing by agreement",
      "Short-form clips for your content plan",
    ],
    preparation:
      "Share your guest count, episode outline, expected duration and whether you need audio, video or both. Discuss guest consent and any licensed music before recording.",
    outcome:
      "Your agreed episode files and optional social edits. We confirm episode length, formats, revision rounds and turnaround with your booking.",
    related: "prepare-first-podcast-recording",
  },
  {
    slug: "music-production",
    title: "Music production",
    line: "Find your frequency.",
    image: "/Asset/images/roj-studio-keyboard.webp",
    alt: "Keyboard and microphones inside the ROJ music studio",
    description:
      "A space to turn the melody in your head into something people can put on repeat. Create, record and refine.",
    introduction:
      "Bring the idea at whatever stage it is in. A voice note, a demo or a nearly finished track can be the starting point for a conversation about the sound you want to make.",
    offerings: [
      "Vocal and instrument recording",
      "Music production sessions",
      "Arrangement and creative development",
      "Mixing requirements scoped to your project",
    ],
    preparation:
      "Bring reference tracks, your lyrics and any existing session files or stems. Share your software and file formats in advance so we can confirm compatibility and the support you need.",
    outcome:
      "The recordings, mixes or session assets agreed in your brief. Ownership, credits and third-party material should be discussed before the work begins.",
    related: "writing-a-production-brief",
  },
  {
    slug: "branding",
    title: "Branding",
    line: "Look like you mean it.",
    image: "/Asset/images/roj-courtyard-detail.webp",
    alt: "Geometric details and seating in the ROJ courtyard",
    description:
      "A clear visual direction that helps your business show up consistently, from a first impression to the next campaign.",
    introduction:
      "Your identity should give your content a direction. We start with what your business stands for, who you want to reach and what people need to understand about you.",
    offerings: [
      "Brand direction and visual identity briefs",
      "Campaign look and feel",
      "Content templates and brand assets",
      "Practical guidance for consistent rollout",
    ],
    preparation:
      "Share your current identity, audience, competitors and the problem you want the new direction to solve. Let us know which assets and channels matter most.",
    outcome:
      "The identity assets and usage guidance agreed for your project. Exact deliverables, source files and revision rounds are defined in the scope.",
    related: "planning-brand-photoshoot-lagos",
  },
  {
    slug: "digital-content",
    title: "Content & digital",
    line: "Give good work a bigger audience.",
    image: "/Asset/images/roj-studio-wide.webp",
    alt: "A wide view of the ROJ production space",
    description:
      "Content creation, social media management and digital marketing connected to a clear business goal.",
    introduction:
      "Publishing more is only useful when the work has a purpose. We help connect your creative production with a content plan that considers your audience, platforms and next step.",
    offerings: [
      "Content strategy and production planning",
      "Social media content and management",
      "Campaign creative and digital marketing",
      "Reporting against agreed objectives",
    ],
    preparation:
      "Bring your current channels, goals and examples of content that has resonated. We’ll discuss responsibilities, approval flow, media spend and how progress will be reviewed.",
    outcome:
      "A scoped content or campaign plan with agreed production and management responsibilities. Advertising spend and ongoing work are quoted separately where applicable.",
    related: "writing-a-production-brief",
  },
];
export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const WHATSAPP_URL = "https://wa.me/2347062819883";
export const INSTAGRAM_URL = "https://www.instagram.com/rojcontenthub/";

export function createEnquiryUrl(input: {
  name: string;
  service: string;
  idea: string;
}): string {
  const name = input.name.trim();
  const service = input.service.trim();
  const idea = input.idea.trim();
  if (!name || !service || !idea)
    throw new Error(
      "Please add your name, a service and a little about your idea.",
    );
  if (name.length > 100 || service.length > 100 || idea.length > 2000)
    throw new Error("Please shorten your details and try again.");
  const message = `Hi ROJ! I'd like to discuss a ${service.toLowerCase()}.\n\nName: ${name}\nService: ${service}\n\nMy idea:\n${idea}`;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

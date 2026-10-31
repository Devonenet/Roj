import type { Metadata } from "next";

// Set to the final public origin before deploying. Never emit localhost canonicals.
const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
export const siteUrl = configuredOrigin
  ? new URL(configuredOrigin).origin
  : undefined;
export const location = {
  area: "Ikota Villa, Lekki, Lagos",
  streetAddress: "House 16B, Road 13",
  // Address supplied by the business; no unverified GPS coordinates are used.
  officeConfirmed: true,
  mapQuery: "House 16B, Road 13, Ikota Villa, Lekki, Lagos, Nigeria",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=House%2016B%2C%20Road%2013%2C%20Ikota%20Villa%2C%20Lekki%2C%20Lagos%2C%20Nigeria",
};
export function absoluteUrl(path: string) {
  return siteUrl ? new URL(path, `${siteUrl}/`).href : undefined;
}
// Default link preview: courtyard photo, dark overlay and ROJ icon.
// Regenerate with `node scripts/generate-og-image.mjs`.
const defaultShareImage = "/og-image.jpg";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = defaultShareImage,
  demo = false,
): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    ...(demo ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: `${title} | ROJ Content Hub`,
      description,
      type: "website",
      locale: "en_NG",
      ...(canonical ? { url: canonical } : {}),
      ...(imageUrl
        ? {
            images: [
              image === defaultShareImage
                ? {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: "ROJ Content Hub",
                  }
                : { url: imageUrl },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { services } from "@/content/services";
import { posts } from "@/content/posts";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  const routes = [
    "/",
    "/about/",
    "/services/",
    "/studio/",
    "/work/",
    "/contact/",
    "/blog/",
    ...services.map((service) => `/services/${service.slug}/`),
    ...posts.filter((post) => !post.demo).map((post) => `/blog/${post.slug}/`),
  ];
  return routes.map((route) => ({ url: new URL(route, `${siteUrl}/`).href }));
}

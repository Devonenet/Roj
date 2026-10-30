import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { siteUrl } from "@/lib/site";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ROJ Content Hub — Make work that moves culture",
    template: "%s | ROJ Content Hub",
  },
  description:
    "Photography, podcasts, music production, brand films and digital content in Ikota, Lekki, Lagos.",
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

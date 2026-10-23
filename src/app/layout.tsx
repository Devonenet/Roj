import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "ROJ Content Hub — Make work that moves culture",
  description:
    "Photography, podcasts, music production, brand films and television commercials. One creative team at Ikota Villa, Lekki, Lagos. Bring your idea to ROJ Content Hub.",
  openGraph: {
    title: "ROJ Content Hub — Bring the idea. We'll bring it to life.",
    description: "A creative home for creators and brands in Ikota, Lagos.",
    type: "website",
    locale: "en_NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

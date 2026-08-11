import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://lead-radar-liz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lead Radar — Weekly Reddit Demand Research Preview",
    template: "%s | Lead Radar",
  },
  description:
    "Lead Radar is a closed research preview that scans public Reddit conversations for pain, buying intent, repeated requests, and source-linked evidence, then turns reviewed signals into a Markdown market validation report.",
  keywords: [
    "Reddit demand research",
    "Reddit demand research tool",
    "market validation tool",
    "market validation from Reddit",
    "startup idea validation",
    "customer pain signals",
    "customer pain point finder",
    "buying intent scanner",
    "indie hackers research",
    "founders market research",
    "growth research agent",
    "SaaS validation",
    "SaaS demand signal scanner",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lead Radar — Weekly Reddit demand evidence before you build",
    description:
      "Turn a market brief into ranked Reddit demand research: pain signals, buying intent, source links, review status, and a Markdown report.",
    url: siteUrl,
    siteName: "Lead Radar",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lead Radar editorial workflow: market brief to demand signals to source-linked report",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lead Radar — Weekly Reddit demand research preview",
    description:
      "Scan public communities, detect demand signals, review the evidence, and export a Markdown market validation report.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

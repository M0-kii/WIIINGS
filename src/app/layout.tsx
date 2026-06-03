import type { Metadata, Viewport } from "next";
import "./globals.css";
import CursorProvider from "@/components/CursorProvider";

export const metadata: Metadata = {
  title: {
    default: "RED BULL — Gives You Wings",
    template: "%s | RED BULL",
  },
  description:
    "The world's most iconic energy drink. Vitalizes Body & Mind. Trusted by athletes, creators, and dreamers across 172 countries.",
  keywords: [
    "Red Bull",
    "energy drink",
    "vitalizes body and mind",
    "performance",
    "caffeine",
  ],
  authors: [{ name: "M0-Kii" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://redbull-gives-you-wings.vercel.app",
    siteName: "RED BULL — Gives You Wings",
    title: "RED BULL — Gives You Wings",
    description:
      "The world's most iconic energy drink. Vitalizes Body & Mind.",
    images: [
      {
        url: "/redbull.webp",
        width: 800,
        height: 600,
        alt: "Red Bull energy drink can",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RED BULL — Gives You Wings",
    description:
      "The world's most iconic energy drink. Vitalizes Body & Mind.",
    images: ["/redbull.webp"],
  },
  icons: {
    icon: "/redbull.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RED BULL — Gives You Wings",
    description:
      "The world's most iconic energy drink. Vitalizes Body & Mind.",
    url: "https://redbull-gives-you-wings.vercel.app",
    author: {
      "@type": "Person",
      name: "M0-Kii",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <CursorProvider>{children}</CursorProvider>
      </body>
    </html>
  );
}

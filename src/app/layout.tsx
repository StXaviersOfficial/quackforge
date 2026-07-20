import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const SITE_URL = "https://quackforge.web.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "QuackForge — Full-stack dev studio. Web, Android, SEO.",
    template: "%s · QuackForge",
  },
  description:
    "Independent dev studio shipping web apps, Android apps, SEO wins, and custom-domain deploys. Dedicated infrastructure, custom-built systems, demos in 48 hours.",
  keywords: [
    "QuackForge",
    "freelance developer India",
    "Next.js developer",
    "full-stack developer",
    "Android app developer",
    "SEO expert India",
    "custom domain setup",
    "Cloudflare Workers developer",
    "Firebase developer",
    "Minecraft mod developer",
    "Kotlin developer",
    "TypeScript developer",
    "web app development",
    "landing page designer",
    "REST API developer",
  ],
  authors: [{ name: "QuackForge", url: SITE_URL }],
  creator: "QuackForge",
  publisher: "QuackForge",
  applicationName: "QuackForge",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/quackforge-logo.png", type: "image/png", sizes: "32x32" },
      { url: "/quackforge-logo.png", type: "image/png", sizes: "180x180" },
    ],
    apple: [{ url: "/quackforge-logo.png", sizes: "180x180" }],
    shortcut: ["/quackforge-logo.png"],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "QuackForge",
    title: "QuackForge — Full-stack dev studio. Web, Android, SEO.",
    description:
      "Independent dev studio shipping web apps, Android apps, SEO wins, and custom-domain deploys. Demos in 48 hours.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QuackForge — Full-stack web, mobile, and SEO.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuackForge — Full-stack dev studio",
    description:
      "Web apps, Android apps, SEO ranking, custom-domain deploys. Shipped in days, not quarters.",
    creator: "@quackeditz",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#22D3EE",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#org`,
  name: "QuackForge",
  alternateName: "QuackForge Dev Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/quackforge-logo.png`,
  image: `${SITE_URL}/og-image.png`,
  description:
    "Independent dev studio shipping web apps, Android apps, SEO ranking, and custom-domain deploys.",
  founder: { "@type": "Organization", name: "QuackForge" },
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Java",
    "Kotlin",
    "Python",
    "Firebase",
    "REST APIs",
    "Android development",
    "Gradle",
    "Cloudflare Workers",
    "Google OAuth",
    "Search Engine Optimization",
    "Minecraft modding",
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "1499",
    offerCount: "6",
  },
  areaServed: "Worldwide",
  sameAs: [
    "https://github.com/StXaviersOfficial",
    "https://discord.gg/VhKgEetwr8",
    "https://x.com/quackeditz",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "quackeditzofficial@gmail.com",
      url: `${SITE_URL}/#contact`,
      availableLanguage: ["English"],
    },
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How fast can QuackForge ship a demo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Two business days. You get a clickable multi-page frontend prototype with your copy and brand colors, deployed to a live preview URL. No backend or forms wired yet at this tier.",
      },
    },
    {
      "@type": "Question",
      name: "What's in the $99 Starter tier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A multi-page site (up to 3 pages), shared backend for contact form, subdomain hosting, and basic SEO. No custom domain at this tier.",
      },
    },
    {
      "@type": "Question",
      name: "Do you build Android apps?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Native Android in Kotlin or Java with Gradle builds, Firebase Auth, REST sync, Material 3, and Play Store rollout. Covered under the Pro tier or a custom quote.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the source code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You do. From day one, source is pushed to a private GitHub repo you own. All paid tiers include full source handover on completion.",
      },
    },
    {
      "@type": "Question",
      name: "What's the fastest way to reach the team?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Discord. Join https://discord.gg/VhKgEetwr8 and message the team directly. Email works too: quackeditzofficial@gmail.com. Response window is 24 hours.",
      },
    },
    {
      "@type": "Question",
      name: "Do you take on retainers after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Care Basic and Care Complete plans cover ongoing maintenance, monitoring, and content edits. Larger retainers are available for continuous development work.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Toaster />
      </body>
    </html>
  );
}

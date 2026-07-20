import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

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

export const metadata: Metadata = {
  title: "QuackForge — Full-stack web, mobile & SEO",
  description:
    "QuackForge ships production-grade web apps, Android apps, SEO ranking, and custom-domain deployments. Built on Next.js, Firebase, Cloudflare Workers, and Kotlin.",
  keywords: [
    "QuackForge",
    "freelance developer",
    "Next.js developer India",
    "full-stack developer",
    "Android app developer",
    "SEO expert",
    "custom domain setup",
    "Cloudflare Workers",
    "Firebase",
    "Minecraft mod developer",
  ],
  authors: [{ name: "Xavier — QuackForge" }],
  metadataBase: new URL("https://quackforge.web.app"),
  icons: {
    icon: "/quackforge-logo.png",
    apple: "/quackforge-logo.png",
  },
  openGraph: {
    title: "QuackForge — Full-stack web, mobile & SEO",
    description:
      "Production-grade web apps, Android apps, SEO ranking, and custom-domain deployments. Shipped fast, built to last.",
    url: "https://quackforge.web.app",
    siteName: "QuackForge",
    type: "website",
    images: ["/quackforge-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuackForge — Full-stack web, mobile & SEO",
    description:
      "Production-grade web apps, Android apps, SEO ranking, and custom-domain deployments.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

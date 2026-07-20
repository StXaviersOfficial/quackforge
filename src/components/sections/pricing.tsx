"use client"

import { Check, ArrowRight, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  StaggerGroup,
  FadeUp,
  Magnetic,
  TiltCard,
  HoverLift,
} from "@/components/motion-primitives"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Tier = {
  name: string
  price: string
  cadence?: string
  tagline: string
  features: string[]
  cta: string
  href: string
  featured?: boolean
  badge?: string
  delay: number
}

const TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "consultation",
    tagline: "Scope before you commit.",
    features: [
      "30-min discovery call",
      "Written brief",
      "Stack recommendation",
      "Cost range",
      "No obligation",
    ],
    cta: "Book a call",
    href: "#contact",
    delay: 0,
  },
  {
    name: "Demo",
    price: "$49",
    cadence: "one-time · 2 days",
    tagline: "Working demo in 48 hours.",
    features: [
      "Single-page Next.js demo",
      "Your copy + brand colors",
      "Mobile responsive",
      "Preview URL",
      "Code handover on payment",
    ],
    cta: "Book a demo",
    href: "#contact",
    badge: "2-day delivery",
    delay: 0.08,
  },
  {
    name: "Starter",
    price: "$99",
    cadence: "/ first year",
    tagline: "Landing page that converts.",
    features: [
      "1-page landing site",
      "Custom domain setup",
      "SSL + CDN",
      "Contact form (Firestore)",
      "Basic SEO + sitemap",
      "2 revision rounds",
    ],
    cta: "Start with Starter",
    href: "#contact",
    featured: true,
    badge: "Most picked",
    delay: 0.16,
  },
  {
    name: "Standard",
    price: "$149",
    cadence: "/ first year",
    tagline: "Multi-page site with a real CMS.",
    features: [
      "Up to 5 pages",
      "Admin dashboard",
      "Firestore / Prisma backend",
      "Google OAuth login",
      "Email automation hooks",
      "3 revision rounds",
    ],
    cta: "Go Standard",
    href: "#contact",
    delay: 0.24,
  },
  {
    name: "Pro",
    price: "$299",
    cadence: "/ first year",
    tagline: "Web app or Android MVP, shipped.",
    features: [
      "Full web OR Android app",
      "Auth + payments + admin",
      "Cloudflare Workers edge logic",
      "Custom domain + deploys",
      "Technical SEO pass",
      "60-day support",
    ],
    cta: "Build it Pro",
    href: "#contact",
    delay: 0.32,
  },
  {
    name: "Custom",
    price: "Quote",
    cadence: "scoped together",
    tagline: "Anything bigger.",
    features: [
      "Discovery workshop",
      "Fixed-scope SOW",
      "Milestone billing",
      "Dedicated Slack",
      "Source + docs",
      "Retainers available",
    ],
    cta: "Request a quote",
    href: "#contact",
    delay: 0.4,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-16 py-20 sm:py-28 relative">
      {/* Bg glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerGroup className="max-w-2xl mb-12" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-cyan-400/50" /> 02 · Pricing
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Six tiers. <span className="text-gradient-cyan">No surprises.</span>
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mt-4 text-muted-foreground text-lg">
              Prices cover the first year for hosted tiers. Renewals are 30% off.
              Source code and a written warranty on every paid tier.
            </p>
          </FadeUp>
        </StaggerGroup>

        <StaggerGroup
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          stagger={0.08}
        >
          {TIERS.map((tier) => (
            <FadeUp key={tier.name} delay={tier.delay}>
              <HoverLift y={-4} scale={1.01}>
                <TiltCard
                  max={3}
                  className={cn(
                    "relative h-full rounded-xl border bg-card/60 backdrop-blur-sm p-6 transition-colors",
                    tier.featured
                      ? "border-cyan-400/60 glow-cyan-strong"
                      : "border-border hover:border-cyan-400/30"
                  )}
                >
                  {tier.badge && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: tier.delay + 0.2 }}
                      className={cn(
                        "absolute -top-2.5 right-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium",
                        tier.featured
                          ? "bg-cyan-400 text-background"
                          : "bg-muted text-muted-foreground border border-border"
                      )}
                    >
                      {tier.featured && <Star className="h-3 w-3 fill-current" />}
                      {tier.badge}
                    </motion.span>
                  )}

                  <header className="mb-4">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tier.tagline}
                    </p>
                  </header>

                  <div className="flex items-baseline gap-1.5 mb-5">
                    <span className="text-3xl font-semibold tracking-tight font-mono text-gradient-cyan">
                      {tier.price}
                    </span>
                    {tier.cadence && (
                      <span className="text-xs text-muted-foreground">
                        {tier.cadence}
                      </span>
                    )}
                  </div>

                  <ul className="flex-1 flex flex-col gap-2.5 mb-6">
                    {tier.features.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: tier.delay + 0.1 + i * 0.04 }}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <Check
                          className={cn(
                            "h-4 w-4 mt-0.5 shrink-0",
                            tier.featured ? "text-cyan-300" : "text-muted-foreground"
                          )}
                        />
                        <span className="text-foreground/90 leading-relaxed">{f}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Magnetic strength={0.25}>
                    <Button
                      asChild
                      variant={tier.featured ? "default" : "outline"}
                      className={cn(
                        "w-full group",
                        tier.featured
                          ? "bg-cyan-400 hover:bg-cyan-300 text-background border-0 font-semibold"
                          : "border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 hover:text-cyan-200"
                      )}
                    >
                      <a href={tier.href}>
                        {tier.cta}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </Magnetic>
                </TiltCard>
              </HoverLift>
            </FadeUp>
          ))}
        </StaggerGroup>

        <FadeUp>
          <p className="mt-8 text-xs text-muted-foreground text-center">
            USD pricing. INR available for Indian clients at locked conversion rate.
            7-day refund if no work has started.
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

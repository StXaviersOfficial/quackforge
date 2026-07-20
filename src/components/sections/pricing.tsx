"use client";

import * as React from "react";
import { Check, ArrowRight, Star, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  StaggerGroup,
  FadeUp,
  Magnetic,
  TiltCard,
  HoverLift,
} from "@/components/motion-primitives";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks/use-currency";

type Tier = {
  name: string;
  priceUsd: string;
  priceInr: string;
  subtext: string;
  body: string;
  excluded?: string;
  featured?: boolean;
  badge?: string;
};

const TIERS: Tier[] = [
  {
    name: "Demo",
    priceUsd: "$0",
    priceInr: "₹0",
    subtext: "one-time",
    body:
      "Clickable multi-page frontend prototype, your copy + brand colors, fully navigable. No backend or forms wired yet. See it before you pay for it.",
  },
  {
    name: "Starter",
    priceUsd: "$99",
    priceInr: "₹4,999",
    subtext: "one-time",
    body:
      "Multi-page site (up to 3 pages), shared backend for contact form, subdomain hosting, basic SEO.",
    excluded: "No custom domain at this tier.",
  },
  {
    name: "Growth",
    priceUsd: "$249",
    priceInr: "₹12,999",
    subtext: "one-time",
    body:
      "Up to 5 pages, custom domain, dedicated hosting, CMS/admin dashboard, Google OAuth login, 3 revision rounds.",
  },
  {
    name: "Pro",
    priceUsd: "$599",
    priceInr: "₹29,999",
    subtext: "one-time",
    body:
      "Full web app OR Android MVP, dedicated backend infrastructure, edge logic, technical SEO pass, 90-day support.",
    featured: true,
    badge: "Most picked",
  },
  {
    name: "Elite",
    priceUsd: "$1,499",
    priceInr: "₹79,999",
    subtext: "one-time",
    body:
      "Fully dedicated infrastructure (not shared with other clients), custom UI design system, SEO + ad campaign setup, priority team access.",
  },
  {
    name: "Enterprise",
    priceUsd: "Custom quote",
    priceInr: "Custom quote",
    subtext: "retainer",
    body:
      "Dedicated account manager, retainer engagement, full growth system combining SEO + Ads + Automation.",
  },
];

export function Pricing() {
  const { currency, toggle } = useCurrency();

  return (
    <section id="pricing" className="scroll-mt-16 py-20 sm:py-28 relative">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-11/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 pointer-events-none rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerGroup className="max-w-2xl mb-10 sm:mb-12" stagger={0.1}>
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
              Source code and full handover on every paid tier. Pricing shown in{" "}
              <button
                onClick={toggle}
                className="font-mono text-cyan-300 hover:text-cyan-200 underline-offset-4 underline"
              >
                {currency}
              </button>{" "}
              — tap to switch.
            </p>
          </FadeUp>
        </StaggerGroup>

        {/* Mobile: horizontal swipe carousel; Desktop: grid */}
        <div className="swipe-carousel flex gap-4 overflow-x-auto lg:grid lg:grid-cols-3 lg:overflow-visible -mx-5 px-5 lg:mx-0 lg:px-0 pb-4 lg:pb-0">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="w-[80%] sm:w-[60%] lg:w-auto"
            >
              <HoverLift y={-4} scale={1.02}>
                <TiltCard
                  max={3}
                  className={cn(
                    "relative h-full rounded-xl border bg-card p-6 transition-colors",
                    tier.featured
                      ? "border-cyan-400/60 glow-cyan-strong"
                      : "border-border hover:border-cyan-400/40"
                  )}
                >
                  {tier.badge && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.2 }}
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
                    <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
                  </header>

                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-3xl font-semibold tracking-tight font-mono text-gradient-cyan">
                      {currency === "USD" ? tier.priceUsd : tier.priceInr}
                    </span>
                    <span className="text-xs text-muted-foreground">{tier.subtext}</span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {tier.body}
                  </p>

                  {tier.excluded && (
                    <div className="mb-5 flex items-start gap-2 rounded-md border border-amber-400/30 bg-amber-400/5 px-3 py-2">
                      <AlertCircle className="h-3.5 w-3.5 text-amber-300 mt-0.5 shrink-0" />
                      <span className="text-[11px] text-amber-200 leading-relaxed">
                        {tier.excluded}
                      </span>
                    </div>
                  )}

                  <Magnetic strength={0.2}>
                    <Button
                      asChild
                      variant={tier.featured ? "default" : "outline"}
                      className={cn(
                        "w-full group",
                        tier.featured
                          ? "bg-cyan-400 hover:bg-cyan-300 text-background border-0 font-semibold"
                          : "border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-100"
                      )}
                    >
                      <a href="#contact">
                        {tier.name === "Enterprise" ? "Request a quote" : `Choose ${tier.name}`}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </Magnetic>
                </TiltCard>
              </HoverLift>
            </motion.div>
          ))}
        </div>

        <FadeUp>
          <p className="mt-8 text-xs text-muted-foreground text-center">
            All prices one-time unless marked as retainer. Indian clients can pay in INR at the locked rate shown.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

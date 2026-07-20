"use client";

import { Check, ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  StaggerGroup,
  FadeUp,
  TiltCard,
  HoverLift,
  Magnetic,
} from "@/components/motion-primitives";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks/use-currency";

type Plan = {
  name: string;
  priceUsd: string;
  priceInr: string;
  subtext?: string;
  body: string;
  featured?: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    name: "Request a Fix",
    priceUsd: "$39",
    priceInr: "₹2,499",
    subtext: "one-time, no subscription",
    body:
      "Got an existing site that needs one thing fixed? We'll audit it and ship one scoped improvement — a bug fix, small feature, or SEO tweak — in 3-5 days.",
  },
  {
    name: "Care Basic",
    priceUsd: "$49/mo",
    priceInr: "₹2,999/mo",
    body:
      "Weekly backups, uptime + SSL monitoring, security patching, 2 content-edit requests per month, monthly health report.",
  },
  {
    name: "Care Complete",
    priceUsd: "$149/mo",
    priceInr: "₹8,999/mo",
    body:
      "Everything in Basic, plus unlimited content edits, 24/7 monitoring with same-day incident response, backend/server management, performance tuning, monthly SEO health check with keyword tracking, light ad-campaign monitoring, and a priority support line.",
    featured: true,
    badge: "Most Coverage",
  },
];

export function Maintenance() {
  const { currency } = useCurrency();

  return (
    <section id="maintenance" className="scroll-mt-16 py-20 sm:py-28 relative border-t border-border/50">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerGroup className="max-w-2xl mb-8 sm:mb-10" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-cyan-400/50" /> 03 · Ongoing Care
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Maintenance <span className="text-gradient-cyan">plans.</span>
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Maintenance keeps what's already built running smoothly — it's not
              new development.{" "}
              <span className="text-foreground/80">
                Request a Fix is the one exception: you get one specific
                improvement.
              </span>
            </p>
          </FadeUp>
        </StaggerGroup>

        {/* Mobile: horizontal swipe carousel; Desktop: grid */}
        <div className="swipe-carousel flex gap-4 overflow-x-auto md:grid md:grid-cols-3 md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="w-[80%] sm:w-[60%] md:w-auto"
            >
              <HoverLift y={-4} scale={1.02}>
                <TiltCard
                  max={3}
                  className={cn(
                    "relative h-full rounded-xl border bg-card p-6 transition-colors",
                    plan.featured
                      ? "border-cyan-400/60 glow-cyan-strong"
                      : "border-border hover:border-cyan-400/40"
                  )}
                >
                  {plan.badge && (
                    <motion.span
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.2 }}
                      className="absolute -top-2.5 right-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-400 text-background"
                    >
                      <Check className="h-3 w-3" />
                      {plan.badge}
                    </motion.span>
                  )}

                  <header className="mb-4 flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-cyan-300" />
                    <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
                  </header>

                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className="text-3xl font-semibold tracking-tight font-mono text-gradient-cyan">
                      <CurrencyDisplay plan={plan} currency={currency} />
                    </span>
                    {plan.subtext && (
                      <span className="text-xs text-muted-foreground">{plan.subtext}</span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {plan.body}
                  </p>

                  <Magnetic strength={0.2}>
                    <Button
                      asChild
                      variant={plan.featured ? "default" : "outline"}
                      className={cn(
                        "w-full group",
                        plan.featured
                          ? "bg-cyan-400 hover:bg-cyan-300 text-background border-0 font-semibold"
                          : "border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-100"
                      )}
                    >
                      <a href="#contact">
                        {plan.name === "Request a Fix" ? "Send the brief" : `Choose ${plan.name}`}
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </Magnetic>
                </TiltCard>
              </HoverLift>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CurrencyDisplay({ plan, currency }: { plan: Plan; currency: "USD" | "INR" }) {
  return <>{currency === "USD" ? plan.priceUsd : plan.priceInr}</>;
}

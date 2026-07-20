"use client";

import * as React from "react";
import { Check, ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks/use-currency";
import { useBooking } from "@/hooks/use-booking";

type Plan = {
  id: string;
  name: string;
  usdPrice: number;
  cadence: string;
  blurb: string;
  features: { text: string; included: boolean }[];
  bestCoverage?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "request-a-fix",
    name: "Request a Fix",
    usdPrice: 39,
    cadence: "one-time · no subscription",
    blurb: "Got an existing site that needs one thing fixed? We'll audit it and ship one scoped improvement — a bug fix, small feature, or SEO tweak — in 3-5 days.",
    features: [
      { text: "One scoped improvement", included: true },
      { text: "Audit of existing site", included: true },
      { text: "Bug fix OR small feature OR SEO tweak", included: true },
      { text: "3-5 day delivery", included: true },
      { text: "Source code of the fix", included: true },
    ],
  },
  {
    id: "care-basic",
    name: "Care Basic",
    usdPrice: 49,
    cadence: "per month",
    blurb: "Weekly backups, uptime + SSL monitoring, security patching, 2 content-edit requests per month, monthly health report.",
    features: [
      { text: "Weekly backups", included: true },
      { text: "Uptime + SSL monitoring", included: true },
      { text: "Security patching", included: true },
      { text: "2 content-edit requests / month", included: true },
      { text: "Monthly health report", included: true },
      { text: "Email support (24h response)", included: true },
    ],
  },
  {
    id: "care-complete",
    name: "Care Complete",
    usdPrice: 149,
    cadence: "per month",
    blurb: "Everything in Basic, plus unlimited content edits, 24/7 monitoring with same-day incident response, backend/server management, performance tuning, monthly SEO health check with keyword tracking, light ad-campaign monitoring, and a priority support line.",
    features: [
      { text: "Everything in Care Basic", included: true },
      { text: "Unlimited content edits", included: true },
      { text: "24/7 monitoring + same-day incident response", included: true },
      { text: "Backend / server management", included: true },
      { text: "Performance tuning", included: true },
      { text: "Monthly SEO health check + keyword tracking", included: true },
      { text: "Light ad-campaign monitoring", included: true },
      { text: "Priority support line (Discord)", included: true },
    ],
    bestCoverage: true,
  },
];

export function Maintenance() {
  const { currency, format } = useCurrency();
  const { openBooking } = useBooking();

  return (
    <section id="maintenance" className="scroll-mt-16 py-16 sm:py-20 relative border-t border-border/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="eyebrow text-cyan-300 mb-3 flex items-center gap-2"
          >
            <span className="h-px w-8 bg-cyan-400/50" /> 03 · Ongoing Care
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
          >
            Maintenance <span className="text-gradient-cyan">plans.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.16, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-3 text-muted-foreground text-base sm:text-lg leading-relaxed"
          >
            Keeps what's already built running smoothly — not new development.{" "}
            <span className="text-foreground/80">
              Request a Fix is the one exception: one specific scoped improvement.
            </span>
          </motion.p>
        </div>

        {/* Desktop: 3 wide cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {PLANS.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              formatPrice={(usd) => format(usd)}
              onChoose={() =>
                openBooking({
                  plan: plan.name,
                  price: format(plan.usdPrice) + (plan.cadence.includes("month") ? "/mo" : ""),
                  budget: "maintenance",
                })
              }
            />
          ))}
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden flex flex-col gap-4">
          {PLANS.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              formatPrice={(usd) => format(usd)}
              onChoose={() =>
                openBooking({
                  plan: plan.name,
                  price: format(plan.usdPrice) + (plan.cadence.includes("month") ? "/mo" : ""),
                  budget: "maintenance",
                })
              }
              mobile
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  index,
  formatPrice,
  onChoose,
  mobile,
}: {
  plan: Plan;
  index: number;
  formatPrice: (usd: number) => string;
  onChoose: () => void;
  mobile?: boolean;
}) {
  const priceLabel = formatPrice(plan.usdPrice) + (plan.cadence.includes("month") ? "/mo" : "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "relative rounded-xl border bg-card p-6 flex flex-col transition-colors",
        plan.bestCoverage
          ? "border-cyan-400/60 glow-cyan-strong"
          : "border-border hover:border-cyan-400/40",
        mobile ? "min-h-[400px]" : "min-h-[440px]"
      )}
    >
      {plan.bestCoverage && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-400 text-background whitespace-nowrap">
            <Wrench className="h-2.5 w-2.5" />
            Most Coverage
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 mb-2">
        <Wrench className="h-4 w-4 text-cyan-300" />
        <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
      </div>

      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-3xl font-bold tracking-tight font-mono text-gradient-cyan">
          {priceLabel}
        </span>
      </div>
      <p className="text-[11px] font-mono text-muted-foreground mb-4">{plan.cadence}</p>

      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{plan.blurb}</p>

      <div className="feat-list mb-6 flex-1">
        {plan.features.map((f, i) => (
          <div key={i} className="feat-row">
            <Check className="feat-tick h-4 w-4" />
            <span className="feat-text">{f.text}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onChoose}
        variant={plan.bestCoverage ? "default" : "outline"}
        className={cn(
          "w-full group",
          plan.bestCoverage
            ? "bg-cyan-400 hover:bg-cyan-300 text-background border-0 font-semibold"
            : "border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-100"
        )}
      >
        Choose {plan.name}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
}

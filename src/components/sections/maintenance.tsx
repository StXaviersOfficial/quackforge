"use client";

import * as React from "react";
import { Check, ArrowRight, Wrench, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
  const { format, currency } = useCurrency();
  const { openBooking } = useBooking();
  const [activeMobile, setActiveMobile] = React.useState(0);

  const onWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 0 && activeMobile < PLANS.length - 1) setActiveMobile((v) => v + 1);
      else if (e.deltaX < 0 && activeMobile > 0) setActiveMobile((v) => v - 1);
    }
  };
  const touchStartX = React.useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -40 && activeMobile < PLANS.length - 1) setActiveMobile((v) => v + 1);
    else if (delta > 40 && activeMobile > 0) setActiveMobile((v) => v - 1);
  };

  return (
    <section id="maintenance" className="scroll-mt-16 py-16 sm:py-20 relative border-t border-border/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl mb-8">
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

        {/* Desktop: 3 wide cards — same style as pricing */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 items-stretch">
          {PLANS.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              formatPrice={(usd) => format(usd, plan.id, { perMonth: plan.cadence.includes("month") })}
              currencyCode={currency.code}
              onChoose={() =>
                openBooking({
                  plan: plan.name,
                  price: format(plan.usdPrice, plan.id, { perMonth: plan.cadence.includes("month") }),
                  budget: "maintenance",
                  projectType: "maintenance",
                })
              }
            />
          ))}
        </div>

        {/* Mobile: carousel with swipe/scroll */}
        <div
          className="md:hidden relative"
          onWheel={onWheel}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMobile}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <MobilePlanCard
                  plan={PLANS[activeMobile]}
                  formatPrice={(usd) => format(usd, PLANS[activeMobile].id, { perMonth: PLANS[activeMobile].cadence.includes("month") })}
                  onChoose={() =>
                    openBooking({
                      plan: PLANS[activeMobile].name,
                      price: format(PLANS[activeMobile].usdPrice, PLANS[activeMobile].id, { perMonth: PLANS[activeMobile].cadence.includes("month") }),
                      budget: "maintenance",
                      projectType: "maintenance",
                    })
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setActiveMobile((v) => Math.max(0, v - 1))}
              disabled={activeMobile === 0}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-card text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-400 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {PLANS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMobile(i)}
                  aria-label={`Go to plan ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === activeMobile ? "w-6 bg-cyan-400" : "w-1.5 bg-muted-foreground/40"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveMobile((v) => Math.min(PLANS.length - 1, v + 1))}
              disabled={activeMobile === PLANS.length - 1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-card text-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed hover:border-cyan-400 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Swipe left/right or use arrows · {activeMobile + 1} of {PLANS.length}
          </p>
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  index,
  formatPrice,
  currencyCode,
  onChoose,
}: {
  plan: Plan;
  index: number;
  formatPrice: (usd: number) => string;
  currencyCode: string;
  onChoose: () => void;
}) {
  const priceLabel = formatPrice(plan.usdPrice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "relative rounded-xl border bg-card p-5 flex flex-col h-full",
        plan.bestCoverage
          ? "border-cyan-400/60 glow-cyan-strong"
          : "border-border hover:border-cyan-400/40"
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
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
          <Wrench className="h-4 w-4" />
        </div>
        <h3 className="text-base font-semibold tracking-tight">{plan.name}</h3>
      </div>

      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-2xl font-bold tracking-tight font-mono text-gradient-cyan">
          {priceLabel}
        </span>
      </div>
      <p className="text-[10px] font-mono text-muted-foreground mb-3">{plan.cadence}</p>

      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{plan.blurb}</p>

      <div className="feat-list mb-4 flex-1">
        {plan.features.map((f, i) => (
          <div key={i} className="feat-row">
            <Check className="feat-tick h-3.5 w-3.5" />
            <span className="feat-text text-xs">{f.text}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onChoose}
        variant={plan.bestCoverage ? "default" : "outline"}
        className={cn(
          "w-full group text-xs h-9 mt-auto",
          plan.bestCoverage
            ? "bg-cyan-400 hover:bg-cyan-300 text-background border-0 font-semibold"
            : "border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-100"
        )}
      >
        Choose {plan.name}
        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
}

function MobilePlanCard({
  plan,
  formatPrice,
  onChoose,
}: {
  plan: Plan;
  formatPrice: (usd: number) => string;
  onChoose: () => void;
}) {
  const priceLabel = formatPrice(plan.usdPrice);

  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-card p-6 flex flex-col",
        plan.bestCoverage
          ? "border-cyan-400/60 glow-cyan-strong"
          : "border-border"
      )}
    >
      {plan.bestCoverage && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-400 text-background whitespace-nowrap">
            <Wrench className="h-3 w-3" />
            Most Coverage
          </span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
          <Wrench className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>
      </div>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-4xl font-bold tracking-tight font-mono text-gradient-cyan">
          {priceLabel}
        </span>
        <span className="text-[11px] font-mono text-muted-foreground">{plan.cadence}</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{plan.blurb}</p>

      <div className="feat-list mb-5">
        {plan.features.map((f, i) => (
          <div key={i} className="feat-row">
            <Check className="feat-tick h-4 w-4" />
            <span className="feat-text text-sm">{f.text}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onChoose}
        variant={plan.bestCoverage ? "default" : "outline"}
        className={cn(
          "w-full group text-base h-12 mt-auto",
          plan.bestCoverage
            ? "bg-cyan-400 hover:bg-cyan-300 text-background border-0 font-semibold"
            : "border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-100"
        )}
      >
        Choose {plan.name}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}

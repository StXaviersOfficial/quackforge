"use client";

import * as React from "react";
import { Check, X, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks/use-currency";
import { useBooking } from "@/hooks/use-booking";

type Feature = {
  text: string;
  included: boolean;
};

type Tier = {
  id: string;
  name: string;
  usdPrice: number; // 0 means free, -1 means custom
  cadence: string;
  blurb: string;
  features: Feature[];
  excluded: string[];
  bestValue?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "demo",
    name: "Free Demo",
    usdPrice: 0,
    cadence: "one-time · 48 hours",
    blurb: "Clickable multi-page frontend prototype. Your copy + brand colors, fully navigable. No backend or forms wired yet. See it before you pay for it.",
    features: [
      { text: "Basic frontend design", included: true },
      { text: "Your copy + brand colors", included: true },
      { text: "Fully navigable multi-page", included: true },
      { text: "Mobile responsive layout", included: true },
      { text: "Deployed to live preview URL", included: true },
      { text: "2-day delivery window", included: true },
    ],
    excluded: [
      "No backend or forms wired",
      "No custom domain",
      "No source code handover until paid tier",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    usdPrice: 99,
    cadence: "one-time",
    blurb: "Multi-page site (up to 3 pages) with shared backend for the contact form. Subdomain hosting. Basic SEO.",
    features: [
      { text: "Up to 3 pages", included: true },
      { text: "Shared backend for contact form", included: true },
      { text: "Subdomain hosting (yourname.quackforge.app)", included: true },
      { text: "SSL certificate", included: true },
      { text: "Basic SEO meta + sitemap", included: true },
      { text: "Mobile responsive", included: true },
      { text: "2 revision rounds", included: true },
      { text: "Source code handover", included: true },
    ],
    excluded: [
      "No custom domain (use quackforge.app subdomain)",
      "No CMS or admin dashboard",
      "No Google OAuth login",
      "No edge logic / Cloudflare Workers",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    usdPrice: 249,
    cadence: "one-time",
    blurb: "Up to 5 pages with custom domain, dedicated hosting, CMS/admin dashboard, and Google OAuth login. The most-picked tier for small businesses.",
    features: [
      { text: "Up to 5 pages", included: true },
      { text: "Custom domain (yours.com)", included: true },
      { text: "Dedicated hosting (not shared)", included: true },
      { text: "CMS / admin dashboard", included: true },
      { text: "Google OAuth login", included: true },
      { text: "Firestore / Prisma backend", included: true },
      { text: "Contact form + email automation", included: true },
      { text: "Full SEO setup", included: true },
      { text: "3 revision rounds", included: true },
      { text: "Source code handover", included: true },
    ],
    excluded: [
      "No full web app or Android MVP",
      "No edge logic / Workers",
      "No technical SEO audit pass",
    ],
    bestValue: true,
  },
  {
    id: "pro",
    name: "Pro",
    usdPrice: 599,
    cadence: "one-time",
    blurb: "Full web app OR Android MVP with dedicated backend infrastructure, edge logic, technical SEO pass, and 90-day support.",
    features: [
      { text: "Full web app OR Android MVP", included: true },
      { text: "Dedicated backend infrastructure", included: true },
      { text: "Cloudflare Workers edge logic", included: true },
      { text: "Auth + payments + admin dashboard", included: true },
      { text: "Custom domain + deploys", included: true },
      { text: "Technical SEO audit + fixes", included: true },
      { text: "Analytics + monitoring setup", included: true },
      { text: "90-day post-launch support", included: true },
      { text: "Unlimited revisions during build", included: true },
      { text: "Source code + docs handover", included: true },
    ],
    excluded: [
      "No fully dedicated infrastructure (shared pool)",
      "No custom UI design system",
      "No ad campaign setup",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    usdPrice: 1499,
    cadence: "one-time",
    blurb: "Fully dedicated infrastructure (not shared with other clients), custom UI design system, SEO + ad campaign setup, priority team access.",
    features: [
      { text: "Fully dedicated infrastructure", included: true },
      { text: "Custom UI design system", included: true },
      { text: "SEO + ad campaign setup", included: true },
      { text: "Priority team access", included: true },
      { text: "Everything in Pro", included: true },
      { text: "Dedicated deployment pipeline", included: true },
      { text: "Custom integrations (CRM, ERP, etc.)", included: true },
      { text: "Brand identity refresh", included: true },
      { text: "180-day post-launch support", included: true },
      { text: "Source + docs + handover doc", included: true },
    ],
    excluded: [
      "No retainer engagement (see Enterprise)",
      "No dedicated account manager",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    usdPrice: -1,
    cadence: "retainer",
    blurb: "Dedicated account manager, retainer engagement, full growth system combining SEO + Ads + Automation. Built for ongoing partnership.",
    features: [
      { text: "Dedicated account manager", included: true },
      { text: "Retainer engagement (monthly)", included: true },
      { text: "Full growth system: SEO + Ads + Automation", included: true },
      { text: "Unlimited concurrent projects", included: true },
      { text: "Quarterly strategy reviews", included: true },
      { text: "Custom SLA + uptime guarantees", included: true },
      { text: "On-call engineering access", included: true },
      { text: "Source + docs + handover doc", included: true },
    ],
    excluded: [],
  },
];

export function Pricing() {
  const { currency, toggle, mounted, format } = useCurrency();
  const { openBooking } = useBooking();

  return (
    <section id="pricing" className="scroll-mt-16 py-16 sm:py-20 relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="eyebrow text-cyan-300 mb-3 flex items-center gap-2"
          >
            <span className="h-px w-8 bg-cyan-400/50" /> 02 · Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
          >
            Six tiers. <span className="text-gradient-cyan">Pick your fit.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.16, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-3 flex items-center gap-2 text-muted-foreground text-base"
          >
            <span>Showing prices in</span>
            <button
              onClick={toggle}
              className="font-mono text-cyan-300 hover:text-cyan-200 underline-offset-4 underline font-semibold"
            >
              {mounted ? currency.code : "USD"}
            </button>
            <span>· tap to switch</span>
          </motion.div>
        </div>

        {/* Desktop: 6 cards in horizontal row, wide cards */}
        {/* Mobile: playing-card stack */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-3">
          {TIERS.map((tier, i) => (
            <TierCard
              key={tier.id}
              tier={tier}
              index={i}
              formatPrice={(usd) => format(usd)}
              currencySymbol={currency.symbol}
              onChoose={() =>
                openBooking({
                  plan: tier.name,
                  price:
                    tier.usdPrice === 0
                      ? "Free"
                      : tier.usdPrice === -1
                      ? "Custom"
                      : format(tier.usdPrice),
                  budget: tier.id,
                })
              }
            />
          ))}
        </div>

        {/* Mobile: playing-card stack */}
        <div className="lg:hidden">
          <CardStack
            tiers={TIERS}
            formatPrice={(usd) => format(usd)}
            currencySymbol={currency.symbol}
            onChoose={(tier) =>
              openBooking({
                plan: tier.name,
                price:
                  tier.usdPrice === 0
                    ? "Free"
                    : tier.usdPrice === -1
                    ? "Custom"
                    : format(tier.usdPrice),
                budget: tier.id,
              })
            }
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 text-xs text-muted-foreground text-center max-w-2xl mx-auto"
        >
          Prices scale with the size and complexity of the build. The tier you
          pick is a starting point — final scope is locked in the discovery
          call before any payment.
        </motion.p>
      </div>
    </section>
  );
}

function TierCard({
  tier,
  index,
  formatPrice,
  currencySymbol,
  onChoose,
}: {
  tier: Tier;
  index: number;
  formatPrice: (usd: number) => string;
  currencySymbol: string;
  onChoose: () => void;
}) {
  const price =
    tier.usdPrice === -1 ? "Custom" : tier.usdPrice === 0 ? "Free" : formatPrice(tier.usdPrice);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={cn(
        "pricing-card-wide relative rounded-xl border bg-card p-5 transition-colors flex flex-col",
        tier.bestValue
          ? "border-cyan-400/60 glow-cyan-strong"
          : "border-border hover:border-cyan-400/40"
      )}
    >
      {tier.bestValue && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-400 text-background whitespace-nowrap">
            <Star className="h-2.5 w-2.5 fill-current" />
            Best Value
          </span>
        </div>
      )}

      <h3 className="text-base font-semibold tracking-tight mb-1">{tier.name}</h3>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold tracking-tight font-mono text-gradient-cyan">
          {price}
        </span>
      </div>
      <p className="text-[10px] font-mono text-muted-foreground mb-3">{tier.cadence}</p>

      <p className="text-[11px] text-muted-foreground leading-relaxed mb-4 min-h-[60px]">
        {tier.blurb}
      </p>

      {/* Included features */}
      <div className="feat-list mb-3 flex-1">
        {tier.features.map((f, i) => (
          <div key={i} className="feat-row">
            <Check className="feat-tick h-3.5 w-3.5" />
            <span className="feat-text">{f.text}</span>
          </div>
        ))}
      </div>

      {/* Excluded (not in demo — only paid tiers) */}
      {tier.excluded.length > 0 && (
        <div className="feat-list mb-4 pt-3 border-t border-border/50">
          {tier.excluded.map((ex, i) => (
            <div key={i} className="feat-row">
              <X className="feat-cross h-3.5 w-3.5" />
              <span className="feat-text muted text-[11px]">{ex}</span>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={onChoose}
        variant={tier.bestValue ? "default" : "outline"}
        className={cn(
          "w-full group text-xs h-9 mt-auto",
          tier.bestValue
            ? "bg-cyan-400 hover:bg-cyan-300 text-background border-0 font-semibold"
            : "border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-100"
        )}
      >
        Choose {tier.name}
        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
}

/* Mobile playing-card stack — 1 active, others peek behind */
function CardStack({
  tiers,
  formatPrice,
  currencySymbol,
  onChoose,
}: {
  tiers: Tier[];
  formatPrice: (usd: number) => string;
  currencySymbol: string;
  onChoose: (tier: Tier) => void;
}) {
  const [active, setActive] = React.useState(0);

  const getClass = (i: number) => {
    const diff = i - active;
    if (diff === 0) return "active";
    if (diff === -1) return "behind-left";
    if (diff === 1) return "behind-right";
    if (diff < -1) return "far-left";
    return "far-right";
  };

  return (
    <div className="card-stack">
      {tiers.map((tier, i) => {
        const cls = getClass(i);
        const price =
          tier.usdPrice === -1
            ? "Custom"
            : tier.usdPrice === 0
            ? "Free"
            : formatPrice(tier.usdPrice);

        return (
          <div
            key={tier.id}
            className={`playing-card ${cls}`}
            onClick={() => setActive(i)}
          >
            {tier.bestValue && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-400 text-background">
                  <Star className="h-2 w-2 fill-current" />
                  Best Value
                </span>
              </div>
            )}

            <h3 className="text-xl font-semibold tracking-tight mb-1">{tier.name}</h3>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold tracking-tight font-mono text-gradient-cyan">
                {price}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">{tier.cadence}</span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{tier.blurb}</p>

            <div className="feat-list mb-3">
              {tier.features.map((f, fi) => (
                <div key={fi} className="feat-row">
                  <Check className="feat-tick h-3.5 w-3.5" />
                  <span className="feat-text">{f.text}</span>
                </div>
              ))}
            </div>

            {tier.excluded.length > 0 && (
              <div className="feat-list mb-4 pt-3 border-t border-border/50">
                {tier.excluded.map((ex, ei) => (
                  <div key={ei} className="feat-row">
                    <X className="feat-cross h-3.5 w-3.5" />
                    <span className="feat-text muted">{ex}</span>
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={(e) => {
                e.stopPropagation();
                onChoose(tier);
              }}
              variant={tier.bestValue ? "default" : "outline"}
              className={cn(
                "w-full group text-sm h-10",
                tier.bestValue
                  ? "bg-cyan-400 hover:bg-cyan-300 text-background border-0 font-semibold"
                  : "border-cyan-400/40 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-100"
              )}
            >
              Choose {tier.name}
              <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        );
      })}

      {/* Navigation dots */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {tiers.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to tier ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active ? "w-6 bg-cyan-400" : "w-1.5 bg-muted-foreground/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { Check, X, ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks/use-currency";
import { useBooking } from "@/hooks/use-booking";

type Feature = { text: string; included: boolean };

type Tier = {
  id: string;
  name: string;
  usdPrice: number;
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
      { text: "Subdomain hosting", included: true },
      { text: "SSL certificate", included: true },
      { text: "Basic SEO meta + sitemap", included: true },
      { text: "Mobile responsive", included: true },
      { text: "2 revision rounds", included: true },
      { text: "Source code handover", included: true },
    ],
    excluded: [
      "No custom domain",
      "No CMS or admin dashboard",
      "No Google OAuth login",
      "No edge logic / Workers",
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
      { text: "Dedicated hosting", included: true },
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
      { text: "Auth + payments + admin", included: true },
      { text: "Custom domain + deploys", included: true },
      { text: "Technical SEO audit + fixes", included: true },
      { text: "Analytics + monitoring setup", included: true },
      { text: "90-day post-launch support", included: true },
      { text: "Unlimited revisions during build", included: true },
      { text: "Source code + docs handover", included: true },
    ],
    excluded: [
      "No fully dedicated infrastructure",
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
      { text: "Custom integrations", included: true },
      { text: "Brand identity refresh", included: true },
      { text: "180-day post-launch support", included: true },
      { text: "Source + docs + handover", included: true },
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
      { text: "Source + docs + handover", included: true },
    ],
    excluded: [],
  },
];

export function Pricing() {
  const { currency, setCurrency, toggle, mounted, format, countryName } = useCurrency();
  const { openBooking } = useBooking();
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [activeMobile, setActiveMobile] = React.useState(0);
  const holdTimer = React.useRef<NodeJS.Timeout | null>(null);
  const pickerWrapRef = React.useRef<HTMLDivElement>(null);

  // Hold for 2s → opens full picker
  const onMouseDown = () => {
    holdTimer.current = setTimeout(() => setPickerOpen(true), 2000);
  };
  const onMouseUp = () => {
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  };
  const onClick = () => {
    if (pickerOpen) {
      setPickerOpen(false);
      return;
    }
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
      toggle();
    }
  };

  React.useEffect(() => {
    if (!pickerOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (pickerWrapRef.current && !pickerWrapRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [pickerOpen]);

  // Mobile swipe handler — scroll wheel moves between cards
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const onWheel = (e: React.WheelEvent) => {
    // Only handle horizontal scroll intent
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 0 && activeMobile < TIERS.length - 1) {
        setActiveMobile((v) => v + 1);
      } else if (e.deltaX < 0 && activeMobile > 0) {
        setActiveMobile((v) => v - 1);
      }
    }
  };

  // Touch swipe for mobile
  const touchStartX = React.useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -40 && activeMobile < TIERS.length - 1) {
      setActiveMobile((v) => v + 1);
    } else if (delta > 40 && activeMobile > 0) {
      setActiveMobile((v) => v - 1);
    }
  };

  return (
    <section id="pricing" className="scroll-mt-16 py-16 sm:py-20 relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl mb-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="eyebrow text-primary mb-3 flex items-center gap-2"
          >
            <span className="h-px w-8 bg-primary/50" /> 02 · Pricing
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
            className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground"
          >
            <span>Prices in</span>
            <div ref={pickerWrapRef} className="relative inline-block">
              <button
                onClick={onClick}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onMouseDown}
                onTouchEnd={onMouseUp}
                className="font-mono text-primary hover:text-primary/80 underline-offset-4 underline font-semibold select-none cursor-pointer"
                title="Click to cycle · Hold 2s to open picker"
              >
                {mounted ? currency.code : "USD"} {currency.symbol}
              </button>
              <AnimatePresence>
                {pickerOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    className="currency-picker"
                  >
                    {[
                      { code: "USD", label: "USD — US Dollar", symbol: "$" },
                      { code: "INR", label: "INR — Indian Rupee", symbol: "₹" },
                      { code: "EUR", label: "EUR — Euro", symbol: "€" },
                      { code: "GBP", label: "GBP — British Pound", symbol: "£" },
                      { code: "CAD", label: "CAD — Canadian Dollar", symbol: "C$" },
                      { code: "AUD", label: "AUD — Australian Dollar", symbol: "A$" },
                    ].map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCurrency(c.code);
                          setPickerOpen(false);
                        }}
                        className={cn(currency.code === c.code && "active")}
                      >
                        {c.label} ({c.symbol})
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {countryName && (
              <span className="text-xs text-muted-foreground/80">
                · estimated from: {countryName}
              </span>
            )}
            <span className="text-xs text-muted-foreground/70 hidden sm:inline">
              · click to cycle, hold 2s to open picker
            </span>
          </motion.div>
        </div>

        {/* Desktop: 6 wide cards in grid — all same size, content fully visible (no scroll) */}
        <div className="hidden lg:grid lg:grid-cols-6 gap-3 items-stretch">
          {TIERS.map((tier, i) => (
            <TierCard
              key={tier.id}
              tier={tier}
              index={i}
              formatPrice={(usd) => format(usd, tier.id)}
              onChoose={() =>
                openBooking({
                  plan: tier.name,
                  price:
                    tier.usdPrice === 0 ? "Free"
                      : tier.usdPrice === -1 ? "Custom"
                      : format(tier.usdPrice, tier.id),
                  budget: tier.id,
                })
              }
            />
          ))}
        </div>

        {/* Mobile: playing-card stack with tilted peeking cards */}
        <div
          className="lg:hidden relative"
          onWheel={onWheel}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="card-stack">
            {TIERS.map((tier, i) => {
              const diff = i - activeMobile;
              const price =
                tier.usdPrice === -1 ? "Custom" : tier.usdPrice === 0 ? "Free" : format(tier.usdPrice, tier.id);

              // Compute transform based on diff — spring-animated for 60fps
              let transform: string;
              let opacity = 0;
              let zIndex = 0;
              let boxShadow = "0 10px 40px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(34,211,238,0.15)";
              if (diff === 0) {
                transform = "translateX(0px) translateZ(40px) rotateY(0deg) scale(1)";
                opacity = 1;
                zIndex = 10;
                boxShadow = "0 20px 60px -10px rgba(0,0,0,0.9), 0 0 0 1px rgba(34,211,238,0.6), 0 0 60px -8px rgba(34,211,238,0.6)";
              } else if (diff === -1) {
                transform = "translateX(-110px) translateZ(-30px) rotateY(18deg) scale(0.92)";
                opacity = 0.7;
                zIndex = 5;
              } else if (diff === 1) {
                transform = "translateX(110px) translateZ(-30px) rotateY(-18deg) scale(0.92)";
                opacity = 0.7;
                zIndex = 5;
              } else if (diff < -1) {
                transform = "translateX(-180px) translateZ(-60px) rotateY(28deg) scale(0.82)";
                opacity = 0.35;
                zIndex = 1;
              } else {
                transform = "translateX(180px) translateZ(-60px) rotateY(-28deg) scale(0.82)";
                opacity = 0.35;
                zIndex = 1;
              }

              return (
                <motion.div
                  key={tier.id}
                  className="playing-card"
                  style={{ zIndex }}
                  animate={{ transform, opacity, boxShadow }}
                  transition={{ type: "spring", stiffness: 280, damping: 28, mass: 1.0 }}
                  onClick={() => setActiveMobile(i)}
                >
                  {tier.bestValue && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-primary text-background">
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
                        <span className="feat-text text-xs">{f.text}</span>
                      </div>
                    ))}
                  </div>

                  {tier.excluded.length > 0 && (
                    <div className="feat-list mb-4 pt-3 border-t border-border/50">
                      {tier.excluded.map((ex, ei) => (
                        <div key={ei} className="feat-row">
                          <X className="feat-cross h-3.5 w-3.5" />
                          <span className="feat-text muted text-xs">{ex}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      openBooking({
                        plan: tier.name,
                        price:
                          tier.usdPrice === 0 ? "Free"
                            : tier.usdPrice === -1 ? "Custom"
                            : format(tier.usdPrice, tier.id),
                        budget: tier.id,
                      });
                    }}
                    variant={tier.bestValue ? "default" : "outline"}
                    className={cn(
                      "w-full group text-sm h-10 mt-auto",
                      tier.bestValue
                        ? "bg-primary hover:bg-primary/90 text-background border-0 font-semibold"
                        : "border-primary/40 text-primary/80 hover:bg-primary/10 hover:text-cyan-100"
                    )}
                  >
                    Choose {tier.name}
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Nav arrows + dots */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setActiveMobile((v) => Math.max(0, v - 1))}
              disabled={activeMobile === 0}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-card text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {TIERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveMobile(i)}
                  aria-label={`Go to tier ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === activeMobile ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40"
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveMobile((v) => Math.min(TIERS.length - 1, v + 1))}
              disabled={activeMobile === TIERS.length - 1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-card text-primary disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-2">
            Swipe left/right or use arrows · {activeMobile + 1} of {TIERS.length}
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 text-xs text-muted-foreground text-center max-w-2xl mx-auto"
        >
          Prices scale with the size and complexity of your project. The tier
          you pick is a starting point — we'll lock in the final scope together
          before any payment is due.
        </motion.p>
      </div>
    </section>
  );
}

function TierCard({
  tier,
  index,
  formatPrice,
  onChoose,
}: {
  tier: Tier;
  index: number;
  formatPrice: (usd: number) => string;
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
        "relative rounded-xl border bg-card p-4 transition-colors flex flex-col h-full",
        tier.bestValue
          ? "border-primary/60 glow-cyan-strong"
          : "border-border hover:border-primary/40"
      )}
    >
      {tier.bestValue && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary text-background whitespace-nowrap">
            <Star className="h-2.5 w-2.5 fill-current" />
            Best Value
          </span>
        </div>
      )}

      <h3 className="text-sm font-semibold tracking-tight mb-1">{tier.name}</h3>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-xl font-bold tracking-tight font-mono text-gradient-cyan">
          {price}
        </span>
      </div>
      <p className="text-[9px] font-mono text-muted-foreground mb-3">{tier.cadence}</p>

      <p className="text-[10px] text-muted-foreground leading-relaxed mb-3">
        {tier.blurb}
      </p>

      {/* Included features — fully visible, no scroll */}
      <div className="feat-list mb-2 flex-1">
        {tier.features.map((f, i) => (
          <div key={i} className="feat-row">
            <Check className="feat-tick h-3 w-3" />
            <span className="feat-text text-[10px]">{f.text}</span>
          </div>
        ))}
      </div>

      {tier.excluded.length > 0 && (
        <div className="feat-list mb-3 pt-2 border-t border-border/50">
          {tier.excluded.map((ex, i) => (
            <div key={i} className="feat-row">
              <X className="feat-cross h-3 w-3" />
              <span className="feat-text muted text-[9px]">{ex}</span>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={onChoose}
        variant={tier.bestValue ? "default" : "outline"}
        className={cn(
          "w-full group text-[11px] h-8 mt-auto",
          tier.bestValue
            ? "bg-primary hover:bg-primary/90 text-background border-0 font-semibold"
            : "border-primary/40 text-primary/80 hover:bg-primary/10 hover:text-cyan-100"
        )}
      >
        Choose {tier.name}
        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
}

function MobileTierCard({
  tier,
  formatPrice,
  onChoose,
}: {
  tier: Tier;
  formatPrice: (usd: number) => string;
  onChoose: () => void;
}) {
  const price =
    tier.usdPrice === -1 ? "Custom" : tier.usdPrice === 0 ? "Free" : formatPrice(tier.usdPrice);

  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-card p-6 flex flex-col",
        tier.bestValue
          ? "border-primary/60 glow-cyan-strong"
          : "border-border"
      )}
    >
      {tier.bestValue && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-mono font-bold bg-primary text-background whitespace-nowrap">
            <Star className="h-3 w-3 fill-current" />
            Best Value
          </span>
        </div>
      )}

      <h3 className="text-2xl font-semibold tracking-tight mb-1">{tier.name}</h3>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-4xl font-bold tracking-tight font-mono text-gradient-cyan">
          {price}
        </span>
        <span className="text-[11px] font-mono text-muted-foreground">{tier.cadence}</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{tier.blurb}</p>

      <div className="feat-list mb-4">
        {tier.features.map((f, i) => (
          <div key={i} className="feat-row">
            <Check className="feat-tick h-4 w-4" />
            <span className="feat-text text-sm">{f.text}</span>
          </div>
        ))}
      </div>

      {tier.excluded.length > 0 && (
        <div className="feat-list mb-5 pt-4 border-t border-border/50">
          {tier.excluded.map((ex, i) => (
            <div key={i} className="feat-row">
              <X className="feat-cross h-4 w-4" />
              <span className="feat-text muted text-sm">{ex}</span>
            </div>
          ))}
        </div>
      )}

      <Button
        onClick={onChoose}
        variant={tier.bestValue ? "default" : "outline"}
        className={cn(
          "w-full group text-base h-12 mt-auto",
          tier.bestValue
            ? "bg-primary hover:bg-primary/90 text-background border-0 font-semibold"
            : "border-primary/40 text-primary/80 hover:bg-primary/10 hover:text-cyan-100"
        )}
      >
        Choose {tier.name}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
}

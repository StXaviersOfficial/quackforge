"use client";

import {
  Code2,
  Smartphone,
  Search,
  Globe,
  Boxes,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import {
  StaggerGroup,
  FadeUp,
  TiltCard,
  HoverLift,
  GlowBorder,
} from "@/components/motion-primitives";
import { motion } from "framer-motion";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  stack: string[];
}

const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Web apps",
    desc: "Next.js + TypeScript apps with auth, payments, and dashboards. Dedicated backend infrastructure. Custom-built systems, not shared-tier shortcuts.",
    stack: ["Next.js 16", "TypeScript", "Tailwind", "Prisma"],
  },
  {
    icon: Smartphone,
    title: "Android apps",
    desc: "Native Android in Kotlin/Java with Gradle, Firebase Auth, REST sync, Material 3, and Play Store rollout.",
    stack: ["Kotlin", "Java", "Gradle", "Firebase"],
  },
  {
    icon: Search,
    title: "SEO ranking",
    desc: "Technical audits, Core Web Vitals, structured data, content architecture. Built to climb — not look pretty.",
    stack: ["Lighthouse", "Schema.org", "Sitemaps", "GA4"],
  },
  {
    icon: Globe,
    title: "Custom domains",
    desc: "DNS, SSL, redirects, apex/www canonicalization. Edge logic when you need A/B routing or geo rules.",
    stack: ["Cloudflare", "Vercel", "Caddy", "Let's Encrypt"],
  },
  {
    icon: Boxes,
    title: "Minecraft mods",
    desc: "Custom Forge / Fabric / Paper mods and server configs. Java-side, with build pipelines and CurseForge-ready artifacts.",
    stack: ["Java", "Forge", "Fabric", "Bukkit"],
  },
  {
    icon: Webhook,
    title: "APIs & integrations",
    desc: "REST endpoints, OAuth (Google, GitHub, Discord), webhooks, payment gateways. Edge functions for the cheap-and-fast tier.",
    stack: ["REST", "Google OAuth", "Stripe", "Workers"],
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerGroup className="max-w-2xl mb-10 sm:mb-12" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-cyan-400/50" /> 01 · Services
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Six things.{" "}
              <span className="text-gradient-cyan">Done properly.</span>
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mt-4 text-muted-foreground text-lg">
              Narrow focus, deep execution. Every engagement ships with source
              code and docs.
            </p>
          </FadeUp>
        </StaggerGroup>

        {/* Mobile: horizontal swipe carousel; Desktop: grid */}
        <div className="swipe-carousel flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="w-[85%] sm:w-[60%] md:w-auto"
              >
                <GlowBorder className="rounded-xl h-full">
                  <TiltCard
                    max={4}
                    className="h-full rounded-xl border border-border bg-card/95 p-6 hover:border-cyan-400/40 transition-colors"
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300"
                      >
                        <Icon className="h-5 w-5" />
                      </motion.div>
                      <h3 className="text-lg font-semibold tracking-tight pt-1.5">
                        {s.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {s.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </GlowBorder>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

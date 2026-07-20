"use client"

import {
  Code2,
  Smartphone,
  Search,
  Globe,
  Boxes,
  Webhook,
  type LucideIcon,
} from "lucide-react"
import {
  StaggerGroup,
  FadeUp,
  TiltCard,
  HoverLift,
  GlowBorder,
} from "@/components/motion-primitives"
import { motion } from "framer-motion"

interface Service {
  icon: LucideIcon
  title: string
  desc: string
  stack: string[]
  delay: number
}

const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Web apps",
    desc: "Next.js + TypeScript apps with auth, payments, and dashboards. Firestore or Prisma. Shipped to Vercel.",
    stack: ["Next.js 16", "TypeScript", "Tailwind", "Prisma"],
    delay: 0,
  },
  {
    icon: Smartphone,
    title: "Android apps",
    desc: "Native Android in Kotlin/Java with Gradle, Firebase Auth, REST sync, Play Store rollout. Material 3.",
    stack: ["Kotlin", "Java", "Gradle", "Firebase"],
    delay: 0.08,
  },
  {
    icon: Search,
    title: "SEO ranking",
    desc: "Technical audits, Core Web Vitals, structured data, content architecture. Built to climb — not look pretty.",
    stack: ["Lighthouse", "Schema.org", "Sitemaps", "GA4"],
    delay: 0.16,
  },
  {
    icon: Globe,
    title: "Custom domains",
    desc: "DNS, SSL, redirects, apex/www canonicalization. Cloudflare Workers when you need edge logic or A/B routing.",
    stack: ["Cloudflare", "Vercel", "Caddy", "Let's Encrypt"],
    delay: 0.24,
  },
  {
    icon: Boxes,
    title: "Minecraft mods",
    desc: "Custom Forge / Fabric / Paper mods and server configs. Java-side, with build pipelines and CurseForge artifacts.",
    stack: ["Java", "Forge", "Fabric", "Bukkit"],
    delay: 0.32,
  },
  {
    icon: Webhook,
    title: "APIs & integrations",
    desc: "REST endpoints, OAuth (Google, GitHub, Discord), webhooks, payment gateways. Workers for the cheap-and-fast tier.",
    stack: ["REST", "Google OAuth", "Stripe", "Workers"],
    delay: 0.4,
  },
]

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerGroup className="max-w-2xl mb-12" stagger={0.1}>
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
              code, docs, and a 30-day warranty.
            </p>
          </FadeUp>
        </StaggerGroup>

        <StaggerGroup
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          stagger={0.08}
        >
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <FadeUp key={s.title} delay={s.delay}>
                <GlowBorder className="rounded-xl">
                  <TiltCard
                    className="h-full rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6 hover:border-cyan-400/30 transition-colors"
                    max={4}
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/5 text-cyan-300"
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
                          className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background/60 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </GlowBorder>
              </FadeUp>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}

"use client"

import { ArrowUpRight } from "lucide-react"
import {
  StaggerGroup,
  FadeUp,
  TiltCard,
  HoverLift,
  BlurIn,
} from "@/components/motion-primitives"
import { motion } from "framer-motion"

interface Project {
  name: string
  kind: string
  year: string
  blurb: string
  stack: string[]
  metric: string
  delay: number
}

const PROJECTS: Project[] = [
  {
    name: "School management portal",
    kind: "Web app · Admin",
    year: "2025",
    blurb:
      "Next.js + Firebase portal for 1,200+ students. Fees, notices, timetable, enquiries, admin replies. Role-based auth.",
    stack: ["Next.js", "Firestore", "Vercel", "Tailwind"],
    metric: "1.2k+ users",
    delay: 0,
  },
  {
    name: "Hand cricket multiplayer",
    kind: "Web game · Realtime",
    year: "2025",
    blurb:
      "Browser game with realtime sync. Cloudflare Workers for matchmaking, sub-100ms latency per turn.",
    stack: ["Next.js", "Workers", "Firestore", "Socket.io"],
    metric: "<100ms p95",
    delay: 0.12,
  },
  {
    name: "Android school companion",
    kind: "Android · Native",
    year: "2024",
    blurb:
      "Kotlin app with Firebase Auth, push notifications, offline-first timetable, Play Store rollout. Material 3.",
    stack: ["Kotlin", "Firebase", "Gradle", "Material 3"],
    metric: "4.6★ rating",
    delay: 0.24,
  },
  {
    name: "Minecraft mod pack",
    kind: "Java mod · Forge",
    year: "2024",
    blurb:
      "Custom Forge mod: 14 new items, 3 biomes, progression system. Java 17, automated CurseForge packaging.",
    stack: ["Java", "Forge", "Gradle", "CurseForge"],
    metric: "8k+ downloads",
    delay: 0.36,
  },
  {
    name: "SEO ranking sprint",
    kind: "SEO · Technical",
    year: "2025",
    blurb:
      "Regional services site from page 4 to top-3 for 11 target keywords in 90 days. Technical audit + content architecture.",
    stack: ["Lighthouse", "Schema.org", "GA4", "Search Console"],
    metric: "11 KWs top-3",
    delay: 0.48,
  },
  {
    name: "Auth microservice",
    kind: "API · Edge",
    year: "2025",
    blurb:
      "Cloudflare Workers auth gateway: Google OAuth, JWT issuance, rate limiting for 4 downstream apps. 47ms p95.",
    stack: ["Workers", "Google OAuth", "JWT", "KV"],
    metric: "47ms p95",
    delay: 0.6,
  },
]

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerGroup
          className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
          stagger={0.1}
        >
          <FadeUp>
            <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-cyan-400/50" /> 03 · Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Selected <span className="text-gradient-cyan">projects.</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-md">
              Live case studies land as NDA windows close. Stack and outcomes are
              real — names anonymized.
            </p>
          </FadeUp>
        </StaggerGroup>

        <StaggerGroup
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          stagger={0.1}
        >
          {PROJECTS.map((p) => (
            <BlurIn key={p.name} delay={p.delay}>
              <HoverLift y={-4}>
                <TiltCard
                  max={5}
                  className="group relative h-full rounded-xl border border-border bg-card/60 backdrop-blur-sm p-6 sm:p-7 hover:border-cyan-400/40 transition-colors overflow-hidden"
                >
                  {/* hover gradient bg */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(0, 229, 255, 0.08), transparent 60%)",
                    }}
                  />

                  <div className="relative flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-cyan-300/80">
                      {p.kind}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-300">
                        {p.metric}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {p.year}
                      </span>
                    </div>
                  </div>

                  <h3 className="relative text-xl font-semibold tracking-tight mb-2.5 pr-8">
                    {p.name}
                  </h3>

                  <p className="relative text-sm text-muted-foreground leading-relaxed mb-5">
                    {p.blurb}
                  </p>

                  <div className="relative flex flex-wrap gap-1.5">
                    {p.stack.map((s, i) => (
                      <motion.span
                        key={s}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: p.delay + 0.1 + i * 0.05 }}
                        className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background/60 text-muted-foreground"
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>

                  <span className="absolute top-5 right-5 inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground group-hover:text-cyan-300 group-hover:border-cyan-400 transition-colors">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </TiltCard>
              </HoverLift>
            </BlurIn>
          ))}
        </StaggerGroup>

        <FadeUp>
          <p className="mt-8 text-sm text-muted-foreground text-center">
            Want a deeper dive?{" "}
            <a
              href="#contact"
              className="text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline"
            >
              Ask for the case study deck
            </a>
            .
          </p>
        </FadeUp>
      </div>
    </section>
  )
}

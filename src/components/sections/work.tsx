"use client";

import { ArrowUpRight, Zap } from "lucide-react";
import { StaggerGroup, FadeUp, TiltCard, HoverLift, BlurIn } from "@/components/motion-primitives";
import { motion } from "framer-motion";

interface Project {
  name: string;
  kind: string;
  year: string;
  blurb: string;
  stack: string[];
  metric: string;
  outcome: string;
}

const PROJECTS: Project[] = [
  {
    name: "School management portal",
    kind: "Web app · Admin",
    year: "2025",
    blurb:
      "Next.js portal for 1,200+ students. Fees, notices, timetable, enquiries, admin replies. Role-based auth.",
    stack: ["Next.js", "Firestore", "Vercel", "Tailwind"],
    metric: "1.2k+ users",
    outcome: "Discovery → Demo → Build → Ship → Maintain",
  },
  {
    name: "Hand cricket multiplayer",
    kind: "Web game · Realtime",
    year: "2025",
    blurb:
      "Browser game with realtime sync. Edge functions for matchmaking, sub-100ms latency per turn.",
    stack: ["Next.js", "Workers", "Firestore", "Socket.io"],
    metric: "<100ms p95",
    outcome: "Discovery → Demo → Build → Ship → Maintain",
  },
  {
    name: "Android school companion",
    kind: "Android · Native",
    year: "2024",
    blurb:
      "Kotlin app with Firebase Auth, push notifications, offline-first timetable, Play Store rollout. Material 3.",
    stack: ["Kotlin", "Firebase", "Gradle", "Material 3"],
    metric: "4.6★ rating",
    outcome: "Discovery → Demo → Build → Ship → Maintain",
  },
  {
    name: "Minecraft mod pack",
    kind: "Java mod · Forge",
    year: "2024",
    blurb:
      "Custom Forge mod: 14 new items, 3 biomes, progression system. Java 17, automated CurseForge packaging.",
    stack: ["Java", "Forge", "Gradle", "CurseForge"],
    metric: "8k+ downloads",
    outcome: "Discovery → Demo → Build → Ship → Maintain",
  },
  {
    name: "SEO ranking sprint",
    kind: "SEO · Technical",
    year: "2025",
    blurb:
      "Regional services site from page 4 to top-3 for 11 target keywords in 90 days. Technical audit + content architecture.",
    stack: ["Lighthouse", "Schema.org", "GA4", "Search Console"],
    metric: "11 KWs top-3",
    outcome: "Discovery → Demo → Build → Ship → Maintain",
  },
  {
    name: "Auth microservice",
    kind: "API · Edge",
    year: "2025",
    blurb:
      "Auth gateway: Google OAuth, JWT issuance, rate limiting for 4 downstream apps. 47ms p95 response.",
    stack: ["Workers", "Google OAuth", "JWT", "KV"],
    metric: "47ms p95",
    outcome: "Discovery → Demo → Build → Ship → Maintain",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery",
    duration: "Day 0",
    desc: "30-min call. Tell us what to ship, who it's for, the deadline. Written brief same day.",
  },
  {
    num: "02",
    title: "Demo",
    duration: "Day 1–2",
    desc: "Working demo with your copy and brand colors. You see what you're getting before paying for the full build.",
  },
  {
    num: "03",
    title: "Build",
    duration: "Week 1–4",
    desc: "Full implementation. Weekly check-ins, shared board, source pushed to a private GitHub repo you own.",
  },
  {
    num: "04",
    title: "Ship",
    duration: "Final week",
    desc: "Deploy to your custom domain. SSL, CDN, redirects, analytics. Lighthouse pass. Sitemap to Search Console.",
  },
  {
    num: "05",
    title: "Maintain",
    duration: "30–90 days",
    desc: "Post-launch support. Bugs fixed free. Questions answered same-day. Optional care plan for ongoing changes.",
  },
];

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerGroup className="max-w-2xl mb-10 sm:mb-12" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-cyan-400/50" /> 04 · Work &amp; Process
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Selected <span className="text-gradient-cyan">projects.</span>
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mt-4 text-muted-foreground text-lg">
              Real stack and outcomes. Live case studies land as NDA windows close.
            </p>
          </FadeUp>
        </StaggerGroup>

        {/* Projects — mobile swipe carousel, desktop grid */}
        <div className="swipe-carousel flex gap-4 overflow-x-auto md:grid md:grid-cols-2 md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0 mb-16 md:mb-24">
          {PROJECTS.map((p, i) => (
            <BlurIn key={p.name} delay={i * 0.08}>
              <div className="w-[85%] sm:w-[60%] md:w-auto">
                <HoverLift y={-4}>
                  <TiltCard
                    max={5}
                    className="group relative h-full rounded-xl border border-border bg-card p-6 hover:border-cyan-400/40 transition-colors overflow-hidden"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.10), transparent 60%)",
                      }}
                    />
                    <div className="relative flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono text-cyan-300">{p.kind}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-300">
                          {p.metric}
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground">{p.year}</span>
                      </div>
                    </div>
                    <h3 className="relative text-xl font-semibold tracking-tight mb-2.5 pr-8">
                      {p.name}
                    </h3>
                    <p className="relative text-sm text-muted-foreground leading-relaxed mb-5">
                      {p.blurb}
                    </p>
                    <div className="relative flex flex-wrap gap-1.5">
                      {p.stack.map((s, idx) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 + 0.1 + idx * 0.04 }}
                          className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background text-muted-foreground"
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
              </div>
            </BlurIn>
          ))}
        </div>

        {/* Process — horizontal 5-step strip */}
        <FadeUp>
          <div className="border-t border-border pt-12 sm:pt-16">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-2">
              Every project follows the <span className="text-gradient-cyan">same loop.</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-8">
              You always know what's happening, what's next, and what you're paying for.
            </p>
            <div className="swipe-carousel flex gap-4 overflow-x-auto md:grid md:grid-cols-5 md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="w-[70%] sm:w-[40%] md:w-auto"
                >
                  <div className="rounded-lg border border-border bg-card p-5 hover:border-cyan-400/40 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-cyan-300">{step.num}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300">
                        {step.duration}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold tracking-tight mb-2">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

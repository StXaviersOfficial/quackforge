"use client";

import {
  Code2, Smartphone, Search, Globe, Boxes, Webhook,
  Bot, Zap, FileCode2, Brain, MessageSquare, Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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
    desc: "Next.js + TypeScript apps with auth, payments, dashboards. SSR, App Router, Prisma/Firestore.",
    stack: ["Next.js 16", "TypeScript", "Tailwind", "Prisma"],
  },
  {
    icon: FileCode2,
    title: "HTML/CSS sites",
    desc: "Pure HTML/CSS/JS sites — fast to load, easy to host, zero framework dependencies.",
    stack: ["HTML5", "CSS3", "Vanilla JS", "Vite"],
  },
  {
    icon: Smartphone,
    title: "Android apps",
    desc: "Native Android in Kotlin/Java with Gradle, Firebase Auth, REST sync, Material 3, Play Store.",
    stack: ["Kotlin", "Java", "Gradle", "Material 3"],
  },
  {
    icon: Search,
    title: "SEO ranking",
    desc: "Technical audits, Core Web Vitals, structured data, content architecture, keyword tracking.",
    stack: ["Lighthouse", "Schema.org", "GA4", "Search Console"],
  },
  {
    icon: Globe,
    title: "Custom domains",
    desc: "DNS, SSL, redirects, apex/www canonicalization. Edge logic for A/B routing or geo rules.",
    stack: ["Cloudflare", "Vercel", "Caddy", "Let's Encrypt"],
  },
  {
    icon: Boxes,
    title: "Minecraft mods",
    desc: "Custom Forge / Fabric / Paper mods and server configs. Build pipelines + CurseForge artifacts.",
    stack: ["Java", "Forge", "Fabric", "Bukkit"],
  },
  {
    icon: Bot,
    title: "Discord bots",
    desc: "Custom Discord bots — moderation, automation, tickets, music, roles. Slash commands + modals.",
    stack: ["Discord.js", "Node.js", "Slash Commands", "SQLite"],
  },
  {
    icon: MessageSquare,
    title: "Telegram & WhatsApp",
    desc: "Telegram bot for orders/support. WhatsApp Business API automation for lead capture + follow-ups.",
    stack: ["Telegraf", "WhatsApp API", "Webhooks", "Node.js"],
  },
  {
    icon: Webhook,
    title: "APIs & integrations",
    desc: "REST endpoints, OAuth (Google/GitHub/Discord), webhooks, payment gateways. Edge functions.",
    stack: ["REST", "Google OAuth", "Stripe", "Workers"],
  },
  {
    icon: Brain,
    title: "AI integrations",
    desc: "LLM chatbots, image generation, AI agents. Chat, search, content generation, classification.",
    stack: ["OpenAI", "Claude", "Gemini", "Vector DB"],
  },
  {
    icon: Workflow,
    title: "Automation",
    desc: "Python/Node scripts that automate boring work — scraping, data sync, scheduled reports, ETL.",
    stack: ["Python", "Node.js", "Cron", "Puppeteer"],
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Slow site? We profile, identify bottlenecks, ship fixes. Lighthouse 95+ targets, RUM setup.",
    stack: ["Lighthouse", "WebPageTest", "DevTools", "RUM"],
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  const total = SERVICES.length;
  // Fan layout: each card offset slightly with rotation
  // Center the active card; others fan around it
  const spread = 14; // degrees between cards visually
  const radius = 600; // px radius of fan

  return (
    <section id="services" className="scroll-mt-16 py-16 sm:py-20 relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="eyebrow text-cyan-300 mb-3 flex items-center gap-2"
          >
            <span className="h-px w-8 bg-cyan-400/50" /> 01 · Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
          >
            Twelve things. <span className="text-gradient-cyan">Done properly.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.16, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-3 text-muted-foreground text-base sm:text-lg"
          >
            Hover or tap any card to bring it forward. All services are independent — pick what you need.
          </motion.p>
        </div>

        {/* Fan of cards — desktop */}
        <div className="hidden md:flex fan-cards">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            // Calculate fan position — center the active card
            const offset = i - active;
            const rotate = offset * spread;
            const translateX = offset * 50;
            const translateY = Math.abs(offset) * 12;
            const isActive = i === active;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: i * 0.04,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="fan-card"
                style={{
                  transform: `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`,
                  zIndex: isActive ? 10 : 5 - Math.abs(offset),
                  opacity: isActive ? 1 : 0.75,
                }}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                <div
                  className="fan-card-inner"
                  style={{
                    boxShadow: isActive
                      ? "0 12px 48px -8px rgba(0,0,0,0.8), 0 0 0 1px rgba(34,211,238,0.6), 0 0 40px -8px rgba(34,211,238,0.5)"
                      : "0 8px 32px -8px rgba(0,0,0,0.8), 0 0 0 1px rgba(34,211,238,0.15)",
                  }}
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight mb-2">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{s.desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {s.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border bg-background text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: vertical list (cards) */}
        <div className="md:hidden flex flex-col gap-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="rounded-xl border border-border bg-card hover:border-cyan-400/40 transition-colors p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold tracking-tight mb-1">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">{s.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {s.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border bg-background text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

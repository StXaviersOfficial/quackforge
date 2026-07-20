"use client";

import {
  Code2, Smartphone, Search, Globe, Boxes, Webhook,
  Bot, Zap, FileCode2, Brain, MessageSquare, Workflow,
  type LucideIcon,
} from "lucide-react";
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
    title: "Web apps (React/Next.js)",
    desc: "Next.js + TypeScript apps with auth, payments, and dashboards. SSR, App Router, Prisma/Firestore.",
    stack: ["Next.js 16", "TypeScript", "Tailwind", "Prisma"],
  },
  {
    icon: FileCode2,
    title: "Static HTML/CSS sites",
    desc: "Pure HTML/CSS/JS sites when you don't need a framework — fast to load, easy to host, zero dependencies.",
    stack: ["HTML5", "CSS3", "Vanilla JS", "Vite"],
  },
  {
    icon: Smartphone,
    title: "Android apps",
    desc: "Native Android in Kotlin or Java with Gradle, Firebase Auth, REST sync, Material 3, Play Store rollout.",
    stack: ["Kotlin", "Java", "Gradle", "Material 3"],
  },
  {
    icon: Search,
    title: "SEO ranking",
    desc: "Technical audits, Core Web Vitals, structured data, content architecture, keyword tracking. Built to climb.",
    stack: ["Lighthouse", "Schema.org", "GA4", "Search Console"],
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
    icon: Bot,
    title: "Discord bots",
    desc: "Custom Discord bots — moderation, automation, ticket systems, music, role management. Slash commands, buttons, modals.",
    stack: ["Discord.js", "Node.js", "Slash Commands", "SQLite"],
  },
  {
    icon: MessageSquare,
    title: "Telegram & WhatsApp bots",
    desc: "Telegram bot for orders, support, content delivery. WhatsApp Business API automation for lead capture and follow-ups.",
    stack: ["Telegraf", "WhatsApp API", "Webhooks", "Node.js"],
  },
  {
    icon: Webhook,
    title: "APIs & integrations",
    desc: "REST endpoints, OAuth (Google, GitHub, Discord), webhooks, payment gateways. Edge functions for the cheap-and-fast tier.",
    stack: ["REST", "Google OAuth", "Stripe", "Workers"],
  },
  {
    icon: Brain,
    title: "AI integrations",
    desc: "LLM chatbots, image generation, AI agents. Bring AI into your product — chat, search, content generation, classification.",
    stack: ["OpenAI", "Claude", "Gemini", "Vector DB"],
  },
  {
    icon: Workflow,
    title: "Automation scripts",
    desc: "Python/Node scripts that automate boring work — scraping, data sync, scheduled reports, file processing, ETL pipelines.",
    stack: ["Python", "Node.js", "Cron", "Puppeteer"],
  },
  {
    icon: Zap,
    title: "Performance audits",
    desc: "Slow site? We profile, identify bottlenecks, and ship fixes. Lighthouse 95+ targets, real user monitoring setup.",
    stack: ["Lighthouse", "WebPageTest", "DevTools", "RUM"],
  },
];

export function Services() {
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
            Narrow focus, deep execution. Every engagement ships with source code and docs.
          </motion.p>
        </div>

        {/* Desktop: grid 4 cols. Mobile: 2 cols compact grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: (i % 4) * 0.05,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group rounded-xl border border-border bg-card hover:border-cyan-400/40 transition-colors p-4 sm:p-5"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 mb-3"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.div>
                <h3 className="text-sm sm:text-base font-semibold tracking-tight mb-1.5 leading-tight">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">
                  {s.desc}
                </p>
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

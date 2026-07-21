"use client";

import { motion } from "framer-motion";

// Just the tech-stack chips — no cards.
// Each chip is clickable → opens booking modal with that service pre-selected.
const TECH_STACK = [
  { name: "Next.js 16", category: "Web apps" },
  { name: "TypeScript", category: "Web apps" },
  { name: "HTML5", category: "Static sites" },
  { name: "CSS3", category: "Static sites" },
  { name: "Tailwind 4", category: "Web apps" },
  { name: "Kotlin", category: "Android" },
  { name: "Java", category: "Android" },
  { name: "Gradle", category: "Android" },
  { name: "Material 3", category: "Android" },
  { name: "Python", category: "Automation" },
  { name: "Node.js", category: "Backend" },
  { name: "Firebase", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "Cloudflare Workers", category: "Edge" },
  { name: "Google OAuth", category: "Auth" },
  { name: "Stripe", category: "Payments" },
  { name: "REST APIs", category: "Integrations" },
  { name: "Discord.js", category: "Bots" },
  { name: "Telegraf", category: "Bots" },
  { name: "WhatsApp API", category: "Bots" },
  { name: "OpenAI", category: "AI" },
  { name: "Claude", category: "AI" },
  { name: "Gemini", category: "AI" },
  { name: "Forge", category: "Minecraft" },
  { name: "Fabric", category: "Minecraft" },
  { name: "Bukkit", category: "Minecraft" },
  { name: "Lighthouse", category: "SEO" },
  { name: "Schema.org", category: "SEO" },
  { name: "GA4", category: "SEO" },
  { name: "Search Console", category: "SEO" },
  { name: "Vercel", category: "Deploy" },
  { name: "Caddy", category: "Deploy" },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 py-16 sm:py-20 relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl mb-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="eyebrow text-cyan-300 mb-3 flex items-center gap-2"
          >
            <span className="h-px w-8 bg-cyan-400/50" /> 01 · What we work with
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-3xl sm:text-4xl font-semibold tracking-tight"
          >
            The stack <span className="text-gradient-cyan">we ship.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.16, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="mt-3 text-muted-foreground text-base sm:text-lg"
          >
            Web apps, static sites, Android, SEO, custom domains, mods, Discord/Telegram/WhatsApp bots, AI integrations, automation. Pick the project — we bring the right tools.
          </motion.p>
        </div>

        {/* Just the tech-stack chips — no cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.025 } },
          }}
          className="flex flex-wrap gap-2.5"
        >
          {TECH_STACK.map((tech) => (
            <motion.span
              key={tech.name}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-cyan-400/25 bg-card hover:border-cyan-400/60 hover:bg-cyan-400/5 transition-colors cursor-default"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-shadow" />
              <span className="text-sm font-mono text-foreground/90">{tech.name}</span>
              <span className="text-[10px] font-mono text-muted-foreground/70 hidden sm:inline">
                · {tech.category}
              </span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

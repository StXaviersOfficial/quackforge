"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/motion-primitives";

const TECH_STACK = [
  "Next.js 16", "TypeScript", "HTML5", "CSS3", "Tailwind 4",
  "Kotlin", "Java", "Gradle", "Material 3", "Python",
  "Node.js", "Firebase", "Prisma", "Cloudflare Workers", "Google OAuth",
  "Stripe", "REST APIs", "Discord.js", "Telegraf", "WhatsApp API",
  "OpenAI", "Claude", "Gemini", "Forge", "Fabric",
  "Bukkit", "Lighthouse", "Schema.org", "GA4", "Search Console",
  "Vercel", "Caddy",
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
            className="eyebrow text-primary mb-3 flex items-center gap-2"
          >
            <span className="h-px w-8 bg-primary/50" /> 01 · What we work with
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
            Websites, apps, SEO, custom domains, automation, and more. Whatever
            your project needs, we have the tools and experience to deliver.
          </motion.p>
        </div>
      </div>

      {/* Tech strip — single smooth marquee */}
      <div className="relative overflow-hidden py-6 border-y border-primary/20 bg-card/30">
        {/* Edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

        {/* Single row — scrolling left, smooth linear loop */}
        <div className="relative py-2">
          <Marquee speed={45} direction="left">
            {TECH_STACK.map((tech, i) => (
              <TechChip key={`r1-${i}`} tech={tech} />
            ))}
          </Marquee>
        </div>

        {/* Center glow accent */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34,211,238,0.08), transparent 70%)",
          }}
        />
      </div>
    </section>
  );
}

function TechChip({ tech, variant = "default" }: { tech: string; variant?: "default" | "alt" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={`group inline-flex items-center gap-2.5 mx-2 px-4 py-2.5 rounded-xl border transition-colors cursor-default ${
        variant === "alt"
          ? "border-primary/20 bg-background/60 hover:border-primary/50 hover:bg-primary/5"
          : "border-primary/25 bg-card hover:border-primary/60 hover:bg-primary/5"
      }`}
    >
      {/* Animated dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
      </span>
      <span className="text-sm font-mono text-foreground/90 whitespace-nowrap">{tech}</span>
    </motion.div>
  );
}

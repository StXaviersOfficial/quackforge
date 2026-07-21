"use client";

import { Code2, Palette, Server, Headset } from "lucide-react";
import { StaggerGroup, FadeUp } from "@/components/motion-primitives";
import { motion } from "framer-motion";

interface Role {
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ROLES: Role[] = [
  {
    title: "Lead Development",
    body:
      "Architecture, code quality, the technical decisions that keep your product fast and maintainable long after launch.",
    icon: Code2,
  },
  {
    title: "Design & Frontend",
    body:
      "The interface your users actually touch. Built to convert, not just to look good in a screenshot.",
    icon: Palette,
  },
  {
    title: "Backend & Infrastructure",
    body:
      "Servers, databases, deployments, security. The part clients never see and should never have to think about.",
    icon: Server,
  },
  {
    title: "Client Success",
    body:
      "One point of contact, from first call to post-launch support. You're never chasing down whoever's free.",
    icon: Headset,
  },
];

export function Team() {
  return (
    <section id="team" className="scroll-mt-16 py-16 sm:py-20 relative border-t border-border/50">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <StaggerGroup className="max-w-3xl mb-8 sm:mb-10" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-cyan-400/50" /> 04 · Team
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Who <span className="text-gradient-cyan">builds it.</span>
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
              QuackForge brings together the right people for each project —
              not a fixed team. Your project gets the specialists it actually
              needs, no more, no less.
            </p>
          </FadeUp>
        </StaggerGroup>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {ROLES.map((role, i) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="rounded-xl border border-border bg-card p-5 hover:border-cyan-400/40 transition-colors"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold tracking-tight mb-2">{role.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{role.body}</p>
              </motion.div>
            );
          })}
        </div>

        <FadeUp delay={0.2}>
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            Smaller projects move fast with a tight team. Larger projects bring
            in additional specialists as needed — you get the right team size
            for the work, not extra people inflating the cost.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

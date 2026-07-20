"use client";

import { Code2, Palette, Server, Headset } from "lucide-react";
import { StaggerGroup, FadeUp, TiltCard, HoverLift } from "@/components/motion-primitives";
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
    <section id="team" className="scroll-mt-16 py-20 sm:py-28 relative border-t border-border/50">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerGroup className="max-w-3xl mb-10 sm:mb-12" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-cyan-400/50" /> 06 · Team
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Who <span className="text-gradient-cyan">builds it.</span>
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              QuackForge runs on defined roles, not a fixed roster — the right
              people are on your project based on what it needs.
            </p>
          </FadeUp>
        </StaggerGroup>

        <div className="swipe-carousel flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0 mb-12">
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
                className="w-[80%] sm:w-[50%] md:w-auto"
              >
                <HoverLift y={-3}>
                  <TiltCard
                    max={4}
                    className="h-full rounded-xl border border-border bg-card p-6 hover:border-cyan-400/40 transition-colors"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight mb-2">{role.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{role.body}</p>
                  </TiltCard>
                </HoverLift>
              </motion.div>
            );
          })}
        </div>

        <FadeUp delay={0.2}>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Small projects move fast with a tight loop. Larger builds bring in
            the right specialists as scope demands — you get the team size the
            work actually needs, not a fixed headcount padding the invoice.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

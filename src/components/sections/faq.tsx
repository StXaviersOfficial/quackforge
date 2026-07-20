"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { StaggerGroup, FadeUp, RevealOnTap } from "@/components/motion-primitives";
import { motion } from "framer-motion";

interface QA {
  q: string;
  a: string;
}

const FAQS: QA[] = [
  {
    q: "How fast can you ship a demo?",
    a: "Two business days. You get a clickable multi-page frontend prototype with your copy and brand colors, deployed to a live preview URL. No backend or forms wired yet at this tier — see it before you pay for it.",
  },
  {
    q: "What's in the $99 Starter tier?",
    a: "A multi-page site (up to 3 pages), shared backend for contact form, subdomain hosting, and basic SEO. No custom domain at this tier — that kicks in at the Growth tier.",
  },
  {
    q: "Do you build Android apps?",
    a: "Yes. Native Android in Kotlin or Java with Gradle builds, Firebase Auth, REST sync, Material 3, and Play Store rollout. Covered under the Pro tier or a custom quote.",
  },
  {
    q: "Who owns the source code?",
    a: "You do. From day one, source is pushed to a private GitHub repo you own. All paid tiers include full source handover on completion.",
  },
  {
    q: "What's the fastest way to reach the team?",
    a: "Discord. Join https://discord.gg/VhKgEetwr8 and message the team directly. Email works too: quackeditzofficial@gmail.com. Response window is 24 hours.",
  },
  {
    q: "Do you take on retainers after launch?",
    a: "Yes. The Care Basic and Care Complete plans cover ongoing maintenance, monitoring, and content edits. Larger retainers are available for continuous development work.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-16 py-20 sm:py-28 relative">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <StaggerGroup className="text-center mb-10 sm:mb-12" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2 justify-center">
              <span className="h-px w-8 bg-cyan-400/50" /> 07 · FAQ
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Common <span className="text-gradient-cyan">questions.</span>
            </h2>
          </FadeUp>
        </StaggerGroup>

        <StaggerGroup className="space-y-3" stagger={0.06}>
          {FAQS.map((item, i) => (
            <FadeUp key={i}>
              <div className="rounded-xl border border-border bg-card overflow-hidden hover:border-cyan-400/30 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  aria-expanded={openIndex === i}
                >
                  <h3 className="text-sm sm:text-base font-medium">{item.q}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="shrink-0 text-cyan-300"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === i ? "auto" : 0,
                    opacity: openIndex === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                    {item.a}
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

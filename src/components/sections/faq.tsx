"use client";

import * as React from "react";
import { ChevronDown, Mail } from "lucide-react";
import { StaggerGroup, FadeUp } from "@/components/motion-primitives";
import { motion, AnimatePresence } from "framer-motion";
import { DiscordLogo } from "@/components/discord-fab";

interface QA {
  q: string;
  a: React.ReactNode;
}

const FAQS: QA[] = [
  {
    q: "How fast can you ship a demo?",
    a: (
      <>
        Two business days. You get a clickable multi-page frontend prototype
        with your copy and brand colors, deployed to a live preview URL. No
        backend or forms wired yet at this tier — see it before you pay for it.
      </>
    ),
  },
  {
    q: "What's in the $99 Starter tier?",
    a: (
      <>
        A multi-page site (up to 3 pages), shared backend for the contact form,
        subdomain hosting, and basic SEO. No custom domain at this tier — that
        kicks in at the Growth tier.
      </>
    ),
  },
  {
    q: "Do you build Android apps?",
    a: (
      <>
        Yes. Native Android in Kotlin or Java with Gradle builds, Firebase
        Auth, REST sync, Material 3, and Play Store rollout. Covered under the
        Pro tier or a custom quote.
      </>
    ),
  },
  {
    q: "Who owns the source code?",
    a: (
      <>
        You do. From day one, source is pushed to a private GitHub repo you
        own. All paid tiers include full source handover on completion.
      </>
    ),
  },
  {
    q: "What's the fastest way to reach the team?",
    a: (
      <>
        <a
          href="https://discord.gg/VhKgEetwr8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[#7984F5] hover:text-[#8E99F5] underline-offset-4 underline font-medium"
        >
          <DiscordLogo className="h-3.5 w-3.5 inline" />
          Join our Discord server
        </a>{" "}
        for the fastest response — usually within minutes. You can also{" "}
        <a
          href="mailto:quackforgeofficial@gmail.com?subject=Project%20enquiry%20from%20QuackForge%20FAQ"
          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 underline-offset-4 underline font-medium"
        >
          <Mail className="h-3.5 w-3.5 inline" />
          email the team
        </a>{" "}
        at quackforgeofficial@gmail.com. Response window is 24 hours.
      </>
    ),
  },
  {
    q: "Do you take on retainers after launch?",
    a: (
      <>
        Yes. The Care Basic and Care Complete plans cover ongoing maintenance,
        monitoring, and content edits. Larger retainers are available for
        continuous development work.
      </>
    ),
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-16 py-16 sm:py-20 relative">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <StaggerGroup className="text-center mb-8 sm:mb-10" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-primary mb-3 flex items-center gap-2 justify-center">
              <span className="h-px w-8 bg-primary/50" /> 05 · FAQ
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
              <div className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
                  aria-expanded={openIndex === i}
                >
                  <h3 className="text-sm sm:text-base font-medium">{item.q}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="shrink-0 text-primary"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

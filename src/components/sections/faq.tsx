"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { StaggerGroup, FadeUp, RevealOnTap } from "@/components/motion-primitives"
import { AnimatePresence, motion } from "framer-motion"

interface QA {
  q: string
  a: string
}

const FAQS: QA[] = [
  {
    q: "How fast can you ship a demo?",
    a: "Two business days. You get a working demo site with your copy and brand colors, deployed to a live preview URL. If you decide not to proceed, you owe nothing.",
  },
  {
    q: "What's in the $99 Starter tier?",
    a: "A single-page landing site, custom domain setup, SSL, CDN, Firestore-backed contact form, basic SEO meta and sitemap, and two revision rounds. Covers the first year.",
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
    q: "What's the fastest way to reach you?",
    a: "Discord. Join https://discord.gg/VhKgEetwr8 and message me directly. Email works too: quackeditzofficial@gmail.com. Response window is 24 hours.",
  },
  {
    q: "Do you take on retainers after launch?",
    a: "Yes. After the post-launch warranty (30–60 days depending on tier), I offer monthly retainers for ongoing changes, monitoring, and new features. Pricing depends on scope.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-16 py-20 sm:py-28 relative">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <StaggerGroup className="text-center mb-12" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2 justify-center">
              <span className="h-px w-8 bg-cyan-400/50" /> 05 · FAQ
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
              <RevealOnTap className="rounded-xl border border-border bg-card/40 backdrop-blur-sm hover:border-cyan-400/30 transition-colors overflow-hidden">
                <div className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer">
                  <h3 className="text-sm sm:text-base font-medium">{item.q}</h3>
                  <motion.div
                    className="shrink-0 text-cyan-300"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </div>
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {item.a}
                </div>
              </RevealOnTap>
            </FadeUp>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

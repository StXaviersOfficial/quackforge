"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { StaggerGroup, FadeUp } from "@/components/motion-primitives"

interface Step {
  num: string
  title: string
  duration: string
  desc: string
  deliverable: string
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Discovery",
    duration: "Day 0",
    desc: "30-min call. You tell me what to ship, who it's for, the deadline. I send a written brief same day.",
    deliverable: "Project brief + cost range",
  },
  {
    num: "02",
    title: "Demo",
    duration: "Day 1–2",
    desc: "Working demo with your copy and brand colors. You see what you're getting before paying for the full build.",
    deliverable: "Live preview URL",
  },
  {
    num: "03",
    title: "Build",
    duration: "Week 1–4",
    desc: "Full implementation. Weekly check-ins, shared Linear board, source pushed to a private GitHub repo you own.",
    deliverable: "Source code + Linear access",
  },
  {
    num: "04",
    title: "Ship",
    duration: "Final week",
    desc: "Deploy to your custom domain. SSL, CDN, redirects, analytics. Lighthouse pass. Sitemap to Search Console.",
    deliverable: "Production URL + handover doc",
  },
  {
    num: "05",
    title: "Maintain",
    duration: "30–60 days",
    desc: "Post-launch warranty. Bugs fixed free. Questions answered same-day. Optional retainer for ongoing changes.",
    deliverable: "Warranty + retainer option",
  },
]

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"])

  return (
    <section id="process" className="scroll-mt-16 py-20 sm:py-28 relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerGroup className="max-w-2xl mb-12" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-primary mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-primary/50" /> 04 · Process
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Five steps. <span className="text-gradient-cyan">No mystery.</span>
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mt-4 text-muted-foreground text-lg">
              Every project follows the same loop. You always know what's
              happening, what's next, and what you're paying for.
            </p>
          </FadeUp>
        </StaggerGroup>

        <div ref={containerRef} className="relative">
          {/* Vertical track */}
          <div
            aria-hidden
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border"
          />
          {/* Animated progress fill */}
          <motion.div
            aria-hidden
            className="absolute left-6 sm:left-8 top-0 w-px bg-gradient-to-b from-cyan-400 to-blue-500"
            style={{ height: lineHeight, boxShadow: "0 0 12px rgba(0, 229, 255, 0.6)" }}
          />

          <ol className="space-y-8 sm:space-y-10">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16 sm:pl-20"
              >
                {/* Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    delay: i * 0.1 + 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                  }}
                  className="absolute left-0 top-0 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-primary/40 bg-background text-primary font-mono text-sm sm:text-base font-semibold glow-cyan"
                >
                  {step.num}
                </motion.div>

                <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-5 sm:p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-center justify-between mb-2 gap-3">
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <span className="text-[11px] font-mono text-primary/80 px-2 py-0.5 rounded-full border border-primary/20 bg-primary/5">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {step.desc}
                  </p>
                  <div className="pt-3 border-t border-border">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                      Deliverable
                    </span>
                    <span className="text-xs text-foreground/90 font-medium">
                      {step.deliverable}
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

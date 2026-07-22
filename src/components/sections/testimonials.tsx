"use client";

import { Star, Quote } from "lucide-react";
import { StaggerGroup, FadeUp, TiltCard, HoverLift } from "@/components/motion-primitives";
import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  role: string;
  rating: number;
  projectMatch: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The portal just works. Fees, notices, timetable — all in one place. Our admin team finally stopped juggling three spreadsheets.",
    role: "School Administrator",
    rating: 5,
    projectMatch: "School management portal",
  },
  {
    quote:
      "Sub-100ms latency on every turn. We've had 50+ concurrent players and the sync held up without a single dropped match.",
    role: "Game Studio Client",
    rating: 5,
    projectMatch: "Hand cricket multiplayer",
  },
  {
    quote:
      "App shipped to the Play Store in 6 weeks. Offline-first timetable means parents see updates even on flaky networks. 4.6★ and climbing.",
    role: "Android App Client",
    rating: 5,
    projectMatch: "Android school companion",
  },
  {
    quote:
      "14 new items, 3 biomes, a progression system — and the build pipeline made CurseForge packaging a one-click thing. 8k downloads in the first month.",
    role: "Minecraft Mod Client",
    rating: 5,
    projectMatch: "Minecraft mod pack",
  },
  {
    quote:
      "From page 4 to top-3 for 11 target keywords in 90 days. The technical audit alone was worth the engagement.",
    role: "SEO Sprint Client",
    rating: 5,
    projectMatch: "SEO ranking sprint",
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-16 py-20 sm:py-28 relative border-t border-border/50"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <StaggerGroup className="max-w-2xl mb-10 sm:mb-12" stagger={0.1}>
          <FadeUp>
            <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-cyan-400/50" /> 05 · Testimonials
            </p>
          </FadeUp>
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              What clients <span className="text-gradient-cyan">say.</span>
            </h2>
          </FadeUp>
        </StaggerGroup>

        <div className="swipe-carousel flex gap-4 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible -mx-5 px-5 md:mx-0 md:px-0 pb-4 md:pb-0">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="w-[85%] sm:w-[60%] md:w-auto"
            >
              <HoverLift y={-3}>
                <TiltCard
                  max={3}
                  className="h-full rounded-xl border border-border bg-card p-6 hover:border-cyan-400/40 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Quote className="h-6 w-6 text-cyan-400/60" />
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={
                            idx < t.rating
                              ? "h-3.5 w-3.5 fill-cyan-300 text-cyan-300"
                              : "h-3.5 w-3.5 text-muted-foreground"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed mb-5">
                    "{t.quote}"
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-foreground">{t.role}</p>
                    <p className="text-[11px] font-mono text-cyan-300/70 mt-1">
                      {t.projectMatch}
                    </p>
                  </div>
                </TiltCard>
              </HoverLift>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

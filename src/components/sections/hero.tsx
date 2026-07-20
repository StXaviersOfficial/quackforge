"use client"

import { ArrowRight, Zap, Terminal, Cpu, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  StaggerGroup,
  FadeUp,
  FadeScale,
  Magnetic,
  TextReveal,
  Floating,
  Typewriter,
  Counter,
  TiltCard,
  Parallax,
  Marquee,
} from "@/components/motion-primitives"
import { motion } from "framer-motion"

const TICKER = [
  "Next.js 16",
  "TypeScript",
  "Tailwind 4",
  "Firebase",
  "Cloudflare Workers",
  "Kotlin",
  "Java",
  "Gradle",
  "Prisma",
  "Vercel",
  "Material 3",
  "Forge",
  "Python",
  "Google OAuth",
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-[100vh] flex items-center"
    >
      {/* Stronger aurora */}
      <div
        aria-hidden
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] aurora opacity-80 pointer-events-none"
      />
      {/* Grid */}
      <div aria-hidden className="absolute inset-0 bg-grid pointer-events-none opacity-80" />
      {/* Floating orbs */}
      <Floating
        className="absolute top-32 right-8 sm:right-32 w-48 h-48 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none"
        duration={8}
        distance={24}
      >
        <div className="w-full h-full" />
      </Floating>
      <Floating
        className="absolute bottom-32 left-8 sm:left-32 w-56 h-56 rounded-full bg-blue-500/15 blur-3xl pointer-events-none"
        duration={10}
        distance={20}
        delay={1}
      >
        <div className="w-full h-full" />
      </Floating>
      <Floating
        className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none hidden md:block"
        duration={7}
        distance={30}
        delay={2}
      >
        <div className="w-full h-full" />
      </Floating>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          {/* Left: text */}
          <StaggerGroup className="flex flex-col items-start gap-6" stagger={0.1}>
            <FadeUp>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 text-xs font-mono text-cyan-200 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
                </span>
                Online · taking new projects
              </span>
            </FadeUp>

            <FadeUp>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.98]">
                <TextReveal text="Full-stack dev," />
                <br />
                <span className="text-gradient-cyan drop-shadow-[0_0_24px_rgba(0,240,255,0.4)]">
                  <TextReveal text="forged for speed." delay={0.3} />
                </span>
              </h1>
            </FadeUp>

            <FadeUp>
              <p className="text-lg sm:text-xl text-foreground/80 max-w-xl leading-relaxed">
                Independent studio shipping web apps, Android apps, SEO wins, and
                custom-domain deploys.{" "}
                <span className="text-cyan-200 font-medium">
                  Demos in 48 hours. Code you own from day one.
                </span>
              </p>
            </FadeUp>

            <FadeUp>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Magnetic strength={0.4}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-cyan-400 hover:bg-cyan-300 text-background font-semibold border-0 group pulse-glow text-base px-6 h-12"
                  >
                    <a href="#contact">
                      Start a project
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.4}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-cyan-400/50 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-100 hover:border-cyan-400 bg-cyan-400/5 backdrop-blur-sm text-base px-6 h-12"
                  >
                    <a href="https://discord.gg/VhKgEetwr8" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Join Discord
                    </a>
                  </Button>
                </Magnetic>
              </div>
            </FadeUp>

            <FadeUp>
              <div className="mt-6 grid grid-cols-3 gap-x-6 sm:gap-x-10 w-full max-w-md border-t border-cyan-400/15 pt-6">
                <Stat value={2} suffix=" days" label="Demo delivery" />
                <Stat value={6} suffix="+" label="Tech in rotation" />
                <Stat value={24} suffix="h" label="Response time" />
              </div>
            </FadeUp>
          </StaggerGroup>

          {/* Right: terminal card */}
          <FadeScale delay={0.4}>
            <Parallax speed={-0.04}>
              <TiltCard
                className="rounded-xl border border-cyan-400/30 bg-card/80 backdrop-blur-xl overflow-hidden glow-cyan-strong"
                max={6}
              >
                <div className="flex items-center gap-1.5 border-b border-cyan-400/15 px-4 py-3 bg-background/60">
                  <span className="h-3 w-3 rounded-full bg-red-400/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  <span className="ml-2 text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                    <Terminal className="h-3 w-3" />
                    ~/quackforge
                  </span>
                  <span className="ml-auto text-[10px] font-mono text-cyan-300/70">
                    live
                  </span>
                </div>
                <pre className="p-5 text-[13px] font-mono leading-relaxed overflow-x-auto">
                  <code>
                    <span className="text-muted-foreground">{`# Boot a new project`}</span>{"\n"}
                    <span className="text-cyan-300">$</span>{" "}
                    <Typewriter text="quackforge init my-app" speed={45} />{"\n\n"}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                    >
                      <span className="text-muted-foreground">{"→"}</span> stack:{" "}
                      <span className="text-foreground">next.js 16, ts, tailwind</span>{"\n"}
                      <span className="text-muted-foreground">{"→"}</span> db:{" "}
                      <span className="text-foreground">firebase firestore</span>{"\n"}
                      <span className="text-muted-foreground">{"→"}</span> deploy:{" "}
                      <span className="text-foreground">vercel + custom domain</span>{"\n"}
                      <span className="text-muted-foreground">{"→"}</span> ETA:{" "}
                      <span className="text-cyan-300 font-semibold">2 days to demo</span>{"\n\n"}
                      <span className="text-green-400 inline-flex items-center gap-1">
                        <Cpu className="h-3 w-3" /> ready to ship
                      </span>
                    </motion.span>
                  </code>
                </pre>
                {/* Animated bottom strip */}
                <div className="border-t border-cyan-400/15 px-4 py-2 bg-background/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-muted-foreground">
                      build · passing
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300/70">p95 · 47ms</span>
                </div>
              </TiltCard>
            </Parallax>
          </FadeScale>
        </div>

        {/* Tech ticker */}
        <FadeUp delay={0.8}>
          <div className="mt-16 sm:mt-20 py-3 border-y border-cyan-400/10 bg-cyan-400/[0.02] backdrop-blur-sm">
            <Marquee speed={28}>
              {TICKER.map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-6 text-sm font-mono text-muted-foreground"
                >
                  <Zap className="h-3 w-3 text-cyan-300/60" />
                  <span className="hover:text-cyan-200 transition-colors cursor-default">
                    {t}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        </FadeUp>

        {/* Scroll cue */}
        <FadeScale delay={1.2}>
          <div className="flex justify-center mt-12">
            <motion.a
              href="#services"
              aria-label="Scroll down"
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-cyan-200 transition-colors"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[10px] font-mono uppercase tracking-widest">
                Scroll
              </span>
              <div className="h-8 w-5 rounded-full border border-current flex justify-center pt-1.5">
                <span className="block h-1.5 w-1 rounded-full bg-current animate-bounce" />
              </div>
            </motion.a>
          </div>
        </FadeScale>
      </div>
    </section>
  )
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: number
  suffix: string
  label: string
}) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl sm:text-3xl font-semibold tracking-tight font-mono text-cyan-300 drop-shadow-[0_0_12px_rgba(0,240,255,0.3)]">
        <Counter value={value} suffix={suffix} />
      </span>
      <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
    </div>
  )
}

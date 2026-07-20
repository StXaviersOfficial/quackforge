"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  StaggerGroup,
  FadeUp,
  FadeScale,
  Magnetic,
  TextReveal,
  Floating,
  Counter,
  Parallax,
} from "@/components/motion-primitives";
import { motion } from "framer-motion";
import { ChipDiagram } from "@/components/chip-diagram";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-[100vh] flex items-center"
    >
      {/* Aurora glow (no blur — radial-gradient only) */}
      <div
        aria-hidden
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] aurora opacity-70 pointer-events-none"
      />

      {/* Floating orbs */}
      <Floating
        className="absolute top-32 right-8 sm:right-32 w-48 h-48 rounded-full bg-cyan-400/20 pointer-events-none"
        duration={8}
        distance={24}
      >
        <div className="w-full h-full" />
      </Floating>
      <Floating
        className="absolute bottom-32 left-8 sm:left-32 w-56 h-56 rounded-full bg-blue-500/20 pointer-events-none"
        duration={10}
        distance={20}
        delay={1}
      >
        <div className="w-full h-full" />
      </Floating>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <StaggerGroup className="flex flex-col items-start gap-6" stagger={0.1}>
            <FadeUp>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-300/40 bg-cyan-300/10 text-xs font-mono text-cyan-200">
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
                <span className="text-gradient-cyan">
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
                    className="border-cyan-400/50 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-100 hover:border-cyan-400 bg-cyan-400/5 text-base px-6 h-12"
                  >
                    <a
                      href="https://discord.gg/VhKgEetwr8"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
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

          {/* Right: SVG chip diagram */}
          <FadeScale delay={0.4}>
            <Parallax speed={-0.04}>
              <ChipDiagram />
            </Parallax>
          </FadeScale>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl sm:text-3xl font-semibold tracking-tight font-mono text-cyan-300">
        <Counter value={value} suffix={suffix} />
      </span>
      <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
    </div>
  );
}

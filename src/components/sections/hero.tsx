"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  StaggerGroup,
  FadeUp,
  Magnetic,
  TextReveal,
  Counter,
} from "@/components/motion-primitives";
import { CpuDiagram } from "@/components/cpu-diagram";
import { useBooking } from "@/hooks/use-booking";

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-12 sm:pt-36 sm:pb-16 min-h-[90vh] flex items-center"
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: text */}
          <StaggerGroup className="flex flex-col items-start gap-5" stagger={0.1}>
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
              <p className="text-lg text-foreground/80 max-w-xl leading-relaxed">
                Independent studio shipping web apps, Android apps, SEO wins,
                and custom-domain deploys.{" "}
                <span className="text-cyan-200 font-medium">
                  Free demos in 48 hours. Code you own from day one.
                </span>
              </p>
            </FadeUp>

            <FadeUp>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Magnetic strength={0.4}>
                  <Button
                    onClick={() => openBooking({})}
                    size="lg"
                    className="bg-cyan-400 hover:bg-cyan-300 text-background font-semibold border-0 group pulse-glow text-base px-6 h-12"
                  >
                    Book a Project
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Magnetic>
                <Magnetic strength={0.4}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-cyan-400/50 text-cyan-200 hover:bg-cyan-400/10 hover:text-cyan-100 hover:border-cyan-400 bg-cyan-400/5 text-base px-6 h-12"
                  >
                    <a href="#pricing">See pricing</a>
                  </Button>
                </Magnetic>
              </div>
            </FadeUp>

            <FadeUp>
              <div className="mt-4 grid grid-cols-3 gap-x-6 sm:gap-x-10 w-full max-w-md border-t border-cyan-400/15 pt-5">
                <Stat value={2} suffix=" days" label="Demo delivery" />
                <Stat value={6} suffix="+" label="Tech in rotation" />
                <Stat value={24} suffix="h" label="Response time" />
              </div>
            </FadeUp>
          </StaggerGroup>

          {/* Right: 3D CPU diagram */}
          <FadeUp delay={0.4}>
            <CpuDiagram />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl sm:text-3xl font-semibold tracking-tight font-mono text-cyan-300">
        <Counter value={value} suffix={suffix} />
      </span>
      <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
    </div>
  );
}

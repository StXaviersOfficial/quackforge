"use client";

import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  StaggerGroup,
  FadeUp,
  Magnetic,
  TiltCard,
  Floating,
} from "@/components/motion-primitives";
import { useBooking } from "@/hooks/use-booking";
import { DiscordLogo } from "@/components/discord-fab";

export function Contact() {
  const { openBooking } = useBooking();

  return (
    <section id="contact" className="scroll-mt-16 py-16 sm:py-20 relative">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" stagger={0.1}>
          {/* Left: copy + main CTA */}
          <div className="flex flex-col gap-5">
            <FadeUp>
              <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-cyan-400/50" /> 04 · Build your project
              </p>
            </FadeUp>
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
                Tell us what to <span className="text-gradient-cyan">build.</span>
              </h2>
            </FadeUp>
            <FadeUp>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
                Pick a plan, share a brief, and our team replies within 24
                hours with a written cost range and demo timeline. Free demos
                ship in 48 hours — see it before you pay.
              </p>
            </FadeUp>

            <FadeUp>
              <Magnetic strength={0.4}>
                <Button
                  onClick={() => openBooking({})}
                  size="lg"
                  className="bg-cyan-400 hover:bg-cyan-300 text-background font-semibold border-0 group pulse-glow text-base px-7 h-13"
                >
                  Book a Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Magnetic>
            </FadeUp>
          </div>

          {/* Right: contact options (no location) */}
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-1 gap-3">
              {/* Discord card */}
              <Magnetic strength={0.3}>
                <a
                  href="https://discord.gg/VhKgEetwr8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <TiltCard
                    max={3}
                    className="relative rounded-xl border border-[#5865F2]/40 bg-[#5865F2]/5 p-5 hover:border-[#5865F2] transition-colors overflow-hidden"
                  >
                    <div
                      aria-hidden
                      className="absolute -top-12 -right-12 w-32 h-32 pointer-events-none rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(88,101,242,0.40), transparent 70%)",
                      }}
                    />
                    <div className="relative flex items-center gap-4">
                      <Floating distance={6} duration={4}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#5865F2] text-white">
                          <DiscordLogo className="h-6 w-6" />
                        </div>
                      </Floating>
                      <div className="flex-1">
                        <p className="text-sm font-mono text-[#7984F5] mb-1">
                          Fastest response
                        </p>
                        <p className="text-base font-semibold">Join our Discord server</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Talk to the team directly · usually replies in minutes
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-[#7984F5] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </TiltCard>
                </a>
              </Magnetic>

              {/* Email card */}
              <Magnetic strength={0.3}>
                <a
                  href="mailto:quackforgeofficial@gmail.com?subject=Project%20enquiry%20from%20QuackForge%20website"
                  className="block group"
                >
                  <TiltCard
                    max={3}
                    className="relative rounded-xl border border-cyan-400/30 bg-cyan-400/5 p-5 hover:border-cyan-400 transition-colors overflow-hidden"
                  >
                    <div
                      aria-hidden
                      className="absolute -top-12 -right-12 w-32 h-32 pointer-events-none rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(34,211,238,0.30), transparent 70%)",
                      }}
                    />
                    <div className="relative flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/15 border border-cyan-400/30 text-cyan-300">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-mono text-cyan-300 mb-1">
                          Email the team
                        </p>
                        <p className="text-base font-semibold">quackforgeofficial@gmail.com</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Opens your mail app with subject pre-filled
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </TiltCard>
                </a>
              </Magnetic>
            </div>
          </FadeUp>
        </StaggerGroup>
      </div>
    </section>
  );
}

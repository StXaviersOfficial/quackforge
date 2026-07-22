"use client";

import { Mail, MapPin } from "lucide-react";
import { FadeUp } from "@/components/motion-primitives";
import { motion } from "framer-motion";
import { DiscordLogo } from "@/components/discord-fab";
import { useBooking } from "@/hooks/use-booking";
import { Button } from "@/components/ui/button";

export function Footer() {
  const year = new Date().getFullYear();
  const { openBooking } = useBooking();

  return (
    <footer className="mt-auto border-t border-border bg-background/95">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        {/* Top: brand + CTA */}
        <FadeUp>
          <div className="flex flex-col lg:flex-row gap-8 lg:items-end lg:justify-between pb-10 border-b border-border">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <img
                  src="/quackforge-logo.png"
                  alt=""
                  className="h-10 w-10 rounded-lg object-cover ring-1 ring-cyan-400/40"
                  width={40}
                  height={40}
                />
                <span className="text-2xl font-semibold tracking-tight">
                  Quack<span className="text-gradient-cyan">Forge</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Independent dev studio. Web apps, Android apps, SEO, custom
                domains, automation. Free demos ship in 48 hours.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <Button
                onClick={() => openBooking({})}
                className="bg-primary hover:bg-primary/90 text-background font-semibold border-0 group pulse-glow self-start lg:self-end"
              >
                Book a Project
              </Button>
              <p className="text-xs text-muted-foreground">
                Or browse the{" "}
                <a href="#pricing" className="text-primary hover:text-primary/80 underline-offset-4 underline">
                  pricing tiers
                </a>{" "}
                first.
              </p>
            </div>
          </div>
        </FadeUp>

        {/* Middle: nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-border">
          <FooterCol title="Studio">
            <FooterLink href="#services">Services</FooterLink>
            <FooterLink href="#pricing">Pricing</FooterLink>
            <FooterLink href="#maintenance">Care Plans</FooterLink>
            <FooterLink href="#team">Team</FooterLink>
          </FooterCol>
          <FooterCol title="Build">
            <FooterLink href="#contact">Book a Project</FooterLink>
            <FooterLink href="#faq">FAQ</FooterLink>
            <FooterLink href="https://discord.gg/VhKgEetwr8" external>
              Discord server
            </FooterLink>
          </FooterCol>
          <FooterCol title="Reach us">
            <a
              href="mailto:quackforgeofficial@gmail.com?subject=Project%20enquiry%20from%20QuackForge"
              className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors min-w-0"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span className="break-all">quackforgeofficial@gmail.com</span>
            </a>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>India · UTC+5:30 · Remote worldwide</span>
            </div>
          </FooterCol>
          <FooterCol title="Social">
            <a
              href="https://discord.gg/VhKgEetwr8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#7984F5] transition-colors"
            >
              <DiscordLogo className="h-3.5 w-3.5" />
              Discord
            </a>
            <a
              href="https://github.com/StXaviersOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <GithubLogo className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="mailto:quackforgeofficial@gmail.com?subject=Project%20enquiry%20from%20QuackForge"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              Email
            </a>
          </FooterCol>
        </div>

        {/* Bottom: copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground"
        >
          <p>© {year} QuackForge. Independent dev studio · est. 2024.</p>
          <p className="font-mono text-primary/70">
            Taking new projects · reply within 24 hours
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="eyebrow text-primary mb-1">{title}</h4>
      {children}
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      {children}
    </a>
  );
}

function GithubLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion-primitives";
import { useBooking } from "@/hooks/use-booking";
import { cn } from "@/lib/utils";
import { DiscordLogo } from "@/components/discord-fab";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#maintenance", label: "Care Plans" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { openBooking } = useBooking();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-background/95 border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <nav className="flex h-20 items-center justify-between">
          <Link
            href="#top"
            className="flex items-center gap-3 group"
            aria-label="QuackForge home"
          >
            <div className="relative">
              <img
                src="/quackforge-logo.png"
                alt=""
                className="h-11 w-11 rounded-lg object-cover ring-1 ring-cyan-400/40 transition-all duration-300 group-hover:ring-cyan-300 group-hover:scale-105"
                width={44}
                height={44}
              />
              <div
                aria-hidden
                className="absolute inset-0 rounded-lg bg-cyan-400/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <span className="text-2xl font-semibold tracking-tight">
              Quack<span className="text-gradient-cyan">Forge</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground link-underline transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.3}>
              <Button
                onClick={() => openBooking({})}
                className="hidden sm:inline-flex bg-cyan-400 hover:bg-cyan-300 text-background font-semibold border-0 group pulse-glow h-10"
              >
                Book a Project
              </Button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="https://discord.gg/VhKgEetwr8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Join our Discord server"
                className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#5865F2] hover:bg-[#4752C4] text-white transition-colors"
              >
                <DiscordLogo className="h-5 w-5" />
              </a>
            </Magnetic>
            <button
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-border rounded-md hover:bg-muted"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95">
          <div className="mx-auto max-w-7xl px-5 py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={() => {
                setOpen(false);
                openBooking({});
              }}
              className="mt-2 bg-cyan-400 hover:bg-cyan-300 text-background font-semibold"
            >
              Book a Project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

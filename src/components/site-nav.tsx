"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/motion-primitives"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
]

export function SiteNav() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <nav className="flex h-16 items-center justify-between">
          <Link
            href="#top"
            className="flex items-center gap-2.5 group"
            aria-label="QuackForge home"
          >
            <div className="relative">
              <img
                src="/quackforge-logo.png"
                alt=""
                className="h-9 w-9 rounded-lg object-cover ring-1 ring-cyan-400/30 transition-all duration-300 group-hover:ring-cyan-400 group-hover:scale-105"
                width={36}
                height={36}
              />
              <div className="absolute inset-0 rounded-lg bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
            </div>
            <span className="text-base font-semibold tracking-tight">
              Quack<span className="text-gradient-cyan">Forge</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
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
                asChild
                size="sm"
                className="hidden sm:inline-flex bg-[#5865F2] hover:bg-[#4752C4] text-white border-0 pulse-glow"
              >
                <a
                  href="https://discord.gg/VhKgEetwr8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-1.5 h-4 w-4" />
                  Join Discord
                </a>
              </Button>
            </Magnetic>
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center border border-border rounded-md hover:bg-muted"
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
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="mx-auto max-w-6xl px-5 py-3 flex flex-col gap-1">
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
              asChild
              size="sm"
              className="mt-2 bg-[#5865F2] hover:bg-[#4752C4] text-white"
            >
              <a
                href="https://discord.gg/VhKgEetwr8"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="mr-1.5 h-4 w-4" />
                Join Discord
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

"use client"

import { Github, Mail, MessageCircle, Heart } from "lucide-react"
import { Marquee, FadeUp } from "@/components/motion-primitives"
import { motion } from "framer-motion"

export function Footer() {
  const year = new Date().getFullYear()

  const stackMarquee = [
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
    "REST APIs",
  ]

  return (
    <footer className="mt-auto border-t border-border bg-background/60 backdrop-blur-sm">
      {/* Tech marquee */}
      <div className="py-6 border-b border-border">
        <Marquee speed={28}>
          {stackMarquee.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 text-sm font-mono text-muted-foreground"
            >
              <span className="h-1 w-1 rounded-full bg-cyan-400" />
              <span className="hover:text-cyan-300 transition-colors cursor-default">
                {s}
              </span>
            </div>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <FadeUp>
            <div className="flex items-center gap-3">
              <img
                src="/quackforge-logo.png"
                alt=""
                className="h-9 w-9 rounded-lg object-cover ring-1 ring-cyan-400/30"
                width={36}
                height={36}
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  Quack<span className="text-gradient-cyan">Forge</span>
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Independent dev studio · est. 2024
                </span>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {[
                { href: "#services", label: "Services" },
                { href: "#pricing", label: "Pricing" },
                { href: "#work", label: "Work" },
                { href: "#process", label: "Process" },
                { href: "#faq", label: "FAQ" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-cyan-300 transition-colors link-underline"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex items-center gap-1.5">
              <SocialLink
                href="https://discord.gg/VhKgEetwr8"
                label="Discord"
                icon={<MessageCircle className="h-4 w-4" />}
                hoverColor="hover:bg-[#5865F2]/15 hover:text-[#7984F5] hover:border-[#5865F2]/50"
              />
              <SocialLink
                href="https://github.com/StXaviersOfficial"
                label="GitHub"
                icon={<Github className="h-4 w-4" />}
                hoverColor="hover:bg-cyan-400/10 hover:text-cyan-300 hover:border-cyan-400/50"
              />
              <SocialLink
                href="mailto:quackeditzofficial@gmail.com"
                label="Email"
                icon={<Mail className="h-4 w-4" />}
                hoverColor="hover:bg-cyan-400/10 hover:text-cyan-300 hover:border-cyan-400/50"
              />
            </div>
          </FadeUp>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground"
        >
          <p>
            © {year} QuackForge. Built with Next.js 16, Tailwind 4, and Firebase.
          </p>
          <p className="font-mono flex items-center gap-1.5">
            Deploying to{" "}
            <a
              href="https://quackforge.web.app"
              className="text-cyan-300 hover:text-cyan-200 transition-colors"
            >
              quackforge.web.app
            </a>
            <Heart className="h-3 w-3 fill-current text-cyan-300" />
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  icon,
  hoverColor,
}: {
  href: string
  label: string
  icon: React.ReactNode
  hoverColor: string
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors ${hoverColor}`}
    >
      {icon}
    </motion.a>
  )
}

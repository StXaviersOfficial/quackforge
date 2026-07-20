import { Github, Mail, Twitter } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-border bg-muted/20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/quackforge-logo.png"
              alt=""
              className="h-8 w-8 rounded-md object-cover"
              width={32}
              height={32}
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">QuackForge</span>
              <span className="text-[11px] text-muted-foreground">
                Independent dev studio · est. 2024
              </span>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#work" className="text-muted-foreground hover:text-foreground transition-colors">
              Work
            </a>
            <a href="#process" className="text-muted-foreground hover:text-foreground transition-colors">
              Process
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-1">
            <SocialLink
              href="mailto:quackeditzofficial@gmail.com"
              label="Email"
              icon={Mail}
            />
            <SocialLink
              href="https://github.com/StXaviersOfficial"
              label="GitHub"
              icon={Github}
            />
            <SocialLink
              href="https://x.com/quackeditz"
              label="Twitter / X"
              icon={Twitter}
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground">
          <p>
            © {year} QuackForge. Built with Next.js 16, Tailwind 4, and Firebase.
          </p>
          <p className="font-mono">
            Deploying to{' '}
            <a
              href="https://quackforge.web.app"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              quackforge.web.app
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
    >
      <Icon className="h-4 w-4" />
    </a>
  )
}

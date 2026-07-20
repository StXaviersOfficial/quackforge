import {
  Code2,
  Smartphone,
  Search,
  Globe,
  Boxes,
  Webhook,
  type LucideIcon,
} from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  desc: string
  stack: string[]
}

const SERVICES: Service[] = [
  {
    icon: Code2,
    title: 'Web apps',
    desc: 'Next.js + TypeScript apps with SSR, auth, payments, and admin dashboards. Prisma or Firestore. Shipped to Vercel or your own infra.',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind', 'Prisma'],
  },
  {
    icon: Smartphone,
    title: 'Android apps',
    desc: 'Native Android in Java/Kotlin with Gradle builds, Firebase Auth, REST sync, and Play Store rollout. Material 3 by default.',
    stack: ['Kotlin', 'Java', 'Gradle', 'Firebase'],
  },
  {
    icon: Search,
    title: 'SEO ranking',
    desc: 'Technical SEO audits, Core Web Vitals tuning, structured data, content architecture. Built to climb — not just to look pretty.',
    stack: ['Lighthouse', 'Schema.org', 'Sitemaps', 'GA4'],
  },
  {
    icon: Globe,
    title: 'Custom domains',
    desc: 'DNS, SSL, redirects, and apex/www canonicalization. Cloudflare Workers in front when you need edge logic or A/B routing.',
    stack: ['Cloudflare', 'Vercel', 'Caddy', "Let's Encrypt"],
  },
  {
    icon: Boxes,
    title: 'Minecraft mods',
    desc: 'Custom mods, plugin packs, and server configs. Forge / Fabric / Paper. Java-side, with build pipelines and CurseForge-ready artifacts.',
    stack: ['Java', 'Forge', 'Fabric', 'Bukkit'],
  },
  {
    icon: Webhook,
    title: 'APIs & integrations',
    desc: 'REST endpoints, OAuth flows (Google, GitHub, Discord), webhooks, payment gateways. Cloudflare Workers for the cheap-and-fast tier.',
    stack: ['REST', 'Google OAuth', 'Stripe', 'Workers'],
  },
]

export function Services() {
  return (
    <section id="services" className="border-b border-border scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 sm:py-24">
        <header className="max-w-2xl mb-12">
          <p className="eyebrow text-primary mb-3">01 · Services</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Six things, done properly.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Narrow focus, deep execution. Pick one or stack them — every engagement
            ships with source code, docs, and a 30-day warranty.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <article
                key={s.title}
                className="group relative bg-card p-6 sm:p-7 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-start gap-4 mb-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight pt-1.5">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {s.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { ArrowUpRight } from 'lucide-react'

interface Project {
  name: string
  kind: string
  year: string
  blurb: string
  stack: string[]
  status: 'placeholder' | 'live'
  url?: string
}

const PROJECTS: Project[] = [
  {
    name: 'School management portal',
    kind: 'Web app · Admin',
    year: '2025',
    blurb:
      'Next.js + Firebase portal for 1,200+ students. Fees, notices, timetable, enquiries, admin replies. Role-based auth for teachers, students, and admins.',
    stack: ['Next.js', 'Firestore', 'Vercel', 'Tailwind'],
    status: 'placeholder',
  },
  {
    name: 'Hand cricket multiplayer game',
    kind: 'Web game · Realtime',
    year: '2025',
    blurb:
      'Browser-based hand cricket with realtime sync. Cloudflare Workers for matchmaking, Firestore for game state, sub-100ms latency.',
    stack: ['Next.js', 'Workers', 'Firestore', 'Socket.io'],
    status: 'placeholder',
  },
  {
    name: 'Android school companion',
    kind: 'Android · Native',
    year: '2024',
    blurb:
      'Kotlin app with Firebase Auth, push notifications, offline-first timetable, and Play Store rollout. Material 3, Gradle 8, 4.6★ rating.',
    stack: ['Kotlin', 'Firebase', 'Gradle', 'Material 3'],
    status: 'placeholder',
  },
  {
    name: 'Minecraft mod pack',
    kind: 'Java mod · Forge',
    year: '2024',
    blurb:
      'Custom Forge mod adding 14 new items, 3 biomes, and a progression system. Built with Java 17, automated CurseForge packaging, 8k+ downloads.',
    stack: ['Java', 'Forge', 'Gradle', 'CurseForge'],
    status: 'placeholder',
  },
  {
    name: 'SEO ranking sprint',
    kind: 'SEO · Technical',
    year: '2025',
    blurb:
      'Took a regional services site from page 4 to top-3 for 11 target keywords in 90 days. Technical audit, schema, content architecture, Core Web Vitals.',
    stack: ['Lighthouse', 'Schema.org', 'GA4', 'Search Console'],
    status: 'placeholder',
  },
  {
    name: 'Auth microservice',
    kind: 'API · Edge',
    year: '2025',
    blurb:
      'Cloudflare Workers auth gateway handling Google OAuth, JWT issuance, and rate limiting for 4 downstream apps. p95 response: 47ms.',
    stack: ['Workers', 'Google OAuth', 'JWT', 'KV'],
    status: 'placeholder',
  },
]

export function Work() {
  return (
    <section id="work" className="border-b border-border scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 sm:py-24">
        <header className="max-w-2xl mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="eyebrow text-primary mb-3">03 · Work</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Selected projects.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Live case studies get swapped in as NDA windows close. Stack and
              outcomes below are real — names anonymized.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="group relative bg-card p-6 sm:p-7 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-muted-foreground">
                  {p.kind}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {p.year}
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight mb-2.5 pr-8">
                {p.name}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {p.blurb}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-mono px-2 py-0.5 rounded border border-border bg-background text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {p.status === 'placeholder' && (
                <span className="absolute top-5 right-5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-dashed border-muted-foreground/40 text-muted-foreground">
                  case study soon
                </span>
              )}

              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-5 right-5 inline-flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  aria-label={`Open ${p.name}`}
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground text-center">
          Want a deeper dive?{' '}
          <a
            href="#contact"
            className="text-primary hover:underline underline-offset-4"
          >
            Ask for the case study deck
          </a>
          .
        </p>
      </div>
    </section>
  )
}

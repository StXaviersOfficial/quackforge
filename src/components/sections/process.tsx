interface Step {
  num: string
  title: string
  duration: string
  desc: string
  deliverable: string
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Discovery',
    duration: 'Day 0',
    desc: 'We hop on a 30-min call. You tell me what you want to ship, who it’s for, and the deadline. I send a written brief the same day.',
    deliverable: 'Project brief + cost range',
  },
  {
    num: '02',
    title: 'Demo',
    duration: 'Day 1–2',
    desc: 'I build a working demo site with your copy and brand colors. You see exactly what you’re getting before paying for the full build.',
    deliverable: 'Live preview URL',
  },
  {
    num: '03',
    title: 'Build',
    duration: 'Week 1–4',
    desc: 'Full implementation. Weekly check-ins, shared Linear board, source pushed to a private GitHub repo you own from day one.',
    deliverable: 'Source code + Linear access',
  },
  {
    num: '04',
    title: 'Ship',
    duration: 'Final week',
    desc: 'Deploy to your custom domain. SSL, CDN, redirects, analytics. Lighthouse pass. SEO meta and sitemap submitted to Search Console.',
    deliverable: 'Production URL + handover doc',
  },
  {
    num: '05',
    title: 'Maintain',
    duration: '30–60 days',
    desc: 'Post-launch warranty. Bugs fixed free. Questions answered same-day. Optional retainer for ongoing changes after the warranty.',
    deliverable: 'Warranty + retainer option',
  },
]

export function Process() {
  return (
    <section id="process" className="border-b border-border scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 sm:py-24">
        <header className="max-w-2xl mb-12">
          <p className="eyebrow text-primary mb-3">04 · Process</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Five steps. No mystery.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Every project follows the same loop. You always know what’s happening,
            what’s next, and what you’re paying for.
          </p>
        </header>

        <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {STEPS.map((step) => (
            <li
              key={step.num}
              className="bg-card p-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary">{step.num}</span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {step.duration}
                </span>
              </div>
              <h3 className="text-base font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
              <div className="mt-auto pt-3 border-t border-border">
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                  Deliverable
                </span>
                <span className="text-xs text-foreground/90 font-medium">
                  {step.deliverable}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

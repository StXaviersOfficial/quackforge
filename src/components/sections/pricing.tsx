import { Check, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Tier = {
  name: string
  price: string
  cadence?: string
  tagline: string
  features: string[]
  cta: string
  href: string
  featured?: boolean
  badge?: string
}

const TIERS: Tier[] = [
  {
    name: 'Free',
    price: '$0',
    cadence: 'consultation',
    tagline: 'Scope the project before you commit.',
    features: [
      '30-min discovery call',
      'Written project brief',
      'Stack recommendation',
      'Rough timeline + cost range',
      'No obligation',
    ],
    cta: 'Book a call',
    href: '#contact',
  },
  {
    name: 'Demo',
    price: '$49',
    cadence: 'one-time · 2 days',
    tagline: 'Working demo site, built in 48 hours.',
    features: [
      'Single-page Next.js demo',
      'Your copy + brand colors',
      'Mobile-responsive',
      'Deployed to a preview URL',
      'Code handover on payment',
    ],
    cta: 'Book a demo',
    href: '#contact',
    badge: '2-day delivery',
  },
  {
    name: 'Starter',
    price: '$99',
    cadence: '/ first year',
    tagline: 'Landing page that actually converts.',
    features: [
      '1-page landing site',
      'Custom domain setup',
      'SSL + CDN',
      'Contact form (Firestore)',
      'Basic SEO meta + sitemap',
      '2 revision rounds',
    ],
    cta: 'Start with Starter',
    href: '#contact',
    featured: true,
    badge: 'Most picked',
  },
  {
    name: 'Standard',
    price: '$149',
    cadence: '/ first year',
    tagline: 'Multi-page site with a real CMS.',
    features: [
      'Up to 5 pages',
      'Admin dashboard',
      'Firestore / Prisma backend',
      'Google OAuth login',
      'Email automation hooks',
      '3 revision rounds',
    ],
    cta: 'Go Standard',
    href: '#contact',
  },
  {
    name: 'Pro',
    price: '$299',
    cadence: '/ first year',
    tagline: 'Web app or Android MVP, shipped.',
    features: [
      'Full web app OR Android app',
      'Auth + payments + admin',
      'Cloudflare Workers edge logic',
      'Custom domain + deploys',
      'Technical SEO pass',
      '60-day post-launch support',
    ],
    cta: 'Build it Pro',
    href: '#contact',
  },
  {
    name: 'Custom',
    price: 'Quote',
    cadence: 'scoped together',
    tagline: 'Anything bigger. Minecraft mods, integrations, migrations.',
    features: [
      'Discovery workshop',
      'Fixed-scope SOW',
      'Milestone billing',
      'Dedicated Slack channel',
      'Source code + docs',
      'Ongoing retainers available',
    ],
    cta: 'Request a quote',
    href: '#contact',
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-border scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 sm:py-24">
        <header className="max-w-2xl mb-12">
          <p className="eyebrow text-primary mb-3">02 · Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            Six tiers. No surprises.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Prices cover the first year for hosted tiers. Renewals are 30% off.
            All paid tiers include source code and a written warranty.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIERS.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
          ))}
        </div>

        <p className="mt-8 text-xs text-muted-foreground text-center">
          Prices in USD. Indian clients can pay in INR at locked conversion rate.
          All tiers refundable within 7 days if no work has started.
        </p>
      </div>
    </section>
  )
}

function TierCard({ tier }: { tier: Tier }) {
  return (
    <article
      className={cn(
        'relative flex flex-col rounded-lg border bg-card p-6 transition-shadow',
        tier.featured
          ? 'border-primary shadow-md ring-1 ring-primary/20'
          : 'border-border hover:shadow-sm'
      )}
    >
      {tier.badge && (
        <span
          className={cn(
            'absolute -top-2.5 right-5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium',
            tier.featured
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground border border-border'
          )}
        >
          {tier.featured && <Star className="h-3 w-3 fill-current" />}
          {tier.badge}
        </span>
      )}

      <header className="mb-4">
        <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{tier.tagline}</p>
      </header>

      <div className="flex items-baseline gap-1.5 mb-5">
        <span className="text-3xl font-semibold tracking-tight font-mono">
          {tier.price}
        </span>
        {tier.cadence && (
          <span className="text-xs text-muted-foreground">{tier.cadence}</span>
        )}
      </div>

      <ul className="flex-1 flex flex-col gap-2.5 mb-6">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check
              className={cn(
                'h-4 w-4 mt-0.5 shrink-0',
                tier.featured ? 'text-primary' : 'text-muted-foreground'
              )}
            />
            <span className="text-foreground/90 leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant={tier.featured ? 'default' : 'outline'}
        className={cn(
          'w-full group',
          tier.featured
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border-border hover:bg-muted'
        )}
      >
        <a href={tier.href}>
          {tier.cta}
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </Button>
    </article>
  )
}

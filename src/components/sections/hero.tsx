import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
    >
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6 pt-20 pb-20 sm:pt-28 sm:pb-28">
        <div className="flex flex-col items-start gap-8 max-w-3xl">
          <div className="flex items-center gap-3">
            <img
              src="/quackforge-logo.png"
              alt="QuackForge logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-xl object-cover ring-1 ring-border shadow-sm"
            />
            <div className="flex flex-col">
              <span className="eyebrow text-muted-foreground">v1.0 · Independent dev studio</span>
              <span className="text-sm text-muted-foreground">
                Run by Xavier · India · Remote worldwide
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-foreground">
            Full-stack web & mobile,
            <br />
            <span className="text-primary">forged for speed.</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Production-grade websites, Android apps, SEO ranking, and custom-domain
            deploys — built on Next.js, Firebase, Cloudflare Workers, and Kotlin.
            Shipped in days, not quarters.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 group"
            >
              <a href="#contact">
                Start a project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border hover:bg-muted"
            >
              <a href="#pricing">See pricing</a>
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 w-full border-t border-border pt-6">
            <Stat value="2 days" label="Demo site delivery" />
            <Stat value="6+" label="Tech in rotation" />
            <Stat value="$99" label="Starting tier" />
            <Stat value="24h" label="Response window" />
          </div>
        </div>

        <div className="mt-12 sm:mt-16 max-w-2xl ml-auto">
          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5 bg-muted/40">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">
                ~/quackforge
              </span>
            </div>
            <pre className="p-4 text-xs sm:text-[13px] font-mono leading-relaxed overflow-x-auto">
              <code>
                <span className="text-muted-foreground"># Boot a new project</span>{'\n'}
                <span className="text-primary">$</span> quackforge init my-app{'\n'}
                <span className="text-muted-foreground">{'→'}</span> stack:{' '}
                <span className="text-foreground">next.js 16, ts, tailwind</span>{'\n'}
                <span className="text-muted-foreground">{'→'}</span> db:{' '}
                <span className="text-foreground">firebase firestore</span>{'\n'}
                <span className="text-muted-foreground">{'→'}</span> deploy:{' '}
                <span className="text-foreground">vercel + custom domain</span>{'\n'}
                <span className="text-muted-foreground">{'→'}</span> ETA:{' '}
                <span className="text-[#FF6B1A]">2 days to demo</span>{'\n'}
                {'\n'}
                <span className="text-green-600 dark:text-green-400">{'✓'} ready to ship</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold tracking-tight text-foreground font-mono">
        {value}
      </span>
      <span className="text-xs text-muted-foreground mt-0.5">{label}</span>
    </div>
  )
}

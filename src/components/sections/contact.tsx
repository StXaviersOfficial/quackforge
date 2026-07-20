'use client'

import * as React from 'react'
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

const PROJECT_TYPES = [
  { value: 'web-app', label: 'Web app' },
  { value: 'landing-page', label: 'Landing page' },
  { value: 'android-app', label: 'Android app' },
  { value: 'seo', label: 'SEO ranking' },
  { value: 'minecraft-mod', label: 'Minecraft mod' },
  { value: 'api-integration', label: 'API / integration' },
  { value: 'custom-domain', label: 'Custom domain setup' },
  { value: 'other', label: 'Something else' },
]

const BUDGETS = [
  { value: 'demo-2-days', label: 'Demo — $49 / 2 days' },
  { value: '99', label: 'Starter — $99 / first year' },
  { value: '149', label: 'Standard — $149 / first year' },
  { value: '299', label: 'Pro — $299 / first year' },
  { value: 'custom', label: 'Custom — quote' },
  { value: 'undecided', label: 'Not sure yet' },
]

export function Contact() {
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [projectType, setProjectType] = React.useState('')
  const [budget, setBudget] = React.useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting || done) return

    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      project_type: projectType,
      budget,
      message: String(fd.get('message') ?? ''),
    }

    if (!payload.project_type) {
      toast.error('Pick a project type')
      return
    }
    if (!payload.budget) {
      toast.error('Pick a budget tier')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Submit failed')
      }
      setDone(true)
      toast.success(data.message || 'Enquiry received. Talk soon.')
      form.reset()
      setProjectType('')
      setBudget('')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submit failed'
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: copy */}
          <div>
            <p className="eyebrow text-primary mb-3">05 · Contact</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-4">
              Start a project.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Tell me what you’re building. I’ll reply within 24 hours with a
              written brief, a cost range, and the earliest I can ship a demo.
            </p>

            <div className="space-y-3 mb-8">
              <ContactRow label="Email" value="quackeditzofficial@gmail.com" />
              <ContactRow label="Location" value="India · UTC+5:30 · Remote worldwide" />
              <ContactRow label="Response" value="Within 24 hours, every day" />
              <ContactRow label="Channels" value="Email · Discord · WhatsApp" />
            </div>

            <div className="rounded-md border border-border bg-muted/30 p-4">
              <p className="text-xs font-mono text-muted-foreground mb-1.5">
                Prefer async?
              </p>
              <p className="text-sm text-foreground/90">
                Fill the form, then{' '}
                <a
                  href="mailto:quackeditzofficial@gmail.com?subject=QuackForge%20enquiry"
                  className="text-primary hover:underline underline-offset-4 font-medium"
                >
                  email me the same brief
                </a>{' '}
                so it doesn’t get lost in spam filters.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
            {done ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Got it.</h3>
                <p className="text-muted-foreground mb-6 max-w-sm">
                  Your enquiry is in. I’ll reply within 24 hours with a brief and
                  next steps.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setDone(false)}
                  className="border-border"
                >
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Name" htmlFor="name">
                    <Input
                      id="name"
                      name="name"
                      placeholder="Xavier Dutta"
                      autoComplete="name"
                      required
                      minLength={2}
                    />
                  </Field>
                  <Field label="Email" htmlFor="email">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@brand.com"
                      autoComplete="email"
                      required
                    />
                  </Field>
                </div>

                <Field label="Project type" htmlFor="project_type">
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger id="project_type" className="w-full">
                      <SelectValue placeholder="Pick one" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPES.map((pt) => (
                        <SelectItem key={pt.value} value={pt.value}>
                          {pt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Budget tier" htmlFor="budget">
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger id="budget" className="w-full">
                      <SelectValue placeholder="Pick one" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGETS.map((b) => (
                        <SelectItem key={b.value} value={b.value}>
                          {b.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="What are you building?" htmlFor="message">
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="One paragraph. What it is, who it’s for, deadline if any."
                    required
                    minLength={10}
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group"
                  size="lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>

                <p className="text-[11px] text-muted-foreground text-center">
                  By submitting you agree to a one-off follow-up email. No
                  newsletters, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </Label>
      {children}
    </div>
  )
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="w-20 text-[11px] font-mono uppercase tracking-wider text-muted-foreground shrink-0">
        {label}
      </span>
      <span className="text-sm text-foreground/90">{value}</span>
    </div>
  )
}

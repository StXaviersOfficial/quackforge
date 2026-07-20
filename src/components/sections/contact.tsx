"use client"

import * as React from "react"
import { ArrowRight, Loader2, CheckCircle2, MessageCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import {
  StaggerGroup,
  FadeUp,
  Magnetic,
  TiltCard,
  Floating,
} from "@/components/motion-primitives"
import { motion, AnimatePresence } from "framer-motion"

const PROJECT_TYPES = [
  { value: "web-app", label: "Web app" },
  { value: "landing-page", label: "Landing page" },
  { value: "android-app", label: "Android app" },
  { value: "seo", label: "SEO ranking" },
  { value: "minecraft-mod", label: "Minecraft mod" },
  { value: "api-integration", label: "API / integration" },
  { value: "custom-domain", label: "Custom domain setup" },
  { value: "other", label: "Something else" },
]

const BUDGETS = [
  { value: "demo-2-days", label: "Demo — $49 / 2 days" },
  { value: "99", label: "Starter — $99 / first year" },
  { value: "149", label: "Standard — $149 / first year" },
  { value: "299", label: "Pro — $299 / first year" },
  { value: "custom", label: "Custom — quote" },
  { value: "undecided", label: "Not sure yet" },
]

export function Contact() {
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState(false)
  const [projectType, setProjectType] = React.useState("")
  const [budget, setBudget] = React.useState("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (submitting || done) return

    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      project_type: projectType,
      budget,
      message: String(fd.get("message") ?? ""),
    }

    if (!payload.project_type) {
      toast.error("Pick a project type")
      return
    }
    if (!payload.budget) {
      toast.error("Pick a budget tier")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submit failed")
      }
      setDone(true)
      toast.success(data.message || "Got it. Talk soon.")
      form.reset()
      setProjectType("")
      setBudget("")
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submit failed"
      toast.error(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-16 py-20 sm:py-28 relative">
      {/* Big glow */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/8 blur-3xl rounded-full pointer-events-none"
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: copy + Discord */}
          <StaggerGroup className="flex flex-col gap-6" stagger={0.1}>
            <FadeUp>
              <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-cyan-400/50" /> 06 · Contact
              </p>
            </FadeUp>
            <FadeUp>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Start a <span className="text-gradient-cyan">project.</span>
              </h2>
            </FadeUp>
            <FadeUp>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Tell me what you're building. I reply within 24 hours with a
                written brief, cost range, and the earliest I can ship a demo.
              </p>
            </FadeUp>

            <FadeUp>
              <Magnetic strength={0.3}>
                <a
                  href="https://discord.gg/VhKgEetwr8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <TiltCard
                    max={4}
                    className="relative rounded-xl border border-[#5865F2]/40 bg-[#5865F2]/5 p-5 hover:border-[#5865F2] transition-colors overflow-hidden"
                  >
                    {/* glow */}
                    <div
                      aria-hidden
                      className="absolute -top-12 -right-12 w-32 h-32 bg-[#5865F2]/30 blur-3xl rounded-full group-hover:bg-[#5865F2]/50 transition-colors"
                    />
                    <div className="relative flex items-center gap-4">
                      <Floating distance={6} duration={4}>
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#5865F2] text-white">
                          <MessageCircle className="h-6 w-6" />
                        </div>
                      </Floating>
                      <div className="flex-1">
                        <p className="text-sm font-mono text-[#7984F5] mb-1">
                          Fastest response
                        </p>
                        <p className="text-base font-semibold">
                          Join the Discord
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Talk to me directly · usually replies in minutes
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-[#7984F5] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </TiltCard>
                </a>
              </Magnetic>
            </FadeUp>

            <FadeUp>
              <div className="grid grid-cols-2 gap-3">
                <ContactCard
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value="quackeditzofficial@gmail.com"
                  href="mailto:quackeditzofficial@gmail.com"
                />
                <ContactCard
                  icon={<ArrowRight className="h-4 w-4" />}
                  label="Location"
                  value="India · UTC+5:30"
                />
              </div>
            </FadeUp>
          </StaggerGroup>

          {/* Right: form */}
          <FadeUp delay={0.3}>
            <TiltCard
              max={2}
              className="rounded-2xl border border-cyan-400/20 bg-card/60 backdrop-blur-xl p-6 sm:p-8 glow-cyan"
            >
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-300 mb-4 glow-cyan"
                    >
                      <CheckCircle2 className="h-8 w-8" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">Got it.</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm">
                      Your enquiry is in. I'll reply within 24 hours with a brief
                      and next steps.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setDone(false)}
                      className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10"
                    >
                      Send another
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Name" htmlFor="name">
                        <Input
                          id="name"
                          name="name"
                          placeholder="Xavier Dutta"
                          autoComplete="name"
                          required
                          minLength={2}
                          className="bg-background/60 border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/20"
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
                          className="bg-background/60 border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/20"
                        />
                      </Field>
                    </div>

                    <Field label="Project type" htmlFor="project_type">
                      <Select value={projectType} onValueChange={setProjectType}>
                        <SelectTrigger
                          id="project_type"
                          className="w-full bg-background/60 border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/20"
                        >
                          <SelectValue placeholder="Pick one" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-cyan-400/30">
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
                        <SelectTrigger
                          id="budget"
                          className="w-full bg-background/60 border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/20"
                        >
                          <SelectValue placeholder="Pick one" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-cyan-400/30">
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
                        placeholder="One paragraph. What it is, who it's for, deadline if any."
                        required
                        minLength={10}
                        className="bg-background/60 border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/20 resize-none"
                      />
                    </Field>

                    <Magnetic strength={0.2}>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-cyan-400 hover:bg-cyan-300 text-background font-semibold border-0 group"
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
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </Magnetic>

                    <p className="text-[11px] text-muted-foreground text-center">
                      By submitting you agree to a one-off follow-up email. No
                      newsletters, ever.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </TiltCard>
          </FadeUp>
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
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground/90">
        {label}
      </Label>
      {children}
    </div>
  )
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const Inner = (
    <div className="rounded-lg border border-border bg-card/40 backdrop-blur-sm p-4 hover:border-cyan-400/30 transition-colors group h-full">
      <div className="flex items-center gap-2 mb-2 text-cyan-300">
        {icon}
        <span className="text-[11px] font-mono uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-sm text-foreground/90 truncate">{value}</p>
    </div>
  )
  if (href) {
    return (
      <a href={href} className="block">
        {Inner}
      </a>
    )
  }
  return Inner
}

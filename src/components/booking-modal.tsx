"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBooking } from "@/hooks/use-booking";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  { value: "web-app", label: "Web app (Next.js / React)" },
  { value: "static-site", label: "Static HTML/CSS site" },
  { value: "landing-page", label: "Landing page" },
  { value: "android-app", label: "Android app" },
  { value: "seo", label: "SEO ranking" },
  { value: "minecraft-mod", label: "Minecraft mod" },
  { value: "api-integration", label: "API / integration" },
  { value: "automation", label: "Automation script" },
  { value: "discord-bot", label: "Discord bot" },
  { value: "telegram-bot", label: "Telegram bot" },
  { value: "whatsapp-bot", label: "WhatsApp automation" },
  { value: "custom-domain", label: "Custom domain setup" },
  { value: "other", label: "Something else" },
];

const BUDGET_TIERS = [
  { value: "demo", label: "Free Demo — $0" },
  { value: "starter", label: "Starter — $99" },
  { value: "growth", label: "Growth — $249" },
  { value: "pro", label: "Pro — $599" },
  { value: "elite", label: "Elite — $1,499" },
  { value: "enterprise", label: "Enterprise — Custom quote" },
  { value: "maintenance", label: "Maintenance plan" },
  { value: "undecided", label: "Not sure yet" },
];

const TIMELINES = [
  { value: "asap", label: "ASAP — within 1 week" },
  { value: "2-weeks", label: "Within 2 weeks" },
  { value: "1-month", label: "Within 1 month" },
  { value: "flexible", label: "Flexible" },
];

type Errors = Partial<Record<"name" | "email" | "projectType" | "budget" | "message" | "timeline", string>>;

export function BookingModal() {
  const { open, preset, closeBooking } = useBooking();
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [projectType, setProjectType] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [timeline, setTimeline] = React.useState("");
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [errors, setErrors] = React.useState<Errors>({});

  // Apply preset when modal opens
  React.useEffect(() => {
    if (open) {
      setDone(false);
      setProjectType(preset.projectType || "");
      setBudget(preset.budget || "");
      setTimeline("");
      setTouched({});
      setErrors({});
    }
  }, [open, preset]);

  // Escape to close
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) closeBooking();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, submitting, closeBooking]);

  function validate(): Errors {
    const e: Errors = {};
    const name = (document.getElementById("bk-name") as HTMLInputElement)?.value || "";
    const email = (document.getElementById("bk-email") as HTMLInputElement)?.value || "";
    const message = (document.getElementById("bk-message") as HTMLTextAreaElement)?.value || "";
    if (!name || name.trim().length < 2) e.name = "Your name is required";
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!projectType) e.projectType = "Pick what you want built";
    if (!budget) e.budget = "Pick a budget tier";
    if (!message || message.trim().length < 10)
      e.message = "Tell us a bit more — at least 10 characters";
    if (!timeline) e.timeline = "Pick a timeline";
    return e;
  }

  function onBlur(field: string) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const v = validate();
    setErrors(v);
    setTouched({ name: true, email: true, projectType: true, budget: true, message: true, timeline: true });
    if (Object.keys(v).length > 0) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    if (submitting || done) return;

    const form = ev.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      project_type: projectType,
      budget,
      timeline,
      message: String(fd.get("message") ?? ""),
      source: "quackforge-booking-modal",
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Submit failed");
      setDone(true);
      toast.success("Project enquiry received — we'll reply within 24 hours.");
      form.reset();
      setProjectType("");
      setBudget("");
      setTimeline("");
      setErrors({});
      setTouched({});
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submit failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="booking-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => !submitting && closeBooking()}
          />
          <motion.div
            className="booking-modal"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-cyan-400/30 bg-card glow-cyan-strong overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-cyan-400/20 px-6 py-5 bg-background/40">
                <div>
                  <p className="eyebrow text-cyan-300 mb-1">Project Booking</p>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {done ? "All set." : "Build your project."}
                  </h2>
                </div>
                <button
                  onClick={closeBooking}
                  disabled={submitting}
                  aria-label="Close"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-cyan-400 transition-colors disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
                {done ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
                    <h3 className="text-xl font-semibold mb-2">
                      Thanks — we'll reply within 24 hours.
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Your enquiry is in. The team will follow up with a written brief, cost range, and demo timeline.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                      <Button
                        asChild
                        className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white border-0"
                      >
                        <a
                          href="https://discord.gg/VhKgEetwr8"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Join Discord
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setDone(false);
                          closeBooking();
                        }}
                        className="flex-1 border-cyan-400/30 text-cyan-200 hover:bg-cyan-400/10"
                      >
                        Close
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    {/* Preset display */}
                    {(preset.plan || preset.price) && (
                      <div className="rounded-lg border border-cyan-400/30 bg-cyan-400/5 p-3 flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-mono uppercase text-cyan-300 mb-0.5">
                            Selected plan
                          </p>
                          <p className="text-sm font-semibold">
                            {preset.plan}
                            {preset.price ? ` · ${preset.price}` : ""}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-xs text-muted-foreground hover:text-foreground underline-offset-4 underline"
                          onClick={() => setBudget("")}
                        >
                          Change
                        </button>
                      </div>
                    )}

                    {/* Quick contact row */}
                    <div className="flex flex-wrap gap-2 pb-2">
                      <a
                        href="https://discord.gg/VhKgEetwr8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#5865F2]/40 bg-[#5865F2]/10 text-xs text-[#7984F5] hover:bg-[#5865F2]/20 transition-colors"
                      >
                        <MessageCircle className="h-3 w-3" />
                        Faster on Discord
                      </a>
                      <a
                        href="mailto:quackforgeofficial@gmail.com?subject=Project%20enquiry%20from%20QuackForge"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-cyan-400/30 bg-cyan-400/5 text-xs text-cyan-300 hover:bg-cyan-400/15 transition-colors"
                      >
                        <Mail className="h-3 w-3" />
                        Email us instead
                      </a>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Your name" htmlFor="bk-name" error={touched.name ? errors.name : undefined}>
                        <Input
                          id="bk-name"
                          name="name"
                          placeholder="Jane Doe"
                          autoComplete="name"
                          onBlur={() => onBlur("name")}
                          className={cn(
                            "bg-background border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/30",
                            touched.name && errors.name && "border-destructive focus:border-destructive focus:ring-destructive/30"
                          )}
                        />
                      </Field>
                      <Field label="Email" htmlFor="bk-email" error={touched.email ? errors.email : undefined}>
                        <Input
                          id="bk-email"
                          name="email"
                          type="email"
                          placeholder="you@brand.com"
                          autoComplete="email"
                          onBlur={() => onBlur("email")}
                          className={cn(
                            "bg-background border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/30",
                            touched.email && errors.email && "border-destructive focus:border-destructive focus:ring-destructive/30"
                          )}
                        />
                      </Field>
                    </div>

                    {/* Project type */}
                    <Field
                      label="What do you want built?"
                      htmlFor="bk-project-type"
                      error={touched.projectType ? errors.projectType : undefined}
                    >
                      <Select
                        value={projectType}
                        onValueChange={(v) => {
                          setProjectType(v);
                          setTouched((t) => ({ ...t, projectType: true }));
                          setErrors(validate());
                        }}
                      >
                        <SelectTrigger
                          id="bk-project-type"
                          className={cn(
                            "w-full bg-background border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/30",
                            touched.projectType && errors.projectType && "border-destructive"
                          )}
                        >
                          <SelectValue placeholder="Pick one" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-cyan-400/30 max-h-72">
                          {PROJECT_TYPES.map((pt) => (
                            <SelectItem key={pt.value} value={pt.value}>
                              {pt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>

                    {/* Budget + Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field
                        label="Budget tier"
                        htmlFor="bk-budget"
                        error={touched.budget ? errors.budget : undefined}
                      >
                        <Select
                          value={budget}
                          onValueChange={(v) => {
                            setBudget(v);
                            setTouched((t) => ({ ...t, budget: true }));
                            setErrors(validate());
                          }}
                        >
                          <SelectTrigger
                            id="bk-budget"
                            className={cn(
                              "w-full bg-background border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/30",
                              touched.budget && errors.budget && "border-destructive"
                            )}
                          >
                            <SelectValue placeholder="Pick one" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-cyan-400/30">
                            {BUDGET_TIERS.map((b) => (
                              <SelectItem key={b.value} value={b.value}>
                                {b.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field
                        label="Timeline"
                        htmlFor="bk-timeline"
                        error={touched.timeline ? errors.timeline : undefined}
                      >
                        <Select
                          value={timeline}
                          onValueChange={(v) => {
                            setTimeline(v);
                            setTouched((t) => ({ ...t, timeline: true }));
                            setErrors(validate());
                          }}
                        >
                          <SelectTrigger
                            id="bk-timeline"
                            className={cn(
                              "w-full bg-background border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/30",
                              touched.timeline && errors.timeline && "border-destructive"
                            )}
                          >
                            <SelectValue placeholder="Pick one" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-cyan-400/30">
                            {TIMELINES.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>

                    {/* Message */}
                    <Field
                      label="Project brief"
                      htmlFor="bk-message"
                      error={touched.message ? errors.message : undefined}
                    >
                      <Textarea
                        id="bk-message"
                        name="message"
                        rows={5}
                        placeholder="What it is, who it's for, deadline if any, links to references, anything else we should know."
                        onBlur={() => onBlur("message")}
                        className={cn(
                          "bg-background border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/30 resize-none",
                          touched.message && errors.message && "border-destructive focus:border-destructive focus:ring-destructive/30"
                        )}
                      />
                    </Field>

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
                          Send project enquiry
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>

                    <p className="text-[11px] text-muted-foreground text-center">
                      By submitting you agree to a one-off follow-up email. No newsletters, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground/90">
        {label}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="text-[11px] text-destructive"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

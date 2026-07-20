"use client";

import * as React from "react";
import { ArrowRight, Loader2, CheckCircle2, MessageCircle, Mail, AlertCircle } from "lucide-react";
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
import { toast } from "sonner";
import {
  StaggerGroup,
  FadeUp,
  Magnetic,
  TiltCard,
  Floating,
} from "@/components/motion-primitives";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PROJECT_TYPES = [
  { value: "web-app", label: "Web app" },
  { value: "landing-page", label: "Landing page" },
  { value: "android-app", label: "Android app" },
  { value: "seo", label: "SEO ranking" },
  { value: "minecraft-mod", label: "Minecraft mod" },
  { value: "api-integration", label: "API / integration" },
  { value: "custom-domain", label: "Custom domain setup" },
  { value: "other", label: "Something else" },
];

const BUDGETS = [
  { value: "demo", label: "Demo — $0" },
  { value: "99", label: "Starter — $99" },
  { value: "249", label: "Growth — $249" },
  { value: "599", label: "Pro — $599" },
  { value: "1499", label: "Elite — $1,499" },
  { value: "custom", label: "Enterprise — Custom quote" },
  { value: "maintenance", label: "Maintenance plan" },
  { value: "undecided", label: "Not sure yet" },
];

type Errors = Partial<{
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}>;

export function Contact() {
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [projectType, setProjectType] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [errors, setErrors] = React.useState<Errors>({});

  function validate(): Errors {
    const e: Errors = {};
    const name = (document.getElementById("name") as HTMLInputElement)?.value || "";
    const email = (document.getElementById("email") as HTMLInputElement)?.value || "";
    const message = (document.getElementById("message") as HTMLTextAreaElement)?.value || "";
    if (!name || name.trim().length < 2) e.name = "Name is required";
    if (!email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!projectType) e.projectType = "Pick a project type";
    if (!budget) e.budget = "Pick a budget tier";
    if (!message || message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    return e;
  }

  function onBlur(field: string) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate());
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    setTouched({ name: true, email: true, projectType: true, budget: true, message: true });
    if (Object.keys(v).length > 0) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    if (submitting || done) return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      project_type: projectType,
      budget,
      message: String(fd.get("message") ?? ""),
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submit failed");
      }
      setDone(true);
      toast.success("Thanks — we'll reply within 24 hours.");
      form.reset();
      setProjectType("");
      setBudget("");
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
    <section id="contact" className="scroll-mt-16 py-20 sm:py-28 relative">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: copy + Discord */}
          <StaggerGroup className="flex flex-col gap-6" stagger={0.1}>
            <FadeUp>
              <p className="eyebrow text-cyan-300 mb-3 flex items-center gap-2">
                <span className="h-px w-8 bg-cyan-400/50" /> 08 · Contact
              </p>
            </FadeUp>
            <FadeUp>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Start a <span className="text-gradient-cyan">project.</span>
              </h2>
            </FadeUp>
            <FadeUp>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Tell us what you're building. Our team replies within 24 hours
                with a written brief, cost range, and the earliest we can ship a
                demo.
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
                    <div
                      aria-hidden
                      className="absolute -top-12 -right-12 w-32 h-32 bg-[#5865F2]/30 pointer-events-none rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(88,101,242,0.35), transparent 70%)",
                      }}
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
                        <p className="text-base font-semibold">Join the Discord</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Talk to our team directly · usually replies in minutes
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
                  value="India · UTC+5:30 · Remote worldwide"
                />
              </div>
            </FadeUp>
          </StaggerGroup>

          {/* Right: form */}
          <FadeUp delay={0.3}>
            <TiltCard
              max={2}
              className="rounded-2xl border border-cyan-400/30 bg-card p-6 sm:p-8 glow-cyan"
            >
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
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
                    <h3 className="text-xl font-semibold mb-2">Thanks — we'll reply within 24 hours.</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm">
                      Your enquiry is in. The team will follow up with a written
                      brief and next steps.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setDone(false)}
                      className="border-cyan-400/30 text-cyan-200 hover:bg-cyan-400/10"
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
                      <Field
                        label="Name"
                        htmlFor="name"
                        error={touched.name ? errors.name : undefined}
                      >
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          autoComplete="name"
                          onBlur={() => onBlur("name")}
                          className={cn(
                            "bg-background border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/30",
                            touched.name && errors.name && "border-destructive focus:border-destructive focus:ring-destructive/30"
                          )}
                        />
                      </Field>
                      <Field
                        label="Email"
                        htmlFor="email"
                        error={touched.email ? errors.email : undefined}
                      >
                        <Input
                          id="email"
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

                    <Field
                      label="Project type"
                      htmlFor="project_type"
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
                          id="project_type"
                          className={cn(
                            "w-full bg-background border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/30",
                            touched.projectType && errors.projectType && "border-destructive"
                          )}
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

                    <Field
                      label="Budget tier"
                      htmlFor="budget"
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
                          id="budget"
                          className={cn(
                            "w-full bg-background border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/30",
                            touched.budget && errors.budget && "border-destructive"
                          )}
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

                    <Field
                      label="What are you building?"
                      htmlFor="message"
                      error={touched.message ? errors.message : undefined}
                    >
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="One paragraph. What it is, who it's for, deadline if any."
                        onBlur={() => onBlur("message")}
                        className={cn(
                          "bg-background border-cyan-400/20 focus:border-cyan-400 focus:ring-cyan-400/30 resize-none",
                          touched.message && errors.message && "border-destructive focus:border-destructive focus:ring-destructive/30"
                        )}
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
            className="flex items-center gap-1.5 text-[11px] text-destructive"
          >
            <AlertCircle className="h-3 w-3" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="rounded-lg border border-border bg-card p-4 hover:border-cyan-400/40 transition-colors group h-full">
      <div className="flex items-center gap-2 mb-2 text-cyan-300">
        {icon}
        <span className="text-[11px] font-mono uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm text-foreground/90 truncate">{value}</p>
    </div>
  );
  if (href) {
    return (
      <a href={href} className="block">
        {Inner}
      </a>
    );
  }
  return Inner;
}

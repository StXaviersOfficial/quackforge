"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Theme {
  id: string;
  name: string;
  vars: Record<string, string>;
}

// 20 color themes — each changes the CSS variables
export const THEMES: Theme[] = [
  {
    id: "cyan",
    name: "Cyan",
    vars: {
      "--background": "#0A1830",
      "--card": "#0F2147",
      "--primary": "#22D3EE",
      "--accent": "#3B82F6",
      "--border": "rgba(34, 211, 238, 0.25)",
      "--brand-cyan": "#22D3EE",
      "--brand-blue": "#3B82F6",
    },
  },
  {
    id: "purple",
    name: "Purple",
    vars: {
      "--background": "#0D0A1A",
      "--card": "#1A0F2E",
      "--primary": "#A855F7",
      "--accent": "#7C3AED",
      "--border": "rgba(168, 85, 247, 0.25)",
      "--brand-cyan": "#A855F7",
      "--brand-blue": "#7C3AED",
    },
  },
  {
    id: "emerald",
    name: "Emerald",
    vars: {
      "--background": "#051A14",
      "--card": "#0A2B20",
      "--primary": "#10B981",
      "--accent": "#059669",
      "--border": "rgba(16, 185, 129, 0.25)",
      "--brand-cyan": "#10B981",
      "--brand-blue": "#059669",
    },
  },
  {
    id: "orange",
    name: "Orange",
    vars: {
      "--background": "#1A0F05",
      "--card": "#2B1A0A",
      "--primary": "#F97316",
      "--accent": "#EA580C",
      "--border": "rgba(249, 115, 22, 0.25)",
      "--brand-cyan": "#F97316",
      "--brand-blue": "#EA580C",
    },
  },
  {
    id: "rose",
    name: "Rose",
    vars: {
      "--background": "#1A0510",
      "--card": "#2B0A1A",
      "--primary": "#F43F5E",
      "--accent": "#E11D48",
      "--border": "rgba(244, 63, 94, 0.25)",
      "--brand-cyan": "#F43F5E",
      "--brand-blue": "#E11D48",
    },
  },
  {
    id: "amber",
    name: "Amber",
    vars: {
      "--background": "#1A1405",
      "--card": "#2B220A",
      "--primary": "#F59E0B",
      "--accent": "#D97706",
      "--border": "rgba(245, 158, 11, 0.25)",
      "--brand-cyan": "#F59E0B",
      "--brand-blue": "#D97706",
    },
  },
  {
    id: "indigo",
    name: "Indigo",
    vars: {
      "--background": "#0A0A1F",
      "--card": "#14142B",
      "--primary": "#6366F1",
      "--accent": "#4F46E5",
      "--border": "rgba(99, 102, 241, 0.25)",
      "--brand-cyan": "#6366F1",
      "--brand-blue": "#4F46E5",
    },
  },
  {
    id: "teal",
    name: "Teal",
    vars: {
      "--background": "#051A1A",
      "--card": "#0A2B2B",
      "--primary": "#14B8A6",
      "--accent": "#0D9488",
      "--border": "rgba(20, 184, 166, 0.25)",
      "--brand-cyan": "#14B8A6",
      "--brand-blue": "#0D9488",
    },
  },
  {
    id: "pink",
    name: "Pink",
    vars: {
      "--background": "#1A0514",
      "--card": "#2B0A20",
      "--primary": "#EC4899",
      "--accent": "#DB2777",
      "--border": "rgba(236, 72, 153, 0.25)",
      "--brand-cyan": "#EC4899",
      "--brand-blue": "#DB2777",
    },
  },
  {
    id: "lime",
    name: "Lime",
    vars: {
      "--background": "#0F1A05",
      "--card": "#1A2B0A",
      "--primary": "#84CC16",
      "--accent": "#65A30D",
      "--border": "rgba(132, 204, 22, 0.25)",
      "--brand-cyan": "#84CC16",
      "--brand-blue": "#65A30D",
    },
  },
  {
    id: "sky",
    name: "Sky",
    vars: {
      "--background": "#05101A",
      "--card": "#0A1F2B",
      "--primary": "#0EA5E9",
      "--accent": "#0284C7",
      "--border": "rgba(14, 165, 233, 0.25)",
      "--brand-cyan": "#0EA5E9",
      "--brand-blue": "#0284C7",
    },
  },
  {
    id: "violet",
    name: "Violet",
    vars: {
      "--background": "#10051A",
      "--card": "#1F0A2B",
      "--primary": "#8B5CF6",
      "--accent": "#7C3AED",
      "--border": "rgba(139, 92, 246, 0.25)",
      "--brand-cyan": "#8B5CF6",
      "--brand-blue": "#7C3AED",
    },
  },
  {
    id: "red",
    name: "Red",
    vars: {
      "--background": "#1A0505",
      "--card": "#2B0A0A",
      "--primary": "#EF4444",
      "--accent": "#DC2626",
      "--border": "rgba(239, 68, 68, 0.25)",
      "--brand-cyan": "#EF4444",
      "--brand-blue": "#DC2626",
    },
  },
  {
    id: "fuchsia",
    name: "Fuchsia",
    vars: {
      "--background": "#1A0514",
      "--card": "#2B0A1F",
      "--primary": "#D946EF",
      "--accent": "#C026D3",
      "--border": "rgba(217, 70, 239, 0.25)",
      "--brand-cyan": "#D946EF",
      "--brand-blue": "#C026D3",
    },
  },
  {
    id: "blue",
    name: "Blue",
    vars: {
      "--background": "#050A1A",
      "--card": "#0A142B",
      "--primary": "#3B82F6",
      "--accent": "#2563EB",
      "--border": "rgba(59, 130, 246, 0.25)",
      "--brand-cyan": "#3B82F6",
      "--brand-blue": "#2563EB",
    },
  },
  {
    id: "gold",
    name: "Gold",
    vars: {
      "--background": "#1A1405",
      "--card": "#2B220A",
      "--primary": "#EAB308",
      "--accent": "#CA8A04",
      "--border": "rgba(234, 179, 8, 0.25)",
      "--brand-cyan": "#EAB308",
      "--brand-blue": "#CA8A04",
    },
  },
  {
    id: "crimson",
    name: "Crimson",
    vars: {
      "--background": "#140505",
      "--card": "#240A0A",
      "--primary": "#DC143C",
      "--accent": "#B91C1C",
      "--border": "rgba(220, 20, 60, 0.25)",
      "--brand-cyan": "#DC143C",
      "--brand-blue": "#B91C1C",
    },
  },
  {
    id: "mint",
    name: "Mint",
    vars: {
      "--background": "#051A10",
      "--card": "#0A2B18",
      "--primary": "#34D399",
      "--accent": "#10B981",
      "--border": "rgba(52, 211, 153, 0.25)",
      "--brand-cyan": "#34D399",
      "--brand-blue": "#10B981",
    },
  },
  {
    id: "coral",
    name: "Coral",
    vars: {
      "--background": "#1A0A05",
      "--card": "#2B140A",
      "--primary": "#FF7F50",
      "--accent": "#E0633A",
      "--border": "rgba(255, 127, 80, 0.25)",
      "--brand-cyan": "#FF7F50",
      "--brand-blue": "#E0633A",
    },
  },
  {
    id: "slate",
    name: "Slate",
    vars: {
      "--background": "#0A0A0F",
      "--card": "#14141F",
      "--primary": "#64748B",
      "--accent": "#475569",
      "--border": "rgba(100, 116, 139, 0.25)",
      "--brand-cyan": "#64748B",
      "--brand-blue": "#475569",
    },
  },
];

export function ThemeSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("cyan");
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });
    setActive(theme.id);
    try {
      localStorage.setItem("qf-theme", theme.id);
    } catch {}
  };

  React.useEffect(() => {
    // Load saved theme
    try {
      const saved = localStorage.getItem("qf-theme");
      if (saved) {
        const theme = THEMES.find((t) => t.id === saved);
        if (theme) applyTheme(theme);
      }
    } catch {}

    // Close on outside click
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const activeTheme = THEMES.find((t) => t.id === active);

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors text-sm"
        aria-label="Change theme"
      >
        <Palette className="h-4 w-4 text-primary" />
        <span className="font-mono text-xs">{activeTheme?.name || "Cyan"}</span>
        <div
          className="h-4 w-4 rounded-full border border-border"
          style={{ background: activeTheme?.vars["--primary"] || "#22D3EE" }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-full right-0 mt-2 bg-card border border-border rounded-xl p-2 shadow-2xl z-50"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "6px",
              maxWidth: "280px",
            }}
          >
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  applyTheme(theme);
                  setOpen(false);
                }}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors hover:bg-muted/50",
                  active === theme.id && "bg-primary/10"
                )}
                title={theme.name}
              >
                <div
                  className="h-6 w-6 rounded-full border-2"
                  style={{
                    background: theme.vars["--primary"],
                    borderColor: active === theme.id ? "#fff" : "transparent",
                  }}
                />
                <span className="text-[9px] font-mono text-muted-foreground">
                  {theme.name}
                </span>
                {active === theme.id && (
                  <Check className="h-3 w-3 text-primary" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import * as React from "react";

/**
 * Detects user locale and returns preferred currency.
 * - India (hi-* language, -in locale, or Asia/Kolkata timezone) → INR
 * - Everywhere else → USD
 *
 * Allows manual override via toggle.
 */
export function useCurrency() {
  const [currency, setCurrency] = React.useState<"USD" | "INR">("USD");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const lang = (navigator.language || "").toLowerCase();
    const langs = (navigator.languages || []).map((l) => l.toLowerCase());
    const tz =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const isIndia =
      lang.startsWith("hi") ||
      lang.includes("-in") ||
      langs.some((l) => l.startsWith("hi") || l.includes("-in")) ||
      tz === "Asia/Kolkata";
    setCurrency(isIndia ? "INR" : "USD");
    setMounted(true);
  }, []);

  const toggle = React.useCallback(() => {
    setCurrency((c) => (c === "USD" ? "INR" : "USD"));
  }, []);

  return { currency, toggle, mounted };
}

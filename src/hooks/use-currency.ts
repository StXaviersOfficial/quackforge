"use client";

import * as React from "react";
import { useBooking } from "@/hooks/use-booking";

type Currency = {
  code: "USD" | "INR" | "EUR" | "GBP" | "CAD" | "AUD";
  symbol: string;
  label: string;
  // Multiplier from USD base
  rate: number;
};

const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", label: "USD", rate: 1 },
  { code: "INR", symbol: "₹", label: "INR", rate: 83 },
  { code: "EUR", symbol: "€", label: "EUR", rate: 0.92 },
  { code: "GBP", symbol: "£", label: "GBP", rate: 0.79 },
  { code: "CAD", symbol: "C$", label: "CAD", rate: 1.37 },
  { code: "AUD", symbol: "A$", label: "AUD", rate: 1.52 },
];

export function useCurrency() {
  const [currency, setCurrency] = React.useState<Currency>(CURRENCIES[0]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const lang = (navigator.language || "").toLowerCase();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

    let picked: Currency = CURRENCIES[0]; // default USD

    // INR — India
    if (lang.startsWith("hi") || lang.includes("-in") || tz === "Asia/Kolkata") {
      picked = CURRENCIES.find((c) => c.code === "INR")!;
    }
    // EUR — Eurozone (rough by language prefix or timezone)
    else if (
      ["de-", "fr-", "es-", "it-", "nl-", "pt-", "at-", "be-", "fi-", "ie-", "el-", "sk-"].some(
        (p) => lang.startsWith(p)
      ) ||
      [
        "Europe/Berlin", "Europe/Paris", "Europe/Madrid", "Europe/Rome",
        "Europe/Amsterdam", "Europe/Lisbon", "Europe/Vienna", "Europe/Brussels",
        "Europe/Helsinki", "Europe/Dublin", "Europe/Athens", "Europe/Bratislava",
      ].includes(tz)
    ) {
      picked = CURRENCIES.find((c) => c.code === "EUR")!;
    }
    // GBP — UK
    else if (lang.startsWith("en-gb") || tz === "Europe/London") {
      picked = CURRENCIES.find((c) => c.code === "GBP")!;
    }
    // CAD — Canada
    else if (lang.startsWith("en-ca") || lang.startsWith("fr-ca") || tz === "America/Toronto" || tz === "America/Vancouver" || tz === "America/Halifax" || tz === "America/Edmonton") {
      picked = CURRENCIES.find((c) => c.code === "CAD")!;
    }
    // AUD — Australia
    else if (lang.startsWith("en-au") || tz === "Australia/Sydney" || tz === "Australia/Melbourne" || tz === "Australia/Brisbane" || tz === "Australia/Perth") {
      picked = CURRENCIES.find((c) => c.code === "AUD")!;
    }

    setCurrency(picked);
    setMounted(true);
  }, []);

  const toggle = React.useCallback(() => {
    setCurrency((curr) => {
      const i = CURRENCIES.findIndex((c) => c.code === curr.code);
      return CURRENCIES[(i + 1) % CURRENCIES.length];
    });
  }, []);

  // Format a USD base price to current currency
  const format = React.useCallback(
    (usd: number, opts?: { showCode?: boolean }) => {
      const converted = Math.round(usd * currency.rate);
      // Round INR to nearest 99 (Indian pricing convention)
      const rounded =
        currency.code === "INR"
          ? Math.round(converted / 100) * 100 - 1
          : converted;
      const formatted = rounded.toLocaleString("en-US");
      const suffix = opts?.showCode ? ` ${currency.code}` : "";
      return `${currency.symbol}${formatted}${suffix}`;
    },
    [currency]
  );

  return { currency, toggle, mounted, format, currencies: CURRENCIES };
}

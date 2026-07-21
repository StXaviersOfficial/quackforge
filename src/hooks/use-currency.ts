"use client";

import * as React from "react";

type Currency = {
  code: "USD" | "INR" | "EUR" | "GBP" | "CAD" | "AUD";
  symbol: string;
  label: string;
  rate: number; // multiplier from USD
};

const CURRENCIES: Currency[] = [
  { code: "USD", symbol: "$", label: "USD — US Dollar", rate: 1 },
  { code: "INR", symbol: "₹", label: "INR — Indian Rupee", rate: 83 },
  { code: "EUR", symbol: "€", label: "EUR — Euro", rate: 0.92 },
  { code: "GBP", symbol: "£", label: "GBP — British Pound", rate: 0.79 },
  { code: "CAD", symbol: "C$", label: "CAD — Canadian Dollar", rate: 1.37 },
  { code: "AUD", symbol: "A$", label: "AUD — Australian Dollar", rate: 1.52 },
];

// Fixed INR prices per tier (NOT converted from USD)
// These are the original Indian-market prices.
const INR_FIXED: Record<string, number> = {
  demo: 0,
  starter: 4999,
  growth: 12999,
  pro: 29999,
  elite: 79999,
  // Maintenance
  "request-a-fix": 2499,
  "care-basic": 2999,
  "care-complete": 8999,
};

export function useCurrency() {
  const [currency, setCurrency] = React.useState<Currency>(CURRENCIES[0]);
  const [countryName, setCountryName] = React.useState<string>("");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // First, try client-side detection as fast fallback
    const lang = (navigator.language || "").toLowerCase();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    let picked: Currency = CURRENCIES[0];

    if (lang.startsWith("hi") || lang.includes("-in") || tz === "Asia/Kolkata") {
      picked = CURRENCIES.find((c) => c.code === "INR")!;
    } else if (["de-", "fr-", "es-", "it-", "nl-", "pt-", "at-", "be-", "fi-", "ie-", "el-", "sk-"].some((p) => lang.startsWith(p)) ||
      ["Europe/Berlin", "Europe/Paris", "Europe/Madrid", "Europe/Rome", "Europe/Amsterdam", "Europe/Lisbon", "Europe/Vienna", "Europe/Brussels", "Europe/Helsinki", "Europe/Dublin", "Europe/Athens", "Europe/Bratislava"].includes(tz)) {
      picked = CURRENCIES.find((c) => c.code === "EUR")!;
    } else if (lang.startsWith("en-gb") || tz === "Europe/London") {
      picked = CURRENCIES.find((c) => c.code === "GBP")!;
    } else if (lang.startsWith("en-ca") || lang.startsWith("fr-ca") || ["America/Toronto", "America/Vancouver", "America/Halifax", "America/Edmonton"].includes(tz)) {
      picked = CURRENCIES.find((c) => c.code === "CAD")!;
    } else if (lang.startsWith("en-au") || ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Perth"].includes(tz)) {
      picked = CURRENCIES.find((c) => c.code === "AUD")!;
    }

    setCurrency(picked);
    setMounted(true);

    // Then fetch server-side geo for accuracy
    fetch("/api/geo")
      .then((r) => r.json())
      .then((data) => {
        if (data?.currency) {
          const server = CURRENCIES.find((c) => c.code === data.currency);
          if (server) setCurrency(server);
        }
        if (data?.countryName) setCountryName(data.countryName);
      })
      .catch(() => {});
  }, []);

  const setByCode = React.useCallback((code: string) => {
    const c = CURRENCIES.find((c) => c.code === code);
    if (c) setCurrency(c);
  }, []);

  const toggle = React.useCallback(() => {
    setCurrency((curr) => {
      const i = CURRENCIES.findIndex((c) => c.code === curr.code);
      return CURRENCIES[(i + 1) % CURRENCIES.length];
    });
  }, []);

  // Format price. If INR, use FIXED prices (not USD conversion).
  // usd param is the USD base price. tierId is used to look up fixed INR price.
  const format = React.useCallback(
    (usd: number, tierId?: string, opts?: { perMonth?: boolean }) => {
      let amount: number;
      if (currency.code === "INR" && tierId && tierId in INR_FIXED) {
        amount = INR_FIXED[tierId];
      } else {
        amount = Math.round(usd * currency.rate);
        // INR rounding convention only when not using fixed
        if (currency.code === "INR") {
          amount = Math.round(amount / 100) * 100 - 1;
        }
      }
      const formatted = amount.toLocaleString("en-US");
      const suffix = opts?.perMonth ? "/mo" : "";
      return `${currency.symbol}${formatted}${suffix}`;
    },
    [currency]
  );

  return {
    currency,
    setCurrency: setByCode,
    toggle,
    mounted,
    format,
    currencies: CURRENCIES,
    countryName,
  };
}

"use client";

import * as React from "react";

export interface BookingPreset {
  plan?: string;
  price?: string;
  projectType?: string;
  budget?: string;
}

interface BookingContextValue {
  open: boolean;
  preset: BookingPreset;
  openBooking: (preset?: BookingPreset) => void;
  closeBooking: () => void;
}

const BookingContext = React.createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [preset, setPreset] = React.useState<BookingPreset>({});

  const openBooking = React.useCallback((p: BookingPreset = {}) => {
    setPreset(p);
    setOpen(true);
    // Lock scroll
    document.body.style.overflow = "hidden";
  }, []);

  const closeBooking = React.useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  const value = React.useMemo(
    () => ({ open, preset, openBooking, closeBooking }),
    [open, preset, openBooking, closeBooking]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = React.useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}

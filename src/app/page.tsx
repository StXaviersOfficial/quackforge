"use client";

import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Pricing } from "@/components/sections/pricing";
import { Maintenance } from "@/components/sections/maintenance";
import { Team } from "@/components/sections/team";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { ScrollProgress, CustomCursor } from "@/components/motion-primitives";
import { NoiseOverlay } from "@/components/noise-overlay";
import { BookingProvider } from "@/hooks/use-booking";
import { BookingModal } from "@/components/booking-modal";
import { DiscordFab } from "@/components/discord-fab";

export default function Home() {
  return (
    <BookingProvider>
      <ScrollProgress />
      <CustomCursor />
      <NoiseOverlay />
      <SiteNav />
      <main className="flex-1 relative">
        <Hero />
        <Services />
        <Pricing />
        <Maintenance />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BookingModal />
      <DiscordFab />
    </BookingProvider>
  );
}

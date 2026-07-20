"use client";

import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Pricing } from "@/components/sections/pricing";
import { Maintenance } from "@/components/sections/maintenance";
import { Work } from "@/components/sections/work";
import { Testimonials } from "@/components/sections/testimonials";
import { Team } from "@/components/sections/team";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { ScrollProgress, CustomCursor } from "@/components/motion-primitives";
import { NoiseOverlay } from "@/components/noise-overlay";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <NoiseOverlay />
      <SiteNav />
      <main className="flex-1 relative">
        <Hero />
        <Services />
        <Pricing />
        <Maintenance />
        <Work />
        <Testimonials />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

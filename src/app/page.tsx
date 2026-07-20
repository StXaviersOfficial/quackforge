"use client"

import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Pricing } from "@/components/sections/pricing"
import { Work } from "@/components/sections/work"
import { Process } from "@/components/sections/process"
import { FAQ } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { ScrollProgress, CustomCursor } from "@/components/motion-primitives"
import { NoiseOverlay } from "@/components/noise-overlay"

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
        <Work />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

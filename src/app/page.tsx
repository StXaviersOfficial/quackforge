import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { Pricing } from '@/components/sections/pricing'
import { Work } from '@/components/sections/work'
import { Process } from '@/components/sections/process'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Services />
        <Pricing />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

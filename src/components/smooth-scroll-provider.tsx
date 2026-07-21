"use client"

import * as React from "react"

/**
 * Lightweight smooth-scroll that doesn't fight Framer Motion.
 * - Clicking an anchor (#foo) animates scroll instead of jump
 * - Respects prefers-reduced-motion
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute("href")
      if (!href || href === "#") return
      const el = document.querySelector(href)
      if (!el) return
      e.preventDefault()
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: "smooth" })
      // Update hash without jumping
      history.replaceState(null, "", href)
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return <>{children}</>
}

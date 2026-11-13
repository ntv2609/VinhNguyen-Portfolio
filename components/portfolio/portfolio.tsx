"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Command, CornerDownLeft, X } from "lucide-react"
import SiteHeader from "@/components/portfolio/site-header"
import Hero from "@/components/portfolio/hero"
import ProjectShowcase from "@/components/portfolio/project-showcase"
import Craft from "@/components/portfolio/craft"
import SiteFooter from "@/components/portfolio/site-footer"

const links = [
  { label: "Selected work", href: "#work", key: "W" },
  { label: "How I work", href: "#approach", key: "A" },
  { label: "Get in touch", href: "#contact", key: "C" },
]

export default function Portfolio() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const paletteRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
      if (event.key === "Escape") setPaletteOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (!paletteOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const focusable = paletteRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
    focusable?.[0]?.focus()

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", trapFocus)
    return () => {
      window.removeEventListener("keydown", trapFocus)
      previouslyFocused?.focus()
    }
  }, [paletteOpen])

  return (
    <>
      <SiteHeader onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <ProjectShowcase />
        <Craft />
      </main>
      <SiteFooter />

      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            className="palette-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setPaletteOpen(false)
            }}
          >
            <motion.section
              ref={paletteRef}
              className="command-palette"
              id="palette-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="palette-title"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="palette-heading">
                <span id="palette-title">Jump to</span>
                <button className="icon-button" onClick={() => setPaletteOpen(false)} aria-label="Close command menu">
                  <X size={16} />
                </button>
              </div>
              <div className="palette-links">
                {links.map((link) => (
                  <a key={link.key} href={link.href} onClick={() => setPaletteOpen(false)}>
                    <span>{link.label}</span>
                    <span className="palette-shortcut"><CornerDownLeft size={13} /> {link.key}</span>
                  </a>
                ))}
                <a href="mailto:ntv2609@gmail.com" onClick={() => setPaletteOpen(false)}>
                  <span>Send an email</span><ArrowUpRight size={15} />
                </a>
              </div>
              <div className="palette-foot"><Command size={13} /> K to open <span>ESC to close</span></div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
      <a className="back-to-top" href="#top" aria-label="Back to top"><ArrowDown size={15} /></a>
    </>
  )
}

import Link from "next/link"
import { ArrowUpRight, Command } from "lucide-react"

export default function SiteHeader({ onOpenPalette }: { onOpenPalette: () => void }) {
  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <Link className="wordmark" href="#top" aria-label="Vinh, home">v<span>.</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#work">Work <span>01</span></a>
          <a href="#approach">Approach <span>02</span></a>
          <a href="#contact">Contact <span>03</span></a>
        </nav>
        <div className="header-actions">
          <button className="command-trigger" onClick={onOpenPalette} aria-label="Open command menu">
            <Command size={13} /><span>K</span>
          </button>
          <a className="header-availability" href="mailto:ntv2609@gmail.com">
            <span className="status-dot" /> Say hello <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </header>
  )
}

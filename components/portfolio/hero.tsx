import Image from "next/image"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <span className="eyebrow-index">PORTFOLIO / 2026</span><span className="eyebrow-rule" /> SOFTWARE · INTERFACE · SYSTEMS
        </motion.p>
        <motion.h1 id="hero-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08, ease }}>
          Building things<br />for the <span className="serif-italic">real world.</span>
        </motion.h1>
        <motion.div className="hero-bottom" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }}>
          <p className="hero-intro">I&apos;m Vinh — a full-stack developer interested in thoughtful interfaces and useful software. Currently exploring the space between product design and engineering.</p>
          <div className="hero-links">
            <a className="text-link" href="#work">Explore selected work <ArrowDown size={14} /></a>
            <a className="text-link muted-link" href="/resume.pdf" target="_blank" rel="noreferrer">View résumé <ArrowUpRight size={14} /></a>
          </div>
        </motion.div>
      </div>
      <motion.div className="hero-portrait" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.1, ease }}>
        <Image src="/portrait.jpg" alt="Portrait of Vinh" fill priority sizes="(max-width: 760px) 100vw, 42vw" className="portrait-image" />
        <div className="portrait-caption"><span>01 — A little about me</span><span>HANOI, VIETNAM</span></div>
        <span className="portrait-index" aria-hidden="true">VN<br />26</span>
      </motion.div>
      <div className="hero-index mono">01 <span>/</span> 04</div>
    </section>
  )
}

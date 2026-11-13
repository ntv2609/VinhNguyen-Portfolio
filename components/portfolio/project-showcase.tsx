import Image from "next/image"
import { ArrowUpRight, MoveUpRight } from "lucide-react"
import { motion } from "framer-motion"

const details = [
  { number: "01", label: "Product", value: "Self-service ordering" },
  { number: "02", label: "Payments", value: "MoMo QR integration" },
  { number: "03", label: "Operations", value: "Kitchen display & admin" },
]

export default function ProjectShowcase() {
  return (
    <section className="work-section section-shell" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <div><p className="eyebrow"><span className="eyebrow-index">01 / SELECTED WORK</span></p><h2 id="work-title">One project, <span className="serif-italic">end to end.</span></h2></div>
        <p className="section-note">A closer look at a system built to connect the customer-facing experience with the work happening behind the counter.</p>
      </div>

      <motion.article className="project-feature" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
        <a className="project-visual" href="https://github.com/ntv2609/Food-Order-Kiosk-Project" target="_blank" rel="noreferrer" aria-label="Open SheepFood source repository on GitHub">
          <Image src="/kiosk-thumbnail.jpg" alt="SheepFood self-service kiosk interface" fill sizes="(max-width: 760px) 100vw, 68vw" className="project-image" />
          <span className="visual-index mono">PROJECT / 001</span>
          <span className="visual-link"><MoveUpRight size={18} /></span>
        </a>
        <div className="project-meta">
          <div className="project-title-row"><div><p className="eyebrow"><span className="eyebrow-index">FULL-STACK · FOOD SERVICE</span></p><h3>SheepFood <span>— Smart POS &amp; Kiosk</span></h3></div><a className="round-link" href="https://github.com/ntv2609/Food-Order-Kiosk-Project" target="_blank" rel="noreferrer" aria-label="View SheepFood source on GitHub"><ArrowUpRight size={18} /></a></div>
          <p className="project-description">A self-service food ordering platform bringing ordering, QR payment, kitchen workflow, and admin reporting into one connected product.</p>
          <div className="project-details">
            {details.map((item) => <div className="detail-item" key={item.number}><span className="detail-number mono">{item.number}</span><span className="detail-label">{item.label}</span><span className="detail-value">{item.value}</span></div>)}
          </div>
          <div className="project-bottom"><div className="tag-list" aria-label="Technologies used"><span>React</span><span>Node.js</span><span>MongoDB</span><span>MoMo API</span><span>Tailwind</span></div><a className="text-link" href="https://github.com/ntv2609/Food-Order-Kiosk-Project" target="_blank" rel="noreferrer">Source code <ArrowUpRight size={14} /></a></div>
        </div>
      </motion.article>
    </section>
  )
}

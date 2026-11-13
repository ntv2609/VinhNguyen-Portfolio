import Image from "next/image"
import { ArrowUpRight, MoveUpRight } from "lucide-react"
import { motion } from "framer-motion"

const enggoDetails = [
  { number: "01", label: "Learn", value: "Course catalog & video lessons" },
  { number: "02", label: "Practice", value: "AI lesson chat & writing feedback" },
  { number: "03", label: "Manage", value: "Course, user & order analytics" },
  { number: "04", label: "Checkout", value: "MoMo payment flow (sandbox)" },
]

const sheepfoodDetails = [
  { number: "01", label: "Product", value: "Self-service ordering" },
  { number: "02", label: "Payments", value: "MoMo QR integration" },
  { number: "03", label: "Operations", value: "Kitchen display & admin" },
]

const enggoRepository = "https://github.com/ntv2609/english-lms"
const sheepfoodRepository = "https://github.com/ntv2609/Food-Order-Kiosk-Project"

export default function ProjectShowcase() {
  return (
    <section className="work-section section-shell" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <div><p className="eyebrow"><span className="eyebrow-index">01 / SELECTED WORK</span></p><h2 id="work-title">Products built <span className="serif-italic">to be useful.</span></h2></div>
        <p className="section-note">A learning platform, then a food-service system — two full-stack projects shaped around real product workflows.</p>
      </div>

      <div className="project-stack">
        <motion.article className="project-feature" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <a className="project-visual enggo-visual" href={enggoRepository} target="_blank" rel="noreferrer" aria-label="Open EngGo English learning platform source repository on GitHub">
            <Image src="/enggo-thumbnail.png" alt="Screenshot of EngGo's Vietnamese English-learning homepage, with course search and a learner profile." fill sizes="(max-width: 900px) 100vw, 56vw" className="enggo-thumbnail" />
            <span className="visual-index mono">PROJECT / 002 · FEATURED</span>
            <span className="visual-link"><MoveUpRight size={18} /></span>
          </a>
          <div className="project-meta">
            <div className="project-title-row"><div><p className="eyebrow"><span className="eyebrow-index">FULL-STACK · EDUCATION</span></p><h3>EngGo <span>— English Learning Platform</span></h3></div><a className="round-link" href={enggoRepository} target="_blank" rel="noreferrer" aria-label="View EngGo source on GitHub"><ArrowUpRight size={18} /></a></div>
            <p className="project-description">A full-stack learning platform connecting course discovery and video lessons with AI-assisted practice, course administration, and checkout.</p>
            <div className="project-details">
              {enggoDetails.map((item) => <div className="detail-item" key={item.number}><span className="detail-number mono">{item.number}</span><span className="detail-label">{item.label}</span><span className="detail-value">{item.value}</span></div>)}
            </div>
            <div className="project-bottom"><div className="tag-list" aria-label="Technologies used"><span>Next.js</span><span>React</span><span>Node.js</span><span>MongoDB</span><span>Redux Toolkit</span></div><a className="text-link" href={enggoRepository} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={14} /></a></div>
          </div>
        </motion.article>

        <motion.article className="project-feature project-feature--secondary" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
          <a className="project-visual" href={sheepfoodRepository} target="_blank" rel="noreferrer" aria-label="Open SheepFood source repository on GitHub">
            <Image src="/kiosk-thumbnail.jpg" alt="SheepFood self-service kiosk interface" fill sizes="(max-width: 760px) 100vw, 68vw" className="project-image" />
            <span className="visual-index mono">PROJECT / 001</span>
            <span className="visual-link"><MoveUpRight size={18} /></span>
          </a>
          <div className="project-meta">
            <div className="project-title-row"><div><p className="eyebrow"><span className="eyebrow-index">FULL-STACK · FOOD SERVICE</span></p><h3>SheepFood <span>— Smart POS &amp; Kiosk</span></h3></div><a className="round-link" href={sheepfoodRepository} target="_blank" rel="noreferrer" aria-label="View SheepFood source on GitHub"><ArrowUpRight size={18} /></a></div>
            <p className="project-description">A self-service food ordering platform bringing ordering, QR payment, kitchen workflow, and admin reporting into one connected product.</p>
            <div className="project-details">
              {sheepfoodDetails.map((item) => <div className="detail-item" key={item.number}><span className="detail-number mono">{item.number}</span><span className="detail-label">{item.label}</span><span className="detail-value">{item.value}</span></div>)}
            </div>
            <div className="project-bottom"><div className="tag-list" aria-label="Technologies used"><span>React</span><span>Node.js</span><span>MongoDB</span><span>MoMo API</span><span>Tailwind</span></div><a className="text-link" href={sheepfoodRepository} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={14} /></a></div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

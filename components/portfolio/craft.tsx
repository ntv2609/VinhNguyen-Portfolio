import { motion } from "framer-motion"
import { ArrowUpRight, Code2, Layers3, Workflow } from "lucide-react"

const disciplines = [
  { number: "A", title: "Build", icon: Code2, copy: "Full-stack web development, with a focus on the MERN stack and practical product needs.", tools: ["JavaScript", "React", "Node.js", "Express"] },
  { number: "B", title: "Connect", icon: Workflow, copy: "Bringing product flows together — from customer ordering to payment and operations.", tools: ["REST APIs", "MoMo QR", "MongoDB"] },
  { number: "C", title: "Refine", icon: Layers3, copy: "Care for the details that make an interface easier to understand and a system easier to use.", tools: ["Interface design", "Tailwind CSS", "Git"] },
]

export default function Craft() {
  return (
    <section className="approach-section section-shell" id="approach" aria-labelledby="approach-title">
      <div className="section-heading compact-heading">
        <div><p className="eyebrow"><span className="eyebrow-index">02 / APPROACH</span></p><h2 id="approach-title">A practical kind <span className="serif-italic">of craft.</span></h2></div>
        <p className="section-note">I like the part where clear ideas become working software — and where the small details make the whole thing feel considered.</p>
      </div>
      <div className="discipline-grid">
        {disciplines.map(({ number, title, icon: Icon, copy, tools }, index) => (
          <motion.article className="discipline" key={number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}>
            <div className="discipline-top"><span className="mono">{number} / 03</span><Icon size={18} strokeWidth={1.5} /></div>
            <h3>{title}</h3><p>{copy}</p>
            <div className="discipline-tools">{tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
          </motion.article>
        ))}
      </div>
      <div className="approach-note"><span className="note-mark">“</span><p>Good software should feel clear to the person using it — and make sense to the person who has to maintain it.</p><a href="https://github.com/ntv2609" target="_blank" rel="noreferrer" className="text-link">More on GitHub <ArrowUpRight size={14} /></a></div>
    </section>
  )
}

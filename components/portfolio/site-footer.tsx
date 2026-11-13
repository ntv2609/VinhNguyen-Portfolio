"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Copy } from "lucide-react"

export default function SiteFooter() {
  const [copied, setCopied] = useState(false)
  const email = "ntv2609@gmail.com"

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <footer className="footer-section section-shell" id="contact">
      <div className="footer-top"><p className="eyebrow"><span className="eyebrow-index">03 / CONTACT</span></p><span className="footer-location mono"><span className="status-dot" /> OPEN TO A CONVERSATION</span></div>
      <div className="footer-main"><h2>Have a good<br /><span className="serif-italic">one in mind?</span></h2><a className="footer-arrow" href={`mailto:${email}`} aria-label="Email Vinh"><ArrowUpRight strokeWidth={1} /></a></div>
      <div className="footer-bottom"><div className="email-actions"><a className="footer-email" href={`mailto:${email}`}>{email}</a><button className="copy-button" onClick={copyEmail} aria-label={copied ? "Email copied" : "Copy email address"}>{copied ? <Check size={14} /> : <Copy size={14} />}<span>{copied ? "Copied" : "Copy"}</span></button></div><div className="footer-links"><a href="https://github.com/ntv2609" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a><a href="https://www.linkedin.com/in/ntv2609/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12} /></a><a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={12} /></a></div><p className="copyright">© 2026 VINH <span>BUILT WITH INTENTION.</span></p></div>
    </footer>
  )
}

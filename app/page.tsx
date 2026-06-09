import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import TechStack from '@/components/tech-stack'
import Projects from '@/components/projects'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="bg-black">
      <Navbar />
      <Hero />
      <TechStack />
      <div id="projects">
        <Projects />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  )
}

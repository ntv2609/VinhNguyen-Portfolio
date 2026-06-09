import Image from 'next/image'

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 bg-stone-950 text-neutral-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light tracking-tight">
            Selected Works.
          </h2>
          <div className="w-20 h-[1px] bg-stone-700"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-8">
          
          {/* PROJECT 1: SHEEPFOOD KIOSK */}
          <div className="group space-y-6">
            
            {/* TẤM ẢNH ĐÃ CLICK ĐƯỢC */}
            <a 
              href="https://github.com/ntv2609/Food-Order-Kiosk-Project" 
              target="_blank" 
              rel="noreferrer"
              className="block relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-stone-900 border border-stone-800 cursor-pointer"
            >
              <Image
                src="/kiosk-thumbnail.jpg" 
                alt="SheepFood Kiosk Dashboard"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
            </a>
            
            <div className="space-y-4">
              {/* TIÊU ĐỀ ĐÃ CLICK ĐƯỢC (Có hiệu ứng gạch chân khi hover) */}
              <a 
                href="https://github.com/ntv2609/Food-Order-Kiosk-Project" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block"
              >
                <h3 className="text-2xl font-serif font-medium text-stone-100 hover:text-stone-300 transition-colors underline decoration-transparent hover:decoration-stone-500 underline-offset-4">
                  SheepFood - Smart POS & Kiosk
                </h3>
              </a>

              <p className="text-stone-400 leading-relaxed">
                A full-stack self-service ordering platform. Features seamless MoMo QR payment integration, an automated kitchen display system, and a comprehensive admin dashboard with revenue analytics.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {['React', 'Node.js', 'MongoDB', 'MoMo API', 'Tailwind'].map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-medium text-stone-300 border border-stone-700 rounded-full bg-stone-900/50">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 pt-4">
                <a href="https://github.com/ntv2609/Food-Order-Kiosk-Project" target="_blank" rel="noreferrer" className="text-sm font-medium text-stone-200 hover:text-white underline underline-offset-4 decoration-stone-600 transition-colors">
                  View Source
                </a>
                {/* Ẩn Live Demo đi nếu chưa có link deploy thực tế, ở đây tui để href="#" */}
                <a href="https://food-order-kiosk-project.vercel.app/" className="text-sm font-medium text-stone-400 hover:text-white underline underline-offset-4 decoration-stone-800 transition-colors">
                  Live Demo
                </a>
              </div>
            </div>
          </div>

          {/* PROJECT 2: COMING SOON */}
          <div className="group space-y-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center cursor-default">
                <p className="text-stone-600 font-serif italic">More projects coming soon...</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-medium text-stone-100 cursor-default">
                Next Big Thing
              </h3>
              <p className="text-stone-400 leading-relaxed">
                Currently brewing up new ideas and scalable applications. Always exploring modern web technologies and optimizing backend architectures.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
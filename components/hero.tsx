import Image from 'next/image'

export default function Hero() {
  return (
    <section className="bg-black overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-0 lg:min-h-screen">
        {/* Image - Mobile Top, Desktop Left */}
        <div className="relative w-full h-[50vh] lg:h-screen lg:order-1 lg:flex lg:items-center lg:justify-center">
          <Image
            src="/portrait.jpg"
            alt="Vinh - Full Stack Developer"
            fill
            priority
            className="object-contain object-center grayscale-[10%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Optional overlay for subtle depth */}
          <div className="absolute inset-0 mix-blend-multiply opacity-5 bg-stone-900"></div>
        </div>

        {/* Content - Mobile Below, Desktop Right */}
        <div className="flex items-center justify-center px-6 py-16 sm:px-8 md:px-12 lg:py-0 lg:order-2">
          <div className="w-full max-w-lg space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-stone-100">
                Hi, I&apos;m Vinh.
              </h1>
              <p className="text-lg sm:text-xl text-stone-400 leading-relaxed">
                Full-stack Developer. Building scalable web applications with the MERN stack.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg border border-stone-600 bg-transparent px-8 py-3 text-base font-medium text-stone-100 transition-all duration-300 hover:bg-stone-900 hover:border-stone-400"
              >
                Explore Projects
              </a>
            </div>

            {/* Secondary Links */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6 text-sm">
              <a
                href="/resume.pdf"
                className="text-stone-400 underline underline-offset-4 transition-all duration-300 hover:text-stone-100"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="text-stone-400 underline underline-offset-4 transition-all duration-300 hover:text-stone-100"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

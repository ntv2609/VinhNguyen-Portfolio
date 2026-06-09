export default function TechStack() {
  const technologies = [
    'MongoDB',
    'Express.js',
    'React',
    'Node.js',
    'JavaScript',
    'Java',
    'C++',
    'Git',
  ]

  return (
    <section className="bg-black px-6 py-24 sm:px-8 md:px-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-stone-100 mb-16">
          Core Technologies
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="flex items-center justify-center rounded-lg border border-stone-800 bg-stone-950 px-4 py-6 transition-all duration-300 hover:border-stone-600 hover:bg-stone-900"
            >
              <span className="text-center text-sm font-medium text-stone-300 sm:text-base">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Reveal from './Reveal'

export default function Section({ id, eyebrow, title, intro, children, className = '' }) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={`py-20 sm:py-24 ${className}`}>
      <div className="container-page">
        <Reveal className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="mb-2 font-mono text-sm font-medium text-accent-700 dark:text-accent-300">{eyebrow}</p>
          )}
          <h2 id={headingId} className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {title}
          </h2>
          {intro && <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}

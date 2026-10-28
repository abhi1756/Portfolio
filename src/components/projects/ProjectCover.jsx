import { useState } from 'react'

// Shows the project's first screenshot, or a generated cover when there is
// none (or the image fails to load).
export default function ProjectCover({ project, priority = false, className = '' }) {
  const image = project.images?.[0]
  const [failed, setFailed] = useState(false)

  if (image && !failed) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setFailed(true)}
        className={`aspect-[16/9] w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={`${project.name} cover`}
      className={`relative flex aspect-[16/9] w-full flex-col justify-between overflow-hidden bg-slate-900 p-6 ${className}`}
    >
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -top-16 -right-16 size-56 rounded-full bg-accent-500/30 blur-3xl transition-transform duration-500 group-hover:scale-110"
      />
      <p className="relative font-mono text-xs tracking-wider text-accent-300 uppercase">{project.category}</p>
      <div className="relative">
        <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{project.name}</p>
        <p className="mt-2 font-mono text-xs text-slate-400">{project.tech.slice(0, 4).join('  ·  ')}</p>
      </div>
    </div>
  )
}

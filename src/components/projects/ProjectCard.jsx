import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { BrandIcon } from '../ui/BrandIcons'
import Badge from '../ui/Badge'
import ProjectCover from './ProjectCover'

export default function ProjectCard({ project }) {
  const { links = {} } = project
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-accent-800 dark:hover:shadow-black/30">
      <ProjectCover project={project} />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          {/* The whole card is clickable through this link's ::after overlay. */}
          <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 text-slate-600 dark:text-slate-400">{project.summary}</p>

        {project.features?.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
            {project.features.slice(0, 3).map((f) => (
              <li key={f} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tech.slice(0, 7).map((t) => (
            <li key={t}>
              <Badge tone="accent">{t}</Badge>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm font-medium">
          <span className="inline-flex items-center gap-1 text-accent-700 dark:text-accent-300">
            Case study
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
          {/* Sit above the card overlay so these links stay independently clickable. */}
          {links.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <BrandIcon name="github" className="size-4" />
              Code<span className="sr-only"> for {project.name} on GitHub (opens in a new tab)</span>
            </a>
          )}
          {links.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Live demo<span className="sr-only"> of {project.name} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

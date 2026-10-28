import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CircleCheck, ExternalLink, Layers, Lightbulb } from 'lucide-react'
import { getProject, projects } from '../data/projects'
import { BrandIcon } from '../components/ui/BrandIcons'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'
import ProjectCover from '../components/projects/ProjectCover'
import useDocumentTitle from '../hooks/useDocumentTitle'
import NotFoundPage from './NotFoundPage'

function Block({ title, icon: Icon, children }) {
  return (
    <Reveal as="section" className="border-t border-slate-200 py-10 dark:border-slate-800">
      <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
        {Icon && <Icon className="size-5 text-accent-700 dark:text-accent-300" aria-hidden="true" />}
        {title}
      </h2>
      {children}
    </Reveal>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  useDocumentTitle(project ? project.name : 'Page not found', project?.summary)

  if (!project) return <NotFoundPage />

  const { links = {} } = project
  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="pt-28 pb-20 sm:pt-32">
      <div className="container-page max-w-4xl">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All projects
        </Link>

        <header className="mt-6">
          <p className="font-mono text-sm text-accent-700 dark:text-accent-300">{project.category}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {project.name}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">{project.summary}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            {links.live && (
              <Button href={links.live}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Live demo
              </Button>
            )}
            {links.github && (
              <Button href={links.github} variant="secondary">
                <BrandIcon name="github" className="size-4" />
                Source code
              </Button>
            )}
          </div>
        </header>

        <Reveal className="mt-10 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <ProjectCover project={project} priority />
        </Reveal>

        {project.images?.length > 1 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {project.images.slice(1).map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full rounded-xl border border-slate-200 object-cover dark:border-slate-800"
              />
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {project.problem && (
            <div>
              <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                The problem
              </h2>
              <p className="mt-2 text-slate-700 dark:text-slate-300">{project.problem}</p>
            </div>
          )}
          {project.role && (
            <div>
              <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                My role
              </h2>
              <p className="mt-2 text-slate-700 dark:text-slate-300">{project.role}</p>
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="mb-3 text-sm font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Tech stack
          </h2>
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t}>
                <Badge tone="accent">{t}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          {project.features?.length > 0 && (
            <Block title="Key features" icon={CircleCheck}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-slate-600 dark:text-slate-400">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-accent-600 dark:text-accent-400" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </Block>
          )}

          {project.architecture?.length > 0 && (
            <Block title="Architecture" icon={Layers}>
              <ol className="space-y-3">
                {project.architecture.map((a) => (
                  <li
                    key={a.layer}
                    className="grid gap-1 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-[8rem_1fr] sm:gap-4 dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    <span className="font-mono text-sm font-medium text-accent-700 dark:text-accent-300">{a.layer}</span>
                    <span className="text-slate-600 dark:text-slate-400">{a.detail}</span>
                  </li>
                ))}
              </ol>
            </Block>
          )}

          {project.implementation?.length > 0 && (
            <Block title="Implementation details">
              <div className="space-y-6">
                {project.implementation.map((item) => (
                  <div key={item.title}>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
                  </div>
                ))}
              </div>
            </Block>
          )}

          {project.decisions?.length > 0 && (
            <Block title="Technical decisions" icon={Lightbulb}>
              <ul className="space-y-3">
                {project.decisions.map((d) => (
                  <li key={d} className="flex gap-2.5 text-slate-600 dark:text-slate-400">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                    {d}
                  </li>
                ))}
              </ul>
            </Block>
          )}
        </div>

        {next && next !== project && (
          <Link
            to={`/projects/${next.slug}`}
            className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 p-6 transition-colors hover:border-accent-300 dark:border-slate-800 dark:hover:border-accent-800"
          >
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Next project</p>
              <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{next.name}</p>
            </div>
            <ArrowRight
              className="size-5 text-accent-700 transition-transform group-hover:translate-x-1 dark:text-accent-300"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </article>
  )
}

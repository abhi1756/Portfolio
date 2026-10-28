import { projects } from '../../data/projects'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import ProjectCard from '../projects/ProjectCard'

export default function Projects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've built"
      intro="Full stack and backend projects covering authentication, database design, real-time updates and REST API development. Open a project for the architecture and the decisions behind it."
    >
      {featured.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Projects are on their way — check back soon.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  )
}

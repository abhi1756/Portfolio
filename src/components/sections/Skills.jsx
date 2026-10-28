import { Code, Database, LayoutTemplate, Server, Users, Wrench, Layers } from 'lucide-react'
import { skillGroups } from '../../data/skills'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Badge from '../ui/Badge'

// Icon keys usable in data/skills.js. Unknown keys fall back to Layers.
const icons = { code: Code, server: Server, layout: LayoutTemplate, database: Database, wrench: Wrench, users: Users }

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technical skills"
      intro="The languages, frameworks and tools I use to design, build and ship applications."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[group.icon] ?? Layers
          return (
            <Reveal
              key={group.title}
              delay={(i % 3) * 0.06}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-accent-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-accent-800"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-50 text-accent-700 transition-colors group-hover:bg-accent-100 dark:bg-accent-950/60 dark:text-accent-300">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-semibold text-slate-900 dark:text-white">{group.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

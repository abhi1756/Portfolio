import { Briefcase } from 'lucide-react'
import { visibleExperience } from '../../lib/sections'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Badge from '../ui/Badge'

export default function Experience() {
  if (visibleExperience.length === 0) return null

  return (
    <Section id="experience" eyebrow="Experience" title="Experience">
      <ol className="relative space-y-8 border-l border-slate-200 pl-8 sm:ml-4 dark:border-slate-800">
        {visibleExperience.map((job, i) => (
          <Reveal as="li" key={`${job.organization}-${job.period}`} delay={i * 0.05} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1 -left-[49px] grid size-8 place-items-center rounded-full border border-slate-200 bg-white text-accent-700 dark:border-slate-700 dark:bg-slate-900 dark:text-accent-300"
            >
              <Briefcase className="size-4" />
            </span>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{job.role}</h3>
                  <p className="font-medium text-accent-700 dark:text-accent-300">{job.organization}</p>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {job.period}
                  {job.location && ` · ${job.location}`}
                  {job.type && ` · ${job.type}`}
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                    {point}
                  </li>
                ))}
              </ul>
              {job.tech?.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                  {job.tech.map((t) => (
                    <li key={t}>
                      <Badge tone="accent">{t}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

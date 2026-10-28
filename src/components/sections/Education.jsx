import { GraduationCap } from 'lucide-react'
import { education } from '../../data/education'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Badge from '../ui/Badge'

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education">
      <div className="grid gap-5 md:grid-cols-2">
        {education.map((item, i) => (
          <Reveal
            key={item.institution}
            delay={i * 0.06}
            className={`rounded-2xl border bg-white p-6 dark:bg-slate-900/60 ${
              i === 0
                ? 'border-accent-200 md:col-span-2 dark:border-accent-900'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 dark:bg-accent-950/60 dark:text-accent-300">
                <GraduationCap className="size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{item.qualification}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.period}</p>
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-400">{item.institution}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.location}</p>
                {item.score && <p className="mt-3 text-sm font-medium text-slate-800 dark:text-slate-200">{item.score}</p>}

                {item.coursework?.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Relevant coursework</p>
                    <ul className="flex flex-wrap gap-2">
                      {item.coursework.map((c) => (
                        <li key={c}>
                          <Badge>{c}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.achievements?.length > 0 && (
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-400">
                    {item.achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

import { Download, ExternalLink, FileText } from 'lucide-react'
import { profile } from '../../data/profile'
import { education } from '../../data/education'
import { visibleExperience } from '../../lib/sections'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'

export default function Resume() {
  const degree = education[0]
  const latestJob = visibleExperience[0]

  const summary = [
    degree && `${degree.qualification}, ${degree.institution} (${degree.period})${degree.score ? ` — ${degree.score}` : ''}`,
    latestJob && `${latestJob.role} at ${latestJob.organization} (${latestJob.period})`,
    'Full stack projects with Spring Boot, React, JWT security, MySQL / PostgreSQL and Redis',
    '900+ DSA problems solved',
  ].filter(Boolean)

  return (
    <Section id="resume" eyebrow="Resume" title="Resume">
      <Reveal className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-accent-50/60 dark:border-slate-800 dark:from-slate-900 dark:to-accent-950/40">
        <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">At a glance</h3>
            <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-400">
              {summary.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-950/60">
            <FileText className="size-10 text-accent-700 dark:text-accent-300" aria-hidden="true" />
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">{profile.name} — Resume</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">PDF · one page</p>
            </div>
            <Button href={profile.resumeUrl} download className="w-full">
              <Download className="size-4" aria-hidden="true" />
              Download resume
            </Button>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Open in browser
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

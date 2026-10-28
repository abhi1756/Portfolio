import { ArrowUpRight, Award, Trophy } from 'lucide-react'
import { achievements, certifications } from '../../data/certifications'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'

function Item({ icon: Icon, title, subtitle, url, linkLabel }) {
  return (
    <div className="flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 dark:bg-accent-950/60 dark:text-accent-300">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
        {subtitle && <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>}
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-700 hover:underline dark:text-accent-300"
          >
            {linkLabel}
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">for {title} (opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  )
}

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="Achievements" title="Certifications & achievements">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Certifications
          </h3>
          <ul className="grid gap-4">
            {certifications.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06}>
                <Item icon={Award} title={c.title} subtitle={c.issuer} url={c.url} linkLabel="View credential" />
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Achievements
          </h3>
          <ul className="grid gap-4">
            {achievements.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.06}>
                <Item icon={Trophy} title={a.title} subtitle={a.detail} url={a.url} linkLabel="View profile" />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

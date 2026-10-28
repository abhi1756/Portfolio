import { profile } from '../../data/profile'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'

export default function About() {
  return (
    <Section id="about" eyebrow="About" title="A developer who likes the whole stack">
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {profile.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60"
              >
                <dt className="text-sm text-slate-500 dark:text-slate-400">{h.label}</dt>
                <dd className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{h.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  )
}

import { m } from 'framer-motion'
import { ArrowRight, Download, MapPin } from 'lucide-react'
import { profile } from '../../data/profile'
import Button from '../ui/Button'
import SocialLinks from '../ui/SocialLinks'
import { scrollToSection } from '../../lib/sections'

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut', delay },
})

// A small, real-looking slice of the stack instead of a stock illustration.
const codeLines = [
  [['@RestController', 'text-amber-300']],
  [['@RequestMapping', 'text-amber-300'], ['("/api/trips")', 'text-emerald-300']],
  [['public class ', 'text-sky-300'], ['TripController', 'text-white'], [' {', 'text-slate-400']],
  [],
  [['  @PostMapping', 'text-amber-300'], ['("/book")', 'text-emerald-300']],
  [['  public ', 'text-sky-300'], ['Trip ', 'text-white'], ['book(', 'text-slate-300']],
  [['      @Valid @RequestBody ', 'text-amber-300'], ['TripRequest req) {', 'text-slate-300']],
  [['    return ', 'text-sky-300'], ['tripService', 'text-white'], ['.assignDriver(req);', 'text-slate-300']],
  [['  }', 'text-slate-400']],
  [['}', 'text-slate-400']],
]

function CodeCard() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-accent-500/25 via-sky-400/10 to-transparent blur-2xl"
      />
      <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-slate-900/20">
        <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-amber-400/80" />
          <span className="size-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-xs text-slate-400">TripController.java</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 sm:text-sm">
          <code>
            {codeLines.map((tokens, i) => (
              <div key={i} className="whitespace-pre">
                <span className="mr-4 inline-block w-4 text-right text-slate-600 select-none">{i + 1}</span>
                {tokens.map(([t, c], j) => (
                  <span key={j} className={c}>
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </code>
        </pre>
        <figcaption className="sr-only">Example Spring Boot REST controller</figcaption>
      </figure>
    </div>
  )
}

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent-400/15 blur-3xl dark:bg-accent-500/10"
      />

      <div className="container-page grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          {profile.openToWork && (
            <m.p
              {...fadeUp(0)}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-100 bg-accent-50 px-3 py-1 text-sm font-medium text-accent-800 dark:border-accent-900 dark:bg-accent-950/60 dark:text-accent-300"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-600" />
              </span>
              Open to software developer roles
            </m.p>
          )}

          <m.h1
            id="hero-heading"
            {...fadeUp(0.05)}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl dark:text-white"
          >
            Hi, I'm {profile.name}.
            <span className="mt-2 block text-slate-500 dark:text-slate-400">{profile.title}.</span>
          </m.h1>

          <m.p {...fadeUp(0.1)} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {profile.intro}
          </m.p>

          <m.p
            {...fadeUp(0.12)}
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"
          >
            <MapPin className="size-4" aria-hidden="true" />
            {profile.location}
          </m.p>

          <m.div {...fadeUp(0.15)} className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href="/#projects"
              onClick={(e) => {
                if (scrollToSection('projects')) e.preventDefault()
              }}
            >
              Explore my work
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href={profile.resumeUrl} download variant="secondary">
              <Download className="size-4" aria-hidden="true" />
              Download resume
            </Button>
            <SocialLinks className="ml-1" />
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          {profile.photo ? (
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width="480"
              height="480"
              fetchPriority="high"
              className="mx-auto aspect-square w-full max-w-sm rounded-3xl object-cover shadow-xl"
            />
          ) : (
            <CodeCard />
          )}
        </m.div>
      </div>
    </section>
  )
}

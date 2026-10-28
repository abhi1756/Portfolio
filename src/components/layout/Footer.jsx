import { Link, useLocation } from 'react-router-dom'
import { ArrowUp, Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { sectionLinks, scrollToSection } from '../../lib/sections'
import SocialLinks from '../ui/SocialLinks'

export default function Footer() {
  const { pathname } = useLocation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_auto]">
        <div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{profile.name}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {profile.title} · {profile.tagline}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-700 hover:underline dark:text-accent-300"
          >
            <Mail className="size-4" aria-hidden="true" />
            {profile.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Navigate</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {sectionLinks.map((l) => (
              <li key={l.id}>
                <Link
                  to={`/#${l.id}`}
                  onClick={(e) => {
                    // Already on the home page: scroll directly (works even if the hash is unchanged).
                    if (pathname === '/' && scrollToSection(l.id)) {
                      e.preventDefault()
                      window.history.replaceState(null, '', `#${l.id}`)
                    }
                  }}
                  className="text-slate-600 hover:text-accent-700 dark:text-slate-400 dark:hover:text-accent-300"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Elsewhere</p>
          <SocialLinks className="-ml-2" />
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-sm text-slate-500 sm:flex-row dark:text-slate-400">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          {pathname === '/' && (
            <a href="#top" className="inline-flex items-center gap-1 hover:text-slate-900 dark:hover:text-white">
              Back to top <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Download, Menu, X } from 'lucide-react'
import { AnimatePresence, m } from 'framer-motion'
import { profile } from '../../data/profile'
import { sectionIds, sectionLinks, scrollToSection } from '../../lib/sections'
import useActiveSection from '../../hooks/useActiveSection'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onHome = pathname === '/'
  const active = useActiveSection(sectionIds, onHome)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const goTo = (e, id) => {
    setOpen(false)
    if (onHome) {
      e.preventDefault()
      scrollToSection(id)
      window.history.replaceState(null, '', `#${id}`)
    } else {
      e.preventDefault()
      navigate(`/#${id}`)
    }
  }

  const linkClass = (id) =>
    `relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
      active === id
        ? 'text-accent-700 dark:text-accent-300'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? 'border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          onClick={(e) => {
            setOpen(false)
            if (onHome) {
              e.preventDefault()
              window.scrollTo({ top: 0 })
              window.history.replaceState(null, '', '/')
            }
          }}
          className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-accent-700 text-sm font-bold text-white dark:bg-accent-400 dark:text-slate-950">
            AK
          </span>
          <span className="hidden whitespace-nowrap sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center xl:flex">
          {sectionLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`/#${l.id}`}
                onClick={(e) => goTo(e, l.id)}
                aria-current={active === l.id ? 'location' : undefined}
                className={linkClass(l.id)}
              >
                {l.label}
                {active === l.id && (
                  <m.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent-600 dark:bg-accent-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href={profile.resumeUrl}
            download
            className="hidden items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-accent-600 hover:text-accent-700 md:inline-flex dark:border-slate-700 dark:text-slate-300 dark:hover:border-accent-400 dark:hover:text-accent-300"
          >
            <Download className="size-4" aria-hidden="true" />
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex rounded-lg p-2 text-slate-700 hover:bg-slate-100 xl:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-200 xl:hidden dark:border-slate-800"
          >
            <ul className="container-page grid gap-1 py-3">
              {sectionLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`/#${l.id}`}
                    onClick={(e) => goTo(e, l.id)}
                    aria-current={active === l.id ? 'location' : undefined}
                    className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                      active === l.id
                        ? 'bg-accent-50 text-accent-800 dark:bg-accent-950/60 dark:text-accent-300'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="md:hidden">
                <a
                  href={profile.resumeUrl}
                  download
                  className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium text-accent-700 dark:text-accent-300"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download resume
                </a>
              </li>
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}

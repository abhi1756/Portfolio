import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import PageLoader from '../ui/PageLoader'
import ErrorBoundary from '../ErrorBoundary'
import { scrollToSection } from '../../lib/sections'

// Scrolls to the top on route change, or to the #section in the URL.
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    // Wait a frame so the target page has rendered.
    const frame = requestAnimationFrame(() => {
      if (!scrollToSection(id)) window.scrollTo({ top: 0, behavior: 'instant' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <div id="top" className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-[60] rounded-lg bg-accent-700 px-4 py-2 font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {/* Keyed by path so an error on one page clears when the visitor navigates away. */}
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

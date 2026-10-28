import { Component } from 'react'
import { CircleAlert } from 'lucide-react'
import { profile } from '../data/profile'

// Catches render errors (and failed lazy-loaded chunks) so one broken
// section never blanks the whole site.
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Unexpected UI error:', error, info.componentStack)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div role="alert" className="container-page grid min-h-[60vh] place-items-center pt-16 text-center">
        <div className="max-w-md">
          <CircleAlert className="mx-auto size-10 text-red-600 dark:text-red-400" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">Something went wrong</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            This page failed to load. Reloading usually fixes it. You can also reach me at{' '}
            <a className="font-medium text-accent-700 underline dark:text-accent-300" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-accent-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-800 dark:bg-accent-400 dark:text-slate-950"
          >
            Reload page
          </button>
        </div>
      </div>
    )
  }
}

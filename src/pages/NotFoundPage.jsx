import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFoundPage() {
  useDocumentTitle('Page not found')
  return (
    <section className="container-page grid min-h-[70vh] place-items-center pt-24 pb-16 text-center">
      <div className="max-w-md">
        <p className="font-mono text-sm font-medium text-accent-700 dark:text-accent-300">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          This page doesn't exist
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          The link may be broken or the page may have moved. Everything else is on the home page.
        </p>
        <Button href="/" className="mt-8">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to home
        </Button>
      </div>
    </section>
  )
}

import { LoaderCircle } from 'lucide-react'

export default function PageLoader() {
  return (
    <div role="status" className="grid min-h-[60vh] place-items-center pt-16">
      <LoaderCircle className="size-8 animate-spin text-accent-600 dark:text-accent-400" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

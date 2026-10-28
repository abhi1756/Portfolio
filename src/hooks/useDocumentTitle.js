import { useEffect } from 'react'
import { profile } from '../data/profile'

const DEFAULT_TITLE = document.title

// Sets the tab title (and meta description, when given) for the current page.
export default function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : DEFAULT_TITLE
    const meta = document.querySelector('meta[name="description"]')
    const previous = meta?.getAttribute('content')
    if (meta && description) meta.setAttribute('content', description)
    return () => {
      document.title = DEFAULT_TITLE
      if (meta && previous) meta.setAttribute('content', previous)
    }
  }, [title, description])
}

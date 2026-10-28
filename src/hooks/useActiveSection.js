import { useEffect, useState } from 'react'

// Returns the id of the section currently crossing the middle of the viewport,
// or '' above the first section or when disabled (e.g. off the home page).
export default function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState('')

  useEffect(() => {
    if (!enabled) return
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    elements.forEach((el) => observer.observe(el))

    const onScroll = () => {
      if (window.scrollY < elements[0].offsetTop - window.innerHeight / 2) setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids, enabled])

  return enabled ? active : ''
}

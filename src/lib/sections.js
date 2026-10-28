import { navLinks } from '../data/profile'
import { experience } from '../data/experience'

export const visibleExperience = experience.filter((e) => e.visible !== false)

// Nav links for sections that will actually render.
export const sectionLinks = navLinks.filter((l) => l.id !== 'experience' || visibleExperience.length > 0)

export const sectionIds = sectionLinks.map((l) => l.id)

export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ block: 'start' })
  return true
}

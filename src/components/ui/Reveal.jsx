import { m } from 'framer-motion'

// Fades content up once as it scrolls into view. MotionConfig in App
// turns this off for visitors who prefer reduced motion.
export default function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const Component = m[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
    >
      {children}
    </Component>
  )
}

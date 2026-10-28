const tones = {
  neutral:
    'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700/80 dark:bg-slate-800/60 dark:text-slate-300',
  accent:
    'border-accent-100 bg-accent-50 text-accent-800 dark:border-accent-900 dark:bg-accent-950/60 dark:text-accent-300',
}

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

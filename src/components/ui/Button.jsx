import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary:
    'bg-accent-700 text-white shadow-sm hover:bg-accent-800 dark:bg-accent-400 dark:text-slate-950 dark:hover:bg-accent-300',
  secondary:
    'border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-800',
  ghost:
    'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
}

const isExternal = (href) => /^(https?:|mailto:|tel:)/.test(href)

// Renders a <Link> for in-app routes, an <a> for external URLs and files,
// or a <button> when there is no href.
export default function Button({ href, variant = 'primary', className = '', download, children, ...rest }) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (!href) {
    return (
      <button className={classes} {...rest}>
        {children}
      </button>
    )
  }

  if (isExternal(href) || download) {
    const newTab = /^https?:/.test(href)
    return (
      <a
        href={href}
        className={classes}
        download={download}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <Link to={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}

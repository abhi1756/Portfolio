import { socials } from '../../data/profile'
import { BrandIcon } from './BrandIcons'

export default function SocialLinks({ className = '', iconClassName = 'size-5' }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} (opens in a new tab)`}
            title={s.label}
            className="inline-flex rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <BrandIcon name={s.icon} className={iconClassName} />
          </a>
        </li>
      ))}
    </ul>
  )
}

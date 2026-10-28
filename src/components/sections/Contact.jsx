import { useRef, useState } from 'react'
import { CircleAlert, CircleCheck, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import { profile, socials } from '../../data/profile'
import { isContactFormEnabled, LIMITS, sendContactMessage, validateContact } from '../../lib/contact'
import { BrandIcon } from '../ui/BrandIcons'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'

const EMPTY = { name: '', email: '', subject: '', message: '' }

const inputClass = (hasError) =>
  `block w-full rounded-lg border bg-white px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 ${
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30 dark:border-red-400'
      : 'border-slate-300 focus:border-accent-600 focus:ring-accent-600/25 dark:border-slate-700 dark:focus:border-accent-400 dark:focus:ring-accent-400/25'
  }`

function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-800 dark:text-slate-200">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
          <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : (
        hint
      )}
    </div>
  )
}

function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [serverError, setServerError] = useState('')
  const formRef = useRef(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    // Clear a field's error as soon as the visitor fixes it.
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        if (!validateContact({ ...values, [name]: value })[name]) delete next[name]
        return next
      })
    }
    if (status === 'error' || status === 'success') setStatus('idle')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validateContact(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus()
      return
    }

    setStatus('sending')
    setServerError('')
    try {
      await sendContactMessage(values, { botcheck: formRef.current?.elements.botcheck?.checked ? 'on' : '' })
      setStatus('success')
      setValues(EMPTY)
    } catch (err) {
      setServerError(err.message)
      setStatus('error')
    }
  }

  const describedBy = (field) => (errors[field] ? `${field}-error` : undefined)
  const sending = status === 'sending'

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {/* Honeypot: hidden from people, often filled by bots. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={onChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className={inputClass(errors.name)}
            placeholder="Your name"
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={onChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={inputClass(errors.email)}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject}>
        <input
          id="subject"
          name="subject"
          type="text"
          maxLength={LIMITS.subject}
          value={values.subject}
          onChange={onChange}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={describedBy('subject')}
          className={inputClass(errors.subject)}
          placeholder="Job opportunity, project, question…"
        />
      </Field>

      <Field
        id="message"
        label="Message"
        error={errors.message}
        hint={
          <p className="mt-1.5 text-right text-xs text-slate-500 dark:text-slate-400">
            {values.message.length} / {LIMITS.message}
          </p>
        }
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={LIMITS.message}
          value={values.message}
          onChange={onChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          className={`${inputClass(errors.message)} resize-y`}
          placeholder="Tell me a little about what you have in mind."
        />
      </Field>

      <div aria-live="polite" className="min-h-0">
        {status === 'success' && (
          <p className="flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
            <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            Thanks — your message has been sent. I'll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300"
          >
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              {serverError} You can also email me at{' '}
              <a href={`mailto:${profile.email}`} className="font-medium underline">
                {profile.email}
              </a>
            </span>
          </p>
        )}
      </div>

      <Button type="submit" disabled={sending} className="w-full sm:w-auto">
        {sending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            Send message
          </>
        )}
      </Button>
    </form>
  )
}

function FormUnavailable() {
  return (
    <div className="flex h-full flex-col items-start justify-center gap-4 rounded-2xl border border-dashed border-slate-300 p-8 dark:border-slate-700">
      <Mail className="size-8 text-accent-700 dark:text-accent-300" aria-hidden="true" />
      <p className="text-slate-600 dark:text-slate-400">
        The quickest way to reach me is by email.
      </p>
      <Button href={`mailto:${profile.email}`}>
        <Mail className="size-4" aria-hidden="true" />
        Email me
      </Button>
    </div>
  )
}

export default function Contact() {
  const details = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/[^\d+]/g, '')}` },
    { icon: MapPin, label: 'Location', value: profile.location },
  ].filter(Boolean)

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk"
      intro="I'm open to software developer roles and internships. Whether it's an opportunity, a project or a question, my inbox is open."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <Reveal className="space-y-6">
          <ul className="space-y-4">
            {details.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700 dark:bg-accent-950/60 dark:text-accent-300">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
                  {href ? (
                    <a href={href} className="font-medium break-all text-slate-900 hover:text-accent-700 dark:text-white dark:hover:text-accent-300">
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium text-slate-900 dark:text-white">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 transition-colors hover:border-accent-300 hover:text-accent-700 dark:border-slate-800 dark:text-slate-300 dark:hover:border-accent-800 dark:hover:text-accent-300"
                >
                  <BrandIcon name={s.icon} className="size-5" />
                  {s.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/60">
          {isContactFormEnabled ? <ContactForm /> : <FormUnavailable />}
        </Reveal>
      </div>
    </Section>
  )
}

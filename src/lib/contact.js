// Contact form validation and delivery through Web3Forms.
//
// Web3Forms access keys are public by design: a key can only send mail to the
// inbox it was registered with, so it is safe in client code. No secret ever
// reaches the browser, and no backend is needed.

const ENDPOINT = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? ''

export const isContactFormEnabled = ACCESS_KEY.length > 0

export const LIMITS = { name: 80, email: 120, subject: 120, message: 3000 }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const subject = values.subject.trim()
  const message = values.message.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < 2) errors.name = 'Name looks too short.'
  else if (name.length > LIMITS.name) errors.name = `Keep it under ${LIMITS.name} characters.`

  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email) errors.email = 'Please enter a valid email address.'

  if (!subject) errors.subject = 'Please add a subject.'
  else if (subject.length > LIMITS.subject) errors.subject = `Keep it under ${LIMITS.subject} characters.`

  if (!message) errors.message = 'Please write a message.'
  else if (message.length < 20) errors.message = 'A little more detail, please (at least 20 characters).'
  else if (message.length > LIMITS.message) errors.message = `Keep it under ${LIMITS.message} characters.`

  return errors
}

// Resolves on success; throws an Error with a visitor-friendly message otherwise.
export async function sendContactMessage(values, { botcheck = '' } = {}) {
  if (!isContactFormEnabled) {
    throw new Error('The contact form is not configured yet.')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        name: values.name.trim(),
        email: values.email.trim(),
        subject: `Portfolio: ${values.subject.trim()}`,
        message: values.message.trim(),
        from_name: 'Portfolio contact form',
        botcheck,
      }),
      signal: controller.signal,
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok || data.success === false) {
      if (response.status === 429) throw new Error('Too many messages right now. Please try again in a few minutes.')
      throw new Error('The message could not be sent. Please try again.')
    }
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('The request timed out. Check your connection and try again.', { cause: err })
    if (err instanceof TypeError) throw new Error('Network error. Check your connection and try again.', { cause: err })
    throw err
  } finally {
    clearTimeout(timeout)
  }
}

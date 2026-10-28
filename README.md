# Abhishek Kumar — Portfolio

Personal portfolio site: projects, skills, experience, education, certifications, resume and contact form.

**Stack:** React 19 · Vite · Tailwind CSS 4 · React Router · Framer Motion · Lucide icons
**Hosting:** any static host (configured for Vercel). There is no backend: the contact form posts to [Web3Forms](https://web3forms.com).

---

## Quick start

Requires Node.js 20 or newer.

```bash
npm install          # install dependencies
cp .env.example .env # then fill in the values (see below)
npm run dev          # http://localhost:5173
```

| Command           | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                      |
| `npm run build`   | Production build into `dist/`                   |
| `npm run preview` | Serve the production build locally (port 4173)  |
| `npm run lint`    | ESLint                                          |

## Environment variables

Copy `.env.example` to `.env`. Both values are optional, and neither is secret.

| Variable                    | Purpose                                                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`             | Your live URL without a trailing slash, e.g. `https://abhishekkumar.dev`. Used for canonical / Open Graph tags and to generate `sitemap.xml`. Set it before sharing links on LinkedIn. |
| `VITE_WEB3FORMS_ACCESS_KEY` | Enables the contact form. Without it, the form is replaced by an "Email me" button.                                                                                      |

> Any `VITE_*` variable ends up in the browser bundle. Never put a real secret there. Web3Forms keys are fine because they are public by design: a key can only deliver mail to the inbox it was created for.

### Setting up the contact form (5 minutes)

1. Go to <https://web3forms.com>, enter `abhishekkr.1756@gmail.com` and get the access key from your inbox.
2. Put it in `.env` as `VITE_WEB3FORMS_ACCESS_KEY=...` (and in Vercel's environment variables, see below).
3. Restart `npm run dev` and send yourself a test message.

The form validates on the client (required fields, email format, length limits), uses a honeypot field against bots, times out after 15 seconds, and shows a clear success or error message. On any error it also shows your email address.

## Updating your content

All content lives in `src/data/`. You should rarely need to touch a component.

| File                         | What to edit                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `src/data/profile.js`        | Name, title, intro, About paragraphs, highlights, email, phone, social links, nav order, optional photo             |
| `src/data/skills.js`         | Skill categories and badges                                                                                        |
| `src/data/projects.js`       | Projects: summary, problem, features, architecture, implementation, decisions, links, screenshots                  |
| `src/data/experience.js`     | Internships / jobs. `visible: false` hides an entry; with no visible entries the whole section and nav link disappear |
| `src/data/education.js`      | Degrees and schools; `coursework` and `achievements` lists are optional                                            |
| `src/data/certifications.js` | Certifications (with credential links) and achievements                                                            |

Common tasks:

- **Replace the resume:** overwrite `public/Abhishek_Kumar_Resume.pdf` with a file of the same name. If you rename it, update `resumeUrl` in `profile.js`.
- **Add project screenshots:** save images (WebP, about 1600×900) in `public/projects/` and list them in the project's `images` array:
  `images: [{ src: '/projects/urbanride-home.webp', alt: 'Booking screen with map and fare estimate' }]`. The first image becomes the card cover; until then a generated cover is shown.
- **Add a project:** copy an entry in `projects.js`, give it a unique `slug`, and set `featured: true` to show it on the home page. Its page is available at `/projects/<slug>`, and the sitemap picks it up automatically.
- **Use a photo in the hero:** put it in `public/` (e.g. `public/profile.jpg`) and set `photo: '/profile.jpg'` in `profile.js`.
- **Hide a section:** remove it from `navLinks` in `profile.js` and from `src/pages/HomePage.jsx`.
- **Show the Google AI-ML internship:** set `visible: true` on that entry in `experience.js` (it is hidden while still in progress).

## Project structure

```
portfolio/
├── index.html               # Meta tags (SEO, Open Graph), fonts, theme pre-paint script
├── vite.config.js           # Vite + Tailwind; fills __SITE_URL__ and writes sitemap.xml
├── vercel.json              # SPA rewrites, security headers, asset caching
├── public/                  # Served as-is: resume PDF, favicon, og-image.png, robots.txt
└── src/
    ├── data/                # ← all site content
    ├── components/
    │   ├── layout/          # Navbar (active-section indicator, mobile menu), Footer, ThemeToggle, Layout
    │   ├── sections/        # Hero, About, Skills, Projects, Experience, Education, Certifications, Resume, Contact
    │   ├── projects/        # ProjectCard, ProjectCover
    │   ├── ui/              # Button, Badge, Section, Reveal (scroll animation), SocialLinks, BrandIcons, PageLoader
    │   └── ErrorBoundary.jsx
    ├── context/             # Light/dark theme provider
    ├── hooks/               # useActiveSection, useDocumentTitle
    ├── lib/                 # contact form logic, section helpers, lazy animation features
    ├── pages/               # HomePage, ProjectPage (/projects/:slug), NotFoundPage (404)
    ├── App.jsx              # Router + providers
    └── index.css            # Tailwind import, theme tokens (accent colour), base styles
```

## Architecture notes

- **No backend.** The site is static content, so a Spring Boot API would add hosting cost and maintenance without benefit. The only dynamic piece, the contact form, goes to Web3Forms. If you later want an admin panel or a database, a separate Spring Boot service can be added without changing this frontend's structure.
- **Content separated from UI.** Components read from `src/data/*`, so updating the portfolio means editing data, not JSX.
- **Routing.** One long home page with anchored sections, plus a detail page per project and a custom 404. The project page is lazy-loaded.
- **Performance.** Framer Motion's animation features load lazily (`LazyMotion`), so the critical JS is about 133 kB gzipped. Fonts use `display=swap`, and images are lazy-loaded with fixed aspect ratios to avoid layout shift.
- **Theme.** A tiny inline script in `index.html` applies the saved or system theme before first paint (no flash). The choice is stored in `localStorage`.
- **Accessibility.** Semantic landmarks and headings, a skip link, visible focus rings, `aria-current` on the active nav link, labelled form fields with `aria-invalid` / `aria-describedby`, and animations disabled for users who prefer reduced motion. Text colours meet WCAG AA contrast.

### Dependencies

| Package                          | Why                                                                     |
| -------------------------------- | ----------------------------------------------------------------------- |
| `react`, `react-dom`             | UI                                                                      |
| `react-router-dom`               | Project detail pages and 404                                            |
| `framer-motion`                  | Subtle entrance animations and the navbar indicator                     |
| `lucide-react`                   | Icons (brand logos are inline SVGs because Lucide no longer ships them) |
| `tailwindcss`, `@tailwindcss/vite` | Styling                                                               |
| `vite`, `@vitejs/plugin-react`   | Dev server and build                                                    |
| `eslint` + plugins               | Linting                                                                 |

## Deployment (Vercel)

1. **Put the project in its own Git repository** and push it to GitHub:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/abhi1756/portfolio.git
   git push -u origin main
   ```
   (Create the empty `portfolio` repo on GitHub first. `.env` and `node_modules` are git-ignored.)
2. On <https://vercel.com>, choose **Add New → Project** and import the repo. Vercel detects Vite automatically (build command `npm run build`, output `dist`).
3. Under **Settings → Environment Variables**, add `VITE_SITE_URL` and `VITE_WEB3FORMS_ACCESS_KEY`, then redeploy.
4. Every push to `main` deploys automatically.

`vercel.json` already rewrites unknown paths to `index.html` (so `/projects/rezify` works on refresh) and adds security headers.

**Other hosts:** Netlify needs `public/_redirects` containing `/* /index.html 200`. GitHub Pages needs a 404.html copy of `index.html` and a `base` setting in `vite.config.js` if served from a sub-path.

### Custom domain

1. Buy a domain (e.g. Namecheap, Cloudflare, GoDaddy).
2. In Vercel: **Project → Settings → Domains → Add** and enter the domain.
3. At your registrar, add the DNS records Vercel shows (usually an `A` record for the root domain and a `CNAME` for `www`). HTTPS is issued automatically.
4. Update `VITE_SITE_URL` in Vercel to the new domain and redeploy, so the share previews and sitemap use it.
5. Optional: add `Sitemap: https://your-domain/sitemap.xml` to `public/robots.txt` and submit the sitemap in Google Search Console.

### Updating after deployment

Edit files in `src/data/` (or replace the resume PDF), check with `npm run dev`, then commit and push. Vercel rebuilds within a minute or two.

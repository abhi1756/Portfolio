import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { projects } from './src/data/projects.js'

const ROUTES = ['/', ...projects.map((p) => `/projects/${p.slug}`)]

// Fills __SITE_URL__ in index.html (empty when unset, so tags fall back to
// relative URLs instead of a literal placeholder) and writes sitemap.xml.
function siteUrl(url) {
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', url),
    generateBundle() {
      if (!url) return
      const urls = ROUTES.map((r) => `  <url><loc>${url}${r}</loc></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const url = (env.VITE_SITE_URL || '').replace(/\/$/, '')
  return { plugins: [react(), tailwindcss(), siteUrl(url)] }
})

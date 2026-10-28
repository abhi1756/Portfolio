import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LazyMotion, MotionConfig } from 'framer-motion'
import ThemeProvider from './context/ThemeProvider'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

// The project detail page is split into its own chunk; the home page loads first.
const ProjectPage = lazy(() => import('./pages/ProjectPage'))

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects/:slug', element: <ProjectPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return (
    <ThemeProvider>
      {/* `m` components + lazily loaded features keep framer-motion out of the main bundle. */}
      <LazyMotion features={loadMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} />
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  )
}

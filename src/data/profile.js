// Personal details, links and the copy used across the site.
// Edit this file to update your name, intro, about text or contact links.

export const profile = {
  name: 'Abhishek Kumar',
  title: 'Full Stack Developer',
  tagline: 'Java · Spring Boot · React',
  location: 'Delhi, India',
  email: 'abhishekkr.1756@gmail.com',
  // Shown in the Contact section. Set to '' to hide your phone number.
  phone: '+91-8102193051',
  // Path inside /public. Replace the PDF with the same name to update it.
  resumeUrl: '/Abhishek_Kumar_Resume.pdf',
  // Optional: put a photo in /public (e.g. /profile.jpg) and set its path here.
  // When empty, the hero shows a code-card visual instead.
  photo: '',
  openToWork: true,

  intro:
    'I build full stack web applications with Java, Spring Boot and React — secure REST APIs, clean data models, and interfaces that stay simple to use.',

  about: [
    "I'm a Computer Science undergraduate at Galgotias University (B.Tech, 2023 – 2027) and I enjoy working on both sides of a web application: designing the API and the database behind it, and building the React interface people actually use.",
    'Most of what I know I learned by building. UrbanRide, a ride-booking platform, pushed me into JWT authentication with role-based access, real-time updates over WebSockets and distance-based fare calculation. Rezify, a hotel-booking backend, taught me how to model bookings so rooms are never double-booked, and how a Redis cache can take repeated reads off the database. During my internship at Bluestock I built a JWT-secured admin login, managed state with Redux Toolkit, and wrote reusable hooks around the API layer.',
    "My approach is to understand the data first, keep layers separated — controller, service, repository — and write code the next person can read. I've solved 900+ DSA problems, which shows up less as clever tricks and more as a habit of thinking about edge cases and cost before writing code.",
    "I'm looking for a software developer role where I can work on real products, learn from experienced engineers, and keep growing as a backend and full stack engineer.",
  ],

  highlights: [
    { value: '900+', label: 'DSA problems solved' },
    { value: '2', label: 'Full stack / backend projects' },
    { value: '1', label: 'SDE internship' },
  ],
}

// Social / professional links. `icon` maps to an icon in components/ui/BrandIcons.jsx.
export const socials = [
  { label: 'GitHub', href: 'https://github.com/abhi1756', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/1941-abhishek-kumar/', icon: 'linkedin' },
  { label: 'LeetCode', href: 'https://leetcode.com/abhi1756', icon: 'leetcode' },
]

// Sections in page order. Remove an entry here to hide that section and its nav link.
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Achievements' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
]

// Skill categories shown in the Skills section.
// Add, remove or reorder items freely; `icon` is any lucide-react icon name
// listed in components/sections/Skills.jsx.

export const skillGroups = [
  {
    title: 'Languages',
    icon: 'code',
    items: ['Java', 'JavaScript', 'SQL'],
  },
  {
    title: 'Backend',
    icon: 'server',
    items: [
      'Spring Boot',
      'Spring MVC',
      'Spring Security',
      'RESTful APIs',
      'JWT Authentication',
      'JPA / Hibernate',
      'WebSockets (STOMP)',
    ],
  },
  {
    title: 'Frontend',
    icon: 'layout',
    items: [
      'React',
      'Redux Toolkit',
      'React Context API',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Vite',
      'Responsive Design',
    ],
  },
  {
    title: 'Databases & Caching',
    icon: 'database',
    items: ['MySQL', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'Tools',
    icon: 'wrench',
    items: ['Git', 'GitHub', 'Docker', 'Maven', 'Postman', 'IntelliJ IDEA', 'VS Code'],
  },
]

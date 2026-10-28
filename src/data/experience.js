// Experience, internships and training.
// Set `visible: false` to keep an entry in the file without showing it.
// If no entries are visible, the Experience section and its nav link are hidden.

export const experience = [
  {
    organization: 'Bluestock',
    role: 'SDE Intern',
    type: 'Internship',
    period: 'Dec 2025 – Jan 2026',
    location: 'Remote',
    visible: true,
    points: [
      'Implemented a secure admin login with JWT authentication and managed application state with Redux Toolkit.',
      'Built reusable custom hooks and an API context to keep data fetching and state logic maintainable.',
      'Integrated RESTful APIs with Axios for frontend–backend communication and dynamic data rendering.',
    ],
    tech: ['React', 'Redux Toolkit', 'JWT', 'Axios', 'REST APIs'],
  },
  {
    // Ongoing virtual internship (Oct – Dec 2026). Not on the resume yet, so it
    // is hidden. Set visible: true once you want to show it.
    organization: 'AICTE – EduSkills (Google for Developers)',
    role: 'Google AI-ML Virtual Intern',
    type: 'Virtual internship',
    period: 'Oct 2026 – Dec 2026',
    location: 'Remote',
    visible: false,
    points: [
      'Eight-week programme covering neural networks and CNNs in TensorFlow, object detection with ML Kit, and custom models deployed with TensorFlow Lite.',
      'Product image search: on-device object detection on static images and live camera frames, connected to a backend search service.',
    ],
    tech: ['TensorFlow', 'TensorFlow Lite', 'ML Kit', 'Python', 'Android'],
  },
]

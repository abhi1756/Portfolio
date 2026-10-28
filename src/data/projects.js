// Projects shown on the home page and on /projects/:slug.
// `featured: true` shows the project on the home page. Every field except
// slug, name, summary and tech is optional — empty sections are hidden.
//
// Screenshots: put images in /public/projects/ and list them under `images`
// as { src: '/projects/urbanride-1.webp', alt: 'Describe the screen' }.
// Until then, a generated cover is shown.

export const projects = [
  {
    slug: 'urbanride',
    name: 'UrbanRide',
    category: 'Full Stack · Ride Booking',
    featured: true,
    summary:
      'A ride-booking platform for Indian cities: riders pick points on a map, get a distance-based fare, book, and follow the trip live while a driver accepts, starts and completes it.',
    problem:
      'Connecting a rider with an available driver, pricing the trip up front, and keeping both sides informed without either one refreshing the page — the core loop of apps like Uber and Ola.',
    tech: [
      'Java 21',
      'Spring Boot 3',
      'Spring Security',
      'JWT',
      'JPA / Hibernate',
      'WebSockets (STOMP)',
      'React',
      'Vite',
      'Tailwind CSS',
      'Leaflet',
      'PostgreSQL',
      'Docker',
    ],
    features: [
      'Three roles — rider, driver and admin — with role-based access on both API and UI routes',
      'Pickup and drop selection on an interactive OpenStreetMap map, with place search and reverse geocoding',
      'Fare estimation from the Haversine distance between pickup and destination',
      'Booking auto-assigns an online driver with the requested vehicle type',
      'Live trip status (accepted → started → completed) pushed to rider and driver over WebSockets',
      'Driver dashboard: go online/offline, accept or reject requests, trip history and earnings',
      'Admin dashboard listing users, drivers and trips, with driver removal',
      'Light / dark / system theme',
    ],
    role:
      'Built the project end to end: data model, REST API, security configuration, WebSocket messaging and the React frontend.',
    implementation: [
      {
        title: 'Stateless JWT authentication',
        body: 'A custom OncePerRequestFilter reads the Bearer token, validates its HS256 signature and puts the user into the SecurityContext. Passwords are hashed with BCrypt, and admin endpoints are guarded with @PreAuthorize. On the client, an Axios request interceptor attaches the token and a response interceptor logs the user out on 401.',
      },
      {
        title: 'Real-time updates with STOMP over WebSocket',
        body: 'The service layer publishes trip events to topics such as /topic/trip/{id}/status through SimpMessagingTemplate. The React pages subscribe with @stomp/stompjs over SockJS, so a rider sees "driver accepted" the moment it happens instead of polling.',
      },
      {
        title: 'Layered Spring Boot architecture',
        body: 'Controllers → services → Spring Data JPA repositories, with DTOs validated by Bean Validation and a global @RestControllerAdvice for error responses. Entities use enums stored as strings and BigDecimal for money and coordinates.',
      },
      {
        title: 'Maps without API keys',
        body: 'Leaflet with OpenStreetMap tiles on the frontend; place search and reverse geocoding go through a backend proxy to the Nominatim API using RestTemplate, keeping third-party calls off the browser.',
      },
    ],
    architecture: [
      { layer: 'Client', detail: 'React SPA (Vite) · React Router with role-protected routes · Context API for auth, theme and toasts' },
      { layer: 'API', detail: 'Spring Boot REST controllers behind a Spring Security filter chain (CORS → JWT filter → authorization)' },
      { layer: 'Real-time', detail: 'STOMP endpoint /ws with an in-memory broker on /topic' },
      { layer: 'Data', detail: 'Spring Data JPA / Hibernate · H2 for local development, PostgreSQL driver and config for production' },
      { layer: 'External', detail: 'OpenStreetMap tiles and Nominatim geocoding' },
    ],
    decisions: [
      'JWT instead of server sessions, because the SPA and API run on different origins and any instance can verify a token.',
      'WebSocket push instead of polling for trip status — fewer requests and instant feedback.',
      'Context API rather than Redux: the shared state (user, theme, toasts) is small.',
      'Leaflet + OpenStreetMap to avoid paid map APIs and key management.',
    ],
    links: {
      github: 'https://github.com/abhi1756/UrbanRide',
      live: 'https://urban-ride-frontend.vercel.app',
    },
    images: [],
  },
  {
    slug: 'rezify',
    name: 'Rezify',
    category: 'Backend · Hotel Booking',
    featured: true,
    summary:
      'A Spring Boot REST backend for hotel booking with JWT-secured user and admin access, room inventory across floors, booking and partial cancellation, Redis caching and email confirmations.',
    problem:
      'Hotels need a reliable way to publish rooms, take bookings without double-booking a room, and let guests cancel all or part of a booking with a correct refund amount.',
    tech: ['Java 17', 'Spring Boot 3', 'Spring Security', 'JWT', 'JPA / Hibernate', 'MySQL', 'Redis', 'Spring Mail', 'Maven'],
    features: [
      'User registration and login returning a JWT; BCrypt password hashing',
      'Admin-only endpoints to create or deactivate hotels, add rooms and view all bookings',
      'Room generation that spreads classic and premium rooms evenly across floors, with per-type pricing',
      'Booking checks every requested room and rejects the request with 409 Conflict if any is already booked',
      'Full cancellation or room-by-room cancellation with the refund amount calculated from room prices',
      'Booking confirmation email sent through Spring Mail',
      'Soft delete for hotels (deactivated, not removed) so existing bookings stay intact',
    ],
    role: 'Designed and built the backend: entities and relationships, REST endpoints, security configuration and the caching layer.',
    implementation: [
      {
        title: 'Redis cache-aside for room lookups',
        body: "Room lists are read on every booking and cancellation. RoomService first checks Redis for the hotel's rooms and falls back to MySQL on a miss, then stores the result with a 15-minute TTL. A RedisTemplate with String keys and Jackson JSON values keeps cached entries readable.",
      },
      {
        title: 'Route-level authorization',
        body: 'A SecurityFilterChain marks hotel creation, room creation and the all-bookings report as ADMIN-only, requires authentication for the other hotel, room and booking routes, and runs a JWT filter before the username/password filter. Sessions are stateless and CORS is restricted to the frontend origin.',
      },
      {
        title: 'JPA relationships',
        body: 'Hotel → rooms is a bidirectional one-to-many with cascade and orphan removal; @JsonManagedReference / @JsonBackReference prevent infinite recursion when serializing.',
      },
      {
        title: 'Clear HTTP semantics',
        body: 'Services return precise status codes — 201 on creation, 404 for unknown or inactive hotels, 409 for an unavailable room, 400 for invalid input — so a client can react to each case.',
      },
    ],
    architecture: [
      { layer: 'API', detail: 'Spring Web controllers: /users, /hotels, /rooms, /booking' },
      { layer: 'Security', detail: 'Spring Security filter chain · JWT filter · BCrypt · role-based route rules' },
      { layer: 'Services', detail: 'Hotel, room, booking and user services; mail service for confirmations' },
      { layer: 'Data', detail: 'Spring Data JPA / Hibernate on MySQL · Redis cache for room lists' },
    ],
    decisions: [
      'Cache-aside with a TTL rather than write-through: simple, and stale data expires on its own.',
      'Soft-deleting hotels keeps booking history consistent.',
      'Room IDs encode type and floor (e.g. C0_1), which makes inventory easy to read in responses.',
    ],
    links: {
      github: 'https://github.com/abhi1756/hotel-booking-backend',
      live: '',
    },
    images: [],
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)

/src
│
├── /api # Axios instance & API definition
│ ├── axios.ts # Interceptors for JWT injection
│ └── endpoints.ts # API URL constants
│
├── /assets # Static images/icons
│
├── /components # SHARED UI Components (Dumb components)
│ ├── /ui # Buttons, Inputs, Cards, Modals (Reusables)
│ └── /layout # Navbar, Sidebar, PrivateRoute
│
├── /context # Global Client State
│ └── AuthContext.tsx # User session management
│
├── /features # DOMAIN LOGIC (Smart components)
│ ├── /auth
│ │ ├── LoginPage.tsx
│ │ └── SignupPage.tsx
│ │
│ ├── /dashboard
│ │ ├── DashboardPage.tsx
│ │ ├── components
│ │ │ ├── SubscriptionList.tsx
│ │ │ └── CreateSubscriptionModal.tsx
│ │ └── hooks # Feature-specific queries
│ │ └── useSubscriptions.ts
│ │
│ └── /events
│ ├── EventLog.tsx # The Real-time console
│ └── useEventStream.ts # Socket.io hook
│
├── /hooks # Shared hooks (useDebounce, etc.)
├── /types # TypeScript interfaces (User, Subscription, Event)
├── App.tsx # Routing Setup
└── main.tsx # Providers (QueryClient, AuthProvider)

import './App.css'

type ResourceLink = {
  title: string
  description: string
  href: string
}

const resourceLinks: ResourceLink[] = [
  {
    title: 'Get started with Vite',
    description:
      'Lightning-fast dev server and build tooling for modern frontends.',
    href: 'https://vite.dev/guide/',
  },
  {
    title: 'React documentation',
    description: 'Learn the latest APIs, patterns, and best practices.',
    href: 'https://react.dev/learn',
  },
  {
    title: 'Tailwind CSS',
    description: 'Utility-first styling with an expressive design system.',
    href: 'https://tailwindcss.com/docs/installation',
  },
  {
    title: 'Axios guide',
    description: 'Promise-based HTTP client for browsers and Node.js.',
    href: 'https://axios-http.com/docs/intro',
  },
]

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-10 px-6 py-12">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
            Spenza Frontend
          </p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            Vite + React + Tailwind starter
          </h1>
          <p className="text-lg text-slate-300 sm:text-xl">
            You&apos;re ready to build. Tailwind is configured, axios is
            installed, and Vite is primed for rapid iteration.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://vite.dev/guide/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Read the guide
            </a>
            <a
              href="https://tailwindcss.com/docs/installation"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white"
            >
              Tailwind docs
            </a>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {resourceLinks.map((resource) => (
            <a
              key={resource.title}
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-slate-950/50 transition hover:-translate-y-1 hover:border-sky-400/70 hover:bg-white/10"
            >
              <h2 className="text-xl font-semibold text-white">
                {resource.title}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {resource.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-sky-300">
                Explore
                <svg
                  className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M9.5 3a.75.75 0 1 1 0-1.5h4.25A1.25 1.25 0 0 1 15 2.75V7a.75.75 0 0 1-1.5 0V4.56l-6.72 6.72a.75.75 0 1 1-1.06-1.06L12.44 3.5H9.5Z" />
                  <path d="M3.25 2A1.25 1.25 0 0 0 2 3.25v9.5C2 13.88 2.56 14.5 3.25 14.5h9.5a1.25 1.25 0 0 0 1.25-1.25V9a.75.75 0 0 0-1.5 0v4H3.5V3.5h4a.75.75 0 0 0 0-1.5H3.25Z" />
                </svg>
              </span>
            </a>
          ))}
        </section>
      </div>
    </main>
  )
}

export default App

import { Icon } from '@iconify/react'

interface Section {
  title: string
  content: React.ReactNode
}

interface LegalLayoutProps {
  title: string
  lastUpdated: string
  sections: Section[]
}

export function LegalLayout({ title, lastUpdated, sections }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.35,
        }}
      />

      <main className="relative max-w-2xl mx-auto px-6 py-12">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-12"
        >
          <Icon icon="lucide:arrow-left" width={14} />
          SVGLogo.dev
        </a>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-3">{title}</h1>
        <p className="text-sm text-[var(--muted)] mb-12">Last updated: {lastUpdated}</p>

        {/* Sections */}
        <div>
          {sections.map((section, i) => (
            <div key={section.title}>
              {i > 0 && <hr className="border-[var(--border)] my-10" />}
              <h2 className="text-base font-semibold text-[var(--foreground)] mb-4">
                {section.title}
              </h2>
              <div className="text-sm text-[var(--muted)] leading-relaxed space-y-3">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

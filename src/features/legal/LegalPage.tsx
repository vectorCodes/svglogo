import { ArrowLeft } from '@gravity-ui/icons'
import { GridBackground } from '#/features/editor/GridBackground'

function LegalNav() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-8">
      <a
        href="/"
        className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1.5 w-fit"
      >
        <ArrowLeft />
        SVGLogo.dev
      </a>
    </div>
  )
}

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative z-10">
        <LegalNav />
        <article className="max-w-3xl mx-auto px-4 pt-12 pb-24">
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <p className="text-sm text-muted/60">Last updated: {lastUpdated}</p>
          </header>
          <div className="prose-legal">{children}</div>
        </article>
      </div>
    </div>
  )
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3">{title}</h2>
      <div className="text-sm text-muted leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

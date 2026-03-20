import { Icon } from '@iconify/react'
import { Button } from '@heroui/react'
import { motion } from 'framer-motion'

export function LandingFooter() {
  return (
    <footer className="px-4 pb-16 max-w-5xl mx-auto">
      {/* CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-border bg-surface p-10 text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Ready to make your logo?
        </h2>
        <p className="text-muted mb-8">
          No account. No cost. Just open the editor and go.
        </p>
        <a href="/editor">
          <Button size="lg" className="font-semibold px-8 gap-2">
            Open Editor
            <Icon icon="lucide:arrow-right" width={16} />
          </Button>
        </a>
      </motion.div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-(--muted)/60">
        <p>© {new Date().getFullYear()} SVGLogo.dev</p>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="hover:text-muted transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-muted transition-colors">Terms of Use</a>
        </div>
      </div>
    </footer>
  )
}

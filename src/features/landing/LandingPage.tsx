import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { GridBackground } from '#/features/editor/GridBackground'
import { HeroSection } from './HeroSection'
import { BentoGrid } from './BentoGrid'
import { TestimonialsSection } from './TestimonialsSection'
import { FaqSection } from './FaqSection'
import { LandingFooter } from './LandingFooter'
import { LAUNCH_DATE, PRICE_ONE_TIME_EARLY } from '#/data/creator-plan'

function CreatorPlanBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      id="pricing"
      className="px-4 pb-24 max-w-5xl mx-auto scroll-mt-8"
    >
      <a href="/creator" className="group block rounded-2xl border border-border bg-[var(--surface)] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-primary/30 transition-colors">
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted/50 flex items-center gap-1.5">
            <Icon icon="lucide:crown" width={10} className="text-primary" />
            Launching {LAUNCH_DATE}
          </p>
          <h3 className="text-xl font-bold">Want more? Try Creator Plan.</h3>
          <p className="text-sm text-muted">Social assets, logo variants, brand kits — one-time purchase at ${PRICE_ONE_TIME_EARLY}.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-primary shrink-0 group-hover:gap-3 transition-all">
          See Creator Plan
          <Icon icon="lucide:arrow-right" width={14} />
        </div>
      </a>
    </motion.section>
  )
}

export function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative z-10">
        <HeroSection />
        <BentoGrid />
        <CreatorPlanBanner />
        <TestimonialsSection />
        <FaqSection />
        <LandingFooter />
      </div>
    </div>
  )
}

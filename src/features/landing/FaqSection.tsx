import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FAQ_ITEMS } from '#/data/site'

function FaqItem({
  q,
  a,
  delay,
}: {
  q: string
  a: string
  delay: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-border last:border-0"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-[var(--foreground)]">{q}</span>
        <Icon
          icon="lucide:chevron-down"
          width={16}
          className={`mt-0.5 shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm text-muted leading-relaxed">{a}</p>
      )}
    </motion.div>
  )
}

export function FaqSection() {
  return (
    <section className="px-4 pb-24 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Common questions
        </h2>
        <p className="text-muted text-lg">
          Everything you need to know before you start.
        </p>
      </motion.div>

      <div className="rounded-2xl border border-border bg-[var(--surface)] px-6">
        {FAQ_ITEMS.map((faq, i) => (
          <FaqItem key={faq.q} q={faq.q} a={faq.a} delay={i * 0.04} />
        ))}
      </div>
    </section>
  )
}

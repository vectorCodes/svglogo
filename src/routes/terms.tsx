import { createFileRoute } from '@tanstack/react-router'
import { TermsPage } from '#/features/legal/TermsPage'
import { SITE_NAME, SITE_URL } from '#/data/site'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: `Terms of Use — ${SITE_NAME}` },
      { name: 'description', content: 'Terms of use for SVGLogo.dev — acceptable use, intellectual property, and liability.' },
      { name: 'robots', content: 'noindex, follow' },
      { property: 'og:title', content: `Terms of Use — ${SITE_NAME}` },
      { property: 'og:url', content: `${SITE_URL}/terms` },
    ],
  }),
})

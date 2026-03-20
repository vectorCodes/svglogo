import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPolicyPage } from '#/features/legal/PrivacyPolicyPage'
import { SITE_NAME, SITE_URL } from '#/data/site'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: `Privacy Policy — ${SITE_NAME}` },
      { name: 'description', content: 'Privacy policy for SVGLogo.dev — what data we collect, why, and how it is used.' },
      { name: 'robots', content: 'noindex, follow' },
      { property: 'og:title', content: `Privacy Policy — ${SITE_NAME}` },
      { property: 'og:url', content: `${SITE_URL}/privacy` },
    ],
  }),
})

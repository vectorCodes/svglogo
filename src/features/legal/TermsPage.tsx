import { LegalLayout } from './LegalLayout'

export function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="March 20, 2026"
      sections={[
        {
          title: 'Use of the Service',
          content: (
            <p>
              SVGLogo.dev is free to use for personal and commercial projects. You may use exported
              logos for any lawful purpose. You agree not to use the service in any way that
              violates applicable laws or third-party rights.
            </p>
          ),
        },
        {
          title: 'Icon Licenses',
          content: (
            <p>
              Icons are sourced from open-source libraries via Iconify. Each icon set carries its
              own license (commonly MIT or Apache 2.0). It is your responsibility to verify the
              license of any icon you use before publishing or selling a product.
            </p>
          ),
        },
        {
          title: 'Accounts',
          content: (
            <p>
              An account is not required to use the editor. If you create one, you are responsible
              for keeping your credentials secure. We may suspend accounts that are used to abuse
              the service.
            </p>
          ),
        },
        {
          title: 'Shared Links',
          content: (
            <p>
              Logos shared via a public link are stored for 30 days and accessible to anyone with
              the link. Do not share designs that contain confidential information.
            </p>
          ),
        },
        {
          title: 'Availability',
          content: (
            <p>
              We aim to keep SVGLogo.dev running reliably, but we make no uptime guarantees. The
              service is provided as-is without warranty of any kind.
            </p>
          ),
        },
        {
          title: 'Changes to These Terms',
          content: (
            <p>
              We may update these terms from time to time. Continued use of the service after
              changes are posted constitutes acceptance of the new terms.
            </p>
          ),
        },
        {
          title: 'Contact',
          content: (
            <p>
              Questions? Reach out on{' '}
              <a
                href="https://x.com/monawwarx"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[var(--foreground)]"
              >
                X / Twitter
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  )
}

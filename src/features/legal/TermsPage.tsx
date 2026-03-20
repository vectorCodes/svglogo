import { LegalPage, Section } from './LegalPage'

export function TermsPage() {
  return (
    <LegalPage title="Terms of Use" lastUpdated="March 20, 2026">
      <Section title="Acceptance">
        <p>
          By using SVGLogo.dev you agree to these terms. If you do not agree, please do not use the
          service.
        </p>
      </Section>

      <Section title="The Service">
        <p>
          SVGLogo.dev provides a free, browser-based tool for creating and exporting SVG logos.
          The core editor is free to use with no account required. A paid Creator Plan is planned
          for additional features targeted at studios and professional makers.
        </p>
        <p>
          We reserve the right to modify, suspend, or discontinue any part of the service at any
          time without prior notice.
        </p>
      </Section>

      <Section title="Acceptable Use">
        <p>You agree not to:</p>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li>Use the service for any unlawful purpose</li>
          <li>Attempt to scrape, abuse, or overload our infrastructure</li>
          <li>Use the Share feature to distribute harmful or illegal content</li>
          <li>Misrepresent your identity or affiliation when signing up for early access</li>
        </ul>
      </Section>

      <Section title="Intellectual Property">
        <p>
          Logos you create using SVGLogo.dev are yours. We claim no ownership over designs you
          produce with the tool.
        </p>
        <p>
          The underlying icons are provided by third-party open-source libraries (Lucide, Phosphor,
          Tabler, Material Design, Simple Icons, and others) under their respective licenses —
          most commonly MIT or Apache 2.0. It is your responsibility to verify the license of any
          icon set you use for commercial projects.
        </p>
        <p>
          The SVGLogo.dev application code, design, and branding are the property of the creator
          and may not be copied or redistributed without permission.
        </p>
      </Section>

      <Section title="Disclaimer of Warranties">
        <p>
          SVGLogo.dev is provided "as is" without warranty of any kind, express or implied. We do
          not guarantee the service will be uninterrupted, error-free, or available at all times.
        </p>
      </Section>

      <Section title="Limitation of Liability">
        <p>
          To the maximum extent permitted by law, SVGLogo.dev and its creator shall not be liable
          for any indirect, incidental, or consequential damages arising from your use of the
          service.
        </p>
      </Section>

      <Section title="Changes to These Terms">
        <p>
          We may update these terms from time to time. Continued use of the service after changes
          are posted constitutes acceptance of the updated terms. The "Last updated" date at the
          top of this page reflects the most recent revision.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions? Reach out on{' '}
          <a
            href="https://x.com/monawwarx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--foreground)] underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            X / Twitter
          </a>{' '}
          or open an issue on GitHub.
        </p>
      </Section>
    </LegalPage>
  )
}

import { LegalPage, Section } from './LegalPage'

export function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="March 20, 2026">
      <Section title="Overview">
        <p>
          SVGLogo.dev is a browser-based logo design tool. We are committed to protecting your
          privacy. This policy explains what data we collect, why, and how it is used.
        </p>
      </Section>

      <Section title="Data We Collect">
        <p>
          <strong className="text-(--foreground)">Analytics.</strong> We use a self-hosted
          instance of Umami Analytics to collect anonymous, cookieless usage data — page views,
          referrers, and button click counts. No personally identifiable information is collected.
          No data is shared with third parties.
        </p>
        <p>
          <strong className="text-(--foreground)">Early access sign-ups.</strong> If you
          voluntarily submit your email address via the Creator Plan early access form, we store
          that email address to notify you before launch. We do not sell, share, or use your email
          for any other purpose. You can request deletion at any time by emailing us.
        </p>
        <p>
          <strong className="text-(--foreground)">Shared logos.</strong> When you click
          "Share" in the editor, your logo configuration is stored in Cloudflare KV with a
          randomly generated link. This data expires after 30 days. No account or identity is
          associated with shared links.
        </p>
      </Section>

      <Section title="Data We Do Not Collect">
        <p>
          Your logo designs, icon choices, and editor state are processed entirely in your browser
          and are never sent to our servers unless you explicitly use the Share feature. We do not
          use cookies, fingerprinting, or any cross-site tracking.
        </p>
      </Section>

      <Section title="Third-Party Services">
        <p>
          <strong className="text-[var(--foreground)]">Iconify.</strong> Icon searches are
          resolved via the Iconify API. Please refer to their privacy policy for how they handle
          request data.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Cloudflare.</strong> The site is hosted on
          Cloudflare Workers. Cloudflare may process request metadata (IP addresses, headers) as
          part of DDoS protection and routing. Refer to Cloudflare's privacy policy for details.
        </p>
        <p>
          <strong className="text-[var(--foreground)]">Cloudflare Turnstile.</strong> The early
          access form uses Cloudflare Turnstile for bot protection. This is an invisible challenge
          that does not use cookies or track users.
        </p>
      </Section>

      <Section title="Data Retention">
        <p>
          Anonymous analytics data is retained for up to 12 months. Early access emails are
          retained until the Creator Plan launches or until you request removal. Shared logo data
          expires automatically after 30 days.
        </p>
      </Section>

      <Section title="Your Rights">
        <p>
          You may request access to, correction of, or deletion of any personal data we hold about
          you (i.e. your email if you signed up for early access). Contact us at the address below.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions or requests? Reach out on{' '}
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

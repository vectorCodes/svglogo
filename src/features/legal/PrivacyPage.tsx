import { LegalLayout } from './LegalLayout'

export function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="March 20, 2026"
      sections={[
        {
          title: 'Overview',
          content: (
            <p>
              SVGLogo.dev is a browser-based logo design tool. We are committed to protecting your
              privacy. This policy explains what data we collect, why, and how it is used.
            </p>
          ),
        },
        {
          title: 'Data We Collect',
          content: (
            <>
              <p>
                <span className="font-semibold text-[var(--foreground)]">Analytics.</span>{' '}
                We use a self-hosted instance of Umami Analytics to collect anonymous, cookieless
                usage data — page views, referrers, and button click counts. No personally
                identifiable information is collected. No data is shared with third parties.
              </p>
              <p>
                <span className="font-semibold text-[var(--foreground)]">Shared logos.</span>{' '}
                When you click "Share" in the editor, your logo configuration is stored in
                Cloudflare KV with a randomly generated link. This data expires after 30 days. No
                account or identity is associated with shared links.
              </p>
              <p>
                <span className="font-semibold text-[var(--foreground)]">Account &amp; sync.</span>{' '}
                If you create an account, we store your email address and your logo designs in our
                database so you can access them across multiple devices. You can delete your account
                and all associated data at any time.
              </p>
            </>
          ),
        },
        {
          title: 'Data We Do Not Collect',
          content: (
            <p>
              Without an account, your logo designs stay entirely in your browser and are never
              sent to our servers (unless you use the Share feature). We do not use cookies,
              fingerprinting, or any cross-site tracking.
            </p>
          ),
        },
        {
          title: 'Third-party Services',
          content: (
            <p>
              Icons are served via{' '}
              <a
                href="https://iconify.design"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[var(--foreground)]"
              >
                Iconify
              </a>
              . Fetching an icon may send a request to Iconify's CDN. Refer to their privacy policy
              for details.
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

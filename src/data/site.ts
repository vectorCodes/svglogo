export const SITE_URL = 'https://svglogo.dev'
export const SITE_NAME = 'SVGLogo.dev'

export const SEO = {
  title: 'SVG Logo Maker - Free SVG Logo Generator',
  description:
    'Free SVG logo maker to create professional icons and brand marks in seconds. Customize icons, colors, and backgrounds. Export high-quality SVG, PNG, and ICO from your browser.',
  keywords:
    'svg logo maker, svg logo generator, free logo maker, logo svg generator, svg logo creator, free svg logo, icon logo maker, logo maker online, svg to png, svg to ico, favicon generator, brand mark creator',
  ogImage: `${SITE_URL}/og/banner.png`,
  ogImageAlt: 'svglogo.dev app preview banner',
  canonical: `${SITE_URL}/`,
} as const

export const CREATOR_SEO = {
  title: 'Creator Plan — Logo Brand Kits & Assets | SVGLogo.dev',
  description:
    'Brand kits, social media assets, and logo variants built for agencies, indie studios, and serious makers. Early access starting at $4.99/mo.',
  keywords:
    'logo brand kit, social media assets, logo variants, brand identity tool, logo maker for studios, professional logo creator, agency branding tool, logo export pack',
  ogImage: `${SITE_URL}/og/banner.png`,
  ogImageAlt: 'SVGLogo.dev Creator Plan — Professional branding tools for studios and makers',
  canonical: `${SITE_URL}/creator`,
} as const

export const CREATOR_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'SVGLogo.dev Creator Plan',
  url: `${SITE_URL}/creator`,
  description: CREATOR_SEO.description,
  image: CREATOR_SEO.ogImage,
  brand: { '@type': 'Brand', name: 'SVGLogo.dev' },
  offers: {
    '@type': 'Offer',
    price: '4.99',
    priceCurrency: 'USD',
    priceValidUntil: '2026-04-17',
    availability: 'https://schema.org/PreOrder',
    url: `${SITE_URL}/creator`,
  },
})

export const FAQ_ITEMS = [
  {
    q: 'Is the editor really free?',
    a: 'Yes — the core editor is free forever. No watermarks, no export limits, no sign-up required. The Creator Plan is a paid add-on for teams and studios that need social assets, logo variants, and brand kits on top of the free editor.',
  },
  {
    q: 'What does the Creator Plan include?',
    a: 'Creator Plan adds social media asset exports (Twitter/X, LinkedIn, Open Graph), light/dark/transparent logo variants, brand kits, and priority support — starting at $4.99/mo for early members.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account, no email, no sign-up of any kind for the free editor. Just open it and start creating.',
  },
  {
    q: 'Is my data private?',
    a: 'Everything runs directly in your browser. Your logo designs are never sent to any server unless you explicitly click "Share" to generate a shareable link.',
  },
  {
    q: 'What file formats can I export?',
    a: 'You can export SVG, PNG, and ICO. You can also generate complete platform icon packs for iOS, Android, macOS, and Web/PWA with correctly sized and named assets.',
  },
  {
    q: 'Can I use exported logos commercially?',
    a: "The app is free to use for any purpose. Keep in mind that the underlying icons come from various open-source icon libraries — check each library's license (most use MIT or Apache 2.0).",
  },
  {
    q: 'What icon sets are available?',
    a: 'Lucide, Material Design, Tabler, Phosphor, Simple Icons, and many more — over 300,000 icons in total via the Iconify library.',
  },
] as const

export const FAQ_JSON_LD = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
})

export const JSON_LD = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: 'Free SVG logo maker to create professional icons and brand marks in seconds.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${SITE_NAME} - SVG Logo Maker`,
    url: `${SITE_URL}/`,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web',
    description: SEO.description,
    image: SEO.ogImage,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'Create SVG logos from icons',
      'Customize colors, gradients, and backgrounds',
      'Export to SVG, PNG, and ICO formats',
      'Generate favicons from SVG',
      'Browser-based, no signup required',
      'Share logos with a link',
    ],
  },
])

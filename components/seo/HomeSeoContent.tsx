import { SeoLandingPage } from "./SeoLandingPage";

export function HomeSeoContent() {
  return (
    <SeoLandingPage
      eyebrow="SVG Logo Maker"
      title="Free SVG Logo Maker & Generator for Professional Icons"
      description="Create professional SVG logos in seconds. Choose from thousands of icons, customize colors, gradients, and borders. Perfect for startups, side projects, and developers."
      intro={[
        "svglogo.dev is the fastest way to create a professional logo for your next project. Whether you're a developer needing an icon for a GitHub repo, or a founder launching an MVP, our SVG logo maker helps you design beautiful brand marks in seconds.",
        "No design skills required. Our tool is built to be simple, fast, and entirely browser-based. You can export your creations in SVG, PNG, or ICO formats, making them ready for websites, mobile apps, and favicons.",
      ]}
      bullets={[
        "Access to thousands of high-quality icons from popular icon sets.",
        "Full control over colors, gradients, and background shapes.",
        "Real-time preview and instant exports.",
        "100% free and no registration required.",
      ]}
      steps={[
        "Search for an icon that represents your brand.",
        "Customize the icon color and size.",
        "Add a background with solid colors or gradients.",
        "Adjust border radius and width for a polished look.",
        "Export your logo as SVG, PNG, or ICO.",
      ]}
      useCases={[
        "Creating GitHub repository icons and profile pictures.",
        "Designing MVPs and landing page logos.",
        "Generating favicons for websites and web apps.",
        "Creating placeholder logos for client presentations.",
      ]}
      faq={[
        {
          question: "Is it really free?",
          answer:
            "Yes, svglogo.dev is completely free to use for both personal and commercial projects.",
        },
        {
          question: "Can I use these logos commercially?",
          answer:
            "Yes, the icons are sourced from open-source sets like Iconify, and you have full rights to the logos you create.",
        },
        {
          question: "What formats can I export?",
          answer:
            "You can export in SVG (scalable vector), PNG (transparent raster), and ICO (for favicons).",
        },
      ]}
      primaryCta={{
        href: "#",
        label: "Back to Top",
      }}
      relatedPages={[
        {
          href: "/logo-maker",
          label: "Logo Maker",
          description: "Learn more about our core logo creation features.",
        },
        {
          href: "/svg-to-png",
          label: "SVG to PNG",
          description: "Convert your SVG logos to transparent PNG files.",
        },
        {
          href: "/svg-to-favicon",
          label: "SVG to Favicon",
          description: "Optimize your brand mark for browser tab usage.",
        },
        {
          href: "/svg-to-ico",
          label: "SVG to ICO",
          description: "Generate multi-size ICO files for Windows and web.",
        },
      ]}
    />
  );
}

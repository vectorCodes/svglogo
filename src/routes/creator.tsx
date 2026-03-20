import { createFileRoute } from "@tanstack/react-router";
import { CreatorPage } from "#/features/creator-plan/CreatorPage";
import { CREATOR_JSON_LD, CREATOR_SEO, SITE_NAME } from "#/data/site";

export const Route = createFileRoute("/creator")({
  component: CreatorPage,
  head: () => ({
    meta: [
      { title: CREATOR_SEO.title },
      { name: "description", content: CREATOR_SEO.description },
      { name: "keywords", content: CREATOR_SEO.keywords },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      // Open Graph
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:url", content: CREATOR_SEO.canonical },
      { property: "og:title", content: CREATOR_SEO.title },
      { property: "og:description", content: CREATOR_SEO.description },
      { property: "og:image", content: CREATOR_SEO.ogImage },
      { property: "og:image:alt", content: CREATOR_SEO.ogImageAlt },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: CREATOR_SEO.title },
      { name: "twitter:description", content: CREATOR_SEO.description },
      { name: "twitter:image", content: CREATOR_SEO.ogImage },
      // Canonical
      { name: "canonical", content: CREATOR_SEO.canonical },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: CREATOR_JSON_LD,
      },
    ],
  }),
});

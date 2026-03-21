export interface SocialAsset {
  id: string;
  label: string;
  icon: string;
  width: number;
  height: number;
  folder: string;
  filename: string;
}

export const SOCIAL_ASSETS: SocialAsset[] = [
  { id: "og", label: "Open Graph", icon: "lucide:globe", width: 1200, height: 630, folder: "social", filename: "og-1200x630" },
  { id: "twitter-banner", label: "Twitter / X Banner", icon: "simple-icons:x", width: 1500, height: 500, folder: "social", filename: "twitter-banner-1500x500" },
  { id: "linkedin-cover", label: "LinkedIn Cover", icon: "simple-icons:linkedin", width: 1584, height: 396, folder: "social", filename: "linkedin-cover-1584x396" },
  { id: "instagram-post", label: "Instagram Post", icon: "simple-icons:instagram", width: 1080, height: 1080, folder: "social", filename: "instagram-post-1080x1080" },
  { id: "facebook-cover", label: "Facebook Cover", icon: "simple-icons:facebook", width: 820, height: 312, folder: "social", filename: "facebook-cover-820x312" },
  { id: "youtube-banner", label: "YouTube Banner", icon: "simple-icons:youtube", width: 2560, height: 1440, folder: "social", filename: "youtube-banner-2560x1440" },
];

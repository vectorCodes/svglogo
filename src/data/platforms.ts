export interface Platform {
  id: string;
  label: string;
  icon: string;
  shape: "circle" | "squircle" | "rounded" | "square";
  displaySize: number;
  pro?: boolean;
}

export const PLATFORMS: Platform[] = [
  { id: "app-store", label: "App Store", icon: "simple-icons:appstore", shape: "squircle", displaySize: 80 },
  { id: "google-play", label: "Google Play", icon: "simple-icons:googleplay", shape: "rounded", displaySize: 72 },
  { id: "favicon", label: "Favicon", icon: "simple-icons:googlechrome", shape: "square", displaySize: 20 },
  { id: "x", label: "X / Twitter", icon: "simple-icons:x", shape: "circle", displaySize: 48 },
  { id: "slack", label: "Slack", icon: "simple-icons:slack", shape: "rounded", displaySize: 36 },
  { id: "discord", label: "Discord", icon: "simple-icons:discord", shape: "circle", displaySize: 48 },
  { id: "github", label: "GitHub", icon: "simple-icons:github", shape: "circle", displaySize: 40 },
  { id: "instagram", label: "Instagram", icon: "simple-icons:instagram", shape: "circle", displaySize: 44 },
  { id: "linkedin", label: "LinkedIn", icon: "simple-icons:linkedin", shape: "square", displaySize: 48 },
  { id: "ios-home", label: "iOS Home Screen", icon: "simple-icons:apple", shape: "squircle", displaySize: 60, pro: true },
];

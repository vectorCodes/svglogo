import type { Background, LogoState } from "./logo.types";

/**
 * Generate a deterministic variation of a logo state based on grid coordinates.
 * Keeps: iconName, borderRadius, textMode, logoText, fontFamily
 * Varies: colors, background, iconSize, iconBorderWidth, iconRotation
 */
export function generateVariation(base: LogoState, col: number, row: number): Partial<LogoState> {
  // Use coordinates as seed for deterministic but varied results
  const seed = hashCoords(col, row);
  const rng = seededRng(seed);

  const isDark = rng() > 0.4;
  const baseHue = Math.floor(rng() * 360);
  const hueShift = Math.floor(rng() * 60) - 30;
  const sat = 55 + Math.floor(rng() * 35);

  const bg = generateBackground(rng, baseHue, hueShift, sat, isDark);
  const iconColor = pickContrastColor(bg, rng);
  const iconSize = 40 + Math.floor(rng() * 30);
  const iconBorderWidth = rng() > 0.7 ? Math.floor(rng() * 6) : 0;
  const iconRotation = rng() > 0.85 ? Math.floor(rng() * 30) - 15 : 0;
  const borderWidth = rng() > 0.8 ? Math.floor(rng() * 8) + 1 : 0;

  return {
    iconColor,
    iconBorderColor: iconColor,
    iconBorderWidth,
    iconSize,
    iconRotation,
    iconOffsetX: 0,
    iconOffsetY: 0,
    background: bg,
    borderWidth,
    borderColor: iconColor,
  };
}

function generateBackground(rng: () => number, baseHue: number, hueShift: number, sat: number, isDark: boolean): Background {
  if (rng() < 0.3) {
    const l = isDark ? 15 + Math.floor(rng() * 25) : 55 + Math.floor(rng() * 35);
    return { type: "solid", color: hslToHex(baseHue, sat, l) };
  }

  const h2 = (baseHue + hueShift + 360) % 360;
  const l1 = isDark ? 20 + Math.floor(rng() * 20) : 50 + Math.floor(rng() * 30);
  const l2 = isDark ? 25 + Math.floor(rng() * 25) : 55 + Math.floor(rng() * 30);
  const dir = Math.floor(rng() * 360);

  return {
    type: "gradient",
    direction: dir,
    stops: [
      { color: hslToHex(baseHue, sat, l1), position: 0 },
      { color: hslToHex(h2, sat, l2), position: 100 },
    ],
  };
}

function pickContrastColor(bg: Background, rng: () => number): string {
  const bgLum = bg.type === "solid"
    ? luminance(bg.color)
    : bg.stops.reduce((sum, s) => sum + luminance(s.color), 0) / bg.stops.length;

  if (bgLum > 0.4) return rng() > 0.2 ? "#111111" : "#1a1a2e";
  return rng() > 0.2 ? "#FFFFFF" : "#f0f0f0";
}

function hashCoords(x: number, y: number): number {
  let h = 0;
  h = ((h << 5) - h + x * 374761393) | 0;
  h = ((h << 5) - h + y * 668265263) | 0;
  return Math.abs(h);
}

function seededRng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) | 0;
    return ((s >>> 0) / 0xFFFFFFFF);
  };
}

function luminance(hex: string): number {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  const toLinear = (v: number) => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

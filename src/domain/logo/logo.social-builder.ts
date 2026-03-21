import type { Background } from "./logo.types";

function buildSvgBackground(bg: Background): { defs: string; fill: string } {
  if (bg.type === "solid") {
    return { defs: "", fill: bg.color };
  }

  const { direction, stops } = bg;
  const rad = (direction * Math.PI) / 180;
  const x1 = 50 - 50 * Math.cos(rad + Math.PI / 2);
  const y1 = 50 - 50 * Math.sin(rad + Math.PI / 2);
  const x2 = 50 + 50 * Math.cos(rad + Math.PI / 2);
  const y2 = 50 + 50 * Math.sin(rad + Math.PI / 2);

  const defs = `<linearGradient id="social-bg" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
    ${stops.map((s) => `<stop offset="${s.position}%" stop-color="${s.color}"/>`).join("\n    ")}
  </linearGradient>`;

  return { defs, fill: "url(#social-bg)" };
}

export function buildSocialSvg(
  logoSvg: string,
  background: Background,
  width: number,
  height: number,
): string {
  const { defs: bgDefs, fill } = buildSvgBackground(background);

  const logoSize = Math.round(Math.min(width, height) * 0.4);
  const logoX = Math.round((width - logoSize) / 2);
  const logoY = Math.round((height - logoSize) / 2);

  const vbMatch = logoSvg.match(/viewBox="([^"]*)"/);
  const viewBox = vbMatch?.[1] ?? "0 0 512 512";

  // Strip width/height from the logo SVG and embed as a nested <svg> element.
  // A nested <svg> creates its own coordinate space, so all internal refs
  // (clip-paths, gradients, etc.) work without any defs extraction.
  const nestedSvg = logoSvg
    .replace(/\bwidth="[^"]*"/, `width="${logoSize}"`)
    .replace(/\bheight="[^"]*"/, `height="${logoSize}"`)
    .replace(/viewBox="[^"]*"/, `viewBox="${viewBox}" x="${logoX}" y="${logoY}"`);

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}">
  ${bgDefs ? `<defs>${bgDefs}</defs>` : ""}
  <rect width="${width}" height="${height}" fill="${fill}"/>
  ${nestedSvg}
</svg>`;
}

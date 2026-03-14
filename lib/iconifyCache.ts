import { redis } from "#/lib/redis";

function fetchWithTimeout(url: string, timeoutMs = 4000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { signal: controller.signal }).finally(() =>
    clearTimeout(timer),
  );
}

export async function fetchIconSvg(
  prefix: string,
  name: string,
  color: string,
  sizePx: number,
): Promise<string> {
  const cacheKey = `iconify:${prefix}:${name}:${color}:${sizePx}`;
  const cached = await redis.get(cacheKey);
  if (cached) return cached as string;
  const svg = await fetchWithTimeout(
    `https://api.iconify.design/${prefix}/${name}.svg?color=${encodeURIComponent(color)}&width=${sizePx}&height=${sizePx}`,
  ).then((res) => res.text());
  await redis.set(cacheKey, svg, "EX", 60 * 60 * 24 * 30); // 30 days
  return svg;
}

import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "#/lib/supabase";
import {
  PRICE_ONE_TIME,
  PRICE_ONE_TIME_EARLY,
  type Currency,
} from "#/data/creator-plan";

let cachedRate: { rate: number; ts: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function getUsdToInrRate(): Promise<number> {
  if (cachedRate && Date.now() - cachedRate.ts < CACHE_TTL) {
    return cachedRate.rate;
  }

  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  if (!res.ok) return cachedRate?.rate ?? 92; // fallback

  const data = await res.json<{ rates: Record<string, number> }>();
  const rate = data.rates.INR ?? 92;
  cachedRate = { rate, ts: Date.now() };
  return rate;
}

export const getPriceFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { currency: Currency })
  .handler(async ({ data: { currency } }) => {
    const supabase = getSupabaseServerClient();
    const { data } = await supabase.auth.getUser();

    let hasEarlyAccess = false;
    if (data.user?.email) {
      const { data: ea } = await supabase
        .from("early_access")
        .select("status")
        .eq("email", data.user.email.toLowerCase())
        .maybeSingle();
      hasEarlyAccess = ea?.status === true;
    }

    const baseNormal = PRICE_ONE_TIME;
    const baseEarly = PRICE_ONE_TIME_EARLY;

    let normal: number;
    let early: number;

    if (currency === "INR") {
      const rate = await getUsdToInrRate();
      normal = Math.round(baseNormal * rate);
      early = Math.round(baseEarly * rate);
    } else {
      normal = baseNormal;
      early = baseEarly;
    }

    return {
      normal,
      early,
      price: hasEarlyAccess ? early : normal,
      hasEarlyAccess,
      currency,
    };
  });

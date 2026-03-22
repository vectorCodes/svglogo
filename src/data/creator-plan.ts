export const LAUNCH_DATE = "April 17th";
export const LAUNCH_DATE_ISO = "2026-04-17";

// One-time purchase pricing (USD base)
export const PRICE_ONE_TIME = 15;
export const PRICE_ONE_TIME_EARLY = 10;
export const EARLY_DISCOUNT_PCT = Math.round((1 - PRICE_ONE_TIME_EARLY / PRICE_ONE_TIME) * 100);

export type Currency = "USD" | "INR";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  INR: "₹",
};

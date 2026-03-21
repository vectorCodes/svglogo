export const LAUNCH_DATE = "April 17th";
export const LAUNCH_DATE_ISO = "2026-04-17";

// One-time purchase pricing (USD base)
export const EARLY_ACCESS_DISCOUNT = 0.2; // 20% off for early access
export const PRICE_ONE_TIME = 50;
export const PRICE_ONE_TIME_EARLY = PRICE_ONE_TIME * (1 - EARLY_ACCESS_DISCOUNT); // 40

export type Currency = "USD" | "INR";

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  INR: "₹",
};

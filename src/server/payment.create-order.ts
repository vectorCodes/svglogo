import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { getSupabaseServerClient } from "#/lib/supabase";
import { getPriceFn } from "#/server/payment.get-price";
import { type Currency } from "#/data/creator-plan";

export const createOrderFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { currency: Currency })
  .handler(async ({ data: { currency } }) => {
    const supabase = getSupabaseServerClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user?.email) {
      throw new Error("Not authenticated");
    }

    const { price } = await getPriceFn({ data: { currency } });
    const amount = Math.round(price * 100);

    const keyId = env.RAZORPAY_KEY_ID;
    const keySecret = env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      throw new Error("Payment not configured");
    }

    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        notes: {
          user_id: data.user.id,
          email: data.user.email,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Razorpay order creation failed:", err);
      throw new Error("Failed to create payment order");
    }

    const order = await res.json<{ id: string }>();

    return {
      orderId: order.id,
      amount,
      currency,
      keyId,
    };
  });

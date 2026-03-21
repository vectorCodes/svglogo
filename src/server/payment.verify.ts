import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
import { getSupabaseServerClient, getSupabaseServiceClient } from "#/lib/supabase";
import { verifyRazorpaySignature } from "#/domain/payment/payment.verify";

export const verifyPaymentFn = createServerFn({ method: "POST" })
  .inputValidator(
    (data: unknown) =>
      data as {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      },
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
      throw new Error("Not authenticated");
    }

    const keySecret = env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      throw new Error("Payment not configured");
    }

    const valid = await verifyRazorpaySignature(
      data.razorpay_order_id,
      data.razorpay_payment_id,
      data.razorpay_signature,
      keySecret,
    );

    if (!valid) {
      throw new Error("Invalid payment signature");
    }

    // Verify the order belongs to this user
    const keyId = env.RAZORPAY_KEY_ID;
    const orderRes = await fetch(
      `https://api.razorpay.com/v1/orders/${data.razorpay_order_id}`,
      {
        headers: {
          Authorization: `Basic ${btoa(`${keyId}:${keySecret}`)}`,
        },
      },
    );

    if (orderRes.ok) {
      const order = await orderRes.json<{ notes: { user_id?: string } }>();
      if (order.notes.user_id && order.notes.user_id !== auth.user.id) {
        throw new Error("Order does not belong to this user");
      }
    }

    // Upgrade plan
    const service = getSupabaseServiceClient();
    const { error } = await service
      .from("plans")
      .upsert({ id: auth.user.id, plan: "creator" }, { onConflict: "id" });

    if (error) {
      console.error("Plan upgrade failed:", error);
      throw new Error("Failed to upgrade plan");
    }

    return { success: true };
  });

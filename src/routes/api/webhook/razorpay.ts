import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";
import { getSupabaseServiceClient } from "#/lib/supabase";
import { verifyRazorpayWebhookSignature } from "#/domain/payment/payment.verify";

export const Route = createFileRoute("/api/webhook/razorpay")({
  server: {
    handlers: {
      GET: async () => {
        return new Response("ok", { status: 200 });
      },
      POST: async ({ request }) => {
        console.log("[webhook] Razorpay webhook received");

        const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET;
        if (!webhookSecret) {
          console.error("[webhook] RAZORPAY_WEBHOOK_SECRET not set");
          return new Response("Webhook not configured", { status: 500 });
        }

        const body = await request.text();
        const signature = request.headers.get("x-razorpay-signature") ?? "";

        console.log("[webhook] Verifying signature...");
        const valid = await verifyRazorpayWebhookSignature(
          body,
          signature,
          webhookSecret,
        );

        if (!valid) {
          console.error("[webhook] Invalid signature");
          return new Response("Invalid signature", { status: 400 });
        }

        const event = JSON.parse(body) as {
          event: string;
          payload: {
            payment?: {
              entity: {
                order_id: string;
                notes?: { user_id?: string; email?: string };
              };
            };
            order?: {
              entity: {
                id: string;
                notes?: { user_id?: string; email?: string };
              };
            };
          };
        };

        console.log("[webhook] Event:", event.event);

        if (event.event === "payment.captured" || event.event === "order.paid") {
          const notes =
            event.payload.payment?.entity.notes ??
            event.payload.order?.entity.notes;

          const userId = notes?.user_id;
          if (!userId) {
            console.error("[webhook] Missing user_id in order notes");
            return new Response("Missing user_id in notes", { status: 400 });
          }

          console.log("[webhook] Upgrading plan for user:", userId);
          const service = getSupabaseServiceClient();
          const { error } = await service
            .from("plans")
            .upsert({ id: userId, plan: "creator" }, { onConflict: "id" });

          if (error) {
            console.error("[webhook] Plan upgrade failed:", error);
            return new Response("DB error", { status: 500 });
          }

          console.log("[webhook] Plan upgraded successfully");
        }

        return new Response("ok", { status: 200 });
      },
    },
  },
});
